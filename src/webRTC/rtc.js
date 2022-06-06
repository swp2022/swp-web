import { Logger } from "../util/Logger";
import {
  onDataChannelClose,
  onDataChannelMessage,
  onDataChannelOpen,
  onIceCandidate,
  onIceConnectionStateChange,
  onIceGatheringStateChange,
  onSignalingStateChange,
  trackHandler,
} from "./rtcEventHandler";

const iceGatheringThreshold = 10;

const connectToLocalImageServer = false;

const offerUrl = connectToLocalImageServer
  ? "http://localhost:8080/offer"
  : "https://imagetest.chll.it/offer";

var peerConnection = null,
  dataChannel = null,
  mediaStream = null;

const logger = new Logger("rtc.js");

export const createPeerConnection = (videoRef, setConnecting) => {
  const config = {
    sdpSemantics: "unified-plan",
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302", "stun:stun4.l.google.com:19302"],
      },
    ],
  };
  const peerConnection = new RTCPeerConnection(config);
  peerConnection.iceCount = 0;

  peerConnection.addEventListener(
    "icegatheringstatechange",
    () => onIceGatheringStateChange(peerConnection),
    false,
  );
  peerConnection.addEventListener(
    "iceconnectionstatechange",
    () => onIceConnectionStateChange(peerConnection),
    false,
  );
  peerConnection.addEventListener(
    "signalingstatechange",
    () => onSignalingStateChange(peerConnection),
    false,
  );

  peerConnection.addEventListener("icecandidate", (e) =>
    onIceCandidate(e, peerConnection),
  );

  peerConnection.addEventListener("track", (e) =>
    trackHandler(e, videoRef, setConnecting),
  );

  return peerConnection;
};

function waitIceGatheringToThreshold(peerConnection) {
  return new Promise(function (resolve) {
    if (peerConnection.iceCount >= iceGatheringThreshold) {
      resolve();
    } else {
      function checkState() {
        logger.log(
          "waitIceGathering: " +
            peerConnection.iceCount +
            " of " +
            iceGatheringThreshold,
        );
        if (peerConnection.iceCount >= iceGatheringThreshold) {
          peerConnection.removeEventListener("icecandidate", checkState);
          resolve();
        }
      }
      peerConnection.addEventListener("icecandidate", checkState);
    }
  });
}

export async function negotiate(
  peerConnection,
  accessToken,
  userId,
  setConnecting,
) {
  await peerConnection
    .createOffer()
    .then((offer) => peerConnection.setLocalDescription(offer));

  await waitIceGatheringToThreshold(peerConnection);

  const offer = peerConnection.localDescription;
  logger.log("Sending Offer");
  try {
    const response = await fetch(offerUrl, {
      body: JSON.stringify({
        sdp: offer.sdp,
        type: offer.type,
        video_transform: "rotate",
        access_token: accessToken,
        user_id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const answer = await response.json();
    logger.log("Answer SDP: " + answer.sdp);
    peerConnection.setRemoteDescription(answer);
  } catch (e) {
    logger.log("negotiate error:" + e);
    setConnecting(false);
    closeConnection();
  }
}

export async function startConnection(
  videoRef,
  accessToken,
  userId,
  setConnecting,
) {
  const parameters = { ordered: true };
  const constraints = { audio: false, video: true };

  closeConnection();
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    logger.log("Could not acquire media: " + err);
    setConnecting(false);
    closeConnection();
    return;
  }

  peerConnection = createPeerConnection(videoRef, setConnecting);
  dataChannel = peerConnection.createDataChannel("chat", parameters);

  dataChannel.onclose = () => onDataChannelClose();
  dataChannel.onopen = () => onDataChannelOpen();
  dataChannel.onmessage = (e) => onDataChannelMessage(e);

  mediaStream
    .getTracks()
    .forEach((track) => peerConnection.addTrack(track, mediaStream));
  negotiate(peerConnection, accessToken, userId, setConnecting);
}

export function closeConnection() {
  if (dataChannel) {
    dataChannel.close();
  }

  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => {
      if (track.readyState === "live") track.stop();
    });
  }

  if (!peerConnection) return;

  // Transceivers 종료
  if (peerConnection.getTransceivers) {
    peerConnection.getTransceivers().forEach((transceiver) => {
      if (transceiver.stop) transceiver.stop();
    });
  }

  // Video Track Sender  종료
  peerConnection.getSenders().forEach((sender) => sender.track.stop());

  // Peer Connection 종료
  peerConnection.close();

  peerConnection = null;
  dataChannel = null;
  mediaStream = null;
}

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

// ICE Gathering 을 끝까지 기다리지 않고 연결 수립하는 기준
const iceGatheringThreshold = 5;

const debugging = false;
const local = false;

const offerUrl = local
  ? "http://localhost:8080/offer"
  : "http://54.180.224.121:5000/offer";
const LOG = (str) => {
  if (debugging) console.log("rtc.js: " + str);
};

var peerConnection = null,
  dataChannel = null,
  mediaStream = null;

export const createPeerConnection = (videoRef, handleConnecting) => {
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

  // 디버깅 용도 핸들러
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

  // ICE Gathering 핸들러
  peerConnection.addEventListener("icecandidate", (e) =>
    onIceCandidate(e, peerConnection),
  );

  // Video Track 받는 Handler
  peerConnection.addEventListener("track", (e) =>
    trackHandler(e, videoRef, handleConnecting),
  );

  return peerConnection;
};

function waitIceGathering(peerConnection) {
  // ICE Gathering을 끝까지 기다리지 않고 연결을 수립합니다
  return new Promise(function (resolve) {
    if (peerConnection.iceCount >= iceGatheringThreshold) {
      resolve();
    } else {
      function checkState() {
        LOG(
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
  handleConnecting,
) {
  await peerConnection
    .createOffer()
    .then((offer) => peerConnection.setLocalDescription(offer));

  await waitIceGathering(peerConnection);

  const offer = peerConnection.localDescription;
  LOG("Sending Offer");
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
    LOG("Answer SDP: " + answer.sdp);
    peerConnection.setRemoteDescription(answer);
  } catch (e) {
    LOG("negotiate error:" + e);
    handleConnecting(false);
    closeConnection();
  }
}

export async function startConnection(
  videoRef,
  accessToken,
  userId,
  handleConnecting,
) {
  const parameters = { ordered: true };
  const constraints = { audio: false, video: true };

  closeConnection();

  peerConnection = createPeerConnection(videoRef, handleConnecting);
  dataChannel = peerConnection.createDataChannel("chat", parameters);

  dataChannel.onclose = () => onDataChannelClose();
  dataChannel.onopen = () => onDataChannelOpen();
  dataChannel.onmessage = (e) => onDataChannelMessage(e);

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    mediaStream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, mediaStream));
    negotiate(peerConnection, accessToken, userId, handleConnecting);
  } catch (err) {
    LOG("Could not acquire media: " + err);
    closeConnection();
  }
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

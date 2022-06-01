import {
  onDataChannelClose,
  onDataChannelMessage,
  onDataChannelOpen,
  onIceConnectionStateChange,
  onIceGatheringStateChange,
  onSignalingStateChange,
  trackHandler,
} from "./rtcEventHandler";

const debugging = false;
const local = false;
const offerUrl = local
  ? "http://localhost:8080/offer"
  : "http://54.180.224.121:5000/offer";
const LOG = (str) => {
  if (debugging) console.log("rtc.js: " + str);
};

export const createPeerConnection = (videoRef, handleConnecting) => {
  const config = {
    sdpSemantics: "unified-plan",
    iceServers: [{ urls: ["stun:stun4.l.google.com:19302"] }],
  };
  const pc = new RTCPeerConnection(config);

  // 디버깅 용도 핸들러
  pc.addEventListener(
    "icegatheringstatechange",
    () => onIceGatheringStateChange(pc),
    false,
  );
  pc.addEventListener(
    "iceconnectionstatechange",
    () => onIceConnectionStateChange(pc),
    false,
  );
  pc.addEventListener(
    "signalingstatechange",
    () => onSignalingStateChange(pc),
    false,
  );

  // Video Track 받는 Handler
  pc.addEventListener("track", (e) =>
    trackHandler(e, videoRef, handleConnecting),
  );

  return pc;
};

export async function negotiate(peerConnection, accessToken, userId) {
  await peerConnection
    .createOffer()
    .then((offer) => peerConnection.setLocalDescription(offer))
    .then(
      () =>
        new Promise(function (resolve) {
          if (peerConnection.iceGatheringState === "complete") {
            resolve();
          } else {
            function checkState() {
              if (peerConnection.iceGatheringState === "complete") {
                peerConnection.removeEventListener(
                  "icegatheringstatechange",
                  checkState,
                );
                resolve();
              }
            }
            peerConnection.addEventListener(
              "icegatheringstatechange",
              checkState,
            );
          }
        }),
    );

  const offer = peerConnection.localDescription;
  LOG("Offer SDP: " + offer.sdp);
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

  const peerConnection = createPeerConnection(videoRef, handleConnecting);

  const dataChannel = peerConnection.createDataChannel("chat", parameters);
  let stream = null;

  dataChannel.onclose = () => onDataChannelClose();
  dataChannel.onopen = () => onDataChannelOpen();
  dataChannel.onmessage = (e) => onDataChannelMessage(e);

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));
    negotiate(peerConnection, accessToken, userId);
  } catch (err) {
    LOG("Could not acquire media: " + err);
  }
  return [peerConnection, dataChannel, stream];
}

export function closeConnection(peerConnection, dataChannel, mediaStream) {
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
}

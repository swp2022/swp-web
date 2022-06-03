const LOG = (str) => console.log("rtcEventHandler.js: " + str);

export const onIceCandidate = (e, pc) => {
  if (e.candidate) {
    ++pc.iceCount;
    LOG("ICE candidate count:" + pc.iceCount);
  }
};

export const onIceGatheringStateChange = (pc) => {
  LOG("icegathering -> " + pc.iceGatheringState);
};

export const onIceConnectionStateChange = (pc) => {
  LOG("iceConnection -> " + pc.iceConnectionState);
};

export const onSignalingStateChange = (pc) => {
  LOG("signaling -> " + pc.signalingState);
};

export const trackHandler = (e, videoRef, setConnecting) => {
  if (videoRef != null) {
    videoRef.current.srcObject = e.streams[0];
    setConnecting(false);
  }
};

export const onDataChannelClose = () => {
  LOG("datachannel closed");
};

export const onDataChannelOpen = () => {
  LOG("datachannel open");
};

export const onDataChannelMessage = (e) => {
  LOG("onmessage: " + e.data);
};

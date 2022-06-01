const LOG = (str) => console.log("rtcEventHandler.js: " + str);

export const onIceGatheringStateChange = (pc) => {
  LOG("icegathering -> " + pc.iceGatheringState);
};

export const onIceConnectionStateChange = (pc) => {
  LOG("iceConnection -> " + pc.iceConnectionState);
};

export const onSignalingStateChange = (pc) => {
  LOG("signaling -> " + pc.signalingState);
};

export const trackHandler = (e, videoRef, handleConnecting) => {
  if (videoRef != null) {
    videoRef.current.srcObject = e.streams[0];
    handleConnecting(false);
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

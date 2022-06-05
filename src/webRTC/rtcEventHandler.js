import { Logger } from "../util/Logger";

const logger = new Logger("rtcEventHandler.js");

export const onIceCandidate = (e, pc) => {
  if (e.candidate) {
    ++pc.iceCount;
    logger.log("ICE candidate count:" + pc.iceCount);
  }
};

export const onIceGatheringStateChange = (pc) => {
  logger.log("icegathering -> " + pc.iceGatheringState);
};

export const onIceConnectionStateChange = (pc) => {
  logger.log("iceConnection -> " + pc.iceConnectionState);
};

export const onSignalingStateChange = (pc) => {
  logger.log("signaling -> " + pc.signalingState);
};

export const trackHandler = (e, videoRef, setConnecting) => {
  if (videoRef != null) {
    videoRef.current.srcObject = e.streams[0];
    setConnecting(false);
  }
};

export const onDataChannelClose = () => {
  logger.log("datachannel closed");
};

export const onDataChannelOpen = () => {
  logger.log("datachannel open");
};

export const onDataChannelMessage = (e) => {
  logger.log("onmessage: " + e.data);
};

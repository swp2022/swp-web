import { React, useCallback, useEffect, useRef } from "react";
import { Modal, Box, Button } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const CONSTRAINTS = { audio: false, video: true };

const StudyModal = (props) => {
  let pc = null;
  let dc = null,
    dcInterval = null;

  const videoRef = useRef(null);

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };

  function createPeerConnection() {
    let config = {
      sdpSemantics: "unified-plan",
    };
    config.iceServers = [{ urls: ["stun:stun.l.google.com:19302"] }];
    pc = new RTCPeerConnection(config);

    // register some listeners to help debugging
    pc.addEventListener(
      "icegatheringstatechange",
      function () {
        console.log("iceGatheringLog -> " + pc.iceGatheringState);
      },
      false,
    );

    pc.addEventListener(
      "iceconnectionstatechange",
      function () {
        console.log("iceConnectionLog -> " + pc.iceConnectionState);
      },
      false,
    );

    pc.addEventListener(
      "signalingstatechange",
      function () {
        console.log("signalingLog -> " + pc.signalingState);
      },
      false,
    );

    // connect audio / video
    pc.addEventListener("track", function (evt) {
      videoRef.current.srcObject = evt.streams[0];
    });

    return pc;
  }

  function negotiate() {
    return pc
      .createOffer()
      .then(function (offer) {
        //createoffer을 통한 통신요청
        return pc.setLocalDescription(offer);
      })
      .then(function () {
        return new Promise(function (resolve) {
          if (pc.iceGatheringState === "complete") {
            resolve();
          } else {
            function checkState() {
              if (pc.iceGatheringState === "complete") {
                pc.removeEventListener("icegatheringstatechange", checkState);
                resolve();
              }
            }
            pc.addEventListener("icegatheringstatechange", checkState);
          }
        });
      })
      .then(function () {
        var offer = pc.localDescription;
        var codec;

        return fetch("http://55.180.224.121:5000/offer", {
          body: JSON.stringify({
            sdp: offer.sdp,
            type: offer.type,
            video_transform: "none",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (answer) {
        return pc.setRemoteDescription(answer);
      })
      .catch(function (e) {
        alert(e);
      });
  }

  function start() {
    pc = createPeerConnection();
    let time_start = null;

    function current_stamp() {
      if (time_start === null) {
        time_start = new Date().getTime();
        return 0;
      } else {
        return new Date().getTime() - time_start;
      }
    }

    var parameters = { ordered: true };
    dc = pc.createDataChannel("chat", parameters);
    dc.onclose = function () {
      clearInterval(dcInterval);
    };
    dc.onopen = function () {
      dcInterval = setInterval(function () {
        var message = "ping " + current_stamp();
        console.log("> " + message + "\n");
        dc.send(message);
      }, 1000);
    };
    dc.onmessage = function (evt) {
      if (evt.data.substring(0, 4) === "pong") {
        var elapsed_ms = current_stamp() - parseInt(evt.data.substring(5), 10);
        console.log(" RTT " + elapsed_ms + " ms\n");
      }
    };

    var constraints = {
      audio: false,
      video: true,
    };

    navigator.mediaDevices.getUserMedia(constraints).then(
      function (stream) {
        if (videoRef && videoRef.current && !videoRef.current.srcObject) {
          //videoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach(function (track) {
          pc.addTrack(track, stream);
        });
        return negotiate();
      },
      function (err) {
        alert("Could not acquire media: " + err);
      },
    );
  }

  return (
    <Modal
      open={true}
      onClose={props.handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 500, flexGrow: 1 }}>
        <video
          style={{
            width: 450,
            height: 450,
            margin: 5,
            backgroundColor: "black",
          }}
          autoPlay
          ref={videoRef}
        ></video>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={start}
        >
          start studing
        </Button>
        <Button variant="contained" color="secondary" size="large">
          stop studing
        </Button>
      </Box>
    </Modal>
  );
};

export default StudyModal;

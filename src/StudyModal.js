import { React, useCallback, useEffect, useRef } from "react";
import { Modal, Box, Button } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const CONSTRAINTS = { audio: false, video: true };

const StudyModal = (props) => {
  const [pc, setPc] = useState();
  const [socket, setSocket] = useState();

  const videoRef = useRef(null);

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };

  return (
    <Modal
      open={true}
      onClose={props.handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400, flexGrow: 1 }}>
        <video
          style={{
            width: 240,
            height: 240,
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
          onClick={startVideo}
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

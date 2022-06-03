import { React, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  LinearProgress,
} from "@mui/material";
import { closeConnection, startConnection } from "./webRTC/rtc";
import { useSelector } from "react-redux";

const StudyModal = (props) => {
  const videoRef = useRef(null);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [isConnecting, setConnecting] = useState(false);

  const startStudy = async () => {
    if (isConnecting) return false;
    setConnecting(true);
    await startConnection(
      videoRef,
      token.accessToken,
      user.userId,
      setConnecting,
    );
  };

  const stopStudy = async () => {
    if (isConnecting) return false;
    closeConnection();
    return true;
  };

  const handleClose = async () => {
    if (await stopStudy()) props.handleClose();
  };
  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogTitle>학습 기록하기</DialogTitle>
      <DialogContent>
        <Card style={{ margin: "0 auto", maxWidth: "80%" }}>
          {isConnecting && <LinearProgress />}
          <video
            style={{
              backgroundColor: "black",
              display: "block",
              width: "100%",
              objectFit: "contain",
            }}
            autoPlay={true}
            ref={videoRef}
          ></video>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={startStudy}
          disabled={isConnecting}
        >
          학습 시작
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClose}
          disabled={isConnecting}
        >
          학습 종료
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudyModal;

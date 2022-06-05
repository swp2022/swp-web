import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { React, forwardRef } from "react";
import { postStudyContent } from "../util/Axios";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "../Chart";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WritingModal = (props) => {
  const [postContent, setPostContent] = useState("");

  const onChangeField = (e) => {
    setPostContent(e.target.value);
  };

  const posting = () => {
    if (postContent.length === 0) {
      alert("최소 한 글자를 작성하셔야 합니다.");
    } else {
      postStudyContent(postContent, props.value);
      props.handleClose();
    }
  };

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            글 작성하기
          </Typography>
          <Button autoFocus color="inherit" onClick={posting}>
            게시
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grid container spacing={4} padding={4}>
          <Grid item xs={12}>
            <Chart studyId={props.value} loadImmediate />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="filled-multiline-static"
              multiline
              rows={15}
              variant="filled"
              onChange={onChangeField}
            />
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
};

export default WritingModal;

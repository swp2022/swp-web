import {React, useCallback} from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import { CommentBtn } from "./PostElements";
import { useState } from "react";
import { BoardCommentGetApi, BoardCommentPostApi } from "./util/Axios";
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

const PostComment = (props) => {

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const onChangeField = (e) => {
    console.log(e.target.value);
    setNewComment(e.target.value);
  };

  const PostComment = () => {
    BoardCommentPostApi(props.boardInfo.boardId,newComment);
    setNewComment("");
  };

  const getComment = useCallback(
    async(boardId) => {
      try{
        const response = await BoardCommentGetApi(boardId);
        const { data: commentInfos } = response;
        setComments(commentInfos);
        console.log(comments);
      }catch(e){
        if(e.response.status === 400){
          alert("bad request");
        }
      }
    }
  )

  const handleOpen = () => {
    setOpen(true);
    getComment(props.boardInfo.boardId);
  }
  const handleClose = () => setOpen(false);



  return(
    <div>
      <CommentBtn onClick={handleOpen}>{`${props.boardInfo.commentCount}개의 댓글 보기...`}</CommentBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 700,flexGrow: 1 }}>
          {comments.map(c=>(<p>{c.content}</p>))}
          <Grid container columns={16}>
            <Grid item xs={14}>
              <Box sx={{ maxWidth: '100%' ,display: "flex", alignItems: "flex-end" }}>
                <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField onChange={onChangeField} fullWidth label="댓글 달기..." id="input-with-sx"  variant="standard" />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box  sx={{ p: 1  }}>
                <Button variant="text" size="large" onClick ={PostComment}>계시</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
      </Modal>
    </div>
  );
};

export default PostComment;
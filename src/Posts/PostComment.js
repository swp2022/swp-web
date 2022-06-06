import { React, useCallback, Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import { useState } from "react";
import { BoardCommentGetApi, BoardCommentPostApi } from "../Utils/Axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const PostComment = (props) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const onChangeField = (e) => {
    setNewComment(e.target.value);
  };

  const PostComment = async () => {
    const response = await BoardCommentPostApi(
      props.boardInfo.boardId,
      newComment,
    );
    console.log(response);
    setNewComment("");
    setComments([...comments, response.data]);
  };

  const getComment = useCallback(
    async (boardId) => {
      try {
        const response = await BoardCommentGetApi(boardId);
        const { data: commentInfos } = response;
        setComments(commentInfos);
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [setComments],
  );

  useEffect(() => {
    getComment(props.boardInfo.boardId);
  }, [getComment]);

  const handleClose = () => props.handleCommentExpand(false);

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 700, flexGrow: 1 }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
        >
          {comments.map((c) => (
            <ListItem key={c.commentId} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={c.profileImage} />
              </ListItemAvatar>
              <ListItemText
                primary={c.nickname}
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {c.content}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
        <Grid container columns={16}>
          <Grid item xs={14}>
            <Box
              sx={{
                maxWidth: "100%",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={onChangeField}
                value={newComment}
                fullWidth
                label="댓글 달기..."
                id="input-with-sx"
                variant="standard"
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ p: 1 }}>
              <Button variant="text" size="large" onClick={PostComment}>
                게시
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PostComment;

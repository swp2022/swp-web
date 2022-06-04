import PostComment from "./PostComment";
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Comment } from "@mui/icons-material";
import { useState } from "react";
import Chart from "./Chart";

const Post = (props) => {
  const [commentExpanded, setCommentExpanded] = useState(false);
  const handleCommentExpandClick = () => setCommentExpanded((prev) => !prev);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={props.boardInfo.profileImage}></Avatar>}
        title={props.boardInfo.nickname}
        subheader={props.boardInfo.createdAt}
      ></CardHeader>
      <CardContent>
        <Chart studyId={props.boardInfo.studyResponseDto.studyId} />
      </CardContent>
      <CardContent>
        <Typography variant="body">{props.boardInfo.content}</Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "right" }}>
        <IconButton onClick={handleCommentExpandClick}>
          <Badge badgeContent={props.boardInfo.commentCount} color="primary">
            <Comment />
          </Badge>
        </IconButton>
      </CardActions>

      {commentExpanded && (
        <PostComment
          boardInfo={props.boardInfo}
          handleCommentExpand={setCommentExpanded}
        />
      )}
    </Card>
  );
};

export default Post;

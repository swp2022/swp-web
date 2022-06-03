import PostComment from "./PostComment";
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { Comment } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Chart from "./Chart";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = (props) => {
  const [commentExpanded, setCommentExpanded] = useState(false);
  const handleCommentExpandClick = () => setCommentExpanded((prev) => !prev);

  const [chartExpanded, setChartExpanded] = useState(false);
  const handleChartExpandClick = () => setChartExpanded((prev) => !prev);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={props.boardInfo.profileImage}></Avatar>}
        title={props.boardInfo.nickname}
        subheader={props.boardInfo.createdAt}
      ></CardHeader>
      <CardContent>
        <Typography variant="body">{props.boardInfo.content}</Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "right" }}>
        <IconButton onClick={handleCommentExpandClick}>
          <Badge badgeContent={props.boardInfo.commentCount} color="primary">
            <Comment />
          </Badge>
        </IconButton>
        <ExpandMore expand={chartExpanded} onClick={handleChartExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={chartExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Chart studyId={props.boardInfo.studyResponseDto.studyId} />
        </CardContent>
      </Collapse>

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

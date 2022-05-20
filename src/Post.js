import { useEffect, useState } from "react";
import {
  PostWrapper,
  PostHeader,
  HeaderInner,
  HeaderProfileImage,
  HeaderName,
  PostBody,
  PostUnderbar,
  CommentBtn,
} from "./PostElements";

const Post = (props) => {
  console.log(props);
  const [boardId, setBoardId] = useState(props.boardInfo.boardId);
  const [commentOpen, setCommentOpen] = useState(false);

  const openComment = () => {
    setCommentOpen(true);
  };
  const closeComment = () => {
    setCommentOpen(false);
  };

  return (
    <PostWrapper>
      <PostHeader>
        <HeaderInner>
          <HeaderProfileImage image={props.boardInfo.profileImage} />
          <HeaderName>{props.boardInfo.nickname}</HeaderName>
        </HeaderInner>
      </PostHeader>
      <PostBody>{props.boardInfo.content}</PostBody>
      <PostUnderbar>
        <CommentBtn
          onClick={openComment}
        >{`${props.boardInfo.commentCount}개의 댓글 보기...`}</CommentBtn>
      </PostUnderbar>
    </PostWrapper>
  );
};

export default Post;

import { useState } from "react";
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
  const [commentOpen, setCommentOpen] = useState(false);

  const openComment = () => {
    setCommentOpen(true);
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

import {
  PostWrapper,
  PostHeader,
  HeaderInner,
  HeaderProfileImage,
  HeaderName,
  PostBody,
  PostUnderbar,
} from "./PostElements";
import PostComment from "./PostComment";

const Post = (props) => {

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
        <PostComment boardInfo = {props.boardInfo}/>
      </PostUnderbar>
    </PostWrapper>
  );
};

export default Post;

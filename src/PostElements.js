import styled from "styled-components";

export const PostWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
`;

export const PostHeader = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid #d3d3d3;
`;

export const HeaderInner = styled.div`
  position: relative;
  width: 80%;
  height: 40%;
  margin: 0 auto;
  display: flex;
`;

export const HeaderProfileImage = styled.div`
  background-image: url(${(props) => props.image});
  border-radius: 50%;
  border: 3px solid #d3d3d3;
  width: 35px;
  height: 35px;
  margin: 0 auto;
  background-size: 100px;
`;

export const HeaderName = styled.div`
  margin: 50px auto;
`;

export const PostBody = styled.div`
  position: relative;
  border-bottom: 1px solid #d3d3d3;
  height: 50px;
`;

export const PostUnderbar = styled.div`
  position: relative;
  height: 20px;
`;

export const CommentBtn = styled.button`
  position: absolute;
  outline: none;
  border: none;
  color: #d3d3d3;
  cursor: pointer;
  margin: auto;
  background-color: #fff;
`;

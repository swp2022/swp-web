import styled from "styled-components";
import Logoimage from "./Image/mainPageLogo.png";
import Slogan from "./Image/slogan.png";

export const CenterWrapper = styled.div`
  position: relative;
`;

export const Header = styled.div`
  background-color: #fff;
  top: 0;
  width: 100%;
  height: 90px;
  border-bottom: 3px solid #d3d3d3;
  position: fixed;
  z-index: 1;
`;

export const HeaderInner = styled.div`
  position: relative;
  background-color: #fff;
  width: 80%;
  height: 90px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

export const HeaderSlogan = styled.div`
  background-image: url(${Slogan});
  background-size: 180px;
  position: relative;
  height: 70px;
  width: 140px;
`;

export const HeaderLogo = styled.div`
  background-image: url(${Logoimage});
  background-size: 70px;
  position: relative;
  margin: auto 0;
  height: 77px;
  width: 77px;
`;

export const HeaderSearch = styled.div``;

export const SearchBar = styled.input`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const UserSection = styled.div`
  position: relative;
  top: 40px;
  left: 62%;
  width: 30%;
  height: 60vh;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #d3d3d3;
`;

export const Section = styled.div`
  position: absolute;
  margin-top: 130px;
  width: 50%;
  background-color: #fff;
  left: 10%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border: 1px solid #d3d3d3;
`;

export const CommentBtn = styled.button`
  position: absolute;
  outline: none;
  border: none;
  color: #d3d3d3;
  cursor: pointer;
  margin: auto;
  background-color: #8d6e63;
`;

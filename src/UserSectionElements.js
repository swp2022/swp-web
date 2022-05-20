import styled from "styled-components";

export const UserImage = styled.div`
  background-image: url(${(props) => props.image});
  border-radius: 50%;
  border: 3px solid #d3d3d3;
  width: 100px;
  height: 100px;
  background-size: 100px;
`;

export const LogoutBtn = styled.button`
  position: absolute;
  outline: none;
  border: none;
  color: #d3d3d3;
  cursor: pointer;
  right: 0;
  background-color: #fff;
`;

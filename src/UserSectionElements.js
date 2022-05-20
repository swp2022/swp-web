import styled from "styled-components";

export const UserImage = styled.div`
  background-image: url(${(props) => props.image});
  border-radius: 50%;
  border: 3px solid #d3d3d3;
  width: 100px;
  height: 100px;
  margin: 50px;
  background-size: 100px;
`;

import styled from "styled-components";
import Logoimage from './whiteLogo.png';

export const CenterWrapper = styled.div`
  position : relative;
  min-height: 100vh;
  display :flex;
  justify-content: center;
  align-items:center;
`;

export const LoadingCircle = styled.div`
  margin : 0;
  width :500px;
  height : 500px;
  border : 30px solid #D9AA8A;
  border-top : 30px solid #f3efdf;
  border-radius: 50%;
  animation: loading-circle-spin infinite 20s linear;
  @keyframes loading-circle-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Container = styled.div`
  position : absolute;
  left:50%;
  top : 50%;
  transform:translate(-50%, -50%);
  width :400px;
  height : 400px;
`;

export const CenterLogo = styled.div`
  position : absolute;
  margin : 0;
  width :400px;
  height : 400px;
  border-radius: 50%;
  background-color:#D9AA8A ;
  background-image: url(${Logoimage}) ;
  background-size: 520px;
  background-position: -73px -65px;
  backface-visibility: hidden;
  transition: 1s;
  transform: rotateY(0deg);
  ${Container}:hover & {
    transform: rotateY(180deg);
  }
`;

export const CenterLogin = styled.div`
  position : absolute;
  margin : 0;
  width :400px;
  height : 400px;
  border-radius: 50%;
  background-color:#D9AA8A ;
  backface-visibility: hidden;
  transition: 1s;
  transform: rotateY(-180deg);
  display :flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  color : #fff;
  font-size: 30px;
  ${Container}:hover & {
    transform: rotateY(0deg);
  }
`;












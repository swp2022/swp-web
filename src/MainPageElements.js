import styled from "styled-components";
import Logoimage from "./Image/mainPageLogo.png";
import Slogan from "./Image/slogan.png";

export const CenterWrapper = styled.div`
  position : relative;
  background-color : #f3efdf;
  `;

export const Header = styled.div`
	background-color: #fff;
	top : 0;
	width: 100%;
	height: 90px;
	border-bottom : 3px solid #D3D3D3 ;
	position :fixed;
	z-index: 1;
`;

export const HeaderInner = styled.div`
	position : relative;
	background-color: #fff;
	width:80%;
	height:90px;
	margin: 0 auto;
	display : flex;
	flex-direction: row;
`;

export const HeaderSlogan = styled.img`
	background-image: url(${Slogan});
	background-size: 170px;
	position : absolute;
	margin: auto 0;
	top : 0 ;
	bottom : 0;
	height: 70px;
	width : 140px;
`;

export const HeaderLogo = styled.div`
	background-image: url(${Logoimage});
	background-size: 70px;
	background-color: #fff;
	position : absolute;
	margin: auto 0;
	top : 0 ;
	bottom : 0;
	height: 70px;
	width : 70px;
`;



export const UserSection = styled.div`
	position : relative;
	top: 40px;
	left: 62%;
	width: 30%;
	height : 60vh;
	background-color: #fff;
	border-radius: 10px;
	border : 1px solid #D3D3D3 ;
`;

export const Section = styled.div`
	position : absolute;
	margin-top : 130px;
	width: 50%;
	background-color: #fff;
	height : 1000px;
	left: 10%;
	border-top-right-radius: 10px ;
	border-top-left-radius: 10px ;
	border : 1px solid #D3D3D3 ;
`;



//   export const Container = styled.div`
//   position : absolute;
//   left:50%;
//   top : 60%;
//   transform:translate(-50%, -50%);
//   width :70%;
//   height : 90%;
//   background-color : #fff;
//   border-top-left-radius: 20px;
//   border-top-right-radius: 20px;
//   `;
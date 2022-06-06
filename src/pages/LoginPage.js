import LoginBtn from "../elements/loginBtn";
import {
  CenterWrapper,
  LoadingCircle,
  Container,
  CenterLogo,
  CenterLogin,
} from "../elements/LoginPageElements";

const loginPage = () => (
  <CenterWrapper>
    <LoadingCircle></LoadingCircle>
    <Container>
      <CenterLogo></CenterLogo>
      <CenterLogin>
        <h3>Login to start!!!</h3>
        <LoginBtn />
      </CenterLogin>
    </Container>
  </CenterWrapper>
);

export default loginPage;

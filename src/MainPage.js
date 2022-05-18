import {
  Header,
  HeaderLogo,
  HeaderSlogan,
  HeaderInner,
  CenterWrapper,
  Section,
  UserSection,
  SecrchBar,
} from "./MainPageElements";

import { useNavigate } from "react-router-dom";
import { UserImage, UserInfoWrapper, LogoutBtn } from "./UserSectionElements";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { eraseUserInfo, eraseTokenInfo } from "./redux/auth-reducer";

const MainPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    if (user) setIsUserLoggedIn(true);
  }, [user]);

  const [seachValue, setSerachValue] = useState("");

  const onChangeField = e => {
    setSerachValue(e.target.value);
  };

  const dispatch = useDispatch();

  function logout(){
    window.localStorage.clear();
    dispatch(eraseUserInfo());
    dispatch(eraseTokenInfo());
    navigate("/");
  }
 
  function checkLogout(){
    if(window.confirm("로그아웃 하시겠습니까?")){
      logout();
    }
  }

  return (
    <CenterWrapper>
      <Header>
        <HeaderInner>
          <HeaderLogo />
          <HeaderSlogan />
          <LogoutBtn onClick ={checkLogout}>logout</LogoutBtn>
          <SecrchBar type = "text" name = "search" value = {seachValue} onChange = {onChangeField}/>
        </HeaderInner>
        <UserSection>
          {isUserLoggedIn && <UserImage image={user.profileImage} />}
        </UserSection>
      </Header>

      <Section></Section>
    </CenterWrapper>
  );
};

export default MainPage;

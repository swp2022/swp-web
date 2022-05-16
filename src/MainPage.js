import {
  Header,
  HeaderLogo,
  HeaderSlogan,
  HeaderInner,
  CenterWrapper,
  Section,
  UserSection,
} from "./MainPageElements";

import{
  UserImage,
}from "./UserSectionElements";

import {useSelector}  from "react-redux";

const MainPage = () => {
const user = useSelector((state) => state.userInfo);
console.log(user);

  return(
  <CenterWrapper>
    <Header>
      <HeaderInner>
        <HeaderLogo />
        <HeaderSlogan />
      </HeaderInner>
      <UserSection>
        <UserImage image = {user.profileImage} />
      </UserSection>
    </Header>

    <Section></Section>
  </CenterWrapper>
  );
};

export default MainPage;

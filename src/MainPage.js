import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Header,
  HeaderLogo,
  HeaderSlogan,
  HeaderInner,
  CenterWrapper,
  Section,
  UserSection,
} from "./MainPageElements";

import { UserImage } from "./UserSectionElements";

const MainPage = () => {
  const user = useSelector((state) => state.user);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    if (user) setIsUserLoggedIn(true);
  }, [user]);

  return (
    <CenterWrapper>
      <Header>
        <HeaderInner>
          <HeaderLogo />
          <HeaderSlogan />
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

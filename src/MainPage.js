import {
  Header,
  HeaderLogo,
  HeaderSlogan,
  HeaderInner,
  CenterWrapper,
  Section,
  UserSection,
} from "./MainPageElements";

const mainPage = () => (
  <CenterWrapper>
    <Header>
      <HeaderInner>
        <HeaderLogo />
        <HeaderSlogan />
      </HeaderInner>
      <UserSection></UserSection>
    </Header>

    <Section></Section>
  </CenterWrapper>
);

export default mainPage;

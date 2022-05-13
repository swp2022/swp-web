import {Header, HeaderLogo,HeaderSlogan ,HeaderInner, CenterWrapper, Section, UserSection } from "./MainPageElements"


function MainPage(){
    return (
      <CenterWrapper>
        <Header>
        <HeaderInner>
          <HeaderLogo/>
          <HeaderSlogan/>
        </HeaderInner>
        <UserSection>

        </UserSection>
      </Header>

        <Section></Section>
      </CenterWrapper>
      
    );
}

export default MainPage;
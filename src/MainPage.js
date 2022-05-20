import {
  Header,
  HeaderLogo,
  HeaderSlogan,
  HeaderInner,
  CenterWrapper,
  Section,
  UserSection,
  SearchBar,
} from "./MainPageElements";
import { followerContentGetApi } from "./util/Axios";
import { useNavigate } from "react-router-dom";
import { UserImage, UserInfoWrapper, LogoutBtn } from "./UserSectionElements";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { eraseUserInfo, eraseTokenInfo } from "./redux/auth-reducer";
import { setBoardInfo, eraseBoardInfo } from "./redux/board-reducer";
import { removeTokenInfo, removeUserInfo } from "./util/storage";
import Post from "./Post";

const MainPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const boards = useSelector((state) => state.board);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    if (user) setIsUserLoggedIn(true);
  }, [user]);

  const [searchValue, setSearchValue] = useState("");

  const onChangeField = (e) => {
    setSearchValue(e.target.value);
  };

  /* post 컴포넌트에 들어갈 부분을  */
  const dispatch = useDispatch();
  const setBoardDispatch = (boardInfo) => dispatch(setBoardInfo(boardInfo));
  const getBoards = async () => {
    try {
      dispatch(eraseBoardInfo());
      const response = await followerContentGetApi();
      const { data: boardsInfo } = response;
      setBoardDispatch(boardsInfo);
    } catch (e) {
      if (e.response.status === 400) {
        alert("bad request");
      }
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  /* 로그아웃시 확인 문구 출력 */
  const logout = () => {
    removeUserInfo();
    removeTokenInfo();
    dispatch(eraseUserInfo());
    dispatch(eraseTokenInfo());
    navigate("/");
  };

  const checkLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logout();
    }
  };

  return (
    <CenterWrapper>
      <Header>
        <HeaderInner>
          <HeaderLogo />
          <HeaderSlogan />
          <LogoutBtn onClick={checkLogout}>logout</LogoutBtn>
          <SearchBar
            type="text"
            name="search"
            value={searchValue}
            onChange={onChangeField}
          />
        </HeaderInner>
        <UserSection>
          {isUserLoggedIn && <UserImage image={user.profileImage} />}
        </UserSection>
      </Header>

      <Section>
        {boards.map((board) => {
          const a = <Post boardInfo={board} />;
          return a;
        })}
      </Section>
    </CenterWrapper>
  );
};

export default MainPage;

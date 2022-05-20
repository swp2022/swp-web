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
import { UserImage, LogoutBtn } from "./UserSectionElements";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
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

  const dispatch = useDispatch();
  const setBoardDispatch = useCallback(
    (boardInfo) => dispatch(setBoardInfo(boardInfo)),
    [dispatch],
  );
  const getBoards = useCallback(async () => {
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
  }, [dispatch, setBoardDispatch]);

  useEffect(() => {
    getBoards();
  }, [getBoards]);

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
        {boards.forEach((board) => {
          <Post boardInfo={board} />;
        })}
      </Section>
    </CenterWrapper>
  );
};

export default MainPage;

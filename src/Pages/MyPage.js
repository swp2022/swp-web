import { HeaderLogo, CenterWrapper } from "../Elements/MainPageElements";
import { useNavigate } from "react-router-dom";
import { UserImage } from "../Elements/UserSectionElements";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, Fragment } from "react";
import { eraseUserInfo, eraseTokenInfo } from "../Redux/auth-reducer";
import { removeTokenInfo, removeUserInfo } from "../Utils/storage";
import FollowerModal from "../Modals/FollowerModal";
import StudyModal from "../Modals/StudyModal";
import MyBoard from "../Boards/MyBoard";
import {
  alpha,
  AppBar,
  Button,
  Grid,
  InputBase,
  Paper,
  styled,
  Toolbar,
  Typography,
  Menu,
  IconButton,
  Avatar,
  MenuItem,
  Box,
  ListItemText,
} from "@mui/material";
import { Container } from "@mui/system";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 12,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.75),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    if (user) setIsUserLoggedIn(true);
  }, [user]);

  const [searchValue, setSearchValue] = useState();
  const [follerModalOpen, setFolloerModalOpen] = useState(false);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const menuOpen = Boolean(menuAnchorEl);

  const onChangeField = (e) => {
    setSearchValue(e.target.value);
  };

  const openFolloerModal = () => setFolloerModalOpen(true);
  const closeFolloerModal = () => setFolloerModalOpen(false);
  const openStudyModal = () => setStudyModalOpen(true);
  const closeStudyModal = () => setStudyModalOpen(false);
  const openMenu = (e) => setMenuAnchorEl(e.currentTarget);
  const closeMenu = () => setMenuAnchorEl(null);

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

  const navigateToMainPage = () => {
    navigate("/mainpage");
  };

  const navigateToStudyLogPage = () => {
    navigate("/studylog");
  };

  return (
    <CenterWrapper>
      <AppBar color="primary" position="static">
        <Toolbar>
          <HeaderLogo />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 1,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".35rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            O.STUDY
          </Typography>
          <Search>
            <StyledInputBase
              placeholder="유저 검색"
              inputProps={{ "aria-label": "search" }}
              onChange={onChangeField}
            />
          </Search>
          <Button
            variant="contained"
            color="secondary"
            onClick={openFolloerModal}
          >
            검색
          </Button>
          {follerModalOpen && (
            <FollowerModal
              search={searchValue}
              handleClose={closeFolloerModal}
            />
          )}
          <IconButton onClick={openMenu}>
            <Avatar src={user.profileImage}></Avatar>
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={closeMenu}
            onClick={closeMenu}
          >
            <MenuItem onClick={navigateToMainPage}>메인페이지</MenuItem>
            <MenuItem onClick={navigateToStudyLogPage}>스터디 기록</MenuItem>
            <MenuItem onClick={checkLogout}>로그아웃</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
        <Grid
          container
          spacing={2}
          direction={{ xs: "column-reverse", md: "row" }}
        >
          <Grid item xs={12} md={8}>
            <MyBoard />
          </Grid>

          <Grid item xs>
            <Paper elevation={2}>
              <Box
                sx={{
                  mx: "auto",
                  p: 1,
                  m: 1,
                  padding: "20px",
                  display: "flex",
                  flexWrap: "nowrap",
                }}
              >
                {isUserLoggedIn && <UserImage image={user.profileImage} />}
                <Box sx={{ mx: "auto", p: 1, m: 1 }}>
                  <ListItemText
                    primary={user.nickname}
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {user.email}
                        </Typography>
                      </Fragment>
                    }
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={openStudyModal}
                  >
                    start studing
                  </Button>
                  {studyModalOpen && (
                    <StudyModal handleClose={closeStudyModal} />
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </CenterWrapper>
  );
};

export default MainPage;

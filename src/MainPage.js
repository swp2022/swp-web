import { HeaderLogo, CenterWrapper } from "./MainPageElements";
import { useNavigate } from "react-router-dom";
import { UserImage } from "./UserSectionElements";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { eraseUserInfo, eraseTokenInfo } from "./redux/auth-reducer";
import { removeTokenInfo, removeUserInfo } from "./util/storage";
import Board from "./Board";
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

  const [searchValue, setSearchValue] = useState("");

  const onChangeField = (e) => {
    console.log(e);
    setSearchValue(e.target.value);
  };

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
              display: { xs: "none", md: "flex" },
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
          <Button variant="contained" color="secondary" onClick={checkLogout}>
            {" "}
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
        <Grid
          container
          spacing={2}
          direction={{ xs: "column-reverse", md: "row" }}
        >
          <Grid item xs={12} md={8}>
            <Paper elevation={2}>
              <Board />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper elevation={2}>
              {isUserLoggedIn && <UserImage image={user.profileImage} />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </CenterWrapper>
  );
};

export default MainPage;

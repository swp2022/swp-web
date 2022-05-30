import { HeaderLogo, CenterWrapper, CommentBtn } from "./MainPageElements";
import { useNavigate } from "react-router-dom";
import { UserImage } from "./UserSectionElements";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { eraseUserInfo, eraseTokenInfo } from "./redux/auth-reducer";
import { removeTokenInfo, removeUserInfo } from "./util/storage";
import FollowerModal from "./FollowerModal"
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
  Box,
  Divider,
  Stack
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

  const [searchValue, setSearchValue] = useState({name : ""});

  const onChangeField = (e) => {
    setSearchValue({
      ...searchValue ,
      name : e.target.value,
    });  
    console.log("mainpage: " + searchValue.name);
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item md={8}/>
              <Grid item md={4}>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={8}
                >
                  <CommentBtn>mypage</CommentBtn>
                  <CommentBtn onClick={checkLogout}>logout</CommentBtn>
                </Stack>
              </Grid>
              <Grid item md={5}/>
              <Grid item md={4}>
                <Search>
                  <StyledInputBase
                    placeholder="유저 검색"
                    inputProps={{ "aria-label": "search" }}
                    onChange={onChangeField}
                  />
                </Search>
              </Grid>
              <Grid item md={3}>
                <FollowerModal value = {searchValue} />
              </Grid> 
            </Grid>
          </Box>
          
          
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

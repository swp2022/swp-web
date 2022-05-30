import { useState } from "react";
import { postFollowingApi, deleteFollowingApi } from "./util/Axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const UserInfoComponent = (props) => {
  const [fallowed, setfallowed] = useState(props.userInfo.isFollowing);

  const postFolloing = async () => {
    await postFollowingApi(props.userInfo.userId);
  };

  const deleteFollowing = async () => {
    await deleteFollowingApi(props.userInfo.userId);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Avatar alt="프로필" src={`${props.userInfo.profileImage}`} />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            {fallowed ? (
              <Button variant="contained" onClick={postFolloing}>
                Follow
              </Button>
            ) : (
              <Button variant="outlined" onClick={deleteFollowing}>
                unFollow
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserInfoComponent;

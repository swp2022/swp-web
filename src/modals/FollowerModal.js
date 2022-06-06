import { React, useCallback, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
import { searchUserInfoApi } from "../utils/Axios";
import UserInfoComponent from "../elements/UserInfoComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const FollowerModal = (props) => {
  const [userInfos, setUserInfos] = useState([]);

  const updateFollowing = (index, value) => {
    if (userInfos[index]) {
      console.log(userInfos[index]);
      userInfos[index].isFollowing = value;
      setUserInfos(userInfos);
    }
  };

  const getUserInfos = useCallback(async () => {
    try {
      const response = await searchUserInfoApi(props.search);
      const { data: usersInfos } = response;
      setUserInfos(usersInfos);
    } catch (e) {
      if (e.response.status === 400) {
        alert("bad requeset");
      }
    }
  }, [setUserInfos, props]);

  useEffect(() => {
    getUserInfos();
  }, [getUserInfos]);

  return (
    <Modal
      open={true}
      onClose={props.handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400, flexGrow: 1 }}>
        {userInfos.map((userInfo, index) => (
          <UserInfoComponent
            key={userInfo.userId}
            index={index}
            userInfo={userInfo}
            updateFollowing={updateFollowing}
          />
        ))}
      </Box>
    </Modal>
  );
};

export default FollowerModal;

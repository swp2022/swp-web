import { React, useCallback } from "react";
import { Button, Modal, Box } from "@mui/material";
import { useState } from "react";
import { searchUserInfoApi } from "./util/Axios";
import UserInfoComponent from "./UserInfoComponent"


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
  const [open, setOpen] = useState(false);
  const [userInfos, setUserInfos ] = useState([]);
  
  const getUserInfos = useCallback(
    async() => {
      try{ 
        console.log(props.value);
        const response = await searchUserInfoApi(props.value.name);
        const { data: usersInfos } = response;
        setUserInfos(usersInfos);
      }catch(e){
        if(e.response.status === 400){
          alert("bad requeset")
        } 
      }
    },
    [ setUserInfos],
  );

  const handleOpen = () => {
    setOpen(true);
    getUserInfos();
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        {" "}
        검색
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, flexGrow: 1 }}>
          {userInfos.map((userInfo) => (
            <UserInfoComponent key={userInfo.userId} userInfo={userInfo} />
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default FollowerModal;

import React from "react";
import { useSelector } from "react-redux";
import { Content, Wrapper } from "./styles";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <Wrapper>
      <Content>Software Project 2022</Content>

      <h1>{user.email}</h1>

      <Content>Deployed with Vercel.</Content>
    </Wrapper>
  );
};

export default Home;

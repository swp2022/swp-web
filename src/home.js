import { Content, Wrapper } from "./styles";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <Wrapper>
      <Content>Software Project 2022</Content>

      <h1>{user.email}</h1>

      <Content>Deployed with Vercel.</Content>
    </Wrapper>
  );
};

export default Home;

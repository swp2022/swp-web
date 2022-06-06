import Post from "../posts/Post";
import ReactLoading from "react-loading";
import { useCallback, useState } from "react";
import { followerContentGetApi } from "../utils/Axios";
import { LoadingWrap } from "../elements/BoardElement";
import { InfiniteScroll } from "../utils/InfiniteScroll";
import { Grid } from "@mui/material";

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPagingDone, setIsPagingDone] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const getBoards = useCallback(
    async (page) => {
      try {
        const response = await followerContentGetApi(page);
        const { data: boardsInfo } = response;
        setBoards([...boards, ...boardsInfo]);
        return response.data.length;
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [boards],
  );

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);
        observer.unobserve(entry.target);

        const retrivedCount = await getBoards(pageNumber);
        if (!retrivedCount) setIsPagingDone(true);
        setPageNumber((previous) => previous + 1);

        observer.observe(entry.target);
        setIsLoading(false);
      }
    },
    [isLoading, getBoards, pageNumber],
  );

  const [setTarget] = InfiniteScroll({
    onIntersect,
  });

  return (
    <Grid container spacing={2}>
      {boards.map((boardInfo) => (
        <Grid key={boardInfo.boardId} item xs={12}>
          <Post boardInfo={boardInfo} />
        </Grid>
      ))}
      {!isPagingDone && (
        <LoadingWrap ref={setTarget}>
          {isLoading && <ReactLoading type="spin" color="#d9aa8a" />}
        </LoadingWrap>
      )}
    </Grid>
  );
};

export default Board;

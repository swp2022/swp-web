import Post from "./Post";
import ReactLoading from "react-loading";
import { useCallback, useState } from "react";
import { followerContentGetApi } from "./util/Axios";
import { LoadingWrap } from "./BoardElement";
import { InfiniteScroll } from "./util/InfiniteScroll";

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
    <>
      {boards.map((boardInfo) => (
        <Post key={boardInfo.boardId} boardInfo={boardInfo} />
      ))}
      {!isPagingDone && (
        <LoadingWrap ref={setTarget}>
          {isLoading && <ReactLoading type="spin" color="#d9aa8a" />}
        </LoadingWrap>
      )}
    </>
  );
};

export default Board;

import Post from "../Post";
import ReactLoading from "react-loading";
import { useCallback, useEffect, useState } from "react";
import { myContentGetApi } from "../util/Axios";
import { LoadingWrap } from "../BoardElement";

export default function MyBoard() {
  const [board, setBoard] = useState([]);
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadCompleted, setIsLoadCompleted] = useState(false);
  let pageNum = 0;

  const getBoards = useCallback(
    async (page) => {
      try {
        const response = await myContentGetApi(page);
        const { data: boardsInfo } = response;
        setBoard((board) => [...board, ...boardsInfo]);
        console.log(board);
        return response.data.length;
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [setBoard],
  );

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      setIsLoading(true);
      const retrivedCount = await getBoards(pageNum);
      if (!retrivedCount) setIsLoadCompleted(true);
      pageNum = pageNum + 1;
      setIsLoading(false);
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      {board.map((boardInfo) => (
        <Post key={boardInfo.boardId} boardInfo={boardInfo} />
      ))}
      {!isLoadCompleted && (
        <LoadingWrap ref={setTarget}>
          {isLoading && <ReactLoading type="spin" color="#d9aa8a" />}
        </LoadingWrap>
      )}
    </>
  );
}

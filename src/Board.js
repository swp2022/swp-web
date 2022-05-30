import Post from "./Post";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { eraseBoardInfo, setBoardInfo } from "./redux/board-reducer";
import { useCallback, useEffect, useState } from "react";
import { followerContentGetApi } from "./util/Axios";
import { LoadingWrap } from "./BoardElement";

export default function Board() {
  const boards = useSelector((state) => state.board);
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadCompleted, setIsLoadCompleted] = useState(false);
  let pageNum = 0;
  const dispatch = useDispatch();

  const setBoardDispatch = useCallback(
    (boardInfo) => dispatch(setBoardInfo(boardInfo)),
    [dispatch],
  );

  const getBoards = useCallback(
    async (page) => {
      try {
        dispatch(eraseBoardInfo());
        const response = await followerContentGetApi(page);
        const { data: boardsInfo } = response;
        setBoardDispatch(boardsInfo);
        return response.data.length;
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [dispatch, setBoardDispatch],
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
      {boards.map((boardInfo) => (
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

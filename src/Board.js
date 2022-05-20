import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { eraseBoardInfo, setBoardInfo } from "./redux/board-reducer";
import { useCallback, useEffect } from "react";
import { followerContentGetApi } from "./util/Axios";

export default function Board() {
  const boards = useSelector((state) => state.board);
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
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [dispatch, setBoardDispatch],
  );

  useEffect(() => {
    getBoards(0);
  }, [getBoards]);

  return boards.map((boardInfo) => (
    <Post key={boardInfo.boardId} boardInfo={boardInfo} />
  ));
}

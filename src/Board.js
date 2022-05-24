import Post from "./Post";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { eraseBoardInfo, setBoardInfo } from "./redux/board-reducer";
import { useCallback, useRef, useEffect, useState } from "react";
import { followerContentGetApi } from "./util/Axios";
import { LoadingWrap } from "./BoardElement";

export default function Board() {
  const boards = useSelector((state) => state.board);
  const [ target , setTarget ] =useState(null);
  const [ isLoading , setIsLoading ] = useState(false);
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
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [dispatch, setBoardDispatch],
  );

  const onIntersect = async([entry], observer) => {
    if(entry.isIntersecting && !isLoading){
      observer.unobserve(entry.target);
      setIsLoading(true);
      await new Promise ((resolve) => setTimeout(resolve, 1000));
      await getBoards(pageNum);
      pageNum = pageNum + 1;
      setIsLoading(false);
      observer.observe(entry.target);
    }
  };

  useEffect(() =>{
    let observer;
    if(target){
      observer = new IntersectionObserver(onIntersect,{
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <div>
      {boards.map((boardInfo) => (
        <Post key={boardInfo.boardId} boardInfo={boardInfo}/>
      ))}
      <LoadingWrap ref = {setTarget}>
        {isLoading && <ReactLoading type ="spin" color = "#d9aa8a"/>}
      </LoadingWrap>
      
    </div>
  );

}

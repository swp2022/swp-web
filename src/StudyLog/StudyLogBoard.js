import Post from "../Post";
import ReactLoading from "react-loading";
import { useCallback, useEffect, useState } from "react";
import { studyGetApi } from "../util/Axios";
import { LoadingWrap } from "../BoardElement";
import { Grid } from "@mui/material";

export default function MyBoard() {
  const [study, setStudy] = useState([]);
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadCompleted, setIsLoadCompleted] = useState(false);
  let pageNum = 0;

  const getBoards = useCallback(
    async (page) => {
      try {
        const response = await studyGetApi(page);
        const { data: studyInfo } = response;
        setStudy((study) => [...study, ...studyInfo]);
        console.log(response);
        return response.data.length;
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [setStudy],
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
    <Grid container spacing={2}>
      {study.map((studyInfo) => (
        <Grid key={studyInfo.studyId} item xs={12}>
          {studyInfo.studyid}
        </Grid>
      ))}
      {!isLoadCompleted && (
        <LoadingWrap ref={setTarget}>
          {isLoading && <ReactLoading type="spin" color="#d9aa8a" />}
        </LoadingWrap>
      )}
    </Grid>
  );
}

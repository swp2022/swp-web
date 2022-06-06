import ReactLoading from "react-loading";
import { useCallback, useEffect, useState } from "react";
import { studyGetApi } from "../utils/Axios";
import { LoadingWrap } from "../elements/BoardElement";
import { Grid } from "@mui/material";
import StudyLogPost from "../posts/StudyLogPost";

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
        if (page === 0 && studyInfo[0]) studyInfo[0].loadImmediate = true;
        setStudy((study) => [...study, ...studyInfo]);
        return response.data.length;
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [setStudy],
  );

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoading) {
        observer.unobserve(entry.target);
        setIsLoading(true);
        const retrivedCount = await getBoards(pageNum);
        if (!retrivedCount) setIsLoadCompleted(true);
        pageNum = pageNum + 1;
        setIsLoading(false);
        observer.observe(entry.target);
      }
    },
    [pageNum],
  );

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  return (
    <Grid container spacing={2}>
      {study.map((studyInfo) => (
        <Grid key={studyInfo.studyId} item xs={12}>
          <StudyLogPost value={studyInfo} />
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

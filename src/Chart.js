import { useCallback, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { studyLogGetApi } from "./util/Axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "집중도",
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
      max: 1,
    },
    x: {
      display: false,
    },
  },
};

const ChartView = (props) => {
  const [studyLogs, setStudyLogs] = useState([]);

  const getStudyLogs = useCallback(
    async (boardId) => {
      try {
        const response = await studyLogGetApi(boardId);
        console.log(response);
        const { data: logs } = response;
        setStudyLogs(logs);
      } catch (e) {
        if (e.response.status === 400) {
          alert("bad request");
        }
      }
    },
    [setStudyLogs],
  );

  const data = {
    labels: studyLogs.map((log) => log.recordedTime),
    datasets: [
      {
        label: "CPM",
        data: studyLogs.map((log) => log.percentage),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    getStudyLogs(props.studyId);
  }, [getStudyLogs]);

  return <Line options={options} data={data} />;
};

export default ChartView;

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
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { studyLogGetApi } from "./Axios";
import { Replay } from "@mui/icons-material";
import { IconButton } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const options = {
  plugins: {
    title: {
      display: false,
      text: "집중도",
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25,
      },
    },
    x: {
      display: false,
    },
  },
  tension: 0.3,
};

const chartContainerStyle = { position: "relative", width: "99%" };

const iconStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "1",
  fontSize: "3rem",
};

const ChartView = (props) => {
  const [studyLogs, setStudyLogs] = useState([]);
  const [blur, setBlur] = useState({ filter: "blur(1px)" });

  const getStudyLogs = useCallback(
    async (studyId) => {
      try {
        const response = await studyLogGetApi(studyId);
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

  const handleClick = useCallback(() => {
    if (blur) {
      getStudyLogs(props.studyId);
      setBlur(null);
    }
  }, [blur, getStudyLogs, props.studyId]);

  const loadImmediate = useCallback(() => {
    if (props.loadImmediate) {
      handleClick();
    }
  }, [handleClick, props]);

  useEffect(() => {
    loadImmediate();
  }, [loadImmediate]);

  const data = {
    labels: studyLogs.map((log) => log.recordedTime),
    datasets: [
      {
        fill: {
          target: "origin",
          above: "rgba(141, 110, 99, 0.3)",
        },
        label: "CPM",
        data: studyLogs.map((log) => log.percentage),
        borderColor: "#8d6e63",
        backgroundColor: "#8d6e63",
      },
    ],
  };

  return (
    <div onClick={handleClick} style={chartContainerStyle}>
      {blur && (
        <IconButton size="large" color="primary" style={iconStyle}>
          <Replay fontSize="inherit" />
        </IconButton>
      )}
      <Line style={{ ...blur }} options={options} data={data} />
    </div>
  );
};

export default ChartView;

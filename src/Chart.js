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
      max: 1,
      ticks: {
        stepSize: 0.2,
      },
    },
    x: {
      display: false,
    },
  },
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

  const handleClick = () => {
    if (blur) {
      getStudyLogs(props.studyId);
      setBlur(null);
    }
  };

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

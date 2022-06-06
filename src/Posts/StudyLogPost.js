import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import WritingModal from "../Modals/WritingModal";
import ChartView from "../Utils/Chart";

const StudyLogPost = (props) => {
  const [modalopen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Card>
      <CardHeader
        avatar={null}
        title={`study : ${props.value.startAt} ~ ${props.value.endAt}`}
        subheader={`집중도 : ${props.value.finalPercentage}%`}
      ></CardHeader>
      <CardContent>
        <ChartView studyId={props.value.studyId} />
      </CardContent>
      <CardActions style={{ justifyContent: "right" }}>
        <IconButton onClick={openModal}>
          <Badge color="primary">
            <EditIcon />
          </Badge>
        </IconButton>
      </CardActions>

      {modalopen && (
        <WritingModal handleClose={closeModal} value={props.value.studyId} />
      )}
    </Card>
  );
};

export default StudyLogPost;

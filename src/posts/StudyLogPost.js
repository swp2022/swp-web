import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import WritingModal from "../modals/WritingModal";
import ChartView from "../utils/Chart";
import {
  PercentRounded,
  PlayCircleFilledRounded,
  StopCircleRounded,
} from "@mui/icons-material";

const StudyLogPost = (props) => {
  const [modalopen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Card>
      <CardContent>
        <ChartView
          studyId={props.value.studyId}
          loadImmediate={props.value.loadImmediate}
        />
      </CardContent>
      <CardContent>
        <Stepper alternativeLabel activeStep={3}>
          <Step>
            <StepLabel icon={<PlayCircleFilledRounded color="primary" s />}>
              <Chip label={props.value.startAt} variant="outlined" />
            </StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<PercentRounded />}>
              <Chip
                label={`집중도: ${props.value.finalPercentage}%`}
                variant="outlined"
              />
            </StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<StopCircleRounded color="primary" />}>
              <Chip label={props.value.endAt} variant="outlined" />
            </StepLabel>
          </Step>
        </Stepper>
      </CardContent>
      <CardActions style={{ justifyContent: "right" }}>
        <Button endIcon={<EditIcon />} onClick={openModal}>
          글쓰기
        </Button>
      </CardActions>

      {modalopen && (
        <WritingModal handleClose={closeModal} value={props.value.studyId} />
      )}
    </Card>
  );
};

export default StudyLogPost;

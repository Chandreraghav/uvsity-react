import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Basic from "./Steps/Session/Basic";
import Schedule from "./Steps/Session/Schedule";
import Participant from "./Steps/Session/Participant";
import Fee from "./Steps/Session/Fee";
import Final from "./Steps/Session/Final";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { StepLabel } from "@mui/material";
//const steps = ['Basics', 'Schedule', 'Participants', 'Fees','Complete'];

const steps = [
  {
    id: 1,
    title: "Basics",
    validationError: false,
  },
  {
    id: 2,
    title: "Schedule",
    validationError: false,
  },
  {
    id: 3,
    title: "Participants",
    validationError: false,
  },

  {
    id: 4,
    title: "Fees",
    validationError: false,
  },
  {
    id: 5,
    title: "Complete",
    validationError: false,
  },
];
function CreateSession(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
const [formdata, dispatch] = useDataLayerContextValue();
  const totalSteps = () => {
    return steps.length;
  };

  const isStepFailed = (step) => {
    return step.validationError
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleActivityMonitor = (obj) => {
    if (obj.data.validationError) {
      setCompleted({});
      steps.map((step) => {
        if (step.id === obj.id) {
          step.validationError = true;
        }
      });
    }
    if (!obj.data.validationError) {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className="px-4 py-2 bg-white">
      <Typography variant="h6" component="div">
        {props.data.workflow.workflow.alias}
      </Typography>
      <Box sx={{ width: "100%" }} className="py-4">
        <Stepper alternativeLabel  nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const labelProps = {};
            if (isStepFailed(label)) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Alert message
                </Typography>
              );
  
              labelProps.error = true;
            }
            return (
              <Step  key={label.id} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                <StepLabel {...labelProps}>{label.title}</StepLabel>
              </StepButton>
            </Step>
            )
          })}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <Basic onActivity={handleActivityMonitor} data={props.data} />
              )}
              {activeStep === 1 && (
                <Schedule
                  onActivity={handleActivityMonitor}
                  data={props.data}
                />
              )}
              {activeStep === 2 && (
                <Participant
                  onActivity={handleActivityMonitor}
                  data={props.data}
                />
              )}
              {activeStep === 3 && <Fee onActivity={handleActivityMonitor} />}
              {activeStep === 4 && <Final onActivity={handleActivityMonitor} />}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: 6 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}

export default CreateSession;

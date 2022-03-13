import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
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
import _ from "lodash";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { isEmptyObject, isValidURL } from "../../../../utils/utility";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { RESPONSE_TYPES } from "../../../../constants/constants";
import { APP } from "../../../../constants/userdata";
import { handleResponse } from "../../../../toastr-response-handler/handler";

toast.configure();
function CreateSession(props) {
  const checkInteractiveErrors = false;
  const scheduleFormListener = () => {
    if (activeStep === 1) {
      const isDirty = formdata?.basic?.dirty;
      console.log("No errors", steps[activeStep].title);
      setTimeout(() => {
        handleComplete();
      }, 100);
    }
  };
  const basicFormListener = () => {
    if (activeStep === 0) {
      const isDirty = formdata?.basic?.dirty;
      if (checkInteractiveErrors) {
        const hasInteractiveErrors = !isEmptyObject(formdata?.basic?.errors);
        if (hasInteractiveErrors && isDirty) {
          console.log("Contains errors-interactive", steps[activeStep].title);
          setTimeout(() => {
            handleInCompleteStep();
          }, 100);
          return;
        }
      }
      // if form is just loaded without user interactive errors but the form contains internal validation errors..
      const categoryId = formdata?.basic?.categoryId
        ? formdata.basic.categoryId
        : null;
      const sessionTitle = formdata?.basic?.name
        ? formdata.basic.name.trim()
        : null;
      const sessionShortName = formdata?.basic?.shortName
        ? formdata.basic.shortName.trim()
        : null;
      const summary = formdata?.basic?.summary?.html
        ? formdata?.basic?.summary?.html
        : null;
      const hasImageErrors = formdata?.basic?.binary.images.error;
      const documentCopyrightConsent =
        formdata?.basic?.binary.documents.consent;
      const hasDocumentData = !isEmptyObject(
        formdata?.basic?.binary.documents.data
      );
      const hasDocumentDataWithoutConsent =
        hasDocumentData && documentCopyrightConsent === false;
      const hasDocumentErrors =
        formdata?.basic?.binary.documents.error ||
        hasDocumentDataWithoutConsent;
      const sessionReferenceURL = formdata?.basic?.url
        ? formdata?.basic.url.trim()
        : null;
      const hasReferenceURLError =
        sessionReferenceURL && !isValidURL(sessionReferenceURL);
      const hasMediaErrors =
        hasImageErrors || hasDocumentErrors || hasReferenceURLError;
      const isRequiredFieldsEmpty =
        !categoryId || !sessionTitle || !sessionShortName || !summary;
      if (isDirty) {
        if (isRequiredFieldsEmpty || hasMediaErrors) {
          console.log("Contains errors", steps[activeStep].title);
          handleInCompleteStep();
        } else {
          console.log("No errors", steps[activeStep].title);
          setTimeout(() => {
            handleComplete();
          }, 100);
        }
      }
    }
  };
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Basics",
      validationError: undefined,
      complete: false,
    },
    {
      id: 2,
      title: "Schedule",
      validationError: undefined,
      complete: false,
    },
    {
      id: 3,
      title: "Participants",
      validationError: undefined,
      complete: false,
    },

    {
      id: 4,
      title: "Fees",
      validationError: undefined,
      complete: false,
    },
    {
      id: 5,
      title: "Complete",
      validationError: undefined,
      complete: false,
    },
  ]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formdata, dispatch] = useDataLayerContextValue();
  const totalSteps = () => {
    return steps.length;
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

  const allStepsCompletedBeforeFinalStep = () => {
    return completedSteps() === totalSteps() - 1;
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

  const handleStep = (index, label) => () => {
    if (allStepsCompletedBeforeFinalStep()) {
      setActiveStep(index);
    } else {
      const step_id = [1, 2, 3, 4];
      if (step_id.includes(label.id)) {
        setActiveStep(index);
      } else {
        const _user = props.data.user.data.firstName;
        const err = APP.MESSAGES.ERRORS.FINAL_STEP_VISIT_DENIED.replace(
          "<user>",
          _user
        );
        handleResponse(err, RESPONSE_TYPES.ERROR, toast.POSITION.TOP_CENTER);
      }
    }
  };

  const handleInCompleteStep = () => {
    setStepValidationErrorFlag(true);
    setStepComplete(false);
    setCompleted({});
  };
  const handleComplete = () => {
    try {
      const newCompleted = {};
      newCompleted[activeStep] = true;
      setStepComplete(true);
      setStepValidationErrorFlag(false);
      setCompleted(newCompleted);
    } catch (error) {}
  };
  const setStepComplete = (ind) => {
    const _steps = steps;
    _steps[activeStep].complete = ind;
    setSteps(_steps);
  };
  const setStepValidationErrorFlag = (hasValidationErrors) => {
    const _steps = steps;
    _steps[activeStep].validationError = hasValidationErrors;
    setSteps(_steps);
  };
  useEffect(() => {
    basicFormListener();
    scheduleFormListener();
  }, [formdata]);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 25,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#eaeaf0",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#B8B8B8",
      },
    },
    [`&.${stepConnectorClasses.error}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#111",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(20,23,150,1) 0%, rgba(25,118,210,1) 0%, rgba(25,118,210,1) 100%, rgba(40,179,32,1) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),

    ...(ownerState.error && {
      backgroundImage:
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(25,118,210,1) 0%, rgba(40,179,32,1) 0%, rgba(25,118,210,1) 0%, rgba(223,30,67,1) 0%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(68,194,40,1) 0%, rgba(69,150,20,1) 82%, rgba(40,179,32,1) 100%, rgba(0,212,255,1) 100%)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className, error } = props;

    const icons = {
      1: !error
        ? completed
          ? getCompletedIcon(<ListAltIcon />)
          : getOnLoadStepperIcon(<ListAltIcon />, 1)
        : getErrorIcon(<ListAltIcon />),
      2: !error
        ? completed
          ? getCompletedIcon(<ScheduleIcon />)
          : getOnLoadStepperIcon(<ScheduleIcon />, 2)
        : getErrorIcon(<ScheduleIcon />),
      3: !error
        ? completed
          ? getCompletedIcon(<GroupAddIcon />)
          : getOnLoadStepperIcon(<GroupAddIcon />, 3)
        : getErrorIcon(<GroupAddIcon />),
      4: !error
        ? completed
          ? getCompletedIcon(<AutoGraphOutlinedIcon />)
          : getOnLoadStepperIcon(<AutoGraphOutlinedIcon />, 4)
        : getErrorIcon(<AutoGraphOutlinedIcon />),
      5: !error
        ? completed
          ? getCompletedIcon(<BeenhereIcon />)
          : getOnLoadStepperIcon(<BeenhereIcon />, 5)
        : getErrorIcon(<BeenhereIcon />),
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active, error }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const getCompletedIcon = (Icon) => {
    return (
      <div className="flex flex-col justify-center items-center">
        {Icon}
        <DoneIcon fontSize="small" />
      </div>
    );
  };

  const getOnLoadStepperIcon = (Icon, index) => {
    return (
      <>
        <div className="flex flex-col">
          {Icon}
          <div>{index}</div>
        </div>
      </>
    );
  };
  const getErrorIcon = (Icon) => {
    return (
      <div className="flex flex-col justify-center items-center">
        {Icon}
        <GppMaybeIcon fontSize="small" />
      </div>
    );
  };

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  return (
    <div className="px-4 py-2 bg-white">
      <Typography variant="h6" component="div">
        {props.data.workflow.workflow.alias}
      </Typography>
      <Box sx={{ width: "100%" }} className="py-4">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          nonLinear
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label.id} completed={label.complete}>
              <StepButton color="inherit" onClick={handleStep(index, label)}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  error={label.validationError}
                >
                  <div
                    className={` flex justify-center items-start mx-auto  gap-1 ${
                      label.complete ? "font-semibold" : "font-normal"
                    }`}
                  >
                    <div className={ `  ${index===activeStep?'italic':'normal'}`}>{label.title}</div>
                  </div>
                  
                </StepLabel>
              </StepButton>
            </Step>
          ))}
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
              {activeStep === 0 && <Basic data={props.data} />}
              {activeStep === 1 && <Schedule data={props.data} />}
              {activeStep === 2 && <Participant data={props.data} />}
              {activeStep === 3 && <Fee />}
              {activeStep === 4 && <Final />}

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
                <Button
                  disabled={!steps[activeStep].complete}
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                >
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

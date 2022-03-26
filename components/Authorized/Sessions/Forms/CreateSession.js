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
import {
  formatDate,
  formattedName,
  getReadableFormattedDate,
  getTimezone,
  isEmptyObject,
  isValidURL,
} from "../../../../utils/utility";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { RESPONSE_TYPES } from "../../../../constants/constants";
import { APP } from "../../../../constants/userdata";
import { handleResponse } from "../../../../toastr-response-handler/handler";
import SessionService from "../../../../pages/api/session/SessionService";
import { useRouter } from "next/router";

toast.configure();
function CreateSession(props) {
  const Router = useRouter();
  const checkInteractiveErrors = false;
  const participantFormListener = () => {
    if (activeStep === 2) {
      const isDirty = formdata?.participant?.dirty;
      if (checkInteractiveErrors) {
        const hasInteractiveErrors = !isEmptyObject(
          formdata?.participant?.errors
        );
        if (hasInteractiveErrors && isDirty) {
          console.log("Contains errors-interactive", steps[activeStep].title);
          setTimeout(() => {
            handleInCompleteStep();
          }, 100);
          return;
        }
      }

      if (isDirty) {
        const numberOfParticipants =
          parseInt(formdata?.participant?.numberOfParticipants) || 0;
        if (
          numberOfParticipants <= 0 ||
          numberOfParticipants > 100 ||
          isNaN(numberOfParticipants)
        ) {
          console.log("Contains errors", steps[activeStep].title);
          setTimeout(() => {
            handleInCompleteStep();
          }, 50);
          return;
        }
        console.log("No errors", steps[activeStep].title);
        setTimeout(() => {
          handleComplete();
        }, 100);
      }
    }
  };
  const feeSponsorShipFormListener = () => {
    if (activeStep === 3) {
      const isDirty = formdata?.fees?.dirty || formdata?.sponsor?.dirty;
      if (isDirty) {
        const fees = Number(formdata?.fees?.amount) || 0;
        if (fees <= 0 && formdata?.fees?.paidInd) {
          console.log("Contains errors", steps[activeStep].title);
          setTimeout(() => {
            handleInCompleteStep();
          }, 50);
          return;
        }
        console.log("No errors", steps[activeStep].title);
        setTimeout(() => {
          handleComplete();
        }, 100);
      }
    }
  };
  const scheduleFormListener = () => {
    if (activeStep === 1) {
      const isDirty = formdata?.basic?.dirty;
      if (!formdata?.schedule?.startDate instanceof Date) {
        console.log("Contains errors", steps[activeStep].title);
        handleInCompleteStep();
        return;
      }
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
  const [sessionSubmitted, setSessionSubmitted] = useState(false);
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

  const allStepsCompletedExceptFinalStep = () => {
    const completedSteps = steps.filter((step) => step.complete).length;
    return completedSteps === totalSteps() - 1;
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

  const getFinalStepIndex = () => {
    return steps.findIndex((step) => step.id === 5);
  };
  const handleStep = (index, label) => () => {
    if (allStepsCompletedExceptFinalStep() && !sessionSubmitted) {
      // this is the final step entry
      setActiveStep(index);
      // payload creation for sending to api.
      const plans = formdata?.sponsor?.plans;
      plans.map((plan) => {
        plan.sponsorshipLevel = plan.alias;
        plan.benefits = plan.current.featured.text
          ? plan.current.featured.text
          : plan.defaults.featured.text;
        plan.amount = plan.current.price.text
          ? plan.current.price.text
          : plan.defaults.price.text;
        plan.show = true;
      });
      const payload = {
        startDateStr: formatDate(formdata?.schedule?.startDate),
        timeZone: formdata?.schedule?.timezone
          ? formdata?.schedule?.timezone
          : Intl.DateTimeFormat().resolvedOptions().timeZone.toString(),
        courseToSave: {
          expectedAttendees: formdata?.participant.numberOfParticipants,
          isNewCourse: true,
          notifyPastAttendees:
            formdata?.participant.choiceOfInvitation === null ||
            formdata?.participant.choiceOfInvitation === "0"
              ? true
              : false,
          cohostUser: formdata?.participant?.cohost
            ? {
                userName: formattedName(
                  formdata?.participant?.cohost?.firstName,
                  formdata?.participant?.cohost?.lastName
                ),
                imageURL: formdata?.participant?.cohost?.profilepicName,
                userBaseType: formdata?.participant?.cohost?.userType,
                educationalInstitution: formdata?.participant?.cohost?.eduIns,
                campus: formdata?.participant?.cohost?.campus,
              }
            : null,
          registrationQuestionnaireId: formdata?.participant?.questions,
          sponsorshipRequired: formdata?.sponsor.sponsorShipInd,
          sponsorshipLevels: plans,
          timeZone: formdata?.schedule?.timezone
            ? formdata?.schedule?.timezone
            : Intl.DateTimeFormat().resolvedOptions().timeZone.toString(),
          startTime: formdata?.schedule?.startTime
            ? formdata?.schedule?.startTime
            : {},
          endTime: formdata?.schedule?.endTime
            ? formdata?.schedule?.endTime
            : {},
          user: {},
          categories: [
            {
              courseCategoryName: "",
              categoryFullText: "",
              courseCategoryId: formdata?.basic?.categoryId,
            },
          ],

          currentSchedule: formdata?.schedule?.repeats
            ? {
                repeateEveryCount: formdata?.schedule?.repeatEvery
                  ? Number(formdata?.schedule?.repeatEvery)
                  : 0,
                monthlyRepeatTypeStr:
                  formdata?.schedule?.repeatSchedule?.currentSchedule
                    ?.monthlyRepeatTypeStr,
                endOfMeetingTypeStr:
                  formdata?.schedule?.repeatSchedule?.currentSchedule
                    ?.endOfMeetingTypeStr,
                csoccurence: formdata?.schedule?.occurenceCount?.toString(),
                repeateEveryCounttemp: formdata?.schedule?.repeatEvery
                  ? formdata?.schedule?.repeatEvery.toString()
                  : "0",
                csstartDate: formdata?.schedule.startDate
                  ? getReadableFormattedDate(formdata?.schedule.startDate)
                  : null,
                endOfMeetingTypeInputStr:
                  formdata?.schedule?.repeatSchedule?.currentSchedule
                    ?.endOfMeetingTypeStr,
                monthlyRepeatTypeInputStr:
                  formdata?.schedule?.repeatSchedule?.currentSchedule
                    ?.monthlyRepeatTypeStr,
                repeattype:
                  formdata?.schedule?.repeatSchedule?.currentSchedule
                    ?.repeatTypeStr,
                repeatTypeStr:
                  formdata?.schedule?.repeatSchedule?.currentSchedule
                    ?.repeatTypeStr,
                selectedDaysOfWeektempStr:
                  formdata?.schedule?.repeatSchedule?.currentSchedule
                    ?.selectedDaysOfWeekStr,
                repeatcheckbox: formdata?.schedule.repeats
                  ? formdata?.schedule.repeats
                  : "",
                isScheduleValid:
                  formdata?.schedule?.repeatScheduleFixed !== undefined &&
                  formdata?.schedule?.repeatScheduleFixed !== null
                    ? formdata?.schedule?.repeatScheduleFixed
                    : false,
                occurence: formdata?.schedule?.occurenceCount?.toString(),
                startDate: formdata?.schedule.startDate
                  ? getReadableFormattedDate(formdata?.schedule.startDate)
                  : null,
                endDate: formdata?.schedule?.endDate
                  ? formatDate(formdata?.schedule.endDate)
                  : null,
              }
            : {
                repeateEveryCount: "",
                monthlyRepeatTypeStr: "",
                endOfMeetingTypeStr: "Occurence",
                csoccurence: "",
                repeateEveryCounttemp: "",
                csstartDate: "",
                endOfMeetingTypeInputStr: "Occurence",
                monthlyRepeatTypeInputStr: "DayOfMonth",
                repeattype: "None",
                repeatTypeStr: "None",
                selectedDaysOfWeektempStr: [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ],
                repeatcheckbox: "",
              },
          EndDate: formdata?.schedule?.endDate
            ? formdata?.schedule?.endDate.toISOString()
            : new Date().toISOString(),
          StartDate: formdata?.schedule?.startDate
            ? formdata?.schedule?.startDate.toISOString()
            : new Date().toISOString(),
          courseSummary: formdata?.basic?.summary?.html,
          courseType:
            formdata?.participant?.visibility == null ||
            formdata?.participant?.visibility
              ? "Public"
              : "Private",
          courseFullName: formdata?.basic?.name,
          courseShortName: formdata?.basic?.shortName,
          docCheckbox:
            formdata?.basic?.binary?.documents?.consent !== undefined &&
            formdata?.basic?.binary?.documents?.consent !== null
              ? formdata?.basic?.binary?.documents?.consent
              : false,
          isEndDateCalculatedFromSchedule: formdata?.schedule?.repeats
            ? true
            : false,
          url: formdata?.basic?.url,
          imageURL:
            formdata?.basic?.binary?.images?.poster &&
            formdata?.basic?.binary?.images?.poster.indexOf("blob:") === -1
              ? formdata?.basic?.binary?.images?.poster
              : null,
          cost: Number(formdata?.fees.amount),
          fee: formdata?.fees?.paidInd ? "Paid" : "Free",
          sessionCoHostData: {
            sessionCoHostId: formdata?.participant?.cohost
              ? formdata?.participant?.cohost?.userDetailsId
              : null,
          },
          tc: true,
          courseStartDateStr: formatDate(formdata?.schedule?.startDate),
          displayStartDateOnly: getReadableFormattedDate(
            formdata?.schedule?.startDate
          ),
          displayStopDateOnly: getReadableFormattedDate(
            formdata?.schedule?.endDate
          ),
          displayStartDate: formatDate(formdata?.schedule?.startDate),
          displayStopDate: formatDate(formdata?.schedule?.endDate),
          courseEndDateStr: formatDate(formdata?.schedule?.endDate),
          courseStatus: "Submitted",
        },
      };
      let hasErrors = false;
      SessionService.isSessionCreationAllowed(payload)
        .then((res) => {
          if (res.data.allowed) {
            if (!payload.courseToSave.imageURL) {
              // call fileupload
              const image = formdata?.basic?.binary?.images?.data?.binary;
              const formData = new FormData();
              formData.append("file", image);
              if (image && typeof image === "object") {
                // call image upload
                SessionService.uploadImage(formData)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    hasErrors = true;
                  });
              }
            }
            const document = formdata?.basic?.binary?.documents?.data?.binary;

            if (document && typeof document === "object") {
              // call doc upload
              const docFormData = new FormData();
              docFormData.append("file", document);
              SessionService.uploadDoc(docFormData)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  hasErrors = true;
                });
            }
          } else {
            hasErrors = true;
          }
        })
        .catch((err) => {
          hasErrors = true;
        });
      if (hasErrors) {
        setSessionSubmitted(false);
        handleInCompleteStep();
        const _user = props.data.user.data.firstName;
        const err = APP.MESSAGES.ERRORS.FINAL_STEP_COMPLETION_FAILED.replace(
          "<user>",
          _user
        );
        handleResponse(err, RESPONSE_TYPES.ERROR, toast.POSITION.TOP_CENTER);
        return;
      }
      if (!hasErrors) {
        setSessionSubmitted(true);
        handleComplete();
      }
    } else {
      if (allStepsCompletedExceptFinalStep()) {
        const finalStepIdx = getFinalStepIndex();
        if (sessionSubmitted && index === finalStepIdx) {
          setActiveStep(index);
          return;
        }
        navigateToStep(label, index);
        return;
      }
      navigateToStep(label, index);
    }
  };
  const navigateToStep = (label, index) => {
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
    participantFormListener();
    feeSponsorShipFormListener();
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
                    <div
                      className={`  ${
                        index === activeStep ? "italic" : "normal"
                      }`}
                    >
                      {label.title}
                    </div>
                  </div>
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          <React.Fragment>
            {activeStep === 0 && <Basic data={props.data} />}
            {activeStep === 1 && <Schedule data={props.data} />}
            {activeStep === 2 && <Participant data={props.data} />}
            {activeStep === 3 && <Fee data={props.data} />}
            {activeStep === 4 && <Final allStepsCompletedExceptFinalStep={allStepsCompletedExceptFinalStep()} data={props.data} />}

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
              <Button
                  disabled={!allStepsCompletedExceptFinalStep()}
                  sx={{ mr: 1 }}
                >
                  Submit
                </Button>
            
            </Box>
          </React.Fragment>
        </div>
      </Box>
    </div>
  );
}

export default CreateSession;

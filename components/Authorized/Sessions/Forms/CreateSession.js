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
import Slide from "@mui/material/Slide";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  formatDate,
  formattedName,
  getReadableFormattedDate,
  isEmptyObject,
  isValidURL,
  _delay,
} from "../../../../utils/utility";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { RESPONSE_TYPES } from "../../../../constants/constants";
import { APP, SESSION, TOOLTIPS } from "../../../../constants/userdata";
import { handleResponse } from "../../../../toastr-response-handler/handler";
import SessionService from "../../../../pages/api/session/SessionService";
import { useRouter } from "next/router";
import { actionTypes } from "../../../../context/reducer";
import QuestionairreService from "../../../../pages/api/session/QuestionairreService";
import ConfirmDialog from "../../../shared/modals/ConfirmDialog";
import Overlay from "../../../shared/Overlay";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { SESSION_ERROR } from "../../../../constants/error-messages";
import { useToggle } from "react-use";
import { useLeavePageConfirm } from "../../../../hooks/useLeave";
import Shimmer from "./Shimmer.js/Shimmer";
toast.configure();
function CreateSession(props) {
  const Router = useRouter();
  const checkInteractiveErrors = false;
  const [shimmer, setShimmer] = useState(true);
  const [imgUpload, setImgUpload] = useState(null);
  const [docUpload, setDocUpload] = useState(null);
  const [dirty, toggleDirty] = useToggle(false);
  useLeavePageConfirm(dirty);
  const participantFormListener = () => {
    if (activeStep === 2) {
      const isDirty = formdata?.participant?.dirty;
      if (isDirty) {
        setSessionSubmitted(false);
      }
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
          !numberOfParticipants ||
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
        setSessionSubmitted(false);
      }
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
      const isDirty = formdata?.schedule?.dirty;
      if (isDirty) {
        setSessionSubmitted(false);
      }
      if (!formdata?.schedule?.startDate instanceof Date) {
        console.log("Contains errors", steps[activeStep].title);
        handleInCompleteStep();
        return;
      }
      if (formdata?.schedule?.repeats && !formdata?.schedule?.repeatObject) {
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
      if (isDirty) {
        setSessionSubmitted(false);
      }
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
  const [confirmSessionDialogOpened, setConfirmSessionDialogOpened] =
    useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [processing, setProcessing] = React.useState(false);
  const [formdata, dispatch] = useDataLayerContextValue();
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
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
    if (hasErrors()) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getFinalStepIndex = () => {
    return steps.findIndex((step) => step.id === 5);
  };

  const getInitialPayload = (plans) => {
    return {
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
        endTime: formdata?.schedule?.endTime ? formdata?.schedule?.endTime : {},
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
            ? WORKFLOW_CODES.USER.SESSION.VISIBILITY.PUBLIC
            : WORKFLOW_CODES.USER.SESSION.VISIBILITY.PRIVATE,
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
        fee: formdata?.fees?.paidInd
          ? WORKFLOW_CODES.USER.SESSION.FEE.PAID
          : WORKFLOW_CODES.USER.SESSION.FEE.FREE,
        sessionCoHostData: {
          sessionCoHostId: formdata?.participant?.cohost
            ? formdata?.participant?.cohost?.userDetailsId
            : null,
        },
        tc: true, // true by default
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
        courseStatus: WORKFLOW_CODES.USER.SESSION.SUBMITTED,
      },
    };
  };
  const handleStep = (index, label) => () => {
    if (hasErrors) return;
    if (allStepsCompletedExceptFinalStep() && !sessionSubmitted) {
      // this is the final step entry
      setActiveStep(index);
      setShowCompletionMessage(true);
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
      const payload = getInitialPayload(plans);

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
                    setImgUpload(res);
                  })
                  .catch(() => {
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
                  setDocUpload(res);
                })
                .catch(() => {
                  hasErrors = true;
                });
            }
            const questionairreIdentifier = Number(
              formdata?.participant?.questions
            );
            if (
              formdata?.participant?.questions &&
              questionairreIdentifier > 0
            ) {
              QuestionairreService.getQuestionairre(
                questionairreIdentifier
              ).then((res) => {
                APP.SESSION.DTO.PARTICIPANTS.questionairre = res.data;
                dispatch({
                  type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
                  participant: APP.SESSION.DTO.PARTICIPANTS,
                });
              });
            }
          } else {
            setHasErrors(true);
          }
        })
        .catch((err) => {
          console.log(err);
          handleError(
            APP.MESSAGES.ERRORS.FINAL_STEP_COMPLETION_FAILED,
            true,
            true
          );
          return;
        });

      if (!hasErrors) {
        undirtyDTO();
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
  const handleError = (msg, showToast, setStates) => {
    if (setStates) {
      setHasErrors(true);
      setSessionSubmitted(true);
      setActiveStep(4); // final step
      handleInCompleteStep();
    }

    if (showToast) {
      const _user = props.data.user.data.firstName;
      const _err = msg.replace("<user>", _user);
      handleResponse(_err, RESPONSE_TYPES.ERROR, toast.POSITION.TOP_CENTER);
    }
  };
  const undirtyDTO = () => {
    const basic = formdata?.basic;
    basic.dirty = false;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: basic,
    });
    const participant = formdata?.participant;
    participant.dirty = false;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: participant,
    });
    const fees = formdata?.fees;
    fees.dirty = false;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.FEES,
      fees: fees,
    });

    const sponsor = formdata?.sponsor;
    sponsor.dirty = false;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
      sponsor: sponsor,
    });

    const schedule = formdata?.schedule;
    schedule.dirty = false;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: schedule,
    });
  };
  const navigateToStep = (label, index) => {
    const step_id = [1, 2, 3, 4];
    if (step_id.includes(label.id)) {
      setActiveStep(index);
    } else {
      handleError(APP.MESSAGES.ERRORS.FINAL_STEP_VISIT_DENIED, true, false);
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
    toggleDirty(true);
    basicFormListener();
    scheduleFormListener();
    participantFormListener();
    feeSponsorShipFormListener();
  }, [formdata]);

  useEffect(() => {
      setHasErrors(false);
      toggleDirty(false);
       _delay(2000).then(()=>{
         setShimmer(false)
       })
  }, []);


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

  const openConfirmSessionSubmitDialog = () => {
    scrollDivToTop("create-session");
    setConfirmSessionDialogOpened(true);
  };
  const closeConfirmSessionSubmitDialog = () => {
    setConfirmSessionDialogOpened(false);
  };
  const getPlans = () => {
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
    return plans;
  };
  const getTimezone = () => {
    return formdata?.schedule?.timezone
      ? formdata?.schedule?.timezone
      : Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
  };
  const getImageURL = (finalSubmit) => {
    if (finalSubmit) {
      return imgUpload
        ? imgUpload?.data
        : formdata?.basic?.binary?.images?.poster;
    }
    return formdata?.basic?.binary?.images?.poster &&
      formdata?.basic?.binary?.images?.poster.indexOf("blob:") === -1
      ? formdata?.basic?.binary?.images?.poster
      : finalSubmit
      ? uploads.image
      : null;
  };
  const handleSessionSubmit = (obj) => {
    setTimeout(() => {
      scrollDivToTop();
    }, 100);
    if (obj.close) {
      closeConfirmSessionSubmitDialog();
      return;
    }
    // submit session.
    setProcessing(true);
    setTimeout(() => {
      if (obj.confirm) {
        setShowCompletionMessage(false);
      }
    }, 100);
    closeConfirmSessionSubmitDialog();

    const sponsorshipLevels = getPlans();
    const user = props.data.user.data;
    const categories = [
      {
        courseCategoryName: "",
        categoryFullText: "",
        courseCategoryId: formdata?.basic?.categoryId,
      },
    ];
    const currentSchedule = formdata?.schedule?.repeats
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
            formdata?.schedule?.repeatSchedule?.currentSchedule?.repeatTypeStr,
          repeatTypeStr:
            formdata?.schedule?.repeatSchedule?.currentSchedule?.repeatTypeStr,
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
        };
    const cohost = formdata?.participant?.cohost
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
      : null;

    const finalPayload = {
      expectedAttendees: formdata?.participant.numberOfParticipants,
      isNewCourse: true,
      notifyPastAttendees:
        formdata?.participant.choiceOfInvitation === null ||
        formdata?.participant.choiceOfInvitation === "0"
          ? true
          : false,
      cohostUser: cohost,
      sessionCoHostData: {
        sessionCoHostId: formdata?.participant?.cohost
          ? formdata?.participant?.cohost?.userDetailsId
          : null,
      },
      registrationQuestionnaireId: formdata?.participant?.questions,
      sponsorshipRequired: formdata?.sponsor.sponsorShipInd,
      sponsorshipLevels: sponsorshipLevels,
      timeZone: getTimezone(),
      startTime: formdata?.schedule?.startTime
        ? formdata?.schedule?.startTime
        : {},
      endTime: formdata?.schedule?.endTime ? formdata?.schedule?.endTime : {},
      user: user,
      categories: categories,
      currentSchedule: currentSchedule,
      StartDate: formdata?.schedule?.startDate
        ? formdata?.schedule?.startDate.toISOString()
        : new Date().toISOString(),
      courseSummary: formdata?.basic?.summary?.html,
      courseType:
        formdata?.participant?.visibility == null ||
        formdata?.participant?.visibility
          ? WORKFLOW_CODES.USER.SESSION.VISIBILITY.PUBLIC
          : WORKFLOW_CODES.USER.SESSION.VISIBILITY.PRIVATE,
      courseFullName: formdata?.basic?.name,
      courseShortName: formdata?.basic?.shortName,
      url: formdata?.basic?.url,
      similarCourseId: formdata?.basic?.pastSessionId
        ? formdata?.basic?.pastSessionId
        : null,
      cost: Number(formdata?.fees.amount),
      imageURL: getImageURL(true),
      slideDeckFileName:formdata?.basic?.binary.documents.consent? formdata?.basic?.binary?.documents?.data?.binary?.name:null,
      slideDeckFileNameOriginal: formdata?.basic?.binary.documents.consent?formdata?.basic?.binary?.documents?.data?.binary?.name:null,
      fee: formdata?.fees?.paidInd
        ? WORKFLOW_CODES.USER.SESSION.FEE.PAID
        : WORKFLOW_CODES.USER.SESSION.FEE.FREE,
      tc: true, // true by default
      EndDate: formdata?.schedule?.endDate
        ? formdata?.schedule?.endDate.toISOString()
        : new Date().toISOString(),
      displayStartDateOnly: getReadableFormattedDate(
        formdata?.schedule?.startDate
      ),
      displayStopDateOnly: getReadableFormattedDate(
        formdata?.schedule?.endDate
      ),
      displayStartDate: formatDate(formdata?.schedule?.startDate),
      displayStopDate: formatDate(formdata?.schedule?.endDate),
      courseStartDateStr: formatDate(formdata?.schedule?.startDate),
      courseEndDateStr: formatDate(formdata?.schedule?.endDate),
      courseStatus: WORKFLOW_CODES.USER.SESSION.SUBMITTED,
      courseCreateTime: null,
      courseLastUpdateTime: null,
      courseDuration: 0, // 0 by default
      courseStartDTime: null,
      courseEndDTime: null,
      courseEventDesc: null,
      approvedByUser: null,
      countryForTimeZone: null,
      numberOfAttendees: 0,
      meetingUrl: null,
      createdByUserName: null,
      profilePicName: null,
      severity: WORKFLOW_CODES.USER.SESSION.SEVERITY.GREEN,
      creator: null,
      courseCreatorImageURL: user.profilePicName,
      webexMeetingKey: "",
      webexGuestToken: "",
      webexHostMeetingRequest: null,
      webexAttendeeMeetingRequest: null,
      webexHostUrl: null,
      webexAttendeeUrl: null,
      webexPassword: null,
      userType: null,
      courseAttendeeStatus: null,
      review: null,
      reviewCount: 0,
      avgReview: 0,
      avgReviewIntValue: 0,
      reviewComment: null,
      courseInfos: null,
      active: false,
      owner: true,
      userLoggedIn: true,
      userRegistered: false,
      users: [],
      createdByUser: user.userDetailsId,
      displayStartDateOnlyConverted: getReadableFormattedDate(
        formdata?.schedule?.startDate
      ),
      timeZoneConverted: getTimezone(),
      displayStopDateOnlyConverted: getReadableFormattedDate(
        formdata?.schedule?.endDate
      ),
      startTimeConverted: formdata?.schedule?.startTime
        ? formdata?.schedule?.startTime.display
        : {},
      endTimeConverted: formdata?.schedule?.endTime
        ? formdata?.schedule?.endTime.display
        : {},
    };
    SessionService.create(finalPayload)
      .then((res) => {
        // redirect to my sessions page
        // redirect to home dashboard(as of now), until session page is created.
        setTimeout(() => {
          if (res.data.success) {
            toggleDirty(false);
            setHasErrors(false);
            const _user = props.data.user.data.firstName;
            const msg = SESSION.CREATED.replace("<user>", _user);
            handleResponse(
              msg,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
            Router.push(AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD);
          } else {
            const _err = SESSION_ERROR.SESSION.CREATE;
            setErrorMessage(_err);
            handleError(_err, true, true);
            setHasErrors(true);
            setProcessing(false);
          }
        }, 100);
      })
      .catch(() => {
        const _err = SESSION_ERROR.SESSION.CREATE;
        setErrorMessage(_err);
        handleError(_err, true, true);
        setHasErrors(true);
        setProcessing(false);
      });
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
  const scrollDivToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleNavigate = (navigationObject) => {
    let label = null;
    const _steps = steps.filter((step, index) => index === navigationObject);
    if (_steps.length === 1) {
      label = _steps[0];
      navigateToStep(label, navigationObject);
    }
  };

  return (
    <div id="create-session" className="px-4 py-2 bg-white">
      <Typography variant="h6" component="div">
        {props.data.workflow.workflow.alias}
      </Typography>
      <Shimmer visible={shimmer}/>
      {!shimmer && (
      <>
        <Slide direction="up" in={true}>
        <Box sx={{ width: "100%" }} className="py-4">
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            nonLinear
            connector={<QontoConnector />}
          >
            {steps.map((label, index) => (
              <Step
                className={hasErrors ? "opacity-40" : ""}
                key={label.id}
                completed={label.complete}
              >
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
              {activeStep === 4 && (
                <Final
                  showCompletionMessage={showCompletionMessage}
                  onNavigate={handleNavigate}
                  allStepsCompletedExceptFinalStep={allStepsCompletedExceptFinalStep()}
                  hasErrors={hasErrors}
                  errorMessage={errorMessage}
                  data={props.data}
                />
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2, pb: 6 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0 || hasErrors}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  disabled={
                    !steps[activeStep].complete ||
                    (activeStep === 3 && !allStepsCompletedExceptFinalStep())
                  }
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                >
                  Next
                </Button>
                <Button
                  disabled={!allStepsCompletedExceptFinalStep() || hasErrors}
                  sx={{ mr: 1 }}
                  onClick={openConfirmSessionSubmitDialog}
                >
                  Submit
                </Button>
              </Box>
            </React.Fragment>
          </div>
        </Box>
      </Slide>
      <ConfirmDialog
        actionButtonProps={{ YES: "Yes", NO: "Not now" }}
        dialogCloseRequest={handleSessionSubmit}
        isOpen={confirmSessionDialogOpened}
        theme="dark"
        confirmMessage={TOOLTIPS.SESSION_SUBMIT_CONFIRMATION}
      />
      <Overlay
        icon={<RocketLaunchIcon />}
        message={TOOLTIPS.CREATING_SESSION}
        open={processing}
      />
      </>)}
      
    </div>
  );
}

export default CreateSession;

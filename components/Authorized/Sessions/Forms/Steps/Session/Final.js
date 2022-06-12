import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TokenIcon from "@mui/icons-material/Token";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import parse from "html-react-parser";
import FormHelperText from "@mui/material/FormHelperText";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import Profile from "../../../../Network/People/Dashboard/Profile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {
  download,
  getFileExtension,
  getRandomArrayElement,
  getTimezone,
  HTMLUnderlineByCharacterIndex,
  parseMarkdownToHTML,
} from "../../../../../../utils/utility";
import VideocamIcon from "@mui/icons-material/Videocam";
import ReactPlayer from "react-player";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import PublicIcon from "@mui/icons-material/Public";
import SnapProfile from "../../../../Network/People/Listing/Snap/Profile";
import SessionStyle from "../../../../../../styles/Session.module.css";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  APP,
  IMAGE_PATHS,
  PLACEHOLDERS,
  SESSION_DOCUMENT,
  SPONSORSHIP,
  TOOLTIPS,
  VALIDATING_REQUEST,
} from "../../../../../../constants/userdata";
import Plans from "../../../../Sponsorships/Plans";
import EditIcon from "@mui/icons-material/Edit";
import {
  USER_CONFIDENCE_IMAGES_ON_WORKFLOW_COMPLETION,
  USER_CONFIDENCE_KEYWORDS_ON_WORKFLOW_COMPLETION,
} from "../../../../../../constants/constants";
import ReplayIcon from "@mui/icons-material/Replay";
import StartIcon from "@mui/icons-material/Start";
import TimezoneBrowseDialog from "../../../../../shared/modals/TimezoneBrowseDialog";
import { actionTypes } from "../../../../../../context/reducer";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import moment from "moment-timezone";
import WarningIcon from "@mui/icons-material/Warning";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { CUSTOM_QUESTION_OPTS } from "../../../../../../constants/questionairre";
function Final(props) {
  const [data, dispatch] = useDataLayerContextValue();

  const [timezoneBrowserOpened, setTimezoneBrowser] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState(null);
  const getIconPerFileExtension = (ext) => {
    const icons = SESSION_DOCUMENT.icons;
    switch (ext) {
      case "docx":
      case "doc":
        return icons.DOCX;
      case "txt":
        return icons.TXT;
      case "pdf":
        return icons.PDF;
      case "zip":
        return icons.ZIP;
      case "jpg":
      case "png":
      case "webp":
      case "gif":
        return icons.IMG;
      default:
        return icons.TXT;
    }
  };
  const generateMonetizationAmountOnCard = (data) => {
    const amount = Number(data?.amount);
    const isPaid = data?.paidInd;

    if (!isPaid || !amount || amount == 0 || isNaN(amount)) {
      return (
        <Tooltip title={`${TOOLTIPS.FREE_SESSION} | Click to change`}>
          <div
            onClick={() => {
              props.onNavigate ? props.onNavigate(3) : null;
            }}
            className={`${SessionStyle.session__card__costing} mt-2 cursor-pointer`}
          >
            {PLACEHOLDERS.FREE}
          </div>
        </Tooltip>
      );
    }
    return (
      <div
        onClick={() => {
          props.onNavigate ? props.onNavigate(3) : null;
        }}
      >
        <Tooltip title={`${TOOLTIPS.PAID_SESSION} | Click to change`}>
          <div
            className={`${SessionStyle.session__card__costing} ${SessionStyle.session__card__currency__amount} cursor-pointer`}
          >
            <MonetizationOnIcon />
            <span className={`${SessionStyle.session__card__currency__amount}`}>
              {amount}
            </span>
          </div>
        </Tooltip>
      </div>
    );
  };
  const getErrorMessage = () => {
    let msg = APP.MESSAGES.ERRORS.FINAL_STEP_COMPLETION_FAILED;
    if (props.errorMessage) msg = props.errorMessage;
    const _user = props.data.user.data.firstName;
    const _err = msg.replace("<user>", _user);
    return _err;
  };
  const getCompletionMessage = () => {
    const randomString = getRandomArrayElement(
      USER_CONFIDENCE_KEYWORDS_ON_WORKFLOW_COMPLETION
    );
    const _user = props?.data?.user?.data?.firstName;
    const message = APP.MESSAGES.INFO.FINAL_STEP_COMPLETED.replace(
      "<user>",
      _user
    );
    return randomString + message;
  };

  const getCompletionImage = () => {
    const randomString = getRandomArrayElement(
      USER_CONFIDENCE_IMAGES_ON_WORKFLOW_COMPLETION
    );

    return `/static/images/${randomString}`;
  };

  const getStartDate = () => {
    return data?.schedule?.startDate.getDate();
  };
  const getEndDate = () => {
    return data?.schedule?.endDate.getDate();
  };

  const getEndYear = () => {
    return data?.schedule?.endDate.getFullYear();
  };

  const getStartYear = () => {
    return data?.schedule?.startDate.getFullYear();
  };
  const getStartMonth = () => {
    const date = data?.schedule?.startDate;
    const month = date?.toLocaleString("default", { month: "short" });
    return month;
  };
  const getEndMonth = () => {
    const date = data?.schedule?.endDate;
    const month = date?.toLocaleString("default", { month: "short" });
    return month;
  };
  const getTime = (obj) => {
    let startDisplay, endDisplay;
    if (!obj) {
      startDisplay = data?.schedule.startTime.display;
      endDisplay = data?.schedule.endTime.display;
      startDisplay = startDisplay.replace(/^0+/, "");
      endDisplay = endDisplay.replace(/^0+/, "");
    } else {
      startDisplay = obj.startTime;
      endDisplay = obj.endTime;
    }

    return `${startDisplay} - ${endDisplay}`;
  };
  const getEffectiveDate = () => {
    let startMonth = getStartMonth();
    let startYear = getStartYear();
    let startDate = getStartDate();
    let endDate = getEndDate();
    let endMonth = getEndMonth();
    let endYear = getEndYear();
    const effectiveDate =
      startDate === endDate
        ? `${startMonth} ${startDate},${startYear}`
        : `${startMonth} ${startDate},${startYear} - ${endMonth} ${endDate},${endYear}`;
    return effectiveDate;
  };
  const getScheduleText = () => {
    if (data?.schedule?.repeats) {
      return data?.schedule?.repeatObject?.displayValue;
    }
    return "Once";
  };
  const handleTimezoneBrowserChange = () => {
    setTimezoneBrowser(true);
  };
  const handleTimezoneCloseRequest = (obj) => {
    setTimezoneBrowser(false);
    if (obj?.timezone) {
      setNewTimezone(obj);
      setDynamicTimeDisplay(obj);
    }
  };
  const setDynamicTimeDisplay = (obj) => {
    const defaultTimezone = getTimezone();
    if (
      data?.schedule &&
      data?.schedule?.timezone !== defaultTimezone &&
      obj?.timezone !== defaultTimezone
    ) {
      const start = moment(data?.schedule?.startDate);
      const end = moment(data?.schedule?.endDate);
      const startTime = start.tz(obj?.timezone).format("HH:mm");
      const endTime = end.tz(obj?.timezone).format("HH:mm");
      const _obj = { startTime, endTime };
      setTimeDisplay(_obj);
      return;
    }
    // for default time zone.
    resetDefaultTimeDisplay();
  };
  const resetDefaultTimeDisplay = () => {
    const defaultTimezone = getTimezone();
    const start = moment(data?.schedule?.startDate);
    const end = moment(data?.schedule?.endDate);
    const startTime = start.tz(defaultTimezone).format("HH:mm");
    const endTime = end.tz(defaultTimezone).format("HH:mm");
    const _obj = { startTime, endTime };
    setTimeDisplay(_obj);
  };
  const setNewTimezone = (obj) => {
    APP.SESSION.DTO.SCHEDULE.dirty = true;
    APP.SESSION.DTO.SCHEDULE.timezone = obj.timezone;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  };
  const resetTimezoneToDefault = () => {
    setNewTimezone({ timezone: getTimezone() });
    resetDefaultTimeDisplay();
  };

  useEffect(() => {
    if (!props.hasErrors) {
      const obj = { timezone: data?.schedule?.timezone || getTimezone() };
      setDynamicTimeDisplay(obj);
    }
    setShowCompletionMessage(props.showCompletionMessage);
  }, []);

  useEffect(() => {
    setShowCompletionMessage(props.showCompletionMessage);
  }, [props.showCompletionMessage]);

  const sendRetryRequest = () => {
    if (props.onRetry) {
      props.onRetry(0);
    }
  };
  return (
    <Slide direction="left" in={true}>
      <div className={`p-4 min-h-screen`}>
        {props.hasErrors ? (
          <>
            <div className="mb-2 flex gap-1 text-sm text-md justify-center items-center text-gray-600 font-normal">
              <WarningIcon className="mt-1" />
              <Typography className=" mt-1" variant="div">
                {getErrorMessage()}
              </Typography>
            </div>

            <img
              alt="something-went-wrong-illustration"
              src="/static/images/something-wrong-illustration-1.webp"
              className="  w-full h-60 object-contain"
            />
            <div className=" flex justify-center items-center mt-5">
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => {
                    sendRetryRequest();
                  }}
                  variant="outlined"
                  startIcon={<ReplayIcon />}
                >
                  Retry
                </Button>
                <Button
                  onClick={() => {
                    location.reload();
                  }}
                  variant="contained"
                  endIcon={<StartIcon />}
                >
                  Restart
                </Button>
              </Stack>
            </div>
          </>
        ) : !props.preRequisiteSessionAPIComplete?(<>
        

         <div className="mb-2 flex gap-1 text-md text-gray-600 font-semibold">
         <CircularProgress className="text-sm -mt-1.5" color="inherit" />
                  <Typography className=" " variant="div">
                     {VALIDATING_REQUEST}
                  </Typography>
                </div>
        
        </>): (
          <>
            {showCompletionMessage && (
              <>
                <div className="mb-2 flex gap-1 text-md text-blue-500 font-semibold">
                  <TokenIcon className="mt-1" />
                  <Typography className=" " variant="div">
                    {getCompletionMessage()}
                  </Typography>
                </div>
                <Divider className=" text-gray-500"></Divider>
              </>
            )}

            <Box sx={{ width: "100%", mt: 1 }}>
              <div className="flex gap-1 ">
                <div className="flex flex-col mt-1">
                  <div className="lg:text-xl text-lg font-medium">
                    {getStartDate()}
                  </div>
                  <div className="lg:text-lg text-sm  text-gray-600">
                    {getStartMonth()}
                  </div>
                </div>
                <div className="flex gap-1 lg:w-1/2 w-11/12">
                  <Typography
                    variant="h6"
                    className=" line-clamp-1  mt-1 text-gray-800"
                  >
                    {data?.basic?.name}
                  </Typography>
                  <div
                    className="ml-auto flex mt-2.5 text-blue-600
                              app__anchor__block cursor-pointer"
                  >
                    <Tooltip title="Change">
                      <EditIcon
                        onClick={() => {
                          props.onNavigate ? props.onNavigate(0) : null;
                        }}
                        fontSize="small"
                        className=" leading-3 font-semibold  text-sm"
                      />
                    </Tooltip>
                  </div>
                </div>

                <div className={`ml-auto`}>
                  {generateMonetizationAmountOnCard(data?.fees)}
                </div>
              </div>

              <Grid
                className="py-2"
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item lg={6} sm={12} md={6} xs={12}>
                  <div className="flex flex-col py-1">
                    <img
                      className=" relative block overflow-hidden  xl:h-48 lg:h-48  object-contain xl:object-cover lg:object-cover bg-gray-100 bg-center  rounded mb-2 "
                      src={
                        data?.basic?.binary?.images?.poster
                          ? data?.basic?.binary?.images?.poster
                          : IMAGE_PATHS.NO_DATA.EVENT_POSTER
                      }
                    />
                    <div className="flex ">
                      <Profile
                        oid={props?.data?.user?.data?.userDetailsId}
                        options={{ connect: false, mixedMode: true }}
                        firstName={props?.data?.user?.data?.firstName}
                        lastName={props?.data?.user?.data?.lastName}
                        avatar={props?.data?.user?.data?.profilePicName}
                        userType={props?.data?.user?.data?.userType}
                        instituition={
                          props?.data?.user?.data?.educationalInstitute
                        }
                        metaData={props?.data?.user?.data}
                        userdata={props?.data?.user?.data}
                      />
                    </div>

                    {data?.basic?.summary?.html && (
                      <div>
                        <Typography
                          variant="div"
                          className="  font-normal line-clamp-3 text-sm mb-3  leading-snug text-black-600"
                        >
                          {parseMarkdownToHTML(data?.basic?.summary?.html)}
                         
                        </Typography>
                      </div>
                    )}

                    <Divider></Divider>
                    {data?.participant?.cohost && (
                      <div
                        className={` flex flex-col   gap-2     border-0 p-2  shadow-sm bg-repeat-round rounded-lg  `}
                      >
                        <div className="text-md flex gap-2">
                          <CoPresentIcon className=" leading-3 font-semibold  text-xl text-gray-600" />{" "}
                          <span className="text-md leading-tight font-semibold text-gray-600">
                            Co-host
                          </span>
                          <div
                            className="flex text-blue-600
              ml-auto app__anchor__block cursor-pointer"
                          >
                            <Tooltip title="Change">
                              <EditIcon
                                onClick={() => {
                                  props.onNavigate ? props.onNavigate(2) : null;
                                }}
                                fontSize="small"
                                className=" leading-3 font-semibold  text-sm"
                              />
                            </Tooltip>
                          </div>
                        </div>
                        <div className="flex">
                          <SnapProfile
                            firstName={data?.participant?.cohost?.firstName}
                            lastName={data?.participant?.cohost?.lastName}
                            avatar={data?.participant?.cohost?.profilepicName}
                            oid={data?.participant?.cohost?.userDetailsId}
                            userType={data?.participant?.cohost?.userType}
                            instituition={data?.participant?.cohost?.eduIns}
                          />
                        </div>
                      </div>
                    )}

                    {data?.sponsor?.sponsorShipInd && (
                      <div className="flex flex-col gap-2 py-3">
                        <div className="flex gap-1">
                          <AutoAwesomeOutlinedIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                          <Typography
                            variant="div"
                            className=" mb-1 font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                          >
                            Sponsorship Levels:
                          </Typography>

                          <div
                            className="flex mr-2 text-blue-600
         ml-auto app__anchor__block cursor-pointer"
                          >
                            <Tooltip title="Change">
                              <EditIcon
                                onClick={() => {
                                  props.onNavigate ? props.onNavigate(3) : null;
                                }}
                                fontSize="small"
                                className=" leading-3 font-semibold  text-sm"
                              />
                            </Tooltip>
                          </div>
                        </div>

                        <div className="flex gap-2  lg:ml-0 md:ml-0">
                          {SPONSORSHIP?.LEVELS?.map((level) => (
                            <Plans
                              showOnlyHeader={true}
                              key={level.id}
                              data={level}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex ml-1 gap-1 mt-2">
                      <InfoIcon className="text-gray-600" fontSize="small" />
                      <Typography
                        variant="div"
                        className=" line-clamp-1 leading-tight text-sm text-gray-600"
                        sx={{ mt: 0 }}
                      >
                        {APP.MESSAGES.INFO.FINAL_STEP_EDITS_HELP_TEXT}
                      </Typography>
                    </div>
                  </div>
                </Grid>

                <Grid item lg={6} sm={12} md={6} xs={12}>
                  <div className="flex flex-col gap-2 bg-gray-100 px-2 p-2 rounded-lg border-1 shadow-sm bg-repeat-round">
                    <div className="flex gap-1">
                      <ScheduleIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                      <Typography
                        variant="div"
                        className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                      >
                        Schedule:
                      </Typography>
                      <Typography
                        variant="div"
                        className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800"
                      >
                        {getScheduleText()}
                      </Typography>

                      <div
                        className="flex mr-2 text-blue-600
           ml-auto app__anchor__block cursor-pointer"
                      >
                        <Tooltip title="Change">
                          <EditIcon
                            onClick={() => {
                              props.onNavigate ? props.onNavigate(1) : null;
                            }}
                            fontSize="small"
                            className=" leading-3 font-semibold  text-sm"
                          />
                        </Tooltip>
                      </div>
                    </div>
                    <div>
                      {!data?.schedule?.repeats && (
                        <div className="flex gap-1">
                          <DateRangeIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                          <Typography
                            variant="div"
                            className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                          >
                            Effective:
                          </Typography>

                          <Typography
                            variant="div"
                            className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800"
                          >
                            {getEffectiveDate()}
                          </Typography>
                        </div>
                      )}

                      {data?.schedule?.repeats &&
                        data?.schedule?.repeatScheduleSummary && (
                          <div className="flex gap-1 ">
                            <EventRepeatIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                            <Typography
                              variant="div"
                              className="  font-semibold  text-md  leading-tight w-20 text-gray-600"
                            >
                              Occurence:
                            </Typography>

                            <Typography
                              variant="div"
                              className=" text-sm font-normal line-clamp-2 italic  leading-snug  text-gray-800"
                            >
                              {data?.schedule?.repeatScheduleSummary.substring(
                                0,
                                data?.schedule?.repeatScheduleSummary.indexOf(
                                  "from"
                                ) - 1
                              )}
                              .
                            </Typography>
                          </div>
                        )}
                    </div>
                    <div className="flex gap-1">
                      <PublicIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                      <Typography
                        variant="div"
                        className="  font-semibold line-clamp-1 text-sm  leading-snug text-gray-600"
                      >
                        Time:
                      </Typography>

                      <Typography
                        variant="div"
                        className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-800"
                      >
                        {getTime(timeDisplay)}(
                        {data?.schedule?.timezone || getTimezone()})
                      </Typography>

                      <Typography
                        onClick={() => handleTimezoneBrowserChange()}
                        variant="div"
                        className=" app__anchor__block cursor-pointer font-normal line-clamp-1 text-sm  leading-tight  text-blue-600"
                      >
                        See other timezones
                      </Typography>

                      {data?.schedule &&
                        data?.schedule?.timezone !== getTimezone() && (
                          <>
                            {" "}
                            <Tooltip title="Reset to region timezone">
                              <div
                                onClick={() => resetTimezoneToDefault()}
                                className="text-gray-600 -mt-1 cursor-pointer"
                              >
                                <RestartAltIcon fontSize="small" />
                              </div>
                            </Tooltip>
                          </>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                      {data?.basic?.url && (
                        <>
                          <Divider></Divider>
                          <div className="flex gap-1">
                            <VideocamIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                            <Typography
                              variant="div"
                              className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-600"
                            >
                              <u>P</u>review
                            </Typography>{" "}
                            <div
                              className="flex mr-2 text-blue-600
           ml-auto app__anchor__block cursor-pointer"
                            >
                              <Tooltip title="Change">
                                <EditIcon
                                  onClick={() => {
                                    props.onNavigate
                                      ? props.onNavigate(0)
                                      : null;
                                  }}
                                  fontSize="small"
                                  className=" leading-3 font-semibold  text-sm"
                                />
                              </Tooltip>
                            </div>
                          </div>
                          <div className="player__wrapper py-1">
                            <ReactPlayer
                              controls
                              loop={true}
                              muted
                              width="100%"
                              height="250px"
                              className="player"
                              url={data?.basic?.url}
                            />
                          </div>
                        </>
                      )}

                      {data?.basic?.binary?.documents?.consent && (
                        <>
                          <Divider></Divider>
                          <div className="flex gap-1">
                            <AttachmentIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                            <Typography
                              variant="div"
                              className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-600"
                            >
                              <u>A</u>ttachment
                            </Typography>{" "}
                          </div>

                          <div className="flex gap-1">
                            <div className="text-gray-600 line-clamp-1">
                              {getIconPerFileExtension(
                                getFileExtension(
                                  data?.basic?.binary?.documents?.data?.binary
                                    ?.name
                                )
                              )}
                            </div>

                            <div
                              onClick={() =>
                                download(
                                  data?.basic?.binary?.documents?.data?.binary
                                    ?.preview,
                                  data?.basic?.binary?.documents?.data?.binary
                                    ?.name
                                )
                              }
                            >
                              <Tooltip title="Click to download">
                                <Typography
                                  variant="div"
                                  className="app__anchor__block cursor-pointer font-normal line-clamp-1 text-sm mt-1  leading-tight  text-gray-600"
                                >
                                  {
                                    data?.basic?.binary?.documents?.data?.binary
                                      ?.name
                                  }
                                </Typography>
                              </Tooltip>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {data?.participant?.questions &&
                    data?.participant?.questionairre && (
                      <div className=" border-dotted  py-1 mt-2 mb-2 flex flex-col gap-2 bg-gray-100 px-2 p-2 rounded-lg   shadow-sm bg-repeat-round">
                        <div className="flex gap-1">
                          <QuizIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                          <Typography
                            variant="div"
                            className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                          >
                            Questionairre:
                          </Typography>
                          <Tooltip title={CUSTOM_QUESTION_OPTS.helptext.text_1}>
                            <div className=" leading-3 font-semibold  text-xl text-gray-500 cursor-pointer">
                              <HelpOutlineIcon fontSize="small" />
                            </div>
                          </Tooltip>
                          <div
                            className="flex mr-2 text-blue-600
           ml-auto app__anchor__block cursor-pointer"
                          >
                            <Tooltip title="Change">
                              <EditIcon
                                onClick={() => {
                                  props.onNavigate ? props.onNavigate(2) : null;
                                }}
                                fontSize="small"
                                className=" leading-3 font-semibold  text-sm"
                              />
                            </Tooltip>
                          </div>
                        </div>

                        <div className="flex gap-1 font-normal  text-sm   leading-snug text-black-700">
                          <blockquote className="line-clamp-1">
                            {parse(
                              HTMLUnderlineByCharacterIndex(
                                data?.participant?.questionairre?.description,
                                0
                              )
                            )}
                          </blockquote>
                        </div>

                        <div className=" overflow-auto max-h-52">
                          {data?.participant?.questionairre?.questions.map(
                            (q, index) => (
                              <div
                                key={index}
                                className="flex flex-col p-2 border-l-2"
                              >
                                <div className="flex gap-1">
                                  <div className="text-sm text-gray-800 font-semibold">
                                    Q{index + 1}.
                                  </div>
                                  <div className="text-sm text-gray-800 font-semibold line-clamp-1">
                                    {q.question}
                                  </div>
                                  {q.optional && (
                                    <div className="text-xs text-gray-600">
                                      (optional)
                                    </div>
                                  )}
                                </div>
                                {q.answerTypeCode === 1 && (
                                  <TextField
                                    placeholder="Answer"
                                    variant="standard"
                                    label="Answer"
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                )}

                                {q.answerTypeCode === 2 && (
                                  <>
                                    <FormControl>
                                      <RadioGroup
                                        className="text-gray-600 text-xs font-normal"
                                        aria-labelledby="radio-buttons"
                                        name="row-radio-buttons-group"
                                      >
                                        <div className="flex">
                                          {q.options.map((option) => (
                                            <div
                                              className="text-gray-700 leading-snug text-xs font-normal "
                                              key={option}
                                            >
                                              <FormControlLabel
                                                value={option}
                                                control={<Radio disabled />}
                                                label={<>{option}</>}
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      </RadioGroup>
                                    </FormControl>
                                  </>
                                )}

                                {q.answerTypeCode === 3 && (
                                  <>
                                    <div className="flex">
                                      {q.options.map((option) => (
                                        <FormControlLabel
                                          className="text-sm text-gray-700"
                                          disabled
                                          control={<Checkbox size="small" />}
                                          label={option}
                                          labelPlacement="end"
                                          key={option}
                                        />
                                      ))}
                                    </div>
                                  </>
                                )}

                                {q.answerTypeCode === 4 && (
                                  <>
                                    <div className="flex mt-1">
                                      <FormControl
                                        fullWidth={true}
                                        variant="standard"
                                        sx={{ marginBottom: 1 }}
                                      >
                                        <Select
                                          name="dropdown-question"
                                          labelId="dropdown-question-label"
                                          id="dropdown-question"
                                          value={q.options[0]}
                                          placeholder="Choose answer"
                                          fullWidth
                                        >
                                          {q.options?.map((option) => (
                                            <MenuItem
                                              key={option}
                                              disabled
                                              value={option}
                                            >
                                              {option}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </div>
                                  </>
                                )}

                                {q.answerTypeCode === 5 && (
                                  <>
                                    <div className="flex mt-1">
                                      <FormControl
                                        fullWidth={true}
                                        variant="standard"
                                        sx={{ marginBottom: 1 }}
                                      >
                                        <Select
                                          fullWidth
                                          multiple
                                          input={
                                            <OutlinedInput variant="standard" />
                                          }
                                          value={q.options}
                                          variant="standard"
                                        >
                                          {q.options.map((option) => (
                                            <MenuItem
                                              key={option}
                                              value={option}
                                              disabled
                                            >
                                              {option}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </div>
                                  </>
                                )}

                                {q.answerTypeCode === 7 && (
                                  <>
                                    <div className="flex mt-1">
                                      <FormControl
                                        fullWidth={true}
                                        sx={{ marginBottom: 1 }}
                                      >
                                        <LocalizationProvider
                                          dateAdapter={AdapterDateFns}
                                        >
                                          <DesktopDatePicker
                                            disabled
                                            inputFormat="MM/dd/yyyy"
                                            renderInput={(params) => (
                                              <TextField
                                                variant="standard"
                                                {...params}
                                              />
                                            )}
                                          />
                                        </LocalizationProvider>
                                      </FormControl>
                                    </div>
                                  </>
                                )}

                                {q.answerTypeCode === 1 && (
                                  <FormHelperText className=" text-xs leading-tight text-gray-700 font-normal">
                                    {q.maxLength}
                                  </FormHelperText>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  <img
                    alt="all-done-illustration"
                    src={getCompletionImage()}
                    className=" mt-3  w-full h-60 object-contain"
                  />
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {props.allStepsCompletedExceptFinalStep && (
                      <div className="flex ml-2 gap-1 mt-1">
                        <InfoIcon className="text-gray-600" fontSize="small" />
                        <Typography
                          variant="div"
                          className=" line-clamp-1 leading-tight  text-sm text-gray-600"
                          sx={{ mt: 0 }}
                        >
                          {APP.MESSAGES.INFO.TERMS_ACCEPT_TEXT}
                          <span className=" cursor-pointer app__anchor__block">
                            {APP.MESSAGES.INFO.TnC}
                          </span>
                        </Typography>
                      </div>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <TimezoneBrowseDialog
              selectedTimezone={data?.schedule?.timezone || getTimezone()}
              dialogCloseRequest={handleTimezoneCloseRequest}
              isOpen={timezoneBrowserOpened}
            />
          </>
        )}
      </div>
    </Slide>
  );
}

export default Final;

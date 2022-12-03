/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import Profile from "../../../../Network/People/Dashboard/Profile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {
  download,
  getFileExtension,
  getTimezone,
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
  COLOR_CODES,
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

import { CUSTOM_QUESTION_OPTS } from "../../../../../../constants/questionairre";
import ReadMore from "../../../../../shared/ReadMore";
import { THEME_MODES, useTheme } from "../../../../../../theme/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import Spacer from "../../../../../shared/Spacer";
import EventIcon from '@mui/icons-material/Event';
import SummarizeIcon from '@mui/icons-material/Summarize';
function Final(props) {
  const [data, dispatch] = useDataLayerContextValue();

  const [timezoneBrowserOpened, setTimezoneBrowser] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState(null);
  const [theme, _dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  const deepGray = COLOR_CODES.GRAY.DEEP;
  const lightGray = COLOR_CODES.GRAY.LIGHT
  const [isSticky, setSticky] = useState(false);
  const useStyles = makeStyles((theme) => ({
    paper: {
      "& .MuiMenu-paper": {
        backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
      }

    },
    root: {

      '& .MuiInputBase-root.Mui-disabled': {
        color: '#fff',

      }

    },
    input: {
      color: isDark ? deepGray : "",
      borderBottom: `1px solid ${isDark ? deepGray : "none"}`,
      "&:focus": {
        borderBottom: "none",
      },

    },
    select: {
      color: isDark ? deepGray : "",

      "&:before": {
        borderBottom: ` ${isDark ? `1px solid ${lightGray}` : ""}`,
      },
    },
    icon: {
      fill: isDark ? deepGray : "inherit",
    },

    menuItem: {
      backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
      color: isDark ? `${deepGray}` : "",
      "&.Mui-selected": {
        backgroundColor: `${isDark ? COLOR_CODES.BLUE.DARK : ""}`,
        color: isDark ? `${deepGray}` : "",
        fontWeight: 600,
      },
      "&:hover": {
        backgroundColor: isDark ? `${COLOR_CODES.BLUE.LIGHT}!important` : "",

      },
    },
  }));

  const classes = useStyles();
  useEffect(() => {
    setDark(theme.mode === THEME_MODES.DARK);
  }, [theme])
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
  const isFreeSession = (data) => {
    const amount = Number(data?.amount);
    const isPaid = data?.paidInd;
    return (!isPaid || !amount || amount == 0 || isNaN(amount))
  }
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
    const randomString = USER_CONFIDENCE_KEYWORDS_ON_WORKFLOW_COMPLETION[4]
    // const randomString = getRandomArrayElement(
    //   USER_CONFIDENCE_KEYWORDS_ON_WORKFLOW_COMPLETION
    // );
    const _user = props?.data?.user?.data?.firstName;
    const message = APP.MESSAGES.INFO.FINAL_STEP_COMPLETED.replace(
      "<user>",
      _user
    );
    return randomString + message;
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
        ) : !props.preRequisiteSessionAPIComplete ? (<>
          <div className="mb-2 flex gap-1 text-md text-gray-600 font-semibold">
            <CircularProgress className="text-sm -mt-1.5" color="inherit" />
            <Typography className=" " variant="div">
              {VALIDATING_REQUEST}
            </Typography>
          </div>

        </>) : (
          <>
            {showCompletionMessage && (
              <>
                <div className="mb-2 flex gap-1 text-md font-semibold">

                  <Typography className=" dark:text-gray-500 text-gray-700" variant="h6">
                    🚀{getCompletionMessage()}
                  </Typography>
                </div>

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
                <Spacer />
                <Divider sx={{ borderColor: isDark ? 'lightgrey' : 'darkgrey' }} variant="fullWidth" light={!isDark}></Divider>
              </>
            )}

            <Box sx={{ width: "100%", mt: 1 }}>
              <div className="flex gap-3 ">
                <div className="flex flex-col mt-1 bg-blue-800 p-4">
                  <Typography variant="h3">  {getStartDate()}</Typography>
                  <Typography variant="subtitle">
                    {getStartMonth()}
                  </Typography>

                </div>
                <div className="mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  w-full p-4 shadow-md rounded-md">
                <Spacer count={2}/>
                  <div className=" flex ">
                  <Typography
                    variant="body"
                    className="lg:text-3xl sm:text-xl md:text-2xl   leading-tight line-clamp-2 align-middle  "
                  >
                    {data?.basic?.name}

                  </Typography>

<div className="ml-auto">
                  <div className="flex gap-2">
                    <div className={`${isFreeSession(data?.fees) ? 'mt-2.5' : 'mt-1.5'} text-blue-600
                              app-anchor-block cursor-pointer`}>
                      <Tooltip title="Change">
                        <EditIcon
                          onClick={() => {
                            props.onNavigate ? props.onNavigate(0) : null;
                          }}

                          className=" leading-3 font-semibold"
                        />
                      </Tooltip>
                    </div>

                    {generateMonetizationAmountOnCard(data?.fees)}
                  </div>
                  </div>
                  </div>
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
                    <div className="relative bg-gray-100 dark:bg-gray-950 bg-center mb-2 border-0 p-2  shadow-md bg-repeat-round rounded-lg">
                    <img alt="courseImg" className="w-full absolute  left-0 top-0 xl:h-48 lg:h-48 blur-sm scale-100" src={
                        data?.basic?.binary?.images?.poster
                          ? data?.basic?.binary?.images?.poster
                          : IMAGE_PATHS.NO_DATA.EVENT_POSTER
                      }/>
                    
                      <img alt="courseImg"
                      className=" relative mx-auto w-3/4 block overflow-hidden  xl:h-48 lg:h-48  object-contain xl:object-cover lg:object-cover rounded-lg  "
                      src={
                        data?.basic?.binary?.images?.poster
                          ? data?.basic?.binary?.images?.poster
                          : IMAGE_PATHS.NO_DATA.EVENT_POSTER
                      }
                    />
                    </div>
                    <div className="flex border-0 p-2  shadow-md bg-repeat-round rounded-lg">
                     
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
                      <div className="  border-0 p-2  shadow-md bg-repeat-round rounded-lg">
                         
                         
                         <div className="text-md flex gap-2">
                          <SummarizeIcon className=" leading-3 font-semibold  text-xl text-gray-600" />{" "}
                          <span className="text-md leading-tight font-semibold text-gray-600">
                          Summary
                          </span>
                          </div>

                         <Spacer/>
                        <ReadMore parseHtml initialReadLimit={250}>
                          {data?.basic?.summary?.html}
                        </ReadMore>

                      </div>
                    )}

                     
                    {data?.participant?.cohost && (

                      <div
                        className={` flex flex-col   gap-2     border-0 p-2  shadow-md bg-repeat-round rounded-lg  `}
                      >
                        <Spacer/>
                        <div className="text-md flex gap-2">
                          <CoPresentIcon className=" leading-3 font-semibold  text-xl text-gray-600" />{" "}
                          <span className="text-md leading-tight font-semibold text-gray-600">
                            Co-host
                          </span>
                          <div
                            className="flex text-blue-600
              ml-auto app-anchor-block cursor-pointer"
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
         ml-auto app-anchor-block cursor-pointer"
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
                              dark={isDark}
                            />
                          ))}
                        </div>
                      </div>
                    )}


                  </div>
                </Grid>


                <Grid item lg={6} sm={12} md={6} xs={12}>

                  <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-950 px-4 p-4 mt-1 rounded-lg border-1 border-spacing-2 shadow-md bg-repeat-round">
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
                        className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800 dark:text-gray-400"
                      >
                        {getScheduleText()}
                      </Typography>

                      <div
                        className="flex mr-2 text-blue-600
           ml-auto app-anchor-block cursor-pointer"
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
                            className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800 dark:text-gray-500"
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
                              className=" text-xs font-normal line-clamp-2 italic  leading-tight  text-gray-800 dark:text-gray-500"
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
                        className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-800 dark:text-gray-400"
                      >
                        {getTime(timeDisplay)}(
                        {data?.schedule?.timezone || getTimezone()})
                      </Typography>

                      <Typography
                        onClick={() => handleTimezoneBrowserChange()}
                        variant="caption"
                        className="text-xs app-anchor-block cursor-pointer font-normal line-clamp-1 text-gray-500    leading-tight  ml-auto"
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
                          <Divider sx={{ borderColor: isDark ? 'lightgrey' : 'darkgrey' }} variant="fullWidth" light={!isDark}></Divider>
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
           ml-auto app-anchor-block cursor-pointer"
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
                          <Divider sx={{ borderColor: isDark ? 'lightgrey' : 'darkgrey' }} variant="fullWidth" light={!isDark}></Divider>
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
                                  className="app-anchor-block cursor-pointer font-normal line-clamp-1 text-sm mt-1  leading-tight  text-gray-600"
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
                      <div className=" mt-2 mb-2 flex flex-col gap-2 bg-gray-100 dark:bg-gray-950 px-4 p-4 rounded-lg border-1 border-spacing-2 shadow-md bg-repeat-round">
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
           ml-auto app-anchor-block cursor-pointer"
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

                        <div className="flex gap-1 font-normal  text-sm leading-snug">
                          <Typography variant="subtitle" className="line-clamp-1">
                            <div className="first-letter:underline">
                              {data?.participant?.questionairre?.description}
                            </div>
                          </Typography>
                        </div>

                        <div className=" overflow-auto max-h-52">
                          {data?.participant?.questionairre?.questions.map(
                            (q, index) => (
                              <div
                                key={index}
                                className="flex flex-col p-2 border-l-2 border-dashed  border-separate border-spacing-1 dark:border-l-gray-500 border-l-gray-600 px-3"
                              >
                                <div className="flex gap-1">
                                  <div className="text-sm text-gray-800 dark:text-gray-500 font-semibold">
                                    Q{index + 1}.
                                  </div>
                                  <div className="text-sm flex gap-2 text-gray-800 dark:text-gray-500 font-semibold line-clamp-1">

                                    {q.question}
                                  </div>
                                  {q.optional && (

                                    <div className="text-xs   text-gray-600">
                                      (optional)
                                    </div>


                                  )}
                                </div>
                                {q.answerTypeCode === 1 && (
                                  <TextField
                                    placeholder="Answer"
                                    variant="standard"
                                    label={<label className="dark:text-blue-800">Answer</label>}
                                    InputProps={{
                                      readOnly: true,
                                    }}

                                    inputProps={{ className: classes.input }}
                                    className={classes.root}
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
                                              className="  leading-tight text-xs font-normal "
                                              key={option}
                                            >
                                              <FormControlLabel
                                                sx={{ "& .Mui-disabled": { color: isDark ? lightGray : 'inherit' } }}
                                                value={option}
                                                control={<Radio size="small" disabled />}
                                                label={<label className=" dark:text-gray-700 text-gray-800">{option}</label>}
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
                                          sx={{"& .Mui-disabled":{color: isDark ? lightGray : "inherit"}}}
                                          control={<Checkbox  sx={{
                                            "&:hover": {
                                              background: '#E01EE8',
                                              boxShadow: 3
                                            },
                                            
                                            color: isDark ? deepGray : "inherit"
                                          }} size="small" />}
                                          label={<label className=" dark:text-gray-700 text-gray-800">{option}</label>}
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
                                          inputProps={{
                                            classes: {
                                              icon: classes.icon,
                                            },
                                          }}
                                          variant="outlined"
                                          className={classes.select}
                                          MenuProps={{
                                            className: classes.paper,
                                          }}
                                        >
                                          {q.options?.map((option) => (
                                            <MenuItem
                                              dense
                                              className={`${classes.menuItem}   block p-2`}

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
                                          inputProps={{
                                            classes: {
                                              icon: classes.icon,
                                            },
                                          }}
                                          className={classes.select}
                                          MenuProps={{
                                            className: classes.paper,
                                          }}
                                        >
                                          {q.options.map((option) => (
                                            <MenuItem
                                              dense
                                              className={`${classes.menuItem}   block p-2`}

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
                                    <Spacer />
                                    <Typography className=" text-gray-700 dark:text-gray-500 leading-tight " variant="caption">
                                      <InfoIcon size="small" />
                                      A calendar will be available when answering this question.
                                    </Typography></>


                                )}

                                {q.answerTypeCode === 1 && (
                                  <Tooltip title="Maximum length of field">
                                    <Typography className="cursor-pointer text-xs leading-tight text-gray-700 font-normal"> {q.maxLength}</Typography>

                                  </Tooltip>


                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

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

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import { TIMEZONE } from "../../../../../../constants/timezones";
import {
  formatTime,
  getDateAfter,
  getDifferenceOfTimeWithCurrentTimeInMinutes,
  getTimeAfter,
  getTimezone,
  HTMLUnderlineByCharacterIndex,
  isToday,
} from "../../../../../../utils/utility";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Spacer from "../../../../../shared/Spacer";
import {
  SCHEDULE,
  DEFAULTS,
  SCHEDULE_MESSAGES,
} from "../../../../../../constants/schedule";
import FormHelperText from "@mui/material/FormHelperText";
import ScheduleModuleCSS from "../../../../../../styles/Schedule.module.css";
import parse from "html-react-parser";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Tooltip } from "@material-ui/core";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import ScheduleService from "../../../../../../pages/api/session/ScheduleService";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import { getWorkflowError } from "../../../../../../error-handler/handler";
import { toast } from "react-toastify";
import { GENERIC_INTERNAL_ERROR } from "../../../../../../constants/error-messages";
import { Typography } from "@mui/material";
import { RESPONSE_TYPES } from "../../../../../../constants/constants";
import InfoIcon from "@mui/icons-material/Info";
import PublicIcon from "@mui/icons-material/Public";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import { APP } from "../../../../../../constants/userdata";
import { useRouter } from "next/router";
import { AuthService } from "../../../../../../pages/api/users/auth/AuthService";
import { actionTypes } from "../../../../../../context/reducer";
toast.configure();
function Schedule(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiFormLabel-root": {
        marginTop: "4px!important",
      },
    },
  }));

  const classes = useStyles();
  const Router = useRouter();
  const [data, dispatch] = useDataLayerContextValue();
  const [timezone, setTimeZone] = useState(getTimezone());
  const [schedule, setSchedule] = useState(SCHEDULE);
  const [duration, setDuration] = useState(DEFAULTS.TIME_ID); // 291 is the default time id for duration
  const [startTime, setStartTime] = useState(
    getTimeAfter(props.data?.static.times, 1)
  );
  const [errorInStartTime, setErrorInStartTime] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [repeatObject, setRepeatObject] = useState(null);
  const [repeatChecked, setRepeatChecked] = useState(false);
  const [repeatDisabled, setRepeatDisabled] = useState(true);
  const [repeatValue, setRepeatValue] = useState("");
  const [repeatEvery, setRepeatEvery] = useState(0);
  const [occurenceCount, setOccurenceCount] = useState(0);
  const [repeatByDaysOfWeek, setRepeatByDaysOfWeek] = useState([]);
  const [checkedRepeatByDaysOfWeekState, setCheckedRepeatByDaysOfWeekState] =
    useState(new Array(repeatByDaysOfWeek.length).fill(true));
  const [startMinDate, setStartMinDate] = useState(new Date());
  const [endsOnAfterValue, setEndsOnAfterValue] = React.useState("Occurence");
  const [endsOnDate, setEndsOnDate] = React.useState(new Date());
  const [endsOnDateError, setEndsOnDateError] = React.useState(false);
  const [scheduleFixed, setScheduleFixed] = useState(false);
  const [processInProgress, setProcessInProgress] = useState(false);
  const [scheduleSummary, setScheduleSummary] = useState(null);
  const [scheduleFixatedObject, setScheduleFixatedObject] = useState({});
  useEffect(() => {
    canRepeatBeEnabled();
  }, [props.data?.static.times]);
  useEffect(() => {
    setEndsOnDate(getDateAfter(occurenceCount, selectedStartDate));
  }, [selectedStartDate]);
  const handleTimezoneChange = (event) => {
    setTimeZone(event.target.value);
    APP.SESSION.DTO.SCHEDULE.timezone = event.target.value;
    setDirty();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
    canRepeatBeEnabled();
  };

  const handleRepeatCheckChange = (event) => {
    setRepeatChecked(event.target.checked);
    setTimeout(() => {
      APP.SESSION.DTO.SCHEDULE.repeats = event.target.checked;
      setDirty();
      if (!event.target.checked) {
        setRepeatValue("");
        APP.SESSION.DTO.SCHEDULE.repeatValue = "";
        setScheduleFixed(false);
        APP.SESSION.DTO.SCHEDULE.repeatScheduleFixed = false;
        setScheduleSummary(null);
        APP.SESSION.DTO.SCHEDULE.repeatScheduleSummary = null;
        setScheduleFixatedObject({});
        APP.SESSION.DTO.SCHEDULE.repeatSchedule = {};
      }
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
        schedule: APP.SESSION.DTO.SCHEDULE,
      });
    }, 120);
  };
  const handleOccurenceCountChange = (event) => {
    setOccurenceCount(event.target.value);
    setDirty();
    APP.SESSION.DTO.SCHEDULE.occurenceCount = event.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  };
  const handleRepeatsChange = (event) => {
    const repeatObject = schedule.find(
      (_sch) => _sch.value === event.target.value
    );

    setDirty();
    if (repeatObject.weeklyRepeatBy.length > 0) {
      const weeklyRepeatObject = repeatObject.weeklyRepeatBy;
      setRepeatByDaysOfWeek(weeklyRepeatObject);
      APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeek = weeklyRepeatObject;
      const weeklyRepeatsOn = new Array(
        repeatObject.weeklyRepeatBy.length
      ).fill(true);
      setCheckedRepeatByDaysOfWeekState(weeklyRepeatsOn);
      APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeekChecked = weeklyRepeatsOn;
    }

    const occurences = repeatObject.endAfter.occurences;
    setOccurenceCount(occurences);
    APP.SESSION.DTO.SCHEDULE.occurenceCount = occurences;
    const endDate = getDateAfter(
      repeatObject.endAfter.occurences,
      selectedStartDate
    );
    setEndsOnDate(endDate);
    APP.SESSION.DTO.SCHEDULE.endDate = endDate;
    setRepeatObject(repeatObject);
    APP.SESSION.DTO.SCHEDULE.repeatObject = repeatObject;
    setRepeatValue(event.target.value);
    APP.SESSION.DTO.SCHEDULE.repeatValue = event.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  };
  const handleRepeatEveryChange = (event) => {
    setRepeatEvery(event.target.value);
    setDirty();
    APP.SESSION.DTO.SCHEDULE.repeatEvery = event.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  };
  const handleEndsOnAfterChange = (event) => {
    setDirty();
    if (event.target.value === "OnDate") {
      const getOnDate = getDateAfter(occurenceCount, selectedStartDate);
      setEndsOnDate(getOnDate);
      APP.SESSION.DTO.SCHEDULE.repeatEndsOnDate = getOnDate;
    }
    setEndsOnAfterValue(event.target.value);
    APP.SESSION.DTO.SCHEDULE.repeatEndsAfter = event.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  };
  const label = {
    inputProps: {
      "aria-label": "controlled repeat checkbox",
      id: "repeat-label",
    },
  };

  const setDirty = () => {
    APP.SESSION.DTO.SCHEDULE.dirty = true;
  };
  const handleStartDateChange = (event) => {
    setSelectedStartDate(event);
    APP.SESSION.DTO.SCHEDULE.startDate = event;
    setDirty();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
    if (isToday(event)) {
      const p = props.data?.static.times.filter(
        (obj) => obj.timeId === startTime
      );
      const selectedDate = event;
      const selectedHour = parseInt(p[0].hour);
      selectedDate.setHours(selectedHour);
      const selectedMinute = parseInt(p[0].minute);
      selectedDate.setMinutes(selectedMinute);
      if (getDifferenceOfTimeWithCurrentTimeInMinutes(selectedDate) < 60) {
        const startTime = getTimeAfter(props.data?.static.times, 2);
        setStartTime(startTime);
        APP.SESSION.DTO.SCHEDULE.startTime = startTime;
        setDirty();
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
          schedule: APP.SESSION.DTO.SCHEDULE,
        });
      }
    } else {
      setErrorInStartTime(false);
    }
    canRepeatBeEnabled();
  };
  const handleRepeatByDayOfWeekChange = (event, day, position) => {
    const updatedCheckedState = checkedRepeatByDaysOfWeekState.map(
      (item, index) => (index === position ? !item : item)
    );

    setCheckedRepeatByDaysOfWeekState(updatedCheckedState);
    setDirty();
    APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeekChecked = updatedCheckedState;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  };
  const handleScheduleFixation = () => {
    setProcessInProgress(true);
    const _startTimeCollection = props.data?.static.times.filter(
      (time) => time.timeId === startTime
    );
    const _durationCollection = props.data?.static.times.filter(
      (time) => time.timeId === duration
    );

    const _startTime = new Date(selectedStartDate);

    _startTime.setHours(parseInt(_startTimeCollection[0].hour));
    _startTime.setMinutes(parseInt(_startTimeCollection[0].minute));

    const _endTime = new Date(selectedStartDate);

    _endTime.setHours(_startTime.getHours());
    _endTime.setMinutes(
      _startTime.getMinutes() +
        Number(_durationCollection[0].durationDisplay) * 60
    );

    const _startMonth = _endTime.getMonth() + 1;
    const startDate = {
      day:
        _startTime.getDate() < 10
          ? "0" + _startTime.getDate().toString()
          : _startTime.getDate().toString(),
      month:
        _startMonth < 10
          ? "0" + _startMonth.toString()
          : _startMonth.toString(),
      year: _startTime.getFullYear().toString(),
      hour:
        _startTime.getHours() < 10
          ? "0" + _startTime.getHours().toString()
          : _startTime.getHours().toString(),
      minute:
        _startTime.getMinutes() < 10
          ? "0" + _startTime.getMinutes().toString()
          : _startTime.getMinutes().toString(),
      second: "00",
      dateSeparator: "/",
      hourMinuteSeparator: ":",
    };
    const _endMonth = _endTime.getMonth() + 1;
    const endDate = {
      day:
        _endTime.getDate() < 10
          ? "0" + _endTime.getDate().toString()
          : _endTime.getDate().toString(),
      month: _endMonth < 10 ? "0" + _endMonth.toString() : _endMonth.toString(),
      year: _endTime.getFullYear().toString(),
      hour:
        _endTime.getHours() < 10
          ? "0" + _endTime.getHours().toString()
          : _endTime.getHours().toString(),
      minute:
        _endTime.getMinutes() < 10
          ? "0" + _endTime.getMinutes().toString()
          : _endTime.getMinutes().toString(),
      second: "00",
      dateSeparator: "/",
      hourMinuteSeparator: ":",
    };
    const daysOfWeekSelected = repeatByDaysOfWeek.filter((obj) => obj.checked);
    let daysOfWeek = [];
    daysOfWeekSelected.map((day, index) => {
      if (checkedRepeatByDaysOfWeekState[index]) {
        daysOfWeek.push(day.value);
      }
    });
    if (repeatValue === "Weekly" && daysOfWeek.length == 0) {
      checkedRepeatByDaysOfWeekState[0] = true;
      daysOfWeek.push("Sun");
    }
    let schedulerEndOnDate = null;
    if (endsOnAfterValue === "OnDate") {
      endsOnDate.setHours(_endTime.getHours());
      endsOnDate.setMinutes(_endTime.getMinutes());
      const _endOnDayMonth = endsOnDate.getMonth() + 1;
      schedulerEndOnDate = {
        day:
          endsOnDate.getDate() < 10
            ? "0" + endsOnDate.getDate().toString()
            : endsOnDate.getDate().toString(),
        month:
          _endOnDayMonth < 10
            ? "0" + _endOnDayMonth.toString()
            : _endOnDayMonth.toString(),
        year: endsOnDate.getFullYear().toString(),
        hour:
          endsOnDate.getHours() < 10
            ? "0" + endsOnDate.getHours().toString()
            : endsOnDate.getHours().toString(),
        minute:
          endsOnDate.getMinutes() < 10
            ? "0" + endsOnDate.getMinutes().toString()
            : endsOnDate.getMinutes().toString(),
        second: "00",
        dateSeparator: "/",
        hourMinuteSeparator: ":",
      };
    }

    const obj = {
      timeZone: timezone,
      startTime: {
        timeId: _startTimeCollection[0].timeId,
        hour: _startTimeCollection[0].hour,
        minute: _startTimeCollection[0].minute,
        hourMinuteSeparator: _startTimeCollection[0].hourMinuteSeparator,
      },
      endTime: {
        timeId: _startTimeCollection[0].timeId,
        hour:
          _endTime.getHours() < 10
            ? "0" + _endTime.getHours().toString()
            : _endTime.getHours().toString(),
        minute:
          _endTime.getMinutes() < 10
            ? "0" + _endTime.getMinutes().toString()
            : _endTime.getMinutes().toString(),
        hourMinuteSeparator: _startTimeCollection[0].hourMinuteSeparator,
      },
      currentSchedule: {
        repeateEveryCount: repeatEvery === 0 ? 1 : repeatEvery,
        monthlyRepeatTypeStr: "DayOfMonth",
        endOfMeetingTypeStr: endsOnAfterValue,
        isScheduleValid: true,
        occurence:
          endsOnAfterValue === "Occurence" ? occurenceCount.toString() : "0",
        repeatTypeStr: repeatValue,
        selectedDaysOfWeekStr: repeatValue === "Weekly" ? daysOfWeek : [],
      },
      courseScheduleEndDateStr: schedulerEndOnDate
        ? schedulerEndOnDate.month +
          schedulerEndOnDate.dateSeparator +
          schedulerEndOnDate.day +
          schedulerEndOnDate.dateSeparator +
          schedulerEndOnDate.year +
          " " +
          schedulerEndOnDate.hour +
          schedulerEndOnDate.hourMinuteSeparator +
          schedulerEndOnDate.minute +
          schedulerEndOnDate.hourMinuteSeparator +
          schedulerEndOnDate.second
        : null,
      courseStartDateStr:
        startDate.month +
        startDate.dateSeparator +
        startDate.day +
        startDate.dateSeparator +
        startDate.year +
        " " +
        startDate.hour +
        startDate.hourMinuteSeparator +
        startDate.minute +
        startDate.hourMinuteSeparator +
        startDate.second,

      courseEndDateStr:
        endDate.month +
        endDate.dateSeparator +
        endDate.day +
        endDate.dateSeparator +
        endDate.year +
        " " +
        endDate.hour +
        endDate.hourMinuteSeparator +
        endDate.minute +
        endDate.hourMinuteSeparator +
        endDate.second,
    };

    ScheduleService.postScheduleAndreceiveSchedulingInformation(obj)
      .then((res) => {
        setDirty();
        setScheduleFixed(true);
        APP.SESSION.DTO.SCHEDULE.repeatScheduleFixed = true;
        setScheduleFixatedObject(obj);
        APP.SESSION.DTO.SCHEDULE.repeatSchedule = obj;
        setScheduleSummary(res.data.value.summary);
        APP.SESSION.DTO.SCHEDULE.repeatScheduleSummary = res.data.value.summary;
      })
      .catch((err) => {
        setDirty();
        setScheduleFixed(false);
        APP.SESSION.DTO.SCHEDULE.repeatScheduleFixed = false;
        handleResponse(
          getWorkflowError(GENERIC_INTERNAL_ERROR),
          RESPONSE_TYPES.ERROR,
          toast.POSITION.TOP_RIGHT
        );
      })
      .finally(() => {
        setProcessInProgress(false);
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
          schedule: APP.SESSION.DTO.SCHEDULE,
        });
      });
  };
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    APP.SESSION.DTO.SCHEDULE.duration = event.target.value;
    setDirty();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
    canRepeatBeEnabled();
  };
  const handleStartTime = (event) => {
    const p = props.data?.static.times.filter(
      (obj) => obj.timeId === event.target.value
    );
    const selectedDate = new Date(selectedStartDate);
    const selectedHour = parseInt(p[0].hour);
    selectedDate.setHours(selectedHour);
    const selectedMinute = parseInt(p[0].minute);
    selectedDate.setMinutes(selectedMinute);
    if (getDifferenceOfTimeWithCurrentTimeInMinutes(selectedDate) < 60) {
      const startTime = getTimeAfter(props.data?.static.times, 2);
      setStartTime(startTime);
      APP.SESSION.DTO.SCHEDULE.startTime = startTime;
      setDirty();
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
        schedule: APP.SESSION.DTO.SCHEDULE,
      });
      setErrorInStartTime(true);
      return;
    }
    setErrorInStartTime(false);
    setStartTime(event.target.value);
    APP.SESSION.DTO.SCHEDULE.startTime = event.target.value;
    setDirty();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
    canRepeatBeEnabled();
  };
  const canRepeatBeEnabled = () => {
    if (selectedStartDate && startTime && duration && timezone) {
      setRepeatDisabled(false);
    } else {
      setRepeatDisabled(true);
    }
  };
  const handleEndsOnChange = (event) => { 
    setEndsOnDate(event); 
    APP.SESSION.DTO.SCHEDULE.repeatEndsOnDate = event;
    setDirty();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  };

  const getTimeByID = (id) => {
    const _time = props.data?.static.times.filter((time) => time.timeId === id);
    return formatTime(_time[0]);
  };

  const getEndTime = () => {
    const _startTimeCollection = props.data?.static.times.filter(
      (time) => time.timeId === startTime
    );
    const _durationCollection = props.data?.static.times.filter(
      (time) => time.timeId === duration
    );

    const _startTime = new Date(selectedStartDate);

    _startTime.setHours(parseInt(_startTimeCollection[0].hour));
    _startTime.setMinutes(parseInt(_startTimeCollection[0].minute));

    const _endTime = new Date(selectedStartDate);

    _endTime.setHours(_startTime.getHours());
    _endTime.setMinutes(
      _startTime.getMinutes() +
        Number(_durationCollection[0].durationDisplay) * 60
    );

    const _endMonth = _endTime.getMonth() + 1;
    const endDate = {
      day: _endTime.getDate(),
      month: _endMonth,
      year: _endTime,
      hour: _endTime.getHours(),
      minute:
        _endTime.getMinutes() < 10
          ? "0" + _endTime.getMinutes().toString()
          : _endTime.getMinutes().toString(),
      second: "00",
      dateSeparator: "/",
      hourMinuteSeparator: ":",
    };
    return formatTime(endDate);
  };

  const handleScheduleCancelation = () => {
    setProcessInProgress(true);
    setDirty();
    setRepeatChecked(false);
    APP.SESSION.DTO.SCHEDULE.repeats = false;
    setTimeout(() => {
      setRepeatValue("");
      APP.SESSION.DTO.SCHEDULE.repeatValue = "";
      setScheduleFixed(false);
      APP.SESSION.DTO.SCHEDULE.repeatScheduleFixed = false;
      setScheduleSummary(null);
      APP.SESSION.DTO.SCHEDULE.repeatScheduleSummary = null;
      setScheduleFixatedObject({});
      APP.SESSION.DTO.SCHEDULE.repeatSchedule = {};
      setProcessInProgress(false);
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
        schedule: APP.SESSION.DTO.SCHEDULE,
      });
    }, 120);
  };

  useEffect(() => {
    if (data.schedule) {
      // fetch data from context on load of form step.
      setSelectedStartDate(data?.schedule?.startDate?data?.schedule?.startDate:new Date());
      setEndsOnDateError(false)
      setStartTime(
        data?.schedule?.startTime
          ? data?.schedule?.startTime
          : getTimeAfter(props.data?.static.times, 1)
      );
      setDuration(
        data?.schedule?.duration ? data?.schedule?.duration : DEFAULTS.TIME_ID
      );
      setEndsOnDate(
        data?.schedule?.endDate ? data?.schedule?.endDate : new Date()
      );
      setTimeZone(
        data?.schedule?.timezone ? data?.schedule?.timezone : getTimezone()
      );
      if (data?.schedule?.repeats) {
        setEndsOnAfterValue(
          data?.schedule?.repeatEndsAfter
            ? data?.schedule?.repeatEndsAfter
            : "Occurence"
        );
        setRepeatChecked(true);
        setRepeatEvery(
          data?.schedule?.repeatEvery ? data?.schedule?.repeatEvery : 0
        );
        setRepeatObject(
          data?.schedule?.repeatObject ? data?.schedule?.repeatObject : null
        );
        setRepeatValue(
          data?.schedule?.repeatValue ? data?.schedule?.repeatValue : ""
        );
        setScheduleFixed(data?.schedule?.repeatScheduleFixed);
        setScheduleSummary(
          data?.schedule?.repeatScheduleSummary
            ? data?.schedule?.repeatScheduleSummary
            : null
        );
        setOccurenceCount(
          data?.schedule?.occurenceCount ? data?.schedule?.occurenceCount : 0
        );
        setScheduleFixatedObject(
          data?.schedule?.repeatSchedule ? data?.schedule?.repeatSchedule : {}
        );
        setRepeatByDaysOfWeek(
          data?.schedule?.repeatByDaysOfWeek
            ? data?.schedule?.repeatByDaysOfWeek
            : []
        );
        setCheckedRepeatByDaysOfWeekState(
          data?.schedule?.repeatByDaysOfWeekChecked
            ? data?.schedule?.repeatByDaysOfWeekChecked
            : new Array(repeatByDaysOfWeek.length).fill(true)
        );
      } else {
        setEndsOnAfterValue("Occurence");
        setRepeatChecked(false);
        setRepeatEvery(0);
        setRepeatObject(null);
        setRepeatValue("");
        setScheduleFixed(false);
        setScheduleSummary(null);
        setOccurenceCount(0);
        setScheduleFixatedObject({});
        setRepeatByDaysOfWeek([]);
        setCheckedRepeatByDaysOfWeekState(
          new Array(repeatByDaysOfWeek.length).fill(true)
        );
      }
      
    }
    else {
      const start = new Date()
      APP.SESSION.DTO.SCHEDULE.startDate = start
      setSelectedStartDate(start);
      APP.SESSION.DTO.SCHEDULE.timezone = getTimezone();
      setTimeZone(
        getTimezone()
      );
     
      setDirty();
      APP.SESSION.DTO.requestPath = Router.asPath;
      APP.SESSION.DTO.user = AuthService.getCurrentUser();
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
        schedule: APP.SESSION.DTO.SCHEDULE,
      });
    }
  }, []);
  return (
    <div
      className={`p-3 ${processInProgress ? "control__disabled__opaque" : ""}`}
    >
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item sm={12} lg={6} md={6} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                orientation="landscape"
                disablePast
                label={<><label className={!selectedStartDate instanceof Date?'text-red-400':''}>Start Date</label></>}
                autoOk
                openTo="day"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <div className="flex flex-col gap-1 text-xs text-gray-600 leading-tight">
              <div className="flex gap-1">
                <InfoIcon size="small" />
                <Typography gutterBottom component="div">
                  Your session will start from{" "}
                  <strong>
                    {selectedStartDate?.toDateString()} {getTimeByID(startTime)}
                  </strong>{" "}
                  and will end at <strong>{getEndTime()}</strong>
                </Typography>
              </div>

              <div
                className="text-center items-center leading-tight 
              text-xs text-gray-500 font-semibold flex gap-1"
              >
                <PublicIcon />
                <div>{timezone}</div>
              </div>
              {repeatChecked && (
                <>
                  <img
                    alt="user-session-schedule-illustration"
                    src="/static/images/schedule-session.jpg"
                    className=" hidden lg:block w-full h-64 -mt-2 shadow-sm border-0 object-contain"
                  />
                </>
              )}
            </div>
          </Grid>

          <Grid item sm={12} lg={6} md={6} xs={12}>
            <div className="flex flex-col">
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel required htmlFor="grouped-select-timezone">
                  Timezone
                </InputLabel>
                <Select
                  value={timezone}
                  onChange={handleTimezoneChange}
                  id="grouped-select-timezone"
                  label="Timezone"
                >
                  {TIMEZONE.map((tz, identityTypeIndex) => {
                    let children = [];

                    children.push(<ListSubheader>{tz.value}</ListSubheader>);
                    tz.utc.forEach((identity) => {
                      children.push(
                        <MenuItem
                          className="block p-2"
                          key={identity}
                          value={identity}
                        >
                          {identity}
                        </MenuItem>
                      );
                    });

                    return children;
                  })}
                </Select>
              </FormControl>
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel required id="select-time-label">
                  Choose start time
                </InputLabel>
                <Select
                  labelId="select-time-label"
                  id="select-time"
                  value={startTime}
                  onChange={handleStartTime}
                  label="Start time"
                >
                  {props.data?.static.times?.map((time) => (
                    <MenuItem
                      className="block p-3"
                      key={time.timeId}
                      value={time.timeId}
                    >
                      {formatTime(time)}
                    </MenuItem>
                  ))}
                </Select>
                {errorInStartTime && (
                  <FormHelperText
                    className="blue-text leading-tight text-red-700 font-semibold"
                    id="select-time-helper-text"
                  >
                    {SCHEDULE_MESSAGES.START_TIME.ERROR}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel required id="select-duration-label">
                  Duration(hrs)
                </InputLabel>
                <Select
                  labelId="select-duration-label"
                  id="select-duration"
                  value={duration}
                  onChange={handleDurationChange}
                  label="Duration"
                >
                  {props.data?.static.times?.map((time) => (
                    <MenuItem
                      disabled={time.timeId === 290}
                      className={`block p-3 ${
                        time.timeId === DEFAULTS.DEAD_TIME_ID ? "disabled" : ""
                      }`}
                      key={time.timeId}
                      value={time.timeId}
                    >
                      {time.durationDisplay}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="flex flex-col">
                <Spacer />
                <FormControlLabel
                  className="text-sm text-gray-700"
                  disabled={repeatDisabled}
                  control={
                    <Checkbox
                      onChange={handleRepeatCheckChange}
                      checked={repeatChecked}
                      size="small"
                      {...label}
                    />
                  }
                  label="Repeat"
                  labelPlacement="end"
                />
                {scheduleSummary && (
                  <div className="flex gap-1 text-xs text-gray-600 leading-tight">
                    <InfoIcon size="small" />
                    <Typography
                      className="small-text "
                      gutterBottom
                      component="div"
                    >
                      {scheduleSummary}
                    </Typography>
                  </div>
                )}
              </div>

              {repeatChecked && !scheduleFixed && (
                <div className="schedule__repeat__scheduler__wrapper mt-2">
                  <FormControl
                    fullWidth={true}
                    variant="outlined"
                    sx={{ marginBottom: 1 }}
                  >
                    <InputLabel id="repeats-label">Repeats</InputLabel>
                    <Select
                      labelId="repeats-label"
                      id="repeats"
                      value={repeatValue}
                      label="Repeats"
                      onChange={handleRepeatsChange}
                    >
                      {schedule
                        ?.filter((schedule) => schedule.display)
                        .map((schedule) => (
                          <MenuItem
                            className="block p-3"
                            key={schedule.id}
                            value={schedule.value}
                          >
                            {schedule.displayValue}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  {repeatValue !== "" && (
                    <>
                      <FormControl
                        fullWidth={true}
                        variant="outlined"
                        className={` mt-4`}
                        sx={{ marginBottom: 1 }}
                      >
                        <InputLabel id="repeat-every-label">
                          Repeat every
                        </InputLabel>
                        <Select
                          labelId="repeat-every-label"
                          id="repeat-every"
                          value={repeatEvery}
                          label="Repeat every"
                          onChange={handleRepeatEveryChange}
                          aria-describedby="repeat-every-label-helper-text"
                        >
                          {repeatObject.repeatsEvery.range?.map((obj) => (
                            <MenuItem
                              className="block p-3"
                              key={obj}
                              value={obj}
                            >
                              {obj}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText
                          className={`${ScheduleModuleCSS.schedule__form__helper__text}`}
                          id="repeat-every-label-helper-text"
                        >
                          {parse(repeatObject.repeatsEvery.label)}
                        </FormHelperText>
                      </FormControl>
                      {repeatValue === "Weekly" &&
                        repeatByDaysOfWeek.length > 0 && (
                          <>
                            <div className="flex flex-col gap-4">
                              <div className="text-gray-500 leading-tight clear-both whitespace-nowrap lg:line-clamp-1  overflow-ellipsis text-xs font-semibold lg:text-sm">
                                Repeat by
                              </div>
                              <div className="flex leading-tight repeat-by-days -mt-2  text-sm border-dotted border-2 ">
                                {repeatByDaysOfWeek
                                  .filter((obj) => !obj.disabled)
                                  .map((day, index) => (
                                    <Tooltip title={day.display.long}>
                                      <FormControlLabel
                                        key={day.id}
                                        className=" text-gray-500   "
                                        disabled={false}
                                        control={
                                          <Checkbox
                                            size="small"
                                            checked={
                                              checkedRepeatByDaysOfWeekState[
                                                index
                                              ]
                                            }
                                            value={day.value}
                                            onChange={(e) =>
                                              handleRepeatByDayOfWeekChange(
                                                e,
                                                day,
                                                index
                                              )
                                            }
                                          />
                                        }
                                        label={day.display.short}
                                        labelPlacement="end"
                                      ></FormControlLabel>
                                    </Tooltip>
                                  ))}
                              </div>
                              <Spacer />
                            </div>
                          </>
                        )}

                      <FormControl variant="outlined" sx={{ marginBottom: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            disableToolbar
                            label="Starts on"
                            variant="inline"
                            margin="normal"
                            inputFormat="MM/dd/yyyy"
                            renderInput={(params) => <TextField {...params} />}
                            minDate={startMinDate}
                            disablePast
                            value={selectedStartDate}
                            disabled
                          />
                        </LocalizationProvider>
                      </FormControl>

                      <div
                        className={`flex flex-col mt-2 ml-1 ${ScheduleModuleCSS.schedule__endsOnWrapper}`}
                      >
                        <FormControl>
                          <FormLabel className="text-sm ml-2 text-gray-700">
                            {parse(HTMLUnderlineByCharacterIndex("Ends", 0))}
                          </FormLabel>
                          <RadioGroup
                            aria-label="ends-after-on"
                            name="row-radio-buttons-group"
                            value={endsOnAfterValue}
                            onChange={handleEndsOnAfterChange}
                          >
                            <div className="mt-1 ml-3">
                              <FormControlLabel
                                value="Occurence"
                                control={<Radio />}
                                label="After"
                                className="ml-2 mt-3 text-xs text-gray-700"
                              />
                              <FormControl
                                variant="filled"
                                sx={{ marginBottom: 1, marginTop: 1 }}
                              >
                                <TextField
                                  variant="standard"
                                  label="Occurences"
                                  onChange={handleOccurenceCountChange}
                                  value={occurenceCount}
                                  id="occurences"
                                  type="number"
                                  disabled={endsOnAfterValue !== "Occurence"}
                                  className={`${ScheduleModuleCSS.schedule__occurence__select}`}
                                />
                              </FormControl>
                            </div>
                            <div className="mt-2 ml-3">
                              <FormControlLabel
                                value="OnDate"
                                control={<Radio />}
                                label="On"
                                className="ml-2 mt-2 text-xs text-gray-700"
                              />
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DesktopDatePicker
                                  disableToolbar
                                  allowSameDateSelection
                                  variant="inline"
                                  inputFormat="MM/dd/yyyy"
                                  renderInput={(params) => (
                                    <TextField
                                      className={classes.root}
                                      {...params}
                                      value={endsOnDate}
                                    />
                                  )}
                                  
                                  minDate={startMinDate}
                                  disablePast
                                  onChange={handleEndsOnChange}
                                  value={endsOnDate}
                                  disabled={endsOnAfterValue !== "OnDate"}
                                 
                                  autoFill
                                  label={
                                    <>
                                      <label>Ends on</label>
                                    </>
                                  }
                                  onError={()=>
                                    setEndsOnDateError(true)
                                  }
                                  onAccept={()=>{
                                    setEndsOnDateError(false)
                                  }}
                                 
                                />
                              </LocalizationProvider>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className="schedule-action-buttons float-right border-dotted border-2">
                        <Tooltip title={"Fix Schedule"}>
                          <IconButton
                            onClick={handleScheduleFixation}
                            aria-label="schedule-done"
                            size="small"
                            disabled={endsOnDateError}
                          >
                            <CheckCircleIcon color={endsOnDateError?'default':'primary'} fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"Cancel"}>
                          <IconButton
                            onClick={handleScheduleCancelation}
                            aria-label="schedule-cancel"
                            size="small"
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Schedule;

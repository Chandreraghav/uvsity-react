/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  datesAreOnSameDay,
  formatTime,
  getDateAfter,
  getFormattedHoursFromDate,
  getFormattedMinutesFromDate,
  getLocalTimezone,
  getTimeAfter,
  getTimezone,
  isSmallScreen,
  localTZDate,
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Slide from "@mui/material/Slide";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Tooltip } from "@material-ui/core";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import ScheduleService from "../../../../../../pages/api/session/ScheduleService";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import { getWorkflowError } from "../../../../../../error-handler/handler";
import { toast } from "react-toastify";
import { GENERIC_INTERNAL_ERROR } from "../../../../../../constants/error-messages";
import { Typography } from "@mui/material";
import { COLOR_CODES, RESPONSE_TYPES } from "../../../../../../constants/constants";
import InfoIcon from "@mui/icons-material/Info";
import PublicIcon from "@mui/icons-material/Public";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import { APP } from "../../../../../../constants/userdata";
import { useRouter } from "next/router";
import { AuthService } from "../../../../../../pages/api/users/auth/AuthService";
import { actionTypes } from "../../../../../../context/reducer";
import { THEME_MODES, useTheme } from "../../../../../../theme/ThemeProvider";
toast.configure();
function Schedule(props) {
  const [theme, _dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  useEffect(() => {
    setDark(theme.mode === THEME_MODES.DARK);
  }, [theme])
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
  const label = {
    inputProps: {
      "aria-label": "controlled repeat checkbox",
      id: "repeat-label",
    },
  };
  const Router = useRouter();
  const [data, dispatch] = useDataLayerContextValue();
  const [timezone, setTimeZone] = useState(getLocalTimezone());
  const [schedule, setSchedule] = useState(SCHEDULE);
  const [duration, setDuration] = useState(DEFAULTS.TIME_ID); // 291 is the default time id for duration(0.5h)
  const [startTime, setStartTime] = useState(
    getTimeAfter(props.data?.static?.times, 1, true)
  );
  const [endTime, setEndTime] = useState(null);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [errorInStartTime, setErrorInStartTime] = useState(false);
  const [repeatObject, setRepeatObject] = useState(null);
  const [repeatChecked, setRepeatChecked] = useState(false);
  const [repeatDisabled, setRepeatDisabled] = useState(true);
  const [repeatValue, setRepeatValue] = useState("");
  const [repeatEvery, setRepeatEvery] = useState(0);
  const [occurenceCount, setOccurenceCount] = useState(0);
  const [repeatByDaysOfWeek, setRepeatByDaysOfWeek] = useState([]);
  const [checkedRepeatByDaysOfWeekState, setCheckedRepeatByDaysOfWeekState] =
    useState(new Array(repeatByDaysOfWeek?.length).fill(true));
  const [startMinDate, setStartMinDate] = useState(new Date());
  const [endsOnORAfterValue, setEndsOnAfterValue] = React.useState("Occurence");
  const [endsOnDate, setEndsOnDate] = React.useState(null);
  const [endsOnDateError, setEndsOnDateError] = React.useState(false);
  const [scheduleFixed, setScheduleFixed] = useState(false);
  const [processInProgress, setProcessInProgress] = useState(false);
  const [scheduleSummary, setScheduleSummary] = useState(null);
  const [scheduleFixatedObject, setScheduleFixatedObject] = useState({});

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollheightLimit = 50;
      if (window.scrollY > scrollheightLimit || repeatChecked) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
    return () => {
      try {
        window.removeEventListener("scroll");
      } catch (error) { }
    };
  }, [repeatChecked]);
  const defaultDuration = useMemo(() => {
    return {
      "timeId": 291,
      "hour": "00",
      "minute": "30",
      "hourMinuteSeparator": ":",
      "display": "00:30",
      "durationDisplay": "0.5"
    }
  }, []);

  const dispatchToStore = useCallback(() => {
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  }, [dispatch])
  const setDirty = () => {
    if (!APP.SESSION.DTO.SCHEDULE.dirty)
      APP.SESSION.DTO.SCHEDULE.dirty = true;
  };
  const getTimeBasedCurrentDuration = useCallback(() => {
    try {
      return props.data?.static?.times.find(
        (time) => time.timeId === duration
      );
    } catch (error) {

    }
    return defaultDuration;
  }, [defaultDuration, duration, props.data?.static?.times]);

  const getTimeObject = (timeId) => {
    try {
      return props?.data?.static?.times.find(
        (obj) => obj?.timeId === timeId
      );
    } catch (error) {

    }
    return null;
  }
  const getTimeBasedDateObject = (date, timeObj) => {
    date.setHours(parseInt(timeObj?.hour));
    date.setMinutes(parseInt(timeObj?.minute));
    date.setSeconds(0)
    return date;
  }
  const getDurationInMillis = () => {
    const timeBasedDurationObject = getTimeBasedCurrentDuration();
    const durationInHours = Number(timeBasedDurationObject.durationDisplay)
    const durationInMins = durationInHours * 60;
    return durationInMins * 60 * 1000
  }
  const getEndTime = (_endDate = endDate) => {
    const _endTime = {
      "timeId": null,
      "hour": getFormattedHoursFromDate(_endDate),
      "minute": getFormattedMinutesFromDate(_endDate),
      "hourMinuteSeparator": ":",
      "display": null,
      "durationDisplay": null
    }
    _endTime.display = `${_endTime.hour}${_endTime.hourMinuteSeparator}${_endTime.minute}`
    const endTimeObject = props.data?.static?.times?.find((time) => time.display === _endTime.display)
    return endTimeObject ?? null;

  }

  const canRepeatBeEnabled = () => {
    if (startDate && startTime && duration && timezone) {
      if (repeatDisabled)
        setRepeatDisabled(false);
    } else {
      setRepeatDisabled(true);
    }
  }
  useEffect(() => {
    if (data.schedule) {
      const _startDate = data?.schedule?.startDate ? data?.schedule?.startDate : new Date();
      const _startTime = data?.schedule?.startTime
        ? data?.schedule?.startTime
        : getTimeAfter(props.data?.static?.times, 1, true);
      setStartDate(getTimeBasedDateObject(_startDate, _startTime))
      setStartTime(_startTime);
      APP.SESSION.DTO.SCHEDULE.startDate = _startDate
      APP.SESSION.DTO.SCHEDULE.startTime = _startTime;
      setEndsOnDateError(false);
      const duration = data?.schedule?.duration
        ? data?.schedule?.duration
        : DEFAULTS.TIME_ID;
      setDuration(duration);
      APP.SESSION.DTO.SCHEDULE.duration = duration;
      APP.SESSION.DTO.SCHEDULE.timezone = timezone;
      if (data?.schedule?.repeats) {
        const _endDate = data?.schedule?.endDate;
        const _endTime = data?.schedule?.endTime;
        setEndDate(_endDate);
        APP.SESSION.DTO.SCHEDULE.endDate = _endDate
        setEndTime(_endTime)
        APP.SESSION.DTO.SCHEDULE.endTime = _endTime;
        const endsOnAfter = data?.schedule?.repeatEndsAfter
          ? data?.schedule?.repeatEndsAfter
          : "Occurence";
        setEndsOnAfterValue(endsOnAfter);
        APP.SESSION.DTO.SCHEDULE.repeatEndsAfter = endsOnAfter;
        if (endsOnAfter === "OnDate") {
          const getOnDate = getDateAfter(occurenceCount, data?.schedule?.startDate || new Date());
          if (data?.schedule?.endDate instanceof Date) {
            getOnDate.setHours(data?.schedule?.endDate.getHours())
            getOnDate.setMinutes(data?.schedule?.endDate.getMinutes())
            getOnDate.setSeconds(0)
          }
          setEndsOnDate(getOnDate);
          APP.SESSION.DTO.SCHEDULE.repeatEndsOnDate = getOnDate;
        }
        setRepeatChecked(true);
        APP.SESSION.DTO.SCHEDULE.repeats = true;
        const repeatEvery = data?.schedule?.repeatEvery
          ? data?.schedule?.repeatEvery
          : 0;
        setRepeatEvery(repeatEvery);
        APP.SESSION.DTO.SCHEDULE.repeatEvery = repeatEvery;
        const repeatObject = data?.schedule?.repeatObject
          ? data?.schedule?.repeatObject
          : null;
        setRepeatObject(repeatObject);
        APP.SESSION.DTO.SCHEDULE.repeatObject = repeatObject;
        const repeatValue = data?.schedule?.repeatValue
          ? data?.schedule?.repeatValue
          : "";
        setRepeatValue(repeatValue);
        APP.SESSION.DTO.SCHEDULE.repeatValue = repeatValue;
        const scheduleFixed = data?.schedule?.repeatScheduleFixed;
        setScheduleFixed(scheduleFixed);
        APP.SESSION.DTO.SCHEDULE.repeatScheduleFixed = scheduleFixed;
        const scheduleSummary = data?.schedule?.repeatScheduleSummary
          ? data?.schedule?.repeatScheduleSummary
          : null;
        setScheduleSummary(scheduleSummary);

        APP.SESSION.DTO.SCHEDULE.repeatScheduleSummary = scheduleSummary;
        const occurenceCount = data?.schedule?.occurenceCount
          ? data?.schedule?.occurenceCount
          : 0;
        setOccurenceCount(occurenceCount);
        APP.SESSION.DTO.SCHEDULE.occurenceCount = occurenceCount;
        const fixatedObject = data?.schedule?.repeatSchedule
          ? data?.schedule?.repeatSchedule
          : {};
        setScheduleFixatedObject(fixatedObject);
        APP.SESSION.DTO.SCHEDULE.repeatSchedule = fixatedObject;
        const weeklyRepeatObject = data?.schedule?.repeatByDaysOfWeek
          ? data?.schedule?.repeatByDaysOfWeek
          : [];
        setRepeatByDaysOfWeek(weeklyRepeatObject);
        APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeek = weeklyRepeatObject;
        const weeklyRepeatsOn = data?.schedule?.repeatByDaysOfWeekChecked
          ? data?.schedule?.repeatByDaysOfWeekChecked
          : new Array(repeatByDaysOfWeek.length).fill(true);
        setCheckedRepeatByDaysOfWeekState(weeklyRepeatsOn);
        APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeekChecked = weeklyRepeatsOn;
      } else {
        calculateEndDate(_startDate)
        setEndsOnAfterValue("Occurence");
        setRepeatChecked(false);
        setEndsOnDate(null)
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
    } else {
      const _startDate = startDate;
      const _startTime = startTime;
      setStartDate(getTimeBasedDateObject(_startDate, _startTime))
      APP.SESSION.DTO.SCHEDULE.startDate = startDate
      APP.SESSION.DTO.SCHEDULE.startTime = startTime
      calculateEndDate(APP.SESSION.DTO.SCHEDULE.startDate)
      APP.SESSION.DTO.SCHEDULE.duration = DEFAULTS.TIME_ID;
      APP.SESSION.DTO.SCHEDULE.timezone =timezone;
      APP.SESSION.DTO.requestPath = Router.asPath;
      APP.SESSION.DTO.user = AuthService.getCurrentUser();
    }
    setDirty();
    dispatchToStore()
    canRepeatBeEnabled()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data?.static?.times])

  useEffect(()=>{
    if(data.schedule){
      if (!data.schedule?.repeats) {
        handleScheduleCancelation()
        const _startDate = getTimeBasedDateObject(startDate, startTime)
        setStartDate(_startDate)
        setTimeout(() => {
          APP.SESSION.DTO.SCHEDULE.startDate = _startDate
          APP.SESSION.DTO.SCHEDULE.startTime = startTime
          calculateEndDate(_startDate)
          setDirty();
          dispatchToStore()
        }, 100)
        canRepeatBeEnabled();
      }
    }
    else {
      calculateEndDate(startDate)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[duration,startTime])

  const calculateEndDate = (startDate = startDate) => {
    const _startDateTime = startDate.getTime()
    const _finalEndTime = _startDateTime + getDurationInMillis()
    const _endDate = new Date(_finalEndTime);
    const _endTime = getEndTime(_endDate)
    setEndDate(_endDate);
    APP.SESSION.DTO.SCHEDULE.endDate = _endDate
    setEndTime(_endTime)
    APP.SESSION.DTO.SCHEDULE.endTime = _endTime;
    setDirty();
    dispatchToStore()
  }

  const handleStartDateChange = (event) => {
    const _startDate = getTimeBasedDateObject(event.$d, startTime)
    setStartDate(_startDate)
    calculateEndDate(_startDate)
    setTimeout(() => {
      APP.SESSION.DTO.SCHEDULE.startDate = _startDate
      APP.SESSION.DTO.SCHEDULE.startTime = startTime
      setDirty();
      dispatchToStore()
      if (errorInStartTime)
        setErrorInStartTime(false)

    }, 100)
    revertToOneDaySchedule()
  }
  const revertToOneDaySchedule = () => {
    if (scheduleFixed || APP.SESSION.DTO.SCHEDULE.repeats) {
      handleScheduleCancelation()
      const _startDate = getTimeBasedDateObject(startDate, startTime)
      setStartDate(_startDate)
      setTimeout(() => {
        APP.SESSION.DTO.SCHEDULE.startDate = _startDate
        APP.SESSION.DTO.SCHEDULE.startTime = startTime
        calculateEndDate(_startDate)
        setDirty();
        dispatchToStore()
      }, 100)
      canRepeatBeEnabled();
    }
  }
  const handleStartTimeChange = (event) => {
    let _startTimeObject = getTimeObject(event.target.value)
    if (_startTimeObject) {
      const _startDate = startDate;
      const _timeBasedStartDate = getTimeBasedDateObject(_startDate, _startTimeObject)
      setStartDate(_timeBasedStartDate)
      if (_timeBasedStartDate instanceof Date && _timeBasedStartDate.getTime() < new Date()) {
        // if start time selected is in past then select a future time.
        _startTimeObject = getTimeAfter(props.data?.static?.times, 2, true)
        setStartTime(_startTimeObject)
        setErrorInStartTime(true)
      }
      else {
        setStartTime(_startTimeObject)
        setErrorInStartTime(false)
      }
      APP.SESSION.DTO.SCHEDULE.startTime = _startTimeObject;
      setDirty();
      dispatchToStore()
    }
    canRepeatBeEnabled();
    revertToOneDaySchedule()
  };
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    APP.SESSION.DTO.SCHEDULE.duration = event.target.value;
    setDirty();
    dispatchToStore()
    canRepeatBeEnabled();
    revertToOneDaySchedule();
  }

  const handleRepeatCheckChange = (event) => {
    setRepeatChecked(event.target.checked);
    APP.SESSION.DTO.SCHEDULE.repeats = event.target.checked;
    setTimeout(() => {
      if (!event.target.checked) {
        handleScheduleCancelation()
        calculateEndDate(startDate)
      }
    }, 120);
  }

  const handleRepeatsChange = (event) => {
    const repeatObject = schedule.find(
      (_sch) => _sch.value === event.target.value
    );
    setDirty();
    if (repeatObject && repeatObject.weeklyRepeatBy.length > 0) {
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
    setRepeatObject(repeatObject);
    APP.SESSION.DTO.SCHEDULE.repeatObject = repeatObject;
    setRepeatValue(event.target.value);
    APP.SESSION.DTO.SCHEDULE.repeatValue = event.target.value;
    dispatchToStore()

  }
  const handleRepeatEveryChange = (event) => {
    setRepeatEvery(event.target.value);
    setDirty();
    APP.SESSION.DTO.SCHEDULE.repeatEvery = event.target.value;
    dispatchToStore()
  }

  const handleRepeatByDayOfWeekChange = (event, day, position) => {
    const updatedCheckedState = checkedRepeatByDaysOfWeekState.map(
      (item, index) => (index === position ? !item : item)
    );
    setCheckedRepeatByDaysOfWeekState(updatedCheckedState);
    setDirty();
    APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeekChecked = updatedCheckedState;
    dispatchToStore()
  }
  const handleOccurenceCountChange = (event) => {
    setOccurenceCount(event.target.value);
    setDirty();
    APP.SESSION.DTO.SCHEDULE.occurenceCount = event.target.value;
    dispatchToStore()
  };
  const handleEndsOnChange = (event) => {
    setEndsOnDate(event.$d);
    APP.SESSION.DTO.SCHEDULE.repeatEndsOnDate = event.$d;
    setDirty();
    dispatchToStore()
  }
  const handleScheduleFixation = () => {
    setProcessInProgress(true);
    const _startDateTime = startDate;

    const _endDateTime = endDate;
    const _startMonth = _endDateTime.getMonth() + 1;
    const _startDate = {
      day:
        _startDateTime.getDate() < 10
          ? "0" + _startDateTime.getDate().toString()
          : _startDateTime.getDate().toString(),
      month:
        _startMonth < 10
          ? "0" + _startMonth.toString()
          : _startMonth.toString(),
      year: _startDateTime.getFullYear().toString(),
      hour:
        _startDateTime.getHours() < 10
          ? "0" + _startDateTime.getHours().toString()
          : _startDateTime.getHours().toString(),
      minute:
        _startDateTime.getMinutes() < 10
          ? "0" + _startDateTime.getMinutes().toString()
          : _startDateTime.getMinutes().toString(),
      second: "00",
      dateSeparator: "/",
      hourMinuteSeparator: ":",
    };
    const _endMonth = _endDateTime.getMonth() + 1;
    const __endDate = {
      day:
        _endDateTime.getDate() < 10
          ? "0" + _endDateTime.getDate().toString()
          : _endDateTime.getDate().toString(),
      month: _endMonth < 10 ? "0" + _endMonth.toString() : _endMonth.toString(),
      year: _endDateTime.getFullYear().toString(),
      hour:
        _endDateTime.getHours() < 10
          ? "0" + _endDateTime.getHours().toString()
          : _endDateTime.getHours().toString(),
      minute:
        _endDateTime.getMinutes() < 10
          ? "0" + _endDateTime.getMinutes().toString()
          : _endDateTime.getMinutes().toString(),
      second: "00",
      dateSeparator: "/",
      hourMinuteSeparator: ":",
    };
    const daysOfWeekSelected = repeatByDaysOfWeek?.filter((obj) => obj.checked);
    let daysOfWeek = [];
    daysOfWeekSelected?.map((day, index) => {
      if (checkedRepeatByDaysOfWeekState[index]) {
        daysOfWeek.push(day.value);
      }
    });
    if (repeatValue === "Weekly" && daysOfWeek.length == 0) {
      checkedRepeatByDaysOfWeekState[0] = true;
      daysOfWeek.push("Sun");
    }
    let schedulerEndOnDate = null;
    if (endsOnORAfterValue === "OnDate") {
      endsOnDate.setHours(_endDateTime.getHours());
      endsOnDate.setMinutes(_endDateTime.getMinutes());
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
    const startTimeObject = getTimeObject(startTime?.timeId)

    const obj = {
      timeZone: timezone,
      startTime: {
        timeId: startTimeObject.timeId,
        hour: startTimeObject.hour,
        minute: startTimeObject.minute,
        hourMinuteSeparator: startTimeObject.hourMinuteSeparator,
      },
      endTime: {
        timeId: endTime.timeId,
        hour:
          _endDateTime.getHours() < 10
            ? "0" + _endDateTime.getHours().toString()
            : _endDateTime.getHours().toString(),
        minute:
          _endDateTime.getMinutes() < 10
            ? "0" + _endDateTime.getMinutes().toString()
            : _endDateTime.getMinutes().toString(),
        hourMinuteSeparator: endTime.hourMinuteSeparator,
      },
      currentSchedule: {
        repeateEveryCount: repeatEvery === 0 ? 1 : repeatEvery,
        monthlyRepeatTypeStr: "DayOfMonth",
        endOfMeetingTypeStr: endsOnORAfterValue,
        isScheduleValid: true,
        occurence:
          endsOnORAfterValue === "Occurence" ? occurenceCount.toString() : "0",
        repeatTypeStr: repeatValue,
        selectedDaysOfWeekStr: repeatValue === "Weekly" ? daysOfWeek : [],
      },
      courseScheduleEndDateStr: schedulerEndOnDate
        ? (schedulerEndOnDate.month +
          schedulerEndOnDate.dateSeparator +
          schedulerEndOnDate.day +
          schedulerEndOnDate.dateSeparator +
          schedulerEndOnDate.year +
          " " +
          schedulerEndOnDate.hour +
          schedulerEndOnDate.hourMinuteSeparator +
          schedulerEndOnDate.minute +
          schedulerEndOnDate.hourMinuteSeparator +
          schedulerEndOnDate.second)
        : (__endDate.month +
          __endDate.dateSeparator +
          __endDate.day +
          __endDate.dateSeparator +
          __endDate.year +
          " " +
          __endDate.hour +
          __endDate.hourMinuteSeparator +
          __endDate.minute +
          __endDate.hourMinuteSeparator +
          __endDate.second),
      courseStartDateStr:
        _startDate.month +
        _startDate.dateSeparator +
        _startDate.day +
        _startDate.dateSeparator +
        _startDate.year +
        " " +
        _startDate.hour +
        _startDate.hourMinuteSeparator +
        _startDate.minute +
        _startDate.hourMinuteSeparator +
        _startDate.second,

      courseEndDateStr:
        __endDate.month +
        __endDate.dateSeparator +
        __endDate.day +
        __endDate.dateSeparator +
        __endDate.year +
        " " +
        __endDate.hour +
        __endDate.hourMinuteSeparator +
        __endDate.minute +
        __endDate.hourMinuteSeparator +
        __endDate.second,
    };
    ScheduleService.postScheduleAndreceiveSchedulingInformation(obj)
      .then((res) => {
        setDirty();
        setScheduleFixed(true);
        APP.SESSION.DTO.SCHEDULE.repeatScheduleFixed = true;
        const fixatedEndDate = new Date(res.data.value.dateValue)
        fixatedEndDate.setHours(_endDateTime.getHours());
        fixatedEndDate.setMinutes(_endDateTime.getMinutes());
        const month = fixatedEndDate.getMonth() + 1;
        __endDate.day = fixatedEndDate.getDate() < 10
          ? "0" + fixatedEndDate.getDate().toString()
          : fixatedEndDate.getDate().toString()
        __endDate.month = month < 10 ? "0" + month.toString() : month.toString();
        __endDate.year = fixatedEndDate.getFullYear().toString();
        __endDate.hour =
          fixatedEndDate.getHours() < 10
            ? "0" + fixatedEndDate.getHours().toString()
            : fixatedEndDate.getHours().toString();
        __endDate.minute =
          fixatedEndDate.getMinutes() < 10
            ? "0" + fixatedEndDate.getMinutes().toString()
            : fixatedEndDate.getMinutes().toString();
        __endDate.second = "00";
        __endDate.dateSeparator = "/";
        __endDate.hourMinuteSeparator = ":";
        obj.courseEndDateStr = __endDate.month +
          __endDate.dateSeparator +
          __endDate.day +
          __endDate.dateSeparator +
          __endDate.year +
          " " +
          __endDate.hour +
          __endDate.hourMinuteSeparator +
          __endDate.minute +
          __endDate.hourMinuteSeparator +
          __endDate.second;

          obj.courseScheduleEndDateStr=obj.courseEndDateStr

        APP.SESSION.DTO.SCHEDULE.endDate = fixatedEndDate
        APP.SESSION.DTO.SCHEDULE.repeatEndsOnDate = fixatedEndDate
        APP.SESSION.DTO.SCHEDULE.repeatScheduleSummary = res.data.value.summary;
        APP.SESSION.DTO.SCHEDULE.repeatSchedule = obj;
        setEndsOnDate(fixatedEndDate)
        setEndDate(fixatedEndDate)
        setScheduleFixatedObject(obj);
        setScheduleSummary(res.data.value.summary);
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
        dispatchToStore()
        if (!isSmallScreen())
          window.scrollTo(0, 0);
      });
  }
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
      dispatchToStore()
      if (!isSmallScreen())
        window.scrollTo(0, 0);
    }, 120);
  }
  const handleEndsOnORAfterChange = (event) => {
    setDirty();
    if (event.target.value === "OnDate") {
      const getOnDate = getDateAfter(occurenceCount, startDate);
      if (endDate instanceof Date) {
        getOnDate.setHours(endDate.getHours())
        getOnDate.setMinutes(endDate.getMinutes())
        getOnDate.setSeconds(0)
      }
      setEndsOnDate(getOnDate);
      APP.SESSION.DTO.SCHEDULE.repeatEndsOnDate = getOnDate;
    }
    setEndsOnAfterValue(event.target.value);
    APP.SESSION.DTO.SCHEDULE.repeatEndsAfter = event.target.value;
    dispatchToStore()
  }
  const getTimeByID = (id) => {
    const _time = props.data?.static?.times.filter((time) => time.timeId === id);
    return formatTime(_time[0]);
  };
  return (
    <Slide direction="left" in={true}>
      <div
        className={`p-3 ${processInProgress ? "control__disabled__opaque" : ""}`}
      >
        <Box sx={{ width: "100%" }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item sm={12} lg={6} md={6} xs={12}>
              <div className={`${isSticky
                ? "md:sticky  lg:sticky  xl:sticky top-12"
                : ""
                }`}>
                <Box sx={{
                  "& .MuiDatePickerToolbar-root": {
                    backgroundColor: isDark ? "#111" : "whitesmoke"
                  },

                  "& .MuiDatePickerToolbar-root span>label": {
                    color: isDark ? 'darkgrey' : ''
                  },
                  "&. MuiCalendarPicker-root": {

                  },

                  "& .MuiPickersCalendarHeader-label": {
                    color: '#0081CB'
                  },
                  "& .MuiTypography-caption": {
                    margin: 0
                  },

                  '& .PrivatePickersSlideTransition-root [role="row"]': {
                    margin: 0
                  },
                  "& .MuiPickersDay-dayWithMargin": {
                    margin: 0,
                  },

                }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      orientation="landscape"
                      disablePast
                      label={
                        <>
                          <label
                            className={
                              !startDate instanceof Date ? "text-red-400" : ""
                            }
                          >
                            Start Date
                          </label>
                        </>
                      }
                      autoOk
                      openTo="day"
                      value={startDate}
                      onChange={handleStartDateChange}
                      componentsProps={{
                        actionBar: {
                          actions: [],
                        },
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>


                <Spacer />


                <div className="flex flex-col gap-1 text-xs text-gray-600 leading-tight">
                  <div className="flex gap-1">
                    <InfoIcon size="small" />
                    <Typography gutterBottom component="div">
                      Your session will start from&nbsp;
                      <strong>
                        {localTZDate(startDate)}{" "}
                      </strong>
                      and will end on&nbsp;
                      {datesAreOnSameDay(startDate, endDate) ? (<strong>{getTimeByID(
                        endTime?.timeId ? endTime?.timeId : DEFAULTS.TIME_ID
                      )}</strong>) : (<strong>
                        {localTZDate(endDate)}{" "}
                      </strong>)}
                    </Typography>
                  </div>
                  <div
                    className="text-center items-center leading-tight 
text-xs text-gray-500 font-semibold flex gap-1"
                  >
                    <Tooltip title="Local timezone">
                      <div className="flex gap-1">

                        <Typography className="flex gap-1" variant="caption"><PublicIcon />
                          <div className=" mr-2 mt-0.5">{getLocalTimezone()}</div>
                        </Typography>

                      </div>

                    </Tooltip>
                  </div>
                </div>


              </div>

            </Grid>

            <Grid item sm={12} lg={6} md={6} xs={12}>
              <div className="flex flex-col">
               
                <FormControl
                  fullWidth={true}
                  variant="standard"
                  sx={{ marginBottom: 1 }}
                >
                  <InputLabel sx={{ color: isDark ? deepGray : "" }} required id="select-time-label">
                    Choose start time
                  </InputLabel>
                  <Select
                    labelId="select-time-label"
                    id="select-time"
                    value={startTime.timeId}
                    onChange={handleStartTimeChange}
                    label="Start time"
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
                    {props.data?.static.times?.map((time) => (
                      <MenuItem

                        key={time.timeId}
                        dense
                        className={`${classes.menuItem}   block p-3`}

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
                  <InputLabel sx={{ color: isDark ? deepGray : "" }} required id="select-duration-label">
                    Duration(hrs)
                  </InputLabel>
                  <Select
                    labelId="select-duration-label"
                    id="select-duration"
                    value={duration}
                    onChange={handleDurationChange}
                    label="Duration"
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
                    {props.data?.static.times?.map((time) => (
                      <MenuItem
                        disabled={time.timeId === 290}

                        dense
                        className={`block p-3 ${classes.menuItem} ${time.timeId === DEFAULTS.DEAD_TIME_ID ? "disabled" : ""
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
                    className="text-sm text-gray-700 dark:text-gray-500"
                    disabled={repeatDisabled}
                    control={
                      <Checkbox
                        onChange={handleRepeatCheckChange}
                        checked={repeatChecked}
                        size="small"
                        sx={{
                          "&:hover": {
                            background: '#E01EE8',
                            boxShadow: 3
                          },
                          color: isDark ? deepGray : "inherit"
                        }}
                        {...label}

                      />
                    }
                    label="Repeat"
                    labelPlacement="end"
                  />
                  {scheduleSummary && (
                    <div className="flex gap-1 text-xs text-gray-600 dark:text-gray-500 leading-tight">
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
                      variant="standard"
                      sx={{ marginBottom: 1 }}
                    >
                      <InputLabel sx={{ color: isDark ? deepGray : "" }} id="repeats-label">Repeats</InputLabel>
                      <Select
                        labelId="repeats-label"
                        id="repeats"
                        value={repeatValue}
                        label="Repeats"
                        onChange={handleRepeatsChange}
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
                        {schedule
                          ?.filter((schedule) => schedule.display)
                          .map((schedule) => (
                            <MenuItem

                              dense
                              className={`${classes.menuItem}   block p-3`}

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
                          variant="standard"
                          className={` mt-4`}
                          sx={{ marginBottom: 1 }}
                        >
                          <InputLabel sx={{ color: isDark ? deepGray : "" }} id="repeat-every-label">
                            Repeat every
                          </InputLabel>
                          <Select
                            labelId="repeat-every-label"
                            id="repeat-every"
                            value={repeatEvery}
                            label="Repeat every"
                            onChange={handleRepeatEveryChange}
                            aria-describedby="repeat-every-label-helper-text"
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
                            {repeatObject.repeatsEvery.range?.map((obj) => (
                              <MenuItem

                                dense
                                className={`${classes.menuItem}   block p-3`}

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
                          repeatByDaysOfWeek && repeatByDaysOfWeek.length > 0 && (
                            <>
                              <div className="flex flex-col gap-4">
                                <div className="text-gray-500 dark:text-gray-400 leading-tight clear-both whitespace-nowrap lg:line-clamp-1  overflow-ellipsis text-xs font-semibold lg:text-sm">
                                  Repeat by
                                </div>
                                <div className="flex leading-tight repeat-by-days -mt-2  text-sm   ">
                                  {repeatByDaysOfWeek
                                    .filter((obj) => !obj.disabled)
                                    .map((day, index) => (
                                      <div key={index}>
                                        <Tooltip title={day.display.long}>
                                          <FormControlLabel
                                            key={day.id}
                                            className=" text-gray-500 dark:text-gray-400   "
                                            disabled={false}
                                            control={
                                              <Checkbox
                                                sx={{
                                                  "&:hover": {
                                                    background: '#E01EE8',
                                                    boxShadow: 3
                                                  },
                                                  color: isDark ? deepGray : "#111"
                                                }}
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
                                      </div>

                                    ))}
                                </div>
                                <Spacer />
                              </div>
                            </>
                          )}

                        <FormControl variant="outlined" sx={{ marginBottom: 1 }}>
                          <div className="flex flex-col gap-2">
                            <div className="text-sm dark:text-gray-400 text-gray-700 first-letter:underline">Starts on</div>
                            <Typography className=" italic" variant="subtitle2">{startDate?.toDateString()}</Typography>
                          </div>
                        </FormControl>

                        <div style={{ borderLeft: `1px dotted ${isDark ? '#e2e2e2' : 'grey'}` }}
                          className={`flex flex-col mt-2 ml-1    `}
                        >
                          <FormControl>
                            <FormLabel className="first-letter:underline text-sm ml-2 text-gray-700 dark:text-gray-500">
                              Ends
                            </FormLabel>
                            <RadioGroup
                              aria-label="ends-after-on"
                              name="row-radio-buttons-group"
                              value={endsOnORAfterValue}
                              onChange={handleEndsOnORAfterChange}
                            >
                              <div className="mt-1 ml-3">
                                <FormControlLabel
                                  value="Occurence"
                                  control={<Radio />}
                                  label="After"
                                  className="ml-2 mt-3 text-xs text-gray-700 dark:text-gray-500"
                                />
                                <FormControl
                                  variant="filled"
                                  sx={{ marginBottom: 1, marginTop: 1 }}
                                >
                                  <TextField
                                    variant="standard"
                                    label={<div className="text-gray-700 dark:text-gray-500">Occurences</div>}
                                    onChange={handleOccurenceCountChange}
                                    value={occurenceCount}
                                    id="occurences"
                                    type="number"

                                    inputProps={{ className: classes.input }}
                                    className={classes.root}
                                    disabled={endsOnORAfterValue !== "Occurence"}

                                  />
                                </FormControl>
                              </div>
                              <div className="mt-2 ml-3">
                                <FormControlLabel
                                  value="OnDate"
                                  control={<Radio />}
                                  label="On"
                                  className="ml-2 mt-2 text-xs text-gray-700 dark:text-gray-500"
                                />
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DesktopDatePicker
                                    disableToolbar
                                    allowSameDateSelection
                                    variant="inline"

                                    renderInput={(params) => (
                                      <TextField

                                        variant="standard"
                                        {...params}
                                        sx={{
                                          svg: { color: isDark ? deepGray : "" },
                                          input: { color: isDark ? deepGray : "" },
                                          label: { color: isDark ? deepGray : "" }
                                        }}
                                        value={endsOnDate}

                                      />
                                    )}
                                    minDate={startMinDate}
                                    disablePast
                                    onChange={handleEndsOnChange}
                                    value={endsOnDate}
                                    disabled={endsOnORAfterValue !== "OnDate"}
                                    autoFill
                                    label={<div className="text-gray-700 dark:text-gray-500">Ends on</div>}
                                    onError={() => setEndsOnDateError(true)}
                                    onAccept={() => {
                                      setEndsOnDateError(false);
                                    }}
                                  />
                                </LocalizationProvider>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </div>
                        <div className="schedule-action-buttons float-right">
                          <Tooltip title={"Fix Schedule"}>
                            <IconButton
                              onClick={handleScheduleFixation}
                              aria-label="schedule-done"
                              size="small"
                              disabled={endsOnDateError}
                            >
                              <CheckCircleIcon
                                color={endsOnDateError ? "default" : "primary"}
                                fontSize="small"
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={"Cancel"}>
                            <IconButton
                              onClick={handleScheduleCancelation}
                              aria-label="schedule-cancel"
                              size="small"
                            >
                              <CancelIcon color="warning" fontSize="small" />
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
    </Slide>
  );
}

export default Schedule;

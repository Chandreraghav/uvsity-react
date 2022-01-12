import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import { TIMEZONE } from "../../../../../../constants/timezones";
import { formatTime, getTimezone } from "../../../../../../utils/utility";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Spacer from "../../../../../shared/Spacer";
import { SCHEDULE } from "../../../../../../constants/schedule";
import FormHelperText from "@mui/material/FormHelperText";
import ScheduleModuleCSS from "../../../../../../styles/Schedule.module.css";
import parse from "html-react-parser";
function Schedule(props) {
  const [timezone, setTimeZone] = useState(getTimezone());
  const [schedule, setSchedule] = useState(SCHEDULE);
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [repeatObject, setRepeatObject] = useState(null);
  const [repeatChecked, setRepeatChecked] = useState(false);
  const [repeatValue, setRepeatValue] = useState("");
  const [repeatEvery, setRepeatEvery] = useState(0);
  const [occurenceCount, setOccurenceCount] = useState(0);
  const handleRepeatCheckChange = (event) => {
    setRepeatChecked(event.target.checked);
  };
  const handleOccurenceCountChange = (event) => {
    console.log(event);
    setOccurenceCount(event.target.value);
  };
  const handleRepeatsChange = (event) => {
    const repeatObject = schedule.find(
      (_sch) => _sch.value === event.target.value
    );
    setOccurenceCount(repeatObject.endAfter.occurences);
    setRepeatObject(repeatObject);
    setRepeatValue(event.target.value);
  };
  const handleRepeatEveryChange = (event) => {
    setRepeatEvery(event.target.value);
  };
  const label = {
    inputProps: {
      "aria-label": "controlled repeat checkbox",
      id: "repeat-label",
    },
  };
  const changedDate = () => {
    console.log();
  };
  const handleStartDateChange = (event) => {
    console.log(event);
    //setSelectedStartDate(new Date(event.target.value))
  };
  return (
    <div className={`p-2`}>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item sm={4} lg={6} md={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <DatePicker
                  autoOk
                  orientation="landscape"
                  variant="static"
                  disablePast
                  openTo="date"
                  value={selectedStartDate}
                  onChangeCapture={() => changedDate()}
                  onChange={handleStartDateChange}
                />
              </FormControl>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item sm={4} lg={6} md={6} xs={12}>
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
                  defaultValue={timezone}
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
                  value={""}
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
                  value={""}
                  label="Duration"
                >
                  {props.data?.static.times?.map((time) => (
                    <MenuItem
                      className="block p-3"
                      key={time.timeId}
                      value={time.timeId}
                    >
                      {time.durationDisplay}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div>
                <Spacer />
                <FormControlLabel
                  className="text-sm ml-0.5 text-gray-700"
                  disabled={false}
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
              </div>

              {repeatChecked && (
                <div className="schedule__repeat__scheduler__wrapper mt-2">
                  <FormControl
                    fullWidth={true}
                    variant="outlined"
                    sx={{ marginBottom: 1 }}
                  >
                    <InputLabel id="repeats-label">Repeats</InputLabel>
                    <Select
                      className={`${
                        repeatValue !== ""
                          ? ScheduleModuleCSS.schedule__select
                          : ScheduleModuleCSS.schedule__select
                      }`}
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
                        sx={{ marginBottom: 1, marginTop: 3 }}
                      >
                        <InputLabel id="repeat-every-label">
                          Repeat every
                        </InputLabel>
                        <Select
                          className={`${
                            repeatEvery > 0
                              ? ScheduleModuleCSS.schedule__select
                              : ""
                          }`}
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
                      <FormControl
                        fullWidth={true}
                        variant="outlined"
                        sx={{ marginBottom: 1, marginTop: 1 }}
                      >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            disableToolbar
                            variant="inline"
                            label="Starts on"
                            value={selectedStartDate}
                            disabled
                            disabledPast
                          />
                        </MuiPickersUtilsProvider>
                      </FormControl>

                      <div className="flex flex-col mt-2">
                        <h4 className="text-gray-500 text-sm font-semibold">
                          Ends
                        </h4>

                        <div
                          className={`flex flex-col ${ScheduleModuleCSS.schedule__endsOnWrapper}`}
                        >
                          <div className="flex gap-2">
                            <div className=" p-1 text-gray-500 text-xs font-semibold">
                              After
                            </div>
                            <FormControl
                              variant="filled"
                              sx={{ marginBottom: 1, marginTop: 1, padding: 2 }}
                            >
                              <TextField
                                onChange={handleOccurenceCountChange}
                                value={occurenceCount}
                                id="occurences"
                                helperText="occurences"
                                type="number"
                                className={`${ScheduleModuleCSS.schedule__occurence__select}`}
                              />
                            </FormControl>
                          </div>
                          <div className="flex gap-2">
                            <div className=" p-1 text-gray-500 text-xs font-semibold">
                              On
                            </div>
                            <FormControl
                              variant="filled"
                              sx={{ marginBottom: 1, marginTop: 1 }}
                            >
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                  disableToolbar
                                  variant="inline"
                                  disabledPast
                                />
                              </MuiPickersUtilsProvider>
                            </FormControl>
                          </div>
                        </div>
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

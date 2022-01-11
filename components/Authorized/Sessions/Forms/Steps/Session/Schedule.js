import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker } from "@material-ui/pickers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import { TIMEZONE } from "../../../../../../constants/timezones";
import { formatTime, getTimezone } from "../../../../../../utils/utility";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Spacer from "../../../../../shared/Spacer";

function Schedule(props) {
  const [timezone, setTimeZone] = useState(getTimezone());
  const label = {
    inputProps: { "aria-label": "Repeat checkbox", id: "repeat-label" },
  };
  const changedDate = () => {
    console.log();
  };
  const [selectedDate, handleDateChange] = React.useState(new Date());
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
                  value={selectedDate}
                  onChangeCapture={() => changedDate()}
                  onChange={handleDateChange}
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
                  control={<Checkbox {...label} />}
                  label="Repeat"
                  labelPlacement="end"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Schedule;

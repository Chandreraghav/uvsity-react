import {
  Button,
  Dialog,
  DialogActions,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import { TIMEZONE } from "../../../constants/timezones";

function TimezoneBrowseDialog({
  isOpen,
  dialogCloseRequest,
  theme,
  selectedTimezone,
}) {
  if (!isOpen) return "";
  const [timezone, setTimeZone] = useState(selectedTimezone);
  const [processing, setProcessing] = useState(false);
  const handleClose = (confirmInd, closeInd) => {
    if (dialogCloseRequest) {
      if (confirmInd) setProcessing(true);
      if (confirmInd) {
        dialogCloseRequest({ confirm: confirmInd, close: closeInd, timezone });
        return;
      }
      dialogCloseRequest({ confirm: confirmInd, close: closeInd });
    }
  };
  const handleTimezoneChange = (event) => {
    setTimeZone(event.target.value);
  };
  return (
    <div
      className={`${processing ? "control__disabled__opaque" : ""} `}
    >
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        className="w-screen"
        onClose={() => handleClose(false, true)}
        disableEscapeKeyDown
        onBackdropClick={() => handleClose(false, true)}
      >
        <div className={`${theme ? "dark-dialog" : ""} w-30vw`}>
          <div className="flex justify-between">
            <div
              className={` px-4 py-3 leading-tight  text-left font-bold flex-col`}
            >
              <Typography
                className="text-sm text-gray-700"
                variant="h6"
                component="div"
              >
                <>
                  <PublicIcon fontSize="small" />{" "}
                  <span className="mt-1">Timezone</span>
                </>
              </Typography>
            </div>
            <Tooltip title="close">
              <div>
                {handleClose ? (
                  <IconButton
                    aria-label="close"
                    onClick={() => handleClose(false, true)}
                    sx={{ marginTop: 2, color: `${theme ? "#e2e2e2" : ""}` }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </div>
            </Tooltip>
          </div>
          <Grid item xs={12}>
            <div className="flex   flex-col px-4 mb-2 -mt-3 text-gray-600">
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel required htmlFor="grouped-select-timezone">
                  Browse
                </InputLabel>
                <Select
                  id="grouped-select-timezone"
                  label="Timezone"
                  value={timezone}
                  onChange={handleTimezoneChange}
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
            </div>
          </Grid>
        </div>
        <DialogActions className={`${theme ? "dark-dialog" : ""}`}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClose(true, false)}
            autoFocus
          >
            OK
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleClose(false, true)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TimezoneBrowseDialog;

import { Button, Dialog, DialogActions } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import JoinFullIcon from "@mui/icons-material/JoinFull";
function PastSessionDialog({
  data,
  type,
  isOpen,
  getSelectedSession,
  dialogCloseRequest,
  title,
  theme,
  selectedSession
}) {
  if (!isOpen) return "";
  const [pastSession, setPastSession] = useState();
  const handleClose = () => {
    if (dialogCloseRequest) {
      dialogCloseRequest();
    }
  };
  const handlePastSessionChange = (e) => {
    setPastSession(e);
  };

  const handlePastSessionChangeTransfer = () => {
    if (getSelectedSession) {
      getSelectedSession(pastSession);
    }
    if (dialogCloseRequest) {
      dialogCloseRequest();
    }
  };
  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        aria-labelledby="responsive-dialog-title"
        aria-describedby="responsive-dialog-description"
        onClose={() => handleClose()}
        disableEscapeKeyDown
        onBackdropClick={() => handleClose()}
      >
        <div className={`${theme ? "dark-dialog" : ""}`}>
          <div className={` px-4 py-2 leading-tight  text-left flex-col`}>
            <div className="flex gap-1 font-semibold">
              <JoinFullIcon />
              <>
                <div className=" text-gray-600  mt-0">
                  {title || "Past session"}{" "}
                </div>
              </>
            </div>

            <Box sx={{ width: "100%" }}>
              <Grid item>
                <FormControl
                  fullWidth={true}
                  variant="standard"
                  sx={{ marginBottom: 1 }}
                >
                  <InputLabel id="select-past-session-label">Choose</InputLabel>
                  <Select
                    fullWidth
                    onChange={handlePastSessionChange}
                    labelId="select-past-session-label"
                    id="select-past-session"
                    value={pastSession?.target?.value || selectedSession}
                    label="Choose"
                  >
                    <MenuItem
                      className="text-sm block p-2 text-gray-600"
                      value={0}
                    ></MenuItem>
                    {data &&
                      Object.values(data).map((session) => (
                        <MenuItem
                          className=" block p-2"
                          key={session.courseId}
                          value={session.courseId}
                        >
                          {session.courseFullName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Box>
          </div>
        </div>
        <DialogActions className={`${theme ? "dark-dialog" : ""}`}>
          <>
            <Button
              disabled={pastSession === null}
              onClick={() => handlePastSessionChangeTransfer()}
              autoFocus
            >
              OK
            </Button>
            <Button onClick={() => handleClose()}>Cancel</Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PastSessionDialog;

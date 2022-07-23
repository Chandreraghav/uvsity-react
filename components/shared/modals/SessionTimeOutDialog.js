import { Button, Dialog, DialogActions, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { toast } from "react-toastify";
import { SignOffUser } from "../../Auth/SignOut";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
toast.configure();

function SessionTimeOutDialog({
  isOpen,
  dialogCloseRequest,
  title,
  theme,
  name,
}) {
  if (!isOpen) return "";
  const isDark = getMode() === THEME_MODES.DARK;
  const [gracePeriodToLogOff, setGracePeriod] = useState(5);
  let timeLeft = 0;
  const Router = useRouter();
  const queryClient = useQueryClient();
  const [{}, unauthorize] = useDataLayerContextValue();

  useEffect(() => {
    timeLeft = gracePeriodToLogOff;
    window.sessionExpired = setInterval(() => {
      setGracePeriod(timeLeft--);
      // If the count down is finished, log off
      if (timeLeft < 0) {
        handleClose(true);
      }
    }, 1000);
    return () => {
      if (
        window.sessionExpired != undefined &&
        window.sessionExpired != "undefined"
      ) {
        window.clearInterval(window.sessionExpired);
      }
    };
  }, []);
  const handleClose = (logoffind) => {
    if (dialogCloseRequest) {
      dialogCloseRequest();
      if (window.sessionExpired) clearTimeout(window.sessionExpired);
    }
    if (logoffind) {
      SignOffUser(queryClient, Router, unauthorize);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        onClose={() => handleClose(true)}
        disableEscapeKeyDown
        disableBackdropClick
        onBackdropClick={() => handleClose(true)}
      >
        <div className={`${isDark ? "dark-dialog" : ""}`}>
          <div className="flex justify-between">
            <div
              className={` px-4 py-3 leading-tight  text-left font-bold flex-col`}
            >
              <Typography gutterBottom variant="h6" component="div">
                <>
                  <RemoveDoneIcon /> {title || "Title"}{" "}
                </>
              </Typography>
            </div>
          </div>
          <div className="flex flex-col px-4 mb-2 -mt-3 text-gray-600">
            Your session has expired, you will be logged out in{" "}
            {gracePeriodToLogOff} seconds.
          </div>
        </div>
        <DialogActions className={`${isDark ? "dark-dialog" : ""}`}>
          <Button onClick={() => handleClose(true)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SessionTimeOutDialog;

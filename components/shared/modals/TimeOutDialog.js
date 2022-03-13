import { Button, Dialog, DialogActions, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { AuthService } from "../../../pages/api/users/auth/AuthService";
import { toast } from "react-toastify";
import { AUTH_TOKENS } from "../../../constants/userdata";
import { eraseContext, SignOffUser } from "../../Auth/SignOut";
toast.configure();

function TimeOutDialog({
  type,
  isOpen,
  dialogCloseRequest,
  title,
  theme,
  name,
  icon,
  graceTime,
}) {
  if (!type || !isOpen) return "";
  const [gracePeriod, setGracePeriod] = useState(graceTime || 30);
  let timeLeft = 0;
  const Router = useRouter();
  const queryClient = useQueryClient();
  const [{}, unauthorize] = useDataLayerContextValue();
  const handleClose = (logoffind) => {
    if (dialogCloseRequest) {
      dialogCloseRequest();
      clearIntervals();
    }
    if (logoffind) {
      _logoff();
    }
  };
  const clearIntervals = () => {
    if (type === AUTH_TOKENS.IDLE_MONITOR) {
      if (window.idleTimeOut) clearTimeout(window.idleTimeOut);
    } else if (type === AUTH_TOKENS.SESSION_MONITOR) {
      if (window.sessionExpired) clearTimeout(window.sessionExpired);
    } else {
    }
  };
  useEffect(() => {
    timeLeft = gracePeriod;
    if (type === AUTH_TOKENS.IDLE_MONITOR) {
      window.idleTimeOut = setInterval(() => {
        setGracePeriod(timeLeft--);
        // If the count down is finished, log off
        if (timeLeft < 0) {
          handleClose(true);
        }
      }, 1000);
    } else if (type === AUTH_TOKENS.SESSION_MONITOR) {
      window.sessionExpired = setInterval(() => {
        setGracePeriod(timeLeft--);
        // If the count down is finished, log off
        if (timeLeft < 0) {
          handleClose(true);
        }
      }, 1000);
    } else {
    }
  }, []);

  const _logoff = () => {
    if (type === AUTH_TOKENS.SESSION_MONITOR) {
      AuthService.logout();
      eraseContext(unauthorize);
      Router.replace("/");
      queryClient.removeQueries();
      return;
    }
    SignOffUser(queryClient, Router, unauthorize);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        onClose={() =>
          handleClose(type === AUTH_TOKENS.IDLE_MONITOR ? false : true)
        }
        disableEscapeKeyDown
        disableBackdropClick
        onBackdropClick={() =>
          handleClose(type === AUTH_TOKENS.IDLE_MONITOR ? false : true)
        }
      >
        <div className={`${theme ? "dark-dialog" : ""}`}>
          <div className="flex justify-between">
            <div
              className={` px-4 py-3 leading-tight  text-left font-bold flex-col`}
            >
              <Typography gutterBottom variant="h6" component="div">
                <>
                  {icon ? (
                    icon
                  ) : type === AUTH_TOKENS.IDLE_MONITOR ? (
                    <DoNotDisturbOffIcon />
                  ) : (
                    <RemoveDoneIcon />
                  )}
                  {title || "Title"}{" "}
                </>
              </Typography>
            </div>
          </div>
          <div className="flex flex-col px-4 mb-2 -mt-3 text-gray-600">
            {type === AUTH_TOKENS.IDLE_MONITOR && (
              <>
                You will get timed out in {gracePeriod} seconds. Want to stay?
              </>
            )}
            {type === AUTH_TOKENS.SESSION_MONITOR && (
              <>
                {" "}
                Your session has expired, you will be logged out in{" "}
                {gracePeriod} seconds.
              </>
            )}
          </div>
        </div>
        <DialogActions className={`${theme ? "dark-dialog" : ""}`}>
          {type === AUTH_TOKENS.IDLE_MONITOR && (
            <>
              <Button onClick={() => handleClose(false)} autoFocus>
                Stay
              </Button>
              <Button onClick={() => handleClose(true)}>Sign out</Button>
            </>
          )}
          {type === AUTH_TOKENS.SESSION_MONITOR && (
            <>
              {" "}
              <Button onClick={() => handleClose(true)} autoFocus>
                OK
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TimeOutDialog;

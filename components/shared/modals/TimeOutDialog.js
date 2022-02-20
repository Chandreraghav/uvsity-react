import { Button, Dialog, DialogActions, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { AuthService } from "../../../pages/api/users/auth/AuthService";
import { actionTypes } from "../../../context/reducer";
import { handleResponse } from "../../../toastr-response-handler/handler";
import { getWorkflowError } from "../../../error-handler/handler";
import { LOGOUT } from "../../../constants/error-messages";
import { RESPONSE_TYPES } from "../../../constants/constants";
import { toast } from "react-toastify";
import SignOutService from "../../../pages/api/users/auth/SignOutService";
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
    if (type === "IDLE_MONITOR") {
      if (window.idleTimeOut) clearTimeout(window.idleTimeOut);
    } else if (type === "SESSION_MONITOR") {
      if (window.sessionExpired) clearTimeout(window.sessionExpired);
    } else {
    }
  };
  useEffect(() => {
    timeLeft = gracePeriod;
    if (type === "IDLE_MONITOR") {
      window.idleTimeOut = setInterval(() => {
        setGracePeriod(timeLeft--);
        // If the count down is finished, log off
        if (timeLeft < 0) {
          handleClose(true);
        }
      }, 1000);
    } else if (type === "SESSION_MONITOR") {
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
    handleResponse(
      LOGOUT.INFO.IN_PROGRESS,
      RESPONSE_TYPES.INFO,
      toast.POSITION.TOP_CENTER
    );
    SignOutService.signout()
      .then(() => {
        AuthService.logout();
        eraseContext();
        Router.replace("/");
        queryClient.removeQueries();
      })
      .catch((error) => {
        handleResponse(
          getWorkflowError(LOGOUT.ERRORS.LOGOUT_FAILED),
          RESPONSE_TYPES.ERROR,
          toast.POSITION.TOP_CENTER
        );
      });
  };
  const eraseContext = () => {
    unauthorize({
      type: actionTypes.SET_USER,
      user: null,
    });

    unauthorize({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: null,
    });

    unauthorize({
      type: actionTypes.CREATE_SESSION_WORKFLOW.FEES,
      fees: null,
    });

    unauthorize({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: null,
    });

    unauthorize({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: null,
    });

    unauthorize({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
      selected_past_session: null,
    });

    unauthorize({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
      sponsor: null,
    });
  };
  return (
    <>
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        onClose={() => handleClose(type === "IDLE_MONITOR" ? false : true)}
        disableEscapeKeyDown
        disableBackdropClick
        onBackdropClick={() =>
          handleClose(type === "IDLE_MONITOR" ? false : true)
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
                  ) : type === "IDLE_MONITOR" ? (
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
            {type === "IDLE_MONITOR" && (
              <>
                You will get timed out in {gracePeriod} seconds. Want to stay?
              </>
            )}
            {type === "SESSION_MONITOR" && (
              <>
                {" "}
                Your session has expired, you will be logged out in{" "}
                {gracePeriod} seconds.
              </>
            )}
          </div>
        </div>
        <DialogActions className={`${theme ? "dark-dialog" : ""}`}>
          {type === "IDLE_MONITOR" && (
            <>
              <Button onClick={() => handleClose(false)} autoFocus>
                Stay
              </Button>
              <Button onClick={() => handleClose(true)}>Sign out</Button>
            </>
          )}
          {type === "SESSION_MONITOR" && (
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
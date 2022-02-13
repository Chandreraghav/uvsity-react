import { Button, Dialog, DialogActions, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
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

function IdleTimeOutDialog({ isOpen, dialogCloseRequest, title, theme, name }) {
  if (!isOpen) return "";

  const [gracePeriodToDecision, setGracePeriod] = useState(30);
  let timeLeft = 0;
  const Router = useRouter();
  const queryClient = useQueryClient();
  const [{}, unauthorize] = useDataLayerContextValue();
  const handleClose = (logoffind) => {
    if (dialogCloseRequest) {
      dialogCloseRequest();
      if (window.idleTimeOut) clearTimeout(window.idleTimeOut);
    }
    if (logoffind) {
      _logoff();
    }
  };
  useEffect(() => {
    timeLeft = gracePeriodToDecision;
    window.idleTimeOut = setInterval(() => {
      setGracePeriod(timeLeft--);
      // If the count down is finished, log off
      if (timeLeft < 0) {
        handleClose(true);
      }
    }, 1000);
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
  };
  return (
    <>
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        onClose={() => handleClose(false)}
        disableEscapeKeyDown
        disableBackdropClick 
        onBackdropClick={()=>handleClose(false)}
      >
        <div className={`${theme ? "dark-dialog" : ""}`}>
          <div className="flex justify-between">
            <div
              className={` px-4 py-3 leading-tight  text-left font-bold flex-col`}
            >
              <Typography gutterBottom variant="h6" component="div">
                <>
                  <DoNotDisturbOffIcon /> {title || "Title"}{" "}
                </>
              </Typography>
            </div>
          </div>
          <div className="flex flex-col px-4 mb-2 -mt-3 text-gray-600">
            You will get timed out in {gracePeriodToDecision} seconds. Want to
            stay?
          </div>
        </div>
        <DialogActions className={`${theme ? "dark-dialog" : ""}`}>
          <Button onClick={() => handleClose(false)} autoFocus>
            Stay
          </Button>
          <Button onClick={() => handleClose(true)}>Sign out</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default IdleTimeOutDialog;

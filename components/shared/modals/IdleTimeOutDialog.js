import { Button, Dialog, DialogActions, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { toast } from "react-toastify";
import { SignOffUser } from "../../Auth/SignOut";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
toast.configure();

function IdleTimeOutDialog({ isOpen, dialogCloseRequest, title, theme, name }) {
  if (!isOpen) return "";
  const isDark = getMode() === THEME_MODES.DARK;
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
      SignOffUser(queryClient, Router, unauthorize)
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
    return () => {
      if (
        window.idleTimeOut != undefined &&
        window.idleTimeOut != "undefined"
      ) {
        window.clearInterval(window.idleTimeOut);
      }
    };
  }, []);

   
 
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
        <div className={`${isDark ? "dark-dialog" : ""}`}>
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
        <DialogActions className={`${isDark ? "dark-dialog" : ""}`}>
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

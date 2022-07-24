import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InterestsIcon from "@mui/icons-material/Interests";
import {
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  shouldDialogAppearInFullScreen,
  isSmallScreen,
} from "../../../utils/utility";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
import { COLOR_CODES } from "../../../constants/constants";

function ChangeInterests(props) {
  const isDark = getMode() === THEME_MODES.DARK;
  if (!props.isOpen) return "";
  const [processing, setProcessing] = useState(false);
  const [sessionRequest, setSessionRequest] = useState(props?.data);

  const handleClose = (sessionRequestObject, closeInd) => {
    if (props?.dialogCloseRequest) {
      if (!closeInd) {
        if (!sessionRequestObject || !sessionRequest) {
          return;
        }

        if (sessionRequestObject) {
          setProcessing(true);
        }
      }
      props.dialogCloseRequest({
        message: sessionRequestObject,
        close: closeInd,
      });
    }
  };

  const _isSmallScreen = isSmallScreen();
  return (
    <Dialog
      fullWidth
      fullScreen={shouldDialogAppearInFullScreen()}
      className={`${processing ? "control__disabled" : ""}`}
      open={props.isOpen}
      aria-labelledby="responsive-dialog-title"
      onClose={() => handleClose(false, true)}
      disableEscapeKeyDown
      onBackdropClick={() => handleClose(false, true)}
    >
      <div className={`${isDark ? "dark-dialog" : ""}`}>
        <div className="flex justify-between">
          <div
            className={` px-4 py-3 leading-tight  text-left font-bold flex-col `}
          >
            <Typography
              className="line-clamp-1"
              gutterBottom
              variant={_isSmallScreen ? "subtitle1" : "h6"}
              component="div"
            >
              <>
                <InterestsIcon />
                &nbsp;{props?.title}
              </>
            </Typography>
          </div>
          <Tooltip title="close">
            <div>
              {handleClose ? (
                <IconButton
                  aria-label="close"
                  onClick={() => handleClose(false, true)}
                  sx={{
                    marginTop: 2,
                    color: `${isDark ? COLOR_CODES.GRAY.DEEP : ""}`,
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : null}
            </div>
          </Tooltip>
        </div>

        <>
          {" "}
          <div className="flex flex-col px-4 mb-2 gap-3 -mt-3 text-gray-600">
            Hey ya
          </div>
        </>
      </div>
      <DialogActions
        className={`${isDark ? "dark-dialog" : ""} ${
          processing ? "control__disabled" : ""
        }`}
      >
        <Button
          color="primary"
          variant="outlined"
          onClick={() => handleClose(props.data, false)}
          autoFocus
        >
          {!processing ? "Save" : "Saving..."}
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
  );
}

export default ChangeInterests;

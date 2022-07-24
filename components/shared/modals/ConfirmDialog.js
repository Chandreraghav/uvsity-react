import {
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { THEME_MODES } from "../../../theme/ThemeProvider";
import { COLOR_CODES } from "../../../constants/constants";
function ConfirmDialog({
  isOpen,
  confirmMessage,
  dialogCloseRequest,
  title,
  theme,
  actionButtonProps,
  name,
}) {
  if (!isOpen || !confirmMessage) return "";
  const [processing, setProcessing] = useState(false);
  const handleClose = (confirmInd, closeInd) => {
    if (dialogCloseRequest) {
      if (confirmInd) setProcessing(true);
      dialogCloseRequest({ confirm: confirmInd, close: closeInd });
    }
  };
  return (
    <div className={`${processing ? "control__disabled__opaque" : ""}`}>
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        onClose={() => handleClose(false, true)}
        disableEscapeKeyDown
        fullWidth
        onBackdropClick={() => handleClose(false, true)}
      >
        <div className={`${theme===THEME_MODES.DARK ? "dark-dialog" : ""}`}>
          <div className="flex justify-between">
            <div
              className={` px-4 py-3 leading-tight  text-left font-bold flex-col`}
            >
              <Typography gutterBottom variant="h6" component="div">
                <>
                  <QuestionMarkIcon /> {title || "Confirm"}{" "}
                </>
              </Typography>
            </div>
            <Tooltip title="close">
              <div>
                {handleClose ? (
                  <IconButton
                    aria-label="close"
                    onClick={() => handleClose(false, true)}
                    sx={{ marginTop: 2, color: `${theme===THEME_MODES.DARK ? COLOR_CODES.GRAY.DEEP : ""}` }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </div>
            </Tooltip>
          </div>
          <div className="flex flex-col px-4 mb-2 -mt-3 text-gray-600">
            {confirmMessage}
          </div>
        </div>
        <DialogActions className={`${theme===THEME_MODES.DARK ? "dark-dialog" : ""}`}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClose(true, false)}
            autoFocus
          >
            {actionButtonProps? actionButtonProps.YES:'OK'}
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleClose(false, true)}
          >{actionButtonProps? actionButtonProps.NO:'Cancel'}
          
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;

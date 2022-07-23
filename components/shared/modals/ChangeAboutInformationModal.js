import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  shouldDialogAppearInFullScreen,
  isSmallScreen,
} from "../../../utils/utility";
import { USER_PROFILE } from "../../../constants/userdata";
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from "@material-ui/core/styles"
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";

function ChangeAboutInformationDialog(props) {
  
  if (!props.isOpen) return "";
  const isDark = getMode() === THEME_MODES.DARK;
  const useStyles = makeStyles({
    input: {
      color: isDark?'darkgrey':''
    }
  });
  const classes = useStyles();
  const [processing, setProcessing] = useState(false);
  const [request, setRequest] = useState(props?.data);

  const handleClose = (closeInd) => {
    if (props?.dialogCloseRequest) {
      if (!closeInd) {
        setProcessing(true);
      }
      if (closeInd) setRequest(null);
      props.dialogCloseRequest({
        id:1,
        edits: request,
        event: !closeInd?'edit':null,
        close: closeInd,
      });
    }
  };

  const handleAboutInfoChange = (e) => {
    setRequest(e.target.value);
  };
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  

  const _isSmallScreen = isSmallScreen();
  return (
    <Dialog
   fullWidth
      fullScreen={shouldDialogAppearInFullScreen()}
      className={`${processing ? "control__disabled" : ""}`}
      open={props.isOpen}
      aria-labelledby="responsive-dialog-title"
      onClose={() => handleClose(true)}
      disableEscapeKeyDown
      onBackdropClick={() => handleClose(true)}
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
                <PersonIcon />
                &nbsp;{props?.title}
              </>
            </Typography>
          </div>
          <Tooltip title="close">
            <div>
              {handleClose ? (
                <IconButton
                  aria-label="close"
                  onClick={() => handleClose(true)}
                  sx={{
                    marginTop: 2,
                    color: `${isDark ? "#e2e2e2" : ""}`,
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : null}
            </div>
          </Tooltip>
        </div>

        <div className="flex flex-col px-4 mb-2 gap-3 -mt-3 text-gray-600">
         
          <TextField
            
            fullWidth
            id="outlined-multiline-static"
            label={USER_PROFILE.PLACEHOLDERS.ABOUT_INFO}
            placeholder={USER_PROFILE.PLACEHOLDERS.WRITE_BIO}
            multiline
            rows={4}
            variant="standard"
            defaultValue=""
            inputProps={{ className: classes.input }}
            value={request}
            onChange={(event) => debounce(handleAboutInfoChange(event), 500)}
          />
           
        </div>
      </div>
      <DialogActions
        className={`${isDark ? "dark-dialog" : ""} ${
          processing ? "control__disabled" : ""
        }`}
      >
        <Button
          color="primary"
          variant="outlined"
          onClick={() => handleClose(false)}
          autoFocus
        >
          {!processing ? "Save" : "Saving..."}
        </Button>

        <Button
          color="error"
          variant="outlined"
          onClick={() => handleClose(true)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeAboutInformationDialog;

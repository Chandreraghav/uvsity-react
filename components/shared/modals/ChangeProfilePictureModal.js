import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FaceIcon from "@mui/icons-material/Face";
import { USER_PROFILE } from "../../../constants/userdata";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
function ChangeProfilePictureDialog({
  isOpen,
  data,
  dialogCloseRequest,
  title,
  theme,
  consumeEvent,
  actionButtonProps,
}) {
  if (!isOpen) return "";
  const isDark = getMode() === THEME_MODES.DARK;
  const picture = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [displayedPicture, setDisplayedPicture] = useState(null);
  let target = data?.target;
  let newTarget = null;
  
  useEffect(() => {
    readURLFromMultiMediaObject(target);
    return () => {
      setDisplayedPicture(null);
      setProcessing(false);
    };
  }, []);
  const readURLFromMultiMediaObject = (input) => {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload =  (e)=> {
        setDisplayedPicture(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
 
  const handleClose = (saveInd, closeInd, event, reason) => {
    if (reason && reason === "backdropClick") return;
    if (dialogCloseRequest) {
      if (saveInd) setProcessing(true);
     
      dialogCloseRequest({
        save: saveInd,
        close: closeInd,
        target: saveInd ? (newTarget ? newTarget : target) : null,
      });
    }
  };
  const handleChooseAnotherImage = () => {
    picture.current.click();
  };
  
  const onPictureChange = (event) => {
    newTarget = event;
    readURLFromMultiMediaObject(event.target);
    if (consumeEvent) {
      consumeEvent(newTarget);
    }
  };
  return (
    <div className={`${processing ? "control__disabled__opaque" : ""}`}>
      <input
        ref={picture}
        onChange={(event) => onPictureChange(event)}
        className="hidden"
        type="file"
        id="picture"
        name="profilePicture"
        accept="image/*"
      />
      <Dialog
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        onClose={(event, reason) => handleClose(false, true, event, reason)}
        disableEscapeKeyDown
      >
        <div
          className={`${isDark ? "dark-dialog" : ""} ${
            processing ? "control__disabled__opaque" : ""
          }`}
        >
          <div className="flex justify-between">
            <div
              className={` px-4 py-3 leading-tight  text-left font-bold flex-col`}
            >
              <Typography gutterBottom variant="h6" component="div">
                <>
                  <FaceIcon /> {title || USER_PROFILE.CHANGE_PROFILE_PICTURE}{" "}
                </>
              </Typography>
            </div>
            <Tooltip title="close">
              <div>
                <IconButton
                  aria-label="close"
                  onClick={() => handleClose(false, true)}
                  sx={{ marginTop: 2, color: `${isDark ? "#e2e2e2" : ""}` }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            </Tooltip>
          </div>
          <div
            onClick={handleChooseAnotherImage}
            className="flex justify-center items-center flex-col px-4 mb-2 -mt-3 text-gray-600"
          >
            <Avatar
              className={`  avatar-lg cursor-pointer  opacity-100`}
              src={displayedPicture}
            />
          </div>
        </div>
        <DialogActions
          className={`${isDark ? "dark-dialog" : ""} ${
            processing ? "control__disabled__opaque" : ""
          }`}
        >
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClose(true, true)}
            autoFocus
          >
            {processing
              ? "Saving..."
              : actionButtonProps
              ? actionButtonProps.YES
              : "Save"}
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleClose(false, true)}
          >
            {actionButtonProps ? actionButtonProps.NO : "Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ChangeProfilePictureDialog;

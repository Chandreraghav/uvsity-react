/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { INBOX, RECOMMENDATIONS } from "../../../constants/userdata";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { isFullScreen } from "../../../utils/utility";
function PolyMessagingDialog(props) {
  if (!props.isOpen) return "";
  const getTitle = () => {
    if (props.workflow === RECOMMENDATIONS.REQUEST_TYPE) {
      return props.title
        ? RECOMMENDATIONS.REQUEST_RECOMMENDATION_CUSTOM.replace(
            "<#>",
            props.title
          )
        : RECOMMENDATIONS.REQUEST_RECOMMENDATION;
    }
    return props.title
      ? INBOX.SEND_MESSAGE_CUSTOM.replace("<#>", props.title)
      : INBOX.SEND_MESSAGE;
  };
  const workflow = props.workflow || RECOMMENDATIONS.REQUEST_TYPE;
  const icon =
    workflow === RECOMMENDATIONS.REQUEST_TYPE ? (
      <RecommendOutlinedIcon />
    ) : (
      <SendIcon />
    );
  const title = getTitle();
  const [processing, setProcessing] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleClose = (messageObject, closeInd) => {
    if (props?.dialogCloseRequest) {
      if (!closeInd) {
        if (subject.trim() === "" || message.trim() === "") {
          return;
        }

        if (messageObject) {
          setProcessing(true);
          messageObject.subject = subject.trim();
          messageObject.message = message.trim();
        }
      }
      if(workflow === RECOMMENDATIONS.REQUEST_TYPE)
      props.dialogCloseRequest({ recommendation:messageObject, close: closeInd, event:workflow });
      else  props.dialogCloseRequest({ message:messageObject, close: closeInd, event:workflow });
    }
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
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleRecommendationRequestMessage = (e) => {
    setMessage(e.target.value);
  };
  return (
    <Dialog
    fullScreen={isFullScreen()}
      className={`${processing ? "control__disabled__opaque" : ""}`}
      open={props.isOpen}
      aria-labelledby="responsive-dialog-title"
      onClose={() => handleClose(false, true)}
      disableEscapeKeyDown
      onBackdropClick={() => handleClose(false, true)}
    >
      <div className={`${props?.theme ? "dark-dialog" : ""}`}>
        <div className="flex justify-between">
          <div
            className={` px-4 py-3 leading-tight  text-left font-bold flex-col `}
          >
            <Typography
              className="line-clamp-1"
              gutterBottom
              variant="h6"
              component="div"
            >
              <>
                {icon}
                &nbsp;
                {title}
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
                    color: `${props?.theme ? "#e2e2e2" : ""}`,
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
            id="standard-basic-subject"
            label={
              workflow === RECOMMENDATIONS.REQUEST_TYPE
                ? RECOMMENDATIONS.REQUEST_RECOMMENDATION_SUBJECT_LABEL
                : INBOX.MESSAGE_SUBJECT_LABEL
            }
            variant="standard"
            value={subject}
            onChange={(event) => debounce(handleSubjectChange(event), 500)}
          />

          <TextField
            fullWidth
            id="outlined-multiline-static"
            label={
              workflow === RECOMMENDATIONS.REQUEST_TYPE
                ? RECOMMENDATIONS.REQUEST_RECOMMENDATION_NOTE_LABEL
                : INBOX.MESSAGE_TEXT_LABEL
            }
            placeholder={
              workflow === RECOMMENDATIONS.REQUEST_TYPE
                ? RECOMMENDATIONS.REQUEST_RECOMMENDATION_PLACEHOLDER
                : INBOX.MESSAGE_TEXT_PLACEHOLDER
            }
            multiline
            rows={4}
            variant="standard"
            defaultValue=""
            onChange={(event) =>
              debounce(handleRecommendationRequestMessage(event), 500)
            }
          />
        </div>
      </div>
      <DialogActions
        className={`${props?.theme ? "dark-dialog" : ""} ${
          processing ? "control__disabled__opaque" : ""
        }`}
      >
        <Tooltip
          title={
            workflow === RECOMMENDATIONS.REQUEST_TYPE
              ? RECOMMENDATIONS.SEND_RECOMMENDATION
              : INBOX.SEND_MESSAGE
          }
        >
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClose(props.data, false)}
            autoFocus
          >
            {!processing ? "Send" : "Sending..."}
          </Button>
        </Tooltip>

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

export default PolyMessagingDialog;

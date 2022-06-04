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
import { RECOMMENDATIONS } from "../../../constants/userdata";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
function AskRecommendationDialog(props) {
  if (!props.isOpen) return "";
  const [processing, setProcessing] = useState(false);
  const [subject, setSubject] = useState('');
  const [recommendationRequestMessage, setRecommendationRequestMessage] =
    useState('');
  const handleClose = (recommendation, closeInd) => {
    if (props?.dialogCloseRequest) {
      if(!closeInd){
        if(subject.trim()==='' || recommendationRequestMessage.trim()===''){
          return;
        }
      
      if (recommendation) {
      setProcessing(true);
      recommendation.subject=subject.trim();
      recommendation.message=recommendationRequestMessage.trim()
      }
    }
      props.dialogCloseRequest({ recommendation, close: closeInd });
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
    setRecommendationRequestMessage(e.target.value);
  };
  return (
    <div className={`${processing ? "control__disabled__opaque" : ""}`}>
      <Dialog
        
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
                  <RecommendOutlinedIcon />
                  &nbsp;
                  {props.title
                    ? RECOMMENDATIONS.REQUEST_RECOMMENDATION_CUSTOM.replace(
                        "<#>",
                        props.title
                      )
                    : RECOMMENDATIONS.REQUEST_RECOMMENDATION}
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
              id="standard-basic"
              label="Subject"
              variant="standard"
              value={subject}
              onChange={(event) => debounce(handleSubjectChange(event), 500)}
            />

            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="Write a recommendation request..."
              defaultValue=""
              value={recommendationRequestMessage}
              onChange={(event) =>
                debounce(handleRecommendationRequestMessage(event), 500)
              }
              style={{ width: 550, height: 200 }}
            />
          </div>
        </div>
        <DialogActions className={`${props?.theme ? "dark-dialog" : ""}`}>
          <Tooltip title={RECOMMENDATIONS.SEND_RECOMMENDATION}>
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
    </div>
  );
}

export default AskRecommendationDialog;

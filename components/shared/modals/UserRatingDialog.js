import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import {
  Button,
  Dialog,
  DialogActions,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { isFullScreen, isSmallScreen } from "../../../utils/utility";
import { RATING } from "../../../constants/userdata";
function UserRatingDialog(props) {
  if (!props.isOpen) return "";
  const [processing, setProcessing] = useState(false);
  const [rating, setRating] = useState(null);
  
  const handleClose = (ratingObject, closeInd) => {
    if (props?.dialogCloseRequest) {
      if (!closeInd) {
        if (!ratingObject || !rating) {
          return;
        }

        if (ratingObject) {
          setProcessing(true);
          ratingObject.rating = rating;
        }
      }
      props.dialogCloseRequest({
        message: ratingObject,
        close: closeInd,
      });
    }
  };
  const handleRatingChange=(e)=>{
      setRating(e.target.value)
  }
  const _isSmallScreen= isSmallScreen()
  return (
    <Dialog
      fullScreen={isFullScreen()}
      className={`${processing ? "control__disabled" : ""}`}
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
              variant={_isSmallScreen?'subtitle1':'h6'}
              component="div"
            >
              <>
                <ThumbsUpDownIcon />
                &nbsp; Rate {props?.title}
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
          <FormControl>
            <RadioGroup
              className="text-gray-600 text-xs font-normal"
              aria-labelledby="radio-buttons"
              name="row-radio-buttons-group"
              value={rating}
              onChange={handleRatingChange}
            >
              <div className="flex">
                {RATING.TYPES.map((option) => (
                  <div
                    className="text-gray-700 leading-snug text-xs font-normal "
                    key={option.id}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={<>{option.alias}</>}
                    />
                  </div>
                ))}
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <DialogActions
        className={`${props?.theme ? "dark-dialog" : ""} ${
          processing ? "control__disabled" : ""
        }`}
      >
        <Button
          color="primary"
          variant="outlined"
          onClick={() => handleClose(props.data, false)}
          autoFocus
        >
          {!processing ? "Rate now" : "Rating..."}
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

export default UserRatingDialog;

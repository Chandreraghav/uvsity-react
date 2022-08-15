import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  shouldDialogAppearInFullScreen,
  isSmallScreen,
  isEmptyObject,
} from "../../../utils/utility";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
import { COLOR_CODES } from "../../../constants/constants";
import { makeStyles } from "@material-ui/core/styles";
import { USER } from "../../../validation/services/auth/ValidationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function ChangeSocialProfileURIDialog(props) {
  const isDark = getMode() === THEME_MODES.DARK;
  if (!props.isOpen) return "";
  const formOptions = {
    resolver: yupResolver(USER.PROFILE.EDIT.SOCIAL),
    mode: "all",
  };
  const { register, formState, watch, reset } = useForm(formOptions);
  const { errors } = formState;

  const deepGray = COLOR_CODES.GRAY.DEEP;
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiFormLabel-root": {
        color: isDark ? deepGray : "", // or black
      },
    },
    input: {
      color: isDark ? deepGray : "",
      borderBottom: `1px solid ${isDark ? deepGray : "none"}`,
      "&:focus": {
        borderBottom: "none",
      },
    },
  }));
  const classes = useStyles();
  const [processing, setProcessing] = useState(false);
  const [request, setRequest] = useState(props?.data?.url);
  const handleURIChange = (e) => {
    setRequest(e.target.value?.trim());
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
  const handleClose = (requestObject, closeInd) => {
    if (props?.dialogCloseRequest) {
      if (!closeInd) {
        setProcessing(true);
        if (!isEmptyObject(errors)) {
          // if the form contains errors
          setProcessing(false);
          return;
        }
      }
      props.dialogCloseRequest({
        event: !closeInd ? "edit" : null,
        url: request,
        close: closeInd,
        id: 600,
        alias:props?.data.alias,
        selectedId:props?.data.id
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
                {props?.data?.icon}
                &nbsp;Edit {props?.data.alias} profile
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

        <div className="flex flex-col px-4 mb-2 gap-3 -mt-3 text-gray-600">
          <form name="edit-profile-highlight-form">
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {/* Designation */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <TextField
                      fullWidth
                      inputProps={{ className: classes.input }}
                      className={classes.root}
                      label={`${props?.data.alias} profile`}
                      placeholder={`Update your ${props?.data.alias} profile`}
                      value={request}
                      variant="standard"
                      name="uri"
                      {...register(`uri`, {
                        onChange: (event) => {
                          debounce(handleURIChange(event), 500);
                        },
                      })}
                      helperText={errors.uri?.message}
                      error={errors.uri?.message ? true : false}
                      id="uri"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </form>
        </div>
      </div>
      <DialogActions
        className={`${isDark ? "dark-dialog" : ""} ${
          processing ? "control__disabled" : ""
        }`}
      >
        <Button
          className={!isEmptyObject(errors) ? "control__disabled__opaque" : ""}
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

export default ChangeSocialProfileURIDialog;

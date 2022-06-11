import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  shouldDialogAppearInFullScreen,
  isSmallScreen,
} from "../../../utils/utility";
import { USER_PROFILE } from "../../../constants/userdata";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@material-ui/core/styles";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { useForm } from "react-hook-form";
import {
  SESSION,
  USER,
} from "../../../validation/services/auth/ValidationSchema";
import { getLocalStorageObject } from "../../../localStorage/local-storage";
function ChangeProfileHeadlineDialog(props) {
  if (!props.isOpen) return "";
  console.log(props.data )
  const countries = JSON.parse(getLocalStorageObject('uvsity-countries'))
  const useStyles = makeStyles({
    input: {
      color: props?.theme ? "darkgrey" : "",
    },
  });
  const classes = useStyles(); 
  const [processing, setProcessing] = useState(false);
  const [request, setRequest] = useState(props?.data);
  const [designation, setDesignation] = useState(props.data.designation);
  const [specialization, setSpecialization] = useState(props?.data.specialization);
  const [instituition, setInstituation] = useState(props.data.institution);
  const [highestDegree, setHighestDegree] = useState(props.data.education.highestLevel);
  const [countryId, setCountryId] = useState(null);
  const [city, setCity] = useState(props.data.city);

  const handleClose = (closeInd) => {
    if (props?.dialogCloseRequest) {
      if (!closeInd) {
        setProcessing(true);
      }
      if (closeInd) setRequest(null);
      props.dialogCloseRequest({
        id: 1,
        edits: request,
        event: !closeInd ? "edit" : null,
        close: closeInd,
      });
    }
  };
  const formOptions = {
    resolver: yupResolver(USER.PROFILE.EDIT.HIGHLIGHTS),
    mode: "all",
  };
  const { register, formState, watch, reset } = useForm(formOptions);
  const { errors } = formState;

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
  };

  const handleInstituitionChange = (e) => {
    setInstituation(e.target.value);
  };
  const handleHighestDegreeChange = (e) => {
    setHighestDegree(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountryId(e.target.value);
  };
  const handleCityChange=(e)=>{
    setCity(e.target.value)
  }
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
      fullScreen
      className={`${processing ? "control__disabled" : ""} h-screen ${
        props?.theme ? "dark-dialog" : ""
      }`}
      open={props.isOpen}
      aria-labelledby="responsive-dialog-title"
      onClose={() => handleClose(true)}
      disableEscapeKeyDown
      onBackdropClick={() => handleClose(true)}
    >
      <div className={`${props?.theme ? "dark-dialog" : ""} h-screen`}>
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
                <ViewHeadlineIcon />
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
          <form name="edit-profile-highlight-form">
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* Designation */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <TextField
                      variant="standard"
                      value={designation}
                      name="designation"
                      {...register(`designation`, {
                        onChange: (event) => {
                          debounce(handleDesignationChange(event), 500);
                        },
                      })}
                      helperText={errors.designation?.message}
                      error={errors.designation?.message ? true : false}
                      required
                      label="Title"
                      id="designation"
                      
                    />
                     
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* Specialization */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <TextField
                      variant="standard"
                      value={specialization}
                      name="specialization"
                      {...register(`specialization`, {
                        onChange: (event) => {
                          debounce(handleSpecializationChange(event), 500);
                        },
                      })}
                      helperText={errors.specialization?.message}
                      error={errors.specialization?.message ? true : false}
                      required
                      label="Specialization"
                      id="specialization"
                    />
                     
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* Instituition */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <TextField
                      variant="standard"
                      value={instituition}
                      name="instituition"
                      {...register(`instituition`, {
                        onChange: (event) => {
                          debounce(handleInstituitionChange(event), 500);
                        },
                      })}
                      helperText={errors.instituition?.message}
                      error={errors.instituition?.message ? true : false}
                      required
                      label="Instituition of highest degree"
                      id="instituition"
                    />
                    
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* HighestDegree */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <TextField
                      variant="standard"
                      value={highestDegree}
                      name="highestDegree"
                      {...register(`highestDegree`, {
                        onChange: (event) => {
                          debounce(handleHighestDegreeChange(event), 500);
                        },
                      })}
                      helperText={errors.highestDegree?.message}
                      error={errors.highestDegree?.message ? true : false}
                      required
                      label="Highest degree"
                      id="highestDegree"
                    />
                    
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* Country */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <InputLabel id="select-country-label">
                      Choose a country{" "}
                      <h3
                        className={`${
                          errors.category?.message
                            ? "text-red-600"
                            : "text-blue-800"
                        } text-xl font-bold inline-flex`}
                      >
                        *
                      </h3>
                    </InputLabel>
                    <Select
                      name="country"
                      {...register(`country`, {
                        onChange: (event) => {
                          debounce(handleCountryChange(event), 500);
                        },
                      })}
                      error={errors.country?.message ? true : false}
                      labelId="select-country-label"
                      id="select-country"
                      value={countryId}
                      required
                      label="Country"
                    >
                      {countries?.map((country) => (
                        <MenuItem
                          className=" block p-2"
                          key={country.ccn3}
                          value={country.ccn3}
                        >
                          {country.name.common}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.country?.message && (
                      <>
                        <FormHelperText className=" text-red-600">
                          {errors.country?.message}
                        </FormHelperText>
                      </>
                    )}
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* City */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <TextField
                      variant="standard"
                      value={city}
                      name="city"
                      {...register(`city`, {
                        onChange: (event) => {
                          debounce(handleCityChange(event), 500);
                        },
                      })}
                      helperText={errors.city?.message}
                      error={errors.city?.message ? true : false}
                      required
                      label="City"
                      id="city"
                    />
                     
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </form>
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

export default ChangeProfileHeadlineDialog;

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import ScienceIcon from "@mui/icons-material/Science";
import HelpIcon from "@mui/icons-material/Help";
import CEditor from "../../Thirdparty/Editor/CKEditor";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  isEmptyObject,
  isSmallScreen,
  isValidDate,
  isValidDatePeriod,
} from "../../../utils/utility";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { USER } from "../../../validation/services/auth/ValidationSchema";
import { THEME_MODES, useTheme } from "../../../theme/ThemeProvider";
import { COLOR_CODES } from "../../../constants/constants";
import CommonSearchService from "../../../pages/api/search/CommonSearchService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { WORK_EXPERIENCE_FORM_ERRORS } from "../../../constants/error-messages";

function ChangeWorkExperience(props) {
  if (!props.isOpen) return "";
  const deepGray = COLOR_CODES.GRAY.DEEP;
  const [theme, dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  const lightGray = COLOR_CODES.GRAY.LIGHT;
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiInputBase-root": {
        "&:hover": {
          borderBottom: `${isDark ? `1px solid ${deepGray}` : "none"}`,
        },
        "&.Mui-focused": {
          borderBottom: "none",
        },
      },

      "& .MuiFormLabel-root": {
        color: isDark ? deepGray : "inherit", // or black
      },

      "&:focus": {
        borderBottom: "none",
      },
    },
    input: {
      color: isDark ? deepGray : "inherit",
      borderBottom: ` ${isDark ? `1px solid ${deepGray}` : "none"}`,
      "&:focus": {
        borderBottom: "none",
      },
    },
    formControl: {
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: `${isDark ? `1px solid ${deepGray}` : ""}`,
      },
    },
    select: {
      color: isDark ? deepGray : "",

      "&:before": {
        borderBottom: ` ${isDark ? `1px solid ${lightGray}` : ""}`,
      },
    },
    icon: {
      fill: isDark ? deepGray : "inherit",
    },
    menuItem: {
      backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
      color: isDark ? `${deepGray}` : "",
      "&.Mui-selected": {
        backgroundColor: `${isDark ? COLOR_CODES.BLUE.DARK : ""}`,
        color: isDark ? `${deepGray}` : "",
        fontWeight: 600,
      },
      "&:hover": {
        backgroundColor: isDark ? `${COLOR_CODES.BLUE.LIGHT}!important` : "",
      },
    },
    switch_track: {
        backgroundColor: "#f50057",
    },
    switch_base: {
        color: "#f50057",
        "&.Mui-disabled": {
            color: "#e886a9"
        },
        "&.Mui-checked": {
            color: "#95cc97"
        },
        "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#4CAF50",
        }
    },
    switch_primary: {
        "&.Mui-checked": {
            color: "#4CAF50",
        },
        "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#4CAF50",
        },
    },
  }));
  const classes = useStyles();
  const [processing, setProcessing] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [request, setRequest] = useState(null);
  const [fromDate, setFromDateChange] = useState(
    props?.data?.projResearchStartDateForDisplay ??""
  );
  const [toDate, setToDateChange] = useState(
    props?.data?.projResearchEndDateForDisplay ?? ""
  );
  const [designation, setDesignation] = useState(
    props.data?.projectResearchTitle
  );

  const isPresent = props.data?.isPresent==='T'
  const [presentWorkPlace, setPresentWorkPlace] = useState(
    isPresent
  );

  const [presentWorkPlaceDisabled, setPresentWorkPlaceDisabled] = useState(
    false
  );

  const [description, setDescription] = useState(
  props.data?.projectResearchDescription
  );
  const [filteredDesignationList, setFilteredDesignationList] = useState([]);
  const [organization, setOrganization] = useState(
     props.data?.projectResearchExpEducationInsitution
  );
  const [filteredOrgzList, setFilteredOrgzList] = useState([]);
  const filteredOrgzListRef = useRef(null);
  const [location, setLocation] = useState(
    props.data?.projectResearchExpCampus
  );
  const formOptions = {
    resolver: yupResolver(USER.PROFILE.EDIT.HIGHLIGHTS),
    mode: "all",
  };
  const { register, formState, watch, reset, setError, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;
  useEffect(() => {
    reset();
  }, [isSubmitted, reset]);
  useEffect(() => {
    setDark(theme.mode === THEME_MODES.DARK);
  }, [theme]);

  useEffect(() => {
    if(toDate && isValidDate(toDate,"MMMM,yyyy")){
        setPresentWorkPlace(false)
        setPresentWorkPlaceDisabled(true)
    }
    else { 
        setPresentWorkPlaceDisabled(false)
    }
    if(presentWorkPlace){
        setToDateChange("")
        clearErrors('toDate')
    }
  }, [toDate,presentWorkPlace]);
 
  const handleClose = (closeInd) => {
    if (props?.dialogCloseRequest) {
        setFilteredDesignationList([]);
        setFilteredOrgzList([])
      if (!closeInd) {
        setProcessing(true);
        let hasErrors = false;
        if (!fromDate) {
            setError("fromDate", {
              type: "required",
              message: WORK_EXPERIENCE_FORM_ERRORS.PERIOD.FROM.REQUIRED,
            });
            hasErrors = true;
          }
          if(presentWorkPlace === false){ 
            // if workplace is not present, then validate end date
            if (!toDate) {
                setError("toDate", {
                  type: "required",
                  message: WORK_EXPERIENCE_FORM_ERRORS.PERIOD.TO.REQUIRED,
                });
                hasErrors = true;
              }
          }

          if(presentWorkPlace === true){ 
              // we do not care about to date if workplace is present.
                setToDateChange("")
                clearErrors("toDate");
             
          }

          const start = new Date(fromDate);
          if (start === "Invalid Date") {
            setError("fromDate", {
              type: "required",
              message: WORK_EXPERIENCE_FORM_ERRORS.PERIOD.FROM.REQUIRED,
            });
            hasErrors = true;
          }
          const end = new Date(toDate);
          if(presentWorkPlace === false){
            if (end === "Invalid Date") {
                setError("toDate", {
                  type: "required",
                  message: WORK_EXPERIENCE_FORM_ERRORS.PERIOD.TO.REQUIRED,
                });
                hasErrors = true;
              }
              if (!isValidDatePeriod(start, end)) {
                setError("toDate", {
                  type: "required",
                  message: WORK_EXPERIENCE_FORM_ERRORS.PERIOD.TO.RANGE_ERROR,
                });
                setError("fromDate", {
                  type: "required",
                  message: WORK_EXPERIENCE_FORM_ERRORS.PERIOD.FROM.RANGE_ERROR,
                });
                hasErrors = true;
              }
          }
        if (!isEmptyObject(errors) || hasErrors) {
          // if the form contains errors
          setProcessing(false);
          return;
        }
      }
      clearErrors();
      props.dialogCloseRequest({
        id: 3,
        event: props.mode,
        data: !closeInd
          ? {
              designation,
              organization,
              location,
              presentWorkPlace,
              fromDate,
              toDate,
              description
            }
          : null,
        close: closeInd,
      });
    }
  };
  let filterTimeout;
  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
    clearTimeout(filterTimeout);
    if (!e.target.value) {
      setFilteredDesignationList([]);
      return;
    }
    // debounce filter for designation by 1 second
    if (e.target.value) {
      filterTimeout = setTimeout(() => {
        CommonSearchService.searchUserType(e.target.value)
          .then((res) => {
            if (res.data) setFilteredDesignationList(res.data);
            else setFilteredDesignationList([]);
          })
          .catch(() => {
            setFilteredDesignationList([]);
          });
      }, 1000);
    }
  };

  const handleOrgzChange = (e) => {
    setOrganization(e.target.value);
    clearTimeout(filterTimeout);
    if (!e.target.value) {
      setFilteredOrgzList([]);
      return;
    }
    // debounce filter for organization by 1 second
    if (e.target.value) {
      filterTimeout = setTimeout(() => {
        CommonSearchService.searchEduIns(e.target.value)
          .then((res) => {
            if (res.data) setFilteredOrgzList(res.data);
            else setFilteredOrgzList([]);
          })
          .catch(() => {
            setFilteredOrgzList([]);
          });
      }, 1000);
    }
  };

  const handlelocationChange = (e) => {
    setLocation(e.target.value);
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
  const handleDesignationSelect = (_designation) => {
    setDesignation(_designation.userSubTypeMaster);
    setFilteredDesignationList([]);
  };
  const handleOrgzSelect = (_orgz) => {
    setOrganization(_orgz.educationalInstitutionFullName);
    setFilteredOrgzList([]);
  };
  const handleDescriptionError=(err)=>{

  }
  const handlePresentWorkplaceChange =(event)=>{
    setPresentWorkPlace(!presentWorkPlace);
  }
  const handleEditorDataOnChange =(data)=>{
  setDescription(data)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filteredOrgzListRef.current &&
        !filteredOrgzListRef.current.contains(event.target)
      ) {
        setFilteredOrgzList([]);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [filteredOrgzList]);
  const _isSmallScreen = isSmallScreen();
 
  return (
    <Dialog
      fullScreen
      className={`${processing ? "control__disabled" : ""}   `}
      open={props.isOpen}
      aria-labelledby="responsive-dialog-title"
      onClose={() => handleClose(true)}
      disableEscapeKeyDown
      onBackdropClick={() => handleClose(true)}
    >
      <div className={`${isDark ? "dark-dialog" : ""} `}>
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
                <ScienceIcon />
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
                    color: `${isDark ? deepGray : ""}`,
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
                  {/* Organization */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <TextField
                      variant="standard"
                      value={organization}
                      name="organization"
                      inputProps={{ className: classes.input }}
                      className={classes.root}
                      {...register(`organization`, {
                        onChange: (event) => {
                          debounce(handleOrgzChange(event), 500);
                        },
                      })}
                      helperText={errors.organization?.message}
                      error={errors.organization?.message ? true : false}
                      required
                      label={
                        <label className=" text-blue-800">Organization</label>
                      }
                      id="organization"
                    />
                  </FormControl>
                  {filteredOrgzList && (
                    <Grid
                      ref={filteredOrgzListRef}
                      item
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                    >
                      <div className=" bg-gray-400 rounded-lg dark:bg-gray-dark z-50 max-h-40 absolute overflow-auto will-change-auto">
                        {filteredOrgzList.map((orgz, id) => (
                          <div
                            onClick={() => handleOrgzSelect(orgz)}
                            className="hover:bg-blue-800 hover:font-bold max-w-sm px-2 py-2 dark:text-gray-500 hover:text-gray-100 text-gray-700 cursor-pointer"
                            key={id}
                          >
                            {orgz.educationalInstitutionFullName}
                          </div>
                        ))}
                      </div>
                    </Grid>
                  )}
                </Grid>
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
                      label={
                        <label className=" text-blue-800">Designation</label>
                      }
                      inputProps={{ className: classes.input }}
                      className={classes.root}
                      id="designation"
                    />
                  </FormControl>
                  {filteredDesignationList && (
                    <div className=" bg-gray-400 rounded-lg dark:bg-gray-dark z-50 max-h-40 absolute overflow-auto will-change-auto  ">
                      {filteredDesignationList.map((designation, id) => (
                        <div
                          onClick={() => handleDesignationSelect(designation)}
                          className="hover:bg-blue-800 hover:font-bold whitespace-nowrap text-ellipsis max-w-xs px-2 py-2 dark:text-gray-500 hover:text-gray-100 text-gray-700 cursor-pointer"
                          key={id}
                        >
                          {designation.userSubTypeMaster}
                        </div>
                      ))}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                   {/* Present workplace */}
                <FormControl variant="filled">
                              <FormControlLabel
                    control={
                        <Switch
                       
                        disabled={presentWorkPlaceDisabled}
                        classes={{
                         track: classes.switch_track,
                         switchBase: classes.switch_base,
                         colorPrimary: classes.switch_primary,
                         }}
                         name="presentWorkPlace"
                         id="presentWorkPlace"
                         size="small"
                        
                         {...register(`presentWorkPlace`)}
                         onClick= {handlePresentWorkplaceChange}
                        
                         checked={presentWorkPlace}
                         inputProps={{ "aria-label": "controlled" }}
                       />
   
                    }
                    label={<><Typography className=" text-sm  dark: text-gray-600 text-gray-800 "  variant="subtitle1">I work here currently <Tooltip title="Turn on this option, if this is your current work place."><HelpIcon fontSize="small"/></Tooltip></Typography></>}
                  />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {/* location */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <TextField
                      variant="standard"
                      value={location}
                      name="location"
                      {...register(`location`, {
                        onChange: (event) => {
                          debounce(handlelocationChange(event), 500);
                        },
                      })}
                      helperText={errors.location?.message}
                      error={errors.location?.message ? true : false}
                      required
                      label={<label className=" text-blue-800">Location</label>}
                      inputProps={{ className: classes.input }}
                      className={classes.root}
                      id="location"
                    />
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* From Month and Year */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      autoOk
                      inputFormat="MMMM,YYYY"
                      views={["year", "month"]}
                      label={<label className={`text-blue-800`}>From<span className={`${errors.fromDate?.message?'text-red-100':'text-blue-800'}`}>*</span></label>}
                      renderInput={(params) =>
                        theme.mode === THEME_MODES.DARK ? (
                          <TextField
                            margin="dense"
                            fullWidth
                            sx={{
                              svg: { color: `${deepGray}` },
                              input: {
                                color: "#fff",
                                borderBottom: `1px solid ${deepGray}`,
                              },
                            }}
                            variant="standard"
                            id="fromDate"
                            name="fromDate"
                            {...params}
                            {...register(`fromDate`, {})}
                            helperText={errors.fromDate?.message}
                            error={errors.fromDate?.message ? true : false}
                          />
                        ) : (
                          <TextField
                            format="MMMM,YYYY"
                            margin="dense"
                            fullWidth
                            sx={{
                              svg: { color: `#696969` },
                              input: {
                                color: "#696969",
                                borderBottom: "1px solid none",
                              },
                            }}
                            variant="standard"
                            id="fromDate"
                            name="fromDate"
                            {...params}
                            {...register(`fromDate`)}
                            helperText={errors.fromDate?.message}
                            error={errors.fromDate?.message ? true : false}
                          />
                        )
                      }
                      maxDate={new Date()}
                      value={fromDate}
                      onChange={(newvalue) => {
                        setFromDateChange(newvalue);
                        if (isValidDate(newvalue, "MMMM,yyyy"))
                          clearErrors("fromDate");
                        else if (isValidDatePeriod(newvalue, toDate)) {
                          clearErrors("fromDate");
                          clearErrors("toDate");
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* To Month and Year */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      autoOk
                      
                      inputFormat="MMMM,YYYY"
                      views={["year", "month"]}
                      label={<label className={`text-blue-800`}>To
                      {!presentWorkPlace && <span className={`${errors.fromDate?.message?'text-red-100':'text-blue-800'}`}>*</span>}
                      </label>}
                      renderInput={(params) =>
                        theme.mode === THEME_MODES.DARK ? (
                          <TextField
                            margin="dense"
                            fullWidth
                            
                            sx={{
                              svg: { color: `${deepGray}` },
                              input: {
                                color: "#fff",
                                borderBottom: `1px solid ${deepGray}`,
                              },
                            }}
                            variant="standard"
                            id="toDate"
                            name="toDate"
                            {...params}
                            {...register(`toDate`, {})}
                            helperText={errors.toDate?.message}
                            error={errors.toDate?.message ? true : false}
                          />
                        ) : (
                          <TextField
                            format="MMMM,YYYY"
                            margin="dense"
                            fullWidth
                            
                            sx={{
                              svg: { color: `#696969` },
                              input: {
                                color: "#696969",
                                borderBottom: "1px solid none",
                              },
                            }}
                            variant="standard"
                            id="toDate"
                            name="toDate"
                            {...params}
                            {...register(`toDate`, {})}
                            helperText={errors.toDate?.message}
                            error={errors.toDate?.message ? true : false}
                          />
                        )
                      }
                      maxDate={new Date()}
                      value={toDate}
                      onChange={(newvalue) => {
                        setToDateChange(newvalue);
                        if (isValidDate(newvalue, "MMMM,yyyy")){
                            clearErrors("toDate");
                             
                        }
                          
                        else if (isValidDatePeriod(fromDate, newvalue)) {
                          clearErrors("toDate");
                          clearErrors("fromDate");
                           
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <div className="px-1 py-1">
                    <label
                    className={` text-blue-800`}
                    id="session-summary"
                  >
                    Description
                 <Tooltip title={`${props.mode==='add'?'You may write something about your work experience here...':'Your work experience summary'}`}><HelpIcon fontSize="small"/></Tooltip>
                  </label>
                    </div>
              
                <CEditor
                  data={description}
                  onError={handleDescriptionError}
                  getDataOnChange={handleEditorDataOnChange}
                />
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

export default ChangeWorkExperience;

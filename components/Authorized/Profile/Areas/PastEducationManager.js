import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { USER } from "../../../../validation/services/auth/ValidationSchema";
import { COLOR_CODES } from "../../../../constants/constants";
import { makeStyles } from "@material-ui/core/styles";
import { THEME_MODES, useTheme } from "../../../../theme/ThemeProvider";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  isValidDate,
  isValidDatePeriod,
} from "../../../../utils/utility";
import {
  PAST_EDUCATION_FORM_ERRORS,
  VALIDATION_ERROR_MESSAGE,
} from "../../../../constants/error-messages";
import CommonSearchService from "../../../../pages/api/search/CommonSearchService";
import { Warning } from "@material-ui/icons";

function PastEducationManager(props) {
  const [theme, dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  const [isUpdating, setUpdating] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [formValidationErrors, setFormValidationErrors] = useState([]);
  const deepGray = COLOR_CODES.GRAY.DEEP;
  const filteredEduInsRef = useRef(null);
  const [filteredEduIns, setFilteredEducationalInstituitons] = useState([]);
  const formOptions = {
    resolver: yupResolver(USER.PROFILE.EDIT.PASTEDUCATION),
    mode: "all",
  };
  const { register, formState, watch, reset, control, setError, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;
  useEffect(() => {
    reset();
  }, [isSubmitted]);

  useEffect(() => {
    setUpdating(false);
    setSubmitted(false);

    if (props?.operationOutcome?.errorData.length > 0) {
      setFormValidationErrors(props?.operationOutcome?.errorData);
    } else setFormValidationErrors([]);

    return () => {
      setUpdating(false);
      setSubmitted(false);
      setFormValidationErrors([]);
    };
  }, [props.operationOutcome]);
  useEffect(() => {
    setDark(theme.mode === THEME_MODES.DARK);
  }, [theme]);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filteredEduInsRef.current &&
        !filteredEduInsRef.current.contains(event.target)
      ) {
        setFilteredEducationalInstituitons([]);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [filteredEduIns]);
  const classes = useStyles();

  const [fromDate, setFromDateChange] = useState(
    props?.data?.educationStartDateForDisplay || ""
  );
  const [toDate, setToDateChange] = useState(
    props?.data?.educationEndDateForDisplay || ""
  );
  const [educationInstitution, seteducationInstitution] = useState(
    props?.data?.pastEducationEducationInstitution || ""
  );
  const [degree, setDegree] = useState(props?.data?.degreeCourse || "");
  const [campus, setCampus] = useState(props?.data?.pastEducationCampus || "");
  let filterTimeout;
  const handleEducationInstitutionChange = (e) => {
    seteducationInstitution(e.target.value);
    clearTimeout(filterTimeout);
    if (!e.target.value) {
      setFilteredEducationalInstituitons([]);
      return;
    }
    // debounce filter for educational institution by 1 second
    if (e.target.value) {
      filterTimeout = setTimeout(() => {
        CommonSearchService.searchEduIns(e.target.value)
          .then((res) => {
            if (res.data) setFilteredEducationalInstituitons(res.data);
            else setFilteredEducationalInstituitons([]);
          })
          .catch(() => {
            setFilteredEducationalInstituitons([]);
          });
      }, 1000);
    }
  };
  const handleEducationInstitutionSelect = (event, eduInsName) => {
    seteducationInstitution(eduInsName);
    setFilteredEducationalInstituitons([]);
  };
  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
  };
  const handleCampusChange = (e) => {
    setCampus(e.target.value);
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

  const handleCancel = () => {
    setSubmitted(true);
    setFilteredEducationalInstituitons([]);
    if (props.event)
      props.event({
        operation: "cancel",
        mode: props.mode,
        data: props.mode === "add" ? null : props.data,
      });
  };

  const handleSubmit = () => {
    setUpdating(true);
    setFilteredEducationalInstituitons([]);
    if (props.event) {
      let hasErrors = false;

      if (!fromDate) {
        setError("fromDate", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.PERIOD.FROM.REQUIRED,
        });
        hasErrors = true;
      }
      if (!toDate) {
        setError("toDate", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.PERIOD.TO.REQUIRED,
        });

        hasErrors = true;
      }
      if (!educationInstitution) {
        setError("educationInstitution", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.INSTITUTE.REQUIRED,
        });
        hasErrors = true;
      }
      if (!degree) {
        setError("degree", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.DEGREE.REQUIRED,
        });

        hasErrors = true;
      }
      if (!campus) {
        setError("campus", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.CAMPUS.REQUIRED,
        });
        hasErrors = true;
      }

      const start = new Date(fromDate);
      if (start === "Invalid Date") {
        setError("fromDate", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.PERIOD.FROM.REQUIRED,
        });
        hasErrors = true;
      }
      const end = new Date(toDate);
      if (end === "Invalid Date") {
        setError("toDate", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.PERIOD.TO.REQUIRED,
        });
        hasErrors = true;
      }

      if (!isValidDatePeriod(start, end)) {
        setError("toDate", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.PERIOD.TO.RANGE_ERROR,
        });
        setError("fromDate", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.PERIOD.FROM.RANGE_ERROR,
        });
        hasErrors = true;
      }
      if (hasErrors) {
        setUpdating(false);
        return;
      }

      clearErrors();
      const data = {
        fromDate,
        toDate,
        educationInstitution,
        degree,
        campus,
        ...props?.data,
      };
      props.event({
        operation: "submit_education_data",
        data,
        mode: props.mode,
      });
      setSubmitted(false);
    }
  };

  return (
    <div>
      <Typography
        className=" font-semibold py-3 dark:text-gray-600 text-gray-700"
        variant="div"
        sx={{ fontSize: 14 }}
      >
        {props.mode === "add" ? (
          <>
            <u>A</u>dd Past Education
          </>
        ) : (
          <>
            <u>E</u>dit Past Education
          </>
        )}
      </Typography>
      {formValidationErrors.length > 0 && (
        <div className="block ">
          <Typography
            className=" leading-tight font-semibold py-3 dark:text-gray-600 text-gray-700"
            variant="caption"
            sx={{ fontSize: 14 }}
          >
            <Warning /> {VALIDATION_ERROR_MESSAGE}
          </Typography>
          <div className=" ml-4">
            {formValidationErrors.map((e, idx) => (
              <>
                <div
                  className=" text-red-100 list-item flex-col gap-2 "
                  key={idx}
                >
                  {e}
                </div>
              </>
            ))}
          </div>
        </div>
      )}
      <Box
        className={`${isUpdating ? "control__disabled" : ""} `}
        sx={{ width: "100%" }}
      >
        <form name="education_management_form" id="education_management_form">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {/* University/College/School */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <TextField
                  placeholder="Start typing and suggestions may appear..."
                  variant="standard"
                  value={educationInstitution}
                  name="educationInstitution"
                  {...register(`educationInstitution`, {
                    onChange: (event) => {
                      debounce(handleEducationInstitutionChange(event), 500);
                    },
                  })}
                  helperText={errors.educationInstitution?.message}
                  error={errors.educationInstitution?.message ? true : false}
                  label={
                    <label className=" text-blue-800">
                      Educational Instituition*
                    </label>
                  }
                  inputProps={{ className: classes.input }}
                  className={classes.root}
                  id="educationInstitution"
                />
              </FormControl>

              {filteredEduIns.length > 0 && (
                <Grid
                  ref={filteredEduInsRef}
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <div className=" absolute z-50  bg-gray-400 rounded-lg dark:bg-gray-dark eduins-search-result-container max-h-40  overflow-auto will-change-auto ">
                    {filteredEduIns.map((orgz, idx) => (
                      <div
                        onClick={(event) =>
                          handleEducationInstitutionSelect(
                            event,
                            orgz.educationalInstitutionFullName
                          )
                        }
                        key={idx}
                        className=" text-gray-dark text-ellipsis hover:text-white-100 hover:bg-gray-700  hover:dark:bg-gray-200 dark:text-gray-400 hover:dark:text-gray-800     hover:font-semibold cursor-pointer p-2 text-sm max-w-sm  "
                      >
                        <Typography variant="subtitle2">
                          {orgz.educationalInstitutionFullName}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Grid>
              )}
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
              {/* Degree */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <TextField
                  variant="standard"
                  value={degree}
                  name="degree"
                  inputProps={{ className: classes.input }}
                  className={classes.root}
                  {...register(`degree`, {
                    onChange: (event) => {
                      debounce(handleDegreeChange(event), 500);
                    },
                  })}
                  helperText={errors.degree?.message}
                  error={errors.degree?.message ? true : false}
                  label={
                    <label className=" text-blue-800">
                      Qualification/Degree*
                    </label>
                  }
                  id="degree"
                />
              </FormControl>
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
              {/* Campus */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <TextField
                  variant="standard"
                  value={campus}
                  name="campus"
                  inputProps={{ className: classes.input }}
                  className={classes.root}
                  {...register(`campus`, {
                    onChange: (event) => {
                      debounce(handleCampusChange(event), 500);
                    },
                  })}
                  helperText={errors.campus?.message}
                  error={errors.campus?.message ? true : false}
                  label={<label className=" text-blue-800">Campus*</label>}
                  id="campus"
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
                  label={<label className=" text-blue-800">From*</label>}
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
                  label={<label className=" text-blue-800">To*</label>}
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
                    if (isValidDate(newvalue, "MMMM,yyyy"))
                      clearErrors("toDate");
                    else if (isValidDatePeriod(fromDate, newvalue)) {
                      clearErrors("toDate");
                      clearErrors("fromDate");
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ width: "100%", display: "flex" }}>
          <div
            className={`flex gap-4 mt-2 ${isUpdating ? "control_disabled opacity-40" : ""
              }`}
          >
            <Button onClick={handleSubmit} variant="outlined" size="small">
              {props.mode === "add" ? "Add" : "Save"}
            </Button>
            <Button variant="outlined" onClick={handleCancel} size="small">
              Cancel
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default PastEducationManager;

import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
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
  isEmptyObject,
  isValidDate,
  isValidDatePeriod,
} from "../../../../utils/utility";
import { PAST_EDUCATION_FORM_ERRORS } from "../../../../constants/error-messages";

function PastEducationManager(props) {
  const [theme, dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  const [isUpdating, setUpdating] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const deepGray = COLOR_CODES.GRAY.DEEP;
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
  const classes = useStyles();
  const [fromDate, setFromDateChange] = useState(null);
  const [toDate, setToDateChange] = useState(null);
  const [educationInstitution, seteducationInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [campus, setCampus] = useState("");
  const handleEducationInstitutionChange = (e) => {
    seteducationInstitution(e.target.value);
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
    if (props.event) props.event({ operation: "cancel" });
  };

  const handleSubmit = () => {
    setUpdating(true);
    console.log(errors, formState);

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
          message:
          PAST_EDUCATION_FORM_ERRORS.PERIOD.TO.REQUIRED,
        });

        hasErrors = true;
      }
      if (!educationInstitution) {
        setError("educationInstitution", {
          type: "required",
          message:
          PAST_EDUCATION_FORM_ERRORS.INSTITUTE.REQUIRED
        });
        hasErrors = true;
      }
      if (!degree) {
        setError("degree", {
          type: "required",
          message:
          PAST_EDUCATION_FORM_ERRORS.DEGREE.REQUIRED
        });

        hasErrors = true;
      }
      if (!campus) {
        setError("campus", {
          type: "required",
          message:
          PAST_EDUCATION_FORM_ERRORS.CAMPUS.REQUIRED
        });
        hasErrors = true;
      }

      const start = new Date(fromDate);
      if (start === "Invalid Date") {
        setError("fromDate", {
          type: "required",
          message: PAST_EDUCATION_FORM_ERRORS.PERIOD.FROM.REQUIRED
        });
        hasErrors = true;
      }
      const end = new Date(toDate);
      if (end === "Invalid Date") {
        setError("toDate", {
          type: "required",
          message:
          PAST_EDUCATION_FORM_ERRORS.PERIOD.TO.REQUIRED
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
      const data = { fromDate, toDate, educationInstitution, degree, campus };
      props.event({ operation: "submit_education_data", data });
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

      <Box
        className={`${isUpdating ? "control__disabled__opaque" : ""} `}
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
              {/* {filteredDesignationList && (
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
            )} */}
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
          <div className="flex gap-4 mt-2">
            <Button
              disabled={isUpdating}
              onClick={handleSubmit}
              variant="outlined"
              size="small"
            >
              {props.mode === "add" ? "Add" : "Save"}
            </Button>
            <Button
              disabled={isUpdating}
              variant="outlined"
              onClick={handleCancel}
              size="small"
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default PastEducationManager;

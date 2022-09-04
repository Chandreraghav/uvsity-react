/* eslint-disable react-hooks/rules-of-hooks */
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
import { isEmptyObject, isSmallScreen } from "../../../utils/utility";
import { makeStyles } from "@material-ui/core/styles";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { useForm } from "react-hook-form";
import {
  USER,
} from "../../../validation/services/auth/ValidationSchema";
import { getLocalStorageObject } from "../../../localStorage/local-storage";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
import { COLOR_CODES } from "../../../constants/constants";
import CommonSearchService from "../../../pages/api/search/CommonSearchService";
function ChangeProfileHeadlineDialog(props) {
  if (!props.isOpen) return "";
  const deepGray= COLOR_CODES.GRAY.DEEP
  const lightGray= COLOR_CODES.GRAY.LIGHT
  const isDark = getMode() === THEME_MODES.DARK;
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
      fill: isDark ?deepGray : "inherit",
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
  }));
  const classes = useStyles();
  const [processing, setProcessing] = useState(false);
  const [request, setRequest] = useState(null);
  const [designation, setDesignation] = useState(props.data.designation);
  const [filteredDesignationList, setFilteredDesignationList] = useState([])

  const [organization, setOrganization] = useState(props.data.institution);
  const [filteredOrgzList, setFilteredOrgzList] = useState([])

  const countries = JSON.parse(getLocalStorageObject("uvsity-countries"));
  const selected_country = countries.find(
    (country) =>
      country.countryFullName.toLowerCase() ===
      props?.data?.country.toLowerCase()
  );

  const [country, setCountry] = useState(
    selected_country.countryFullName
  );

  const [countryId, setCountryId] = useState(
    selected_country.countryId.toString() || "0"
  );
  const [city, setCity] = useState(props.data.city);
  const formOptions = {
    resolver: yupResolver(USER.PROFILE.EDIT.HIGHLIGHTS),
    mode: "all",
  };
  const { register, formState, watch, reset } = useForm(formOptions);
  const { errors } = formState;
  const handleClose = (closeInd) => {
    if (props?.dialogCloseRequest) {
      if (!closeInd) {
        setProcessing(true);

        if (!isEmptyObject(errors)) {
          // if the profile headline form contains errors
          setProcessing(false);
          return;
        }
      }
      props.dialogCloseRequest({
        id: 0,
        event: !closeInd ? "edit" : null,
        data: !closeInd
          ? {
              designation,
              organization,
              country,
              countryId,
              city,
            }
          : null,
        close: closeInd,
      });
    }
  };
  let filterTimeout
  const handleDesignationChange = (e) => { 
    setDesignation(e.target.value)
    clearTimeout(filterTimeout)
    if(!e.target.value){
      setFilteredDesignationList([])
     return 
    }
    // debounce filter for designation by 1 second
    if(e.target.value){
      filterTimeout = setTimeout(() => {
        CommonSearchService.searchUserType(e.target.value).then((res)=>{
          if(res.data)
          setFilteredDesignationList(res.data)
          else setFilteredDesignationList([])
        }).catch(()=>{
          setFilteredDesignationList([])
        })
      }, 1000)
    }
    
  };

  const handleOrgzChange = (e) => {
    setOrganization(e.target.value);
    clearTimeout(filterTimeout)
    if(!e.target.value){
      setFilteredOrgzList([])
     return 
    }
    // debounce filter for organization by 1 second
    if(e.target.value){
      filterTimeout = setTimeout(() => {
        CommonSearchService.searchEduIns(e.target.value).then((res)=>{
          if(res.data)
          setFilteredOrgzList(res.data)
          else setFilteredOrgzList([])
        }).catch(()=>{
          setFilteredOrgzList([])
        })
      }, 1000)
    }
  };

  const handleCountryChange = (e) => {
    setCountryId(e.target.value);
   const idx = countries.findIndex(
     (country) => country.countryId === e.target.value
   );
   if (idx !== -1) setCountry(countries[idx].countryFullName);

  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
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
  const handleDesignationSelect=(_designation)=>{
    setDesignation(_designation.userSubTypeMaster) 
    setFilteredDesignationList([])
  }

  const handleOrgzSelect=(_orgz)=>{
    setOrganization(_orgz.educationalInstitutionFullName) 
    setFilteredOrgzList([])
  }
   

  const _isSmallScreen = isSmallScreen();
  return (
    <Dialog
      fullWidth
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
                          debounce(handleDesignationChange(event),500);
                        },
                      })}
                      helperText={errors.designation?.message}
                      error={errors.designation?.message ? true : false}
                      required
                      label={
                        <label className=" text-blue-800">Current Title</label>
                      }
                      inputProps={{ className: classes.input }}
                      className={classes.root}
                      id="designation"
                    />
                  </FormControl>
                  {filteredDesignationList && (
                     <div className=" bg-gray-400 rounded-lg dark:bg-gray-dark z-50 max-h-40 absolute overflow-auto will-change-auto  ">
                     {filteredDesignationList.map((designation,id)=>(
                       <div onClick={()=>handleDesignationSelect(designation)} className="hover:bg-blue-800 hover:font-bold whitespace-nowrap text-ellipsis max-w-xs px-2 py-2 dark:text-gray-500 hover:text-gray-100 text-gray-700 cursor-pointer" key ={id}>
                         {designation.userSubTypeMaster}
                       </div>
                     ))}
                   </div>
                  )}
                 
                </Grid>

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
                     <div className=" bg-gray-400 rounded-lg dark:bg-gray-dark z-50 max-h-40 absolute overflow-auto will-change-auto  ">
                     {filteredOrgzList.map((orgz,id)=>(
                       <div onClick={()=>handleOrgzSelect(orgz)} className="hover:bg-blue-800 hover:font-bold whitespace-nowrap text-ellipsis max-w-xs px-2 py-2 dark:text-gray-500 hover:text-gray-100 text-gray-700 cursor-pointer" key ={id}>
                         {orgz.educationalInstitutionFullName}
                       </div>
                     ))}
                   </div>
                  )}
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  {/* Country */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                    className={classes.formControl}
                  >
                    
                      
                     <InputLabel>
                    
                      <label id="select-country-label" className={`${
                        errors.country?.message
                          ? "text-red-600"
                          : "text-blue-800"
                      } `}>Choose a country{" "}</label>
                      <h3
                        className={`${
                          errors.country?.message
                            ? "text-red-600"
                            : "dark:text-white-100"
                        } text-sm font-bold inline-flex  `}
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
                      label={<label className=" text-blue-800">Country</label>}
                      // inputProps={{ className: classes.input }}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                      className={classes.select}
                    >
                      {countries?.map((country) => (
                        <MenuItem
                          className={`${classes.menuItem} block p-2`}
                          key={country.countryId}
                          value={country.countryId}
                        >
                          {country.countryFullName}
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
                      label={<label className=" text-blue-800">City</label>}
                      inputProps={{ className: classes.input }}
                      className={classes.root}
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

export default ChangeProfileHeadlineDialog;

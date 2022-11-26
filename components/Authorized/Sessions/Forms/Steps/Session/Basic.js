import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FileUpload from "../../../../../FileUploader/FileUpload";
import Slide from "@mui/material/Slide";
import {
  APP as APP,
  PLACEHOLDERS,
  SESSION_DOCUMENT,
  SESSION_POSTER,
} from "../../../../../../constants/userdata";
import Spacer from "../../../../../shared/Spacer";
import Overlay from "../../../../../shared/Overlay";
import ReactPlayer from "react-player";
import { isValidURL } from "../../../../../../utils/utility";
import CEditor from "../../../../../Thirdparty/Editor/CKEditor";
import { toast } from "react-toastify";
import UserDataService from "../../../../../../pages/api/users/data/UserDataService";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import { COLOR_CODES, RESPONSE_TYPES } from "../../../../../../constants/constants";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import { actionTypes } from "../../../../../../context/reducer";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { SESSION } from "../../../../../../validation/services/auth/ValidationSchema";
import { AuthService } from "../../../../../../pages/api/users/auth/AuthService";
import { Button, FormHelperText, Typography } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PastSessionDialog from "../../../Modals/PastSessionDialog";
import { THEME_MODES, useTheme } from "../../../../../../theme/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
toast.configure();
function Basic(props) {
  const Router = useRouter();
  const [theme, _dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  const deepGray = COLOR_CODES.GRAY.DEEP;
  const lightGray= COLOR_CODES.GRAY.LIGHT
  const [processing, setProcessing]=useState(false)
  const [videoPreviewURL, setVideoPreviewURL] = useState("");
  const [pastSessionId, setPastSessionId] = useState(0);
  const [pastSessionDialogOpen, setPastSessionDialogOpen] = useState(false);
  const [choosenFromPastSession, setChoosenFromPastSession] = useState(false)
  const [categoryId, setCategoryId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState(false);
  const [posterData, setPosterData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [documentConsent, setDocumentConsent] = useState(false);
  const [data, dispatch] = useDataLayerContextValue();
  useEffect(() => {
    setDark(theme.mode === THEME_MODES.DARK);
  }, [theme]);
  const setDirty = () => {
    APP.SESSION.DTO.BASIC.dirty = true;
  };
  const useStyles = makeStyles((theme) => ({
    
    paper:{
      "& .MuiMenu-paper":{
        backgroundColor: isDark ? COLOR_CODES.BLACK.DARK : "",
      }

    },
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
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handlePastSessionDialogClose =()=>{
    setPastSessionDialogOpen(false)
  }
  const trackVideoPlayerUrlInput = (e) => {
    setVideoPreviewURL(e.target.value);
    APP.SESSION.DTO.BASIC.url = e.target.value;
    setDirty();
    updateErrors();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleSessionCategory = (e) => {
    setCategoryId(e.target.value);
    APP.SESSION.DTO.BASIC.categoryId = e.target.value;
    setDirty();
    updateErrors();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleConsentChange = (consentInd) => {
    setDocumentConsent(consentInd);
    APP.SESSION.DTO.BASIC.binary.documents.consent = consentInd;
    setDirty();
    updateErrors();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handlePastSessionChange = (e) => {
    const val=e?.target?.value || e
    setPastSessionId(val);
    setDirty();
    if (val > 0) {
      setProcessing(true)
      UserDataService.getSessionDetailPerCourse(val)
        .then((res) => {
          setChoosenFromPastSession(true)
          if (res.data) {
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              selected_past_session: res.data,
            });
            APP.SESSION.DTO.BASIC.pastSessionId = res.data.courseId;
            reset();
            updateErrors();
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              basic: APP.SESSION.DTO.BASIC,
            });
            setPastSessionId(res.data.courseId);
          } else {
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              selected_past_session: null,
            });
            APP.SESSION.DTO.BASIC.pastSessionId = 0;
            updateErrors();
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              basic: APP.SESSION.DTO.BASIC,
            });
            setPastSessionId(0);
            handleResponse(
              APP.MESSAGES.ERRORS.EDITS.SESSION_CHANGE,
              RESPONSE_TYPES.ERROR,
              toast.POSITION.TOP_CENTER
            );
          }
          setProcessing(false)
        })
        .catch(() => {
          dispatch({
            type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
            selected_past_session: null,
          });
          APP.SESSION.DTO.BASIC.pastSessionId = 0;
          updateErrors();
          dispatch({
            type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
            basic: APP.SESSION.DTO.BASIC,
          });
          setPastSessionId(0);
          handleResponse(
            APP.MESSAGES.ERRORS.EDITS.SESSION_CHANGE,
            RESPONSE_TYPES.ERROR,
            toast.POSITION.TOP_CENTER
          );
        });
    } else {
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
        selected_past_session: null,
      });
      APP.SESSION.DTO.BASIC.pastSessionId = 0;
      updateErrors();
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
        basic: APP.SESSION.DTO.BASIC,
      });
      setPastSessionId(0);
    }
  };
  useEffect(() => {
    const pastSession = data.selected_past_session;
    if (pastSession) {
      if (pastSession.categories[0]) {
        APP.SESSION.DTO.BASIC.categoryId =
          pastSession?.categories[0]?.courseCategoryId;
        APP.SESSION.DTO.BASIC.name = pastSession?.courseFullName;
        APP.SESSION.DTO.BASIC.shortName = pastSession?.courseShortName;
        APP.SESSION.DTO.BASIC.summary.html = pastSession?.courseSummary;
        APP.SESSION.DTO.BASIC.url = pastSession?.url;
        APP.SESSION.DTO.BASIC.binary.images.poster = pastSession?.imageURL;
        if (pastSession?.imageURL) {
          SESSION_POSTER.binary = pastSession?.imageURL;
          APP.SESSION.DTO.BASIC.binary.images.data = SESSION_POSTER;
        }

        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
          basic: APP.SESSION.DTO.BASIC,
        });
        setCategoryId(APP.SESSION.DTO.BASIC.categoryId);
        setFullName(APP.SESSION.DTO.BASIC.name);
        setShortName(APP.SESSION.DTO.BASIC.shortName);
        setSummary(APP.SESSION.DTO.BASIC.summary.html);
        setVideoPreviewURL(APP.SESSION.DTO.BASIC.url);
        const _posterData = posterData;
        if (_posterData) {
          _posterData.imageURL = APP.SESSION.DTO.BASIC.binary.images.poster;
          if (_posterData.imageURL) setPosterData(_posterData);
        }
      }
    }
  }, [data.selected_past_session]);
  const handlefullNameChange = (e) => {
    setFullName(e.target.value);
    setDirty();
    updateErrors();
    APP.SESSION.DTO.BASIC.name = e.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleShortNameChange = (e) => {
    setShortName(e.target.value);
    APP.SESSION.DTO.BASIC.shortName = e.target.value;
    setDirty();
    updateErrors();
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleEditorDataOnChange = (data) => {
    setSummary(data);
    setDirty();
    updateErrors();
    APP.SESSION.DTO.BASIC.summary.html = data;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };

  const handleFileOnChange = (_blob) => {
    const blob = _blob?.files;
    const id = _blob?.id;
    if (blob && (blob.length === 0 || blob.error)) {
      if (blob.length === 0) {
        if (id === "session-document") {
          APP.SESSION.DTO.BASIC.binary.documents.document = null;
          APP.SESSION.DTO.BASIC.binary.documents.data = null;
        } else if (id === "session-poster") {
          APP.SESSION.DTO.BASIC.binary.images.poster = null;
          APP.SESSION.DTO.BASIC.binary.images.data = null;
        }
        updateErrors();
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
          basic: APP.SESSION.DTO.BASIC,
        });
        return;
      }
      if (blob.id === "session-document" && blob?.error) {
        SESSION_DOCUMENT.binary = null;
        APP.SESSION.DTO.BASIC.binary.documents.error = true;
        APP.SESSION.DTO.BASIC.binary.documents.document = null;
        APP.SESSION.DTO.BASIC.binary.documents.data = null;
        updateErrors();
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
          basic: APP.SESSION.DTO.BASIC,
        });
        setDocumentData(APP.SESSION.DTO.BASIC.binary.documents.data);
      } else if (blob.id === "session-poster" && blob?.error) {
        SESSION_POSTER.binary = null;
        APP.SESSION.DTO.BASIC.binary.images.error = true;
        APP.SESSION.DTO.BASIC.binary.images.poster = null;
        APP.SESSION.DTO.BASIC.binary.images.data = null;
        updateErrors();
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
          basic: APP.SESSION.DTO.BASIC,
        });
        setPosterData(APP.SESSION.DTO.BASIC.binary.images.data);
      }
      return;
    }
    if (blob && blob[0]?.type.indexOf("image") !== -1) {
      setDirty();
      SESSION_POSTER.binary = blob[0];
      SESSION_POSTER.imageURL = blob[0].preview;
      // if image blob
      // preview
      APP.SESSION.DTO.BASIC.binary.images.poster = SESSION_POSTER.imageURL;
      APP.SESSION.DTO.BASIC.binary.images.data = SESSION_POSTER;
      APP.SESSION.DTO.BASIC.binary.images.error = false;
      updateErrors();
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
        basic: APP.SESSION.DTO.BASIC,
      });

      setPosterData(APP.SESSION.DTO.BASIC.binary.images.data);
    } else {
      // document
      setDirty();
      SESSION_DOCUMENT.binary = blob ? blob[0] : null;
      // if DOC blob
      APP.SESSION.DTO.BASIC.binary.documents.data = SESSION_DOCUMENT;
      APP.SESSION.DTO.BASIC.binary.documents.error = false;
      updateErrors();
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
        basic: APP.SESSION.DTO.BASIC,
      });

      setDocumentData(APP.SESSION.DTO.BASIC.binary.documents.data);
    }
  };
  const handleOnSummaryError = (indicator) => {
    setSummaryError(indicator);
  };
  const handlePastSessionDialogOpenRequest=()=>{
    setPastSessionDialogOpen(true)
  }
  useEffect(() => {
    if (data.basic) {
      // fetch data from context on load of form step.
      setChoosenFromPastSession(false)
      setCategoryId(data?.basic?.categoryId);
      setPastSessionId(data?.basic?.pastSessionId);
      setFullName(data?.basic?.name);
      setShortName(data?.basic?.shortName);
      setSummary(data?.basic.summary?.html);
      setVideoPreviewURL(data?.basic?.url);
      setDocumentConsent(data?.basic.binary.documents.consent);
      if (data?.basic.binary.images.poster)
        setPosterData(data?.basic.binary.images.data);
      else setPosterData(SESSION_POSTER);
      if (data?.basic?.binary?.documents?.data)
        setDocumentData(data?.basic.binary.documents.data);
      else {
        setDocumentData(SESSION_DOCUMENT);
      }
    } else {
      setPosterData(SESSION_POSTER);
      setDocumentData(SESSION_DOCUMENT);
    }
    APP.SESSION.DTO.requestPath = Router.asPath;
    APP.SESSION.DTO.user = AuthService.getCurrentUser();
  }, []);


  const formOptions = {
    resolver: yupResolver(SESSION.CREATE.STEPS.BASIC),
    mode: "all",
  };
  const updateErrors = () => {
    APP.SESSION.DTO.BASIC.errors = errors;
  };
  const { register, formState, watch, reset } = useForm(formOptions);
  const { errors } = formState;

  return (
    <Slide direction="up" in={true}>
    <div className={`p-3`}>
      <form name="basic-form">
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item lg={7} md={7} sm={12} xs={12}>
              {/* Category */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel sx={{color: isDark ? deepGray : ""}} id="select-category-label">
                  Choose a category{" "}
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
                  name="category"
                  {...register(`category`, {
                    onChange: (event) => {
                      debounce(handleSessionCategory(event), 500);
                    },
                  })}
                  error={errors.category?.message ? true : false}
                  labelId="select-category-label"
                  id="select-category"
                  value={categoryId}
                  required
                  label="Category"
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                  className={classes.select}
                  MenuProps={{
                    className:classes.paper,
                  }}
                  
                >
                  {props?.data?.static?.categories?.map((category) => (
                     
                    <MenuItem
                      dense
                      className={`${classes.menuItem}   block p-2`}
                      key={category.courseCategoryId}
                      value={category.courseCategoryId}
                    >
                      {category.courseCategoryName}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.category?.message && (
                  <>
                    <FormHelperText className=" text-red-400">
                      {errors.category?.message}
                    </FormHelperText>
                  </>
                )}
              </FormControl>
            </Grid>
            <Grid item lg={0.4} md={0.4} sm={12} xs={12}>
              <FormControl fullWidth={true} variant="standard">
                <Typography
                  variant="h6"
                  className=" text-lg  items-center justify-center font-medium italic leading-loose dark:text-gray-500 text-gray-800 lowercase   lg:mt-3  lg:-ml-2"
                >
                  OR&nbsp;
                </Typography>
              </FormControl>
            </Grid>
            {props?.data?.root?.expiredCourses &&
              Object.values(props?.data?.root?.expiredCourses).length > 0 && (
                <Grid item lg={4.6} md={4.6} sm={12} xs={12}>
                  {/* Choose from */}
                  <Button
                    className={"lg:mt-2"}
                    onClick={handlePastSessionDialogOpenRequest}
                    startIcon={<WatchLaterIcon />}
                    variant="contained"
                     
                    // color={choosenFromPastSession?'success':'primary'}
                  >
                    {choosenFromPastSession?<>Choose from past sessions again</>:<>Choose from past sessions</>}
                    
                  </Button>

  
                </Grid>
              )}
            <Grid item xs={12}>
              <Spacer />
            </Grid>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              {/* Full name */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <TextField
                  variant="standard"
                  value={fullName}
                  name="fullName"
                  {...register(`fullName`, {
                    onChange: (event) => {
                      debounce(handlefullNameChange(event), 500);
                    },
                  })}
                  helperText={errors.fullName?.message}
                  error={errors.fullName?.message ? true : false}
                  required
                  label="Title"
                  id="fullName"
                  inputProps={{ className: classes.input }}
                  className={classes.root}
                />
              </FormControl>
            </Grid>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              {/* Short name */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <TextField
                  value={shortName}
                  name="shortName"
                  {...register(`shortName`, {
                    onChange: (event) => {
                      debounce(handleShortNameChange(event), 500);
                    },
                  })}
                  helperText={errors.shortName?.message}
                  error={errors.shortName?.message ? true : false}
                  variant="standard"
                  required
                  label="Short title"
                  id="shortName"
                  inputProps={{ className: classes.input }}
                  className={classes.root}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {/* Summary */}
              {/* You are ready now to use CEDITOR, using onChange, value , placeholder props */}

              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <div className="flex gap-1">
                  <label
                    className={`${
                      summaryError
                        ? "text-red-600  font-normal"
                        : "text-gray-600 dark: text-gray-500 font-normal"
                    }  inline-flex`}
                    id="session-summary"
                  >
                    Summary
                  </label>

                  <span
                    className={`${
                      summaryError ? "text-red-600" : "text-blue-800"
                    }  inline-flex`}
                  >
                    *
                  </span>
                </div>

                <CEditor
                  required
                  errorText="Summary is required"
                  data={summary}
                  onError={handleOnSummaryError}
                  getDataOnChange={handleEditorDataOnChange}
                />
              </FormControl>
            </Grid>

            <Grid item sm={6} lg={3} md={3} xs={12}>
              {/* Poster Upload */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <FileUpload
                  data={posterData}
                  receptorData={handleFileOnChange}
                />
              </FormControl>
            </Grid>

            <Grid item sm={6} lg={3} md={3} xs={12}>
              {/* Document Upload */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                {" "}
                <FileUpload
                  data={documentData}
                  receptorData={handleFileOnChange}
                  consent={handleConsentChange}
                />
              </FormControl>
            </Grid>

            <Grid className="mt-1" item sm={12} lg={6} md={6} xs={12}>
              <div className="flex flex-col">
                <FormControl
                  fullWidth={true}
                  variant="standard"
                  sx={{ marginBottom: 1 }}
                >
                  {/* Video URL */}
                  <TextField
                    name="previewurl"
                    {...register(`previewurl`, {
                      onChange: (event) => {
                        debounce(trackVideoPlayerUrlInput(event), 500);
                      },
                    })}
                    helperText={errors.previewurl?.message}
                    error={errors.previewurl?.message ? true : false}
                    value={videoPreviewURL}
                    label="Video Preview URL"
                    variant="standard"
                    id="previewurl"
                    inputProps={{ className: classes.input }}
                  className={classes.root}
                  />
                </FormControl>

              
                {isValidURL(videoPreviewURL) &&
                  !errors?.previewurl?.message && (
                    <div className="player__wrapper">
                    <ReactPlayer
                      controls
                      loop={true}
                      muted
                      width="100%"
                      height="250px"
                      className="player"
                      url={videoPreviewURL}
                    />
                    </div>
                  )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Overlay  message={PLACEHOLDERS.PROCESSING} open={processing}/>
      <PastSessionDialog selectedSession={pastSessionId} getSelectedSession={handlePastSessionChange} data={props?.data?.root?.expiredCourses} isOpen={pastSessionDialogOpen} dialogCloseRequest={handlePastSessionDialogClose} />
    </div>
    </Slide>
  );
}

export default Basic;

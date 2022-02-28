import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FileUpload from "../../../../../FileUploader/FileUpload";
import {
  APP as APP,
  SESSION_DOCUMENT,
  SESSION_POSTER,
} from "../../../../../../constants/userdata";
import Spacer from "../../../../../shared/Spacer";
import ReactPlayer from "react-player";
import { isValidURL } from "../../../../../../utils/utility";
import CEditor from "../../../../../Thirdparty/Editor/CKEditor";
import { toast } from "react-toastify";
import UserDataService from "../../../../../../pages/api/users/data/UserDataService";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import { RESPONSE_TYPES } from "../../../../../../constants/constants";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import { actionTypes } from "../../../../../../context/reducer";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { SESSION } from "../../../../../../validation/services/auth/ValidationSchema";
import { AuthService } from "../../../../../../pages/api/users/auth/AuthService";
import { FormHelperText } from "@mui/material";

toast.configure();
function Basic(props) {
  const Router = useRouter();
  const [videoPreviewURL, setVideoPreviewURL] = useState("");
  const [pastSessionId, setPastSessionId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState(false);
  const [posterData, setPosterData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [documentConsent, setDocumentConsent] = useState(false);
  const [data, dispatch] = useDataLayerContextValue();
  const [mediaValidationError, setMediaValidationError] = useState(false);
  const trackVideoPlayerUrlInput = (e) => {
    setVideoPreviewURL(e.target.value);
    APP.SESSION.DTO.BASIC.url = e.target.value;
    APP.SESSION.DTO.BASIC.dirty=true
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleSessionCategory = (e) => {
    setCategoryId(e.target.value);
    APP.SESSION.DTO.BASIC.categoryId = e.target.value;
    APP.SESSION.DTO.BASIC.dirty=true
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleConsentChange = (consentInd) => {
    setDocumentConsent(consentInd);
    APP.SESSION.DTO.BASIC.binary.documents.consent = consentInd;
    APP.SESSION.DTO.BASIC.dirty=true
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handlePastSessionChange = (e) => {
    setPastSessionId(e.target.value);
    APP.SESSION.DTO.BASIC.dirty=true
    if (e.target.value > 0) {
      UserDataService.getSessionDetailPerCourse(e.target.value)
        .then((res) => {
          if (res.data) {
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              selected_past_session: res.data,
            });
            APP.SESSION.DTO.BASIC.pastSessionId = res.data.courseId;
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              basic: APP.SESSION.DTO.BASIC,
            });
            setPastSessionId(res.data.courseId);
            reset();
          } else {
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              selected_past_session: null,
            });
            APP.SESSION.DTO.BASIC.pastSessionId = 0;
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
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
            selected_past_session: null,
          });
          APP.SESSION.DTO.BASIC.pastSessionId = 0;
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
          SESSION_POSTER.binary=pastSession?.imageURL
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
    APP.SESSION.DTO.BASIC.dirty=true
    APP.SESSION.DTO.BASIC.name = e.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleShortNameChange = (e) => {
    setShortName(e.target.value);
    APP.SESSION.DTO.BASIC.dirty=true
    APP.SESSION.DTO.BASIC.shortName = e.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleEditorDataOnChange = (data) => {
    setSummary(data);
    APP.SESSION.DTO.BASIC.dirty=true
    APP.SESSION.DTO.BASIC.summary.html = data;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
  };
  const handleFileOnChange = (blob) => {
    APP.SESSION.DTO.BASIC.dirty=true
    if (blob.error) {
      APP.SESSION.DTO.BASIC.validationError = true;
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
        basic: APP.SESSION.DTO.BASIC,
      });
      setMediaValidationError(APP.SESSION.DTO.BASIC.validationError);
      if (blob.id === "session-document") {
        SESSION_DOCUMENT.binary = null;
        APP.SESSION.DTO.BASIC.binary.documents.document = null;
        APP.SESSION.DTO.BASIC.binary.documents.data = null;
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
          basic: APP.SESSION.DTO.BASIC,
        });
        setPosterData(APP.SESSION.DTO.BASIC.binary.documents.data);
      } else if (blob.id === "session-poster") {
        SESSION_POSTER.binary = null;
        APP.SESSION.DTO.BASIC.binary.images.poster = null;
        APP.SESSION.DTO.BASIC.binary.images.data = null;
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
          basic: APP.SESSION.DTO.BASIC,
        });
        setPosterData(APP.SESSION.DTO.BASIC.binary.images.data);
      }
      return;
    }
    if (blob.length === 0) return;
    if (blob[0]?.type.indexOf("image") !== -1) {
      SESSION_POSTER.binary = blob[0];
      SESSION_POSTER.imageURL = blob[0].preview;
      // if image blob
      // preview
      APP.SESSION.DTO.BASIC.binary.images.poster = SESSION_POSTER.imageURL;
      APP.SESSION.DTO.BASIC.binary.images.data = SESSION_POSTER;
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
        basic: APP.SESSION.DTO.BASIC,
      });
      setPosterData(APP.SESSION.DTO.BASIC.binary.images.data);
    } else {
      // document
      SESSION_DOCUMENT.binary = blob[0];
      // if DOC blob
      APP.SESSION.DTO.BASIC.binary.documents.data = SESSION_DOCUMENT;
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
  useEffect(() => {
    console.log(data)
    if (data.basic) {     
      // fetch data from context on load of form step.
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
  const { register, handleSubmit, formState, watch, reset, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;
  const watcher = watch(["category", "fullName", "shortName", "previewurl"]);

  useEffect(() => {
    const uncaughtErrors =
      !categoryId ||
      !fullName ||
      !shortName ||
      !summary ||
      mediaValidationError ||
      (data?.basic?.binary?.documents?.data && !documentConsent);
    if (uncaughtErrors) {
      APP.SESSION.DTO.BASIC.validationError = true
      errors.uncaughtError = "There are generic validation errors";
    } else {
      if (errors.uncaughtError) delete errors.uncaughtError;
      APP.SESSION.DTO.BASIC.validationError = false
    }
     if(errors.previewurl){
      APP.SESSION.DTO.BASIC.validationError = true
     } else APP.SESSION.DTO.BASIC.validationError = false
    
     setTimeout(()=>{
      if (props.onActivity) {
        props.onActivity({
          id:1,
          step: 0,
          errors: errors,
          data: APP.SESSION.DTO.BASIC,
        });
      }
     },500)
    
  }, [
    videoPreviewURL,
    categoryId,
    fullName,
    shortName,
    summary,
    posterData,
    documentData,
    documentConsent,
    mediaValidationError,
  ]);

  return (
    <div className={`p-2`}>
      <form name="basic-form">
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              {/* Category */}
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel id="select-category-label">
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
                      handleSessionCategory(event);
                    },
                  })}
                  error={errors.category?.message ? true : false}
                  required
                  labelId="select-category-label"
                  id="select-category"
                  value={categoryId}
                  required
                  label="Category"
                >
                  {props?.data?.static?.categories?.map((category) => (
                    <MenuItem
                      className=" block p-2"
                      key={category.courseCategoryId}
                      value={category.courseCategoryId}
                    >
                      {category.courseCategoryName}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.category?.message && (
                  <>
                    <FormHelperText className=" text-red-600">
                      {errors.category?.message}
                    </FormHelperText>
                  </>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={0.4}>
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <blockquote className=" text-xs lg:text-lg md:text-xs font-medium italic leading-loose text-gray-800 lowercase border-r-2 mt-3 -ml-2 items-center">
                  OR&nbsp;
                </blockquote>
              </FormControl>
            </Grid>
            {props?.data?.root?.expiredCourses &&
              Object.values(props?.data?.root?.expiredCourses).length > 0 && (
                <Grid item xs={5.6}>
                  {/* Choose from */}
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    sx={{ marginBottom: 1 }}
                  >
                    <InputLabel id="select-expired-session-label">
                      Choose from past sessions
                    </InputLabel>
                    <Select
                      onChange={handlePastSessionChange}
                      labelId="select-expired-session-label"
                      id="select-expired-session"
                      value={pastSessionId}
                      label="Choose from past sessions"
                    >
                      <MenuItem
                        className="text-sm block p-2 text-gray-600"
                        value={0}
                      ></MenuItem>
                      {props?.data?.root?.expiredCourses &&
                        Object.values(props?.data?.root?.expiredCourses).map(
                          (session) => (
                            <MenuItem
                              className=" block p-2"
                              key={session.courseId}
                              value={session.courseId}
                            >
                              {session.courseFullName}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  </FormControl>
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
                      handlefullNameChange(event);
                    },
                  })}
                  helperText={errors.fullName?.message}
                  error={errors.fullName?.message ? true : false}
                  required
                  label="Title"
                  id="fullName"
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
                      handleShortNameChange(event);
                    },
                  })}
                  helperText={errors.shortName?.message}
                  error={errors.shortName?.message ? true : false}
                  variant="standard"
                  required
                  label="Short title"
                  id="shortName"
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
                 className= {`${
                    summaryError
                      ? "text-red-600  font-normal"
                      : "text-gray-600 font-normal"
                  }  inline-flex`}
                    
                    id="session-summary"
                  >
                    Summary
                  </label>

                  <span
                    className={`${
                      summaryError
                        ? "text-red-600"
                        : "text-blue-800"
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
                        trackVideoPlayerUrlInput(event);
                      },
                    })}
                    helperText={errors.previewurl?.message}
                    error={errors.previewurl?.message ? true : false}
                    value={videoPreviewURL}
                    label="Video Preview URL"
                    variant="standard"
                    id="previewurl"
                  />
                </FormControl>
                {isValidURL(videoPreviewURL) &&
                  !errors?.previewurl?.message && (
                    <ReactPlayer
                      controls
                      loop={true}
                      muted
                      width="400px"
                      height="200px"
                      url={videoPreviewURL}
                    />
                  )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}

export default Basic;

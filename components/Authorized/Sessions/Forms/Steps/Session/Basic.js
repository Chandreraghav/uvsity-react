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
  BASIC,
  SESSION_DOCUMENT,
  SESSION_POSTER,
  SPONSORSHIP,
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
toast.configure();
function Basic(props) {
  const [videoPreviewURL, setVideoPreviewURL] = useState("");
  const [pastSessionId, setPastSessionId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [summary, setSummary] = useState("");
  const [posterData, setPosterData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [documentConsent, setDocumentConsent] = useState(false);
  const [data, dispatch] = useDataLayerContextValue();
  const trackVideoPlayerUrlInput = (e) => {
    setVideoPreviewURL(e.target.value);
    BASIC.SESSION.DTO.BASIC.url = e.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: BASIC.SESSION.DTO.BASIC,
    });
  };
  const handleSessionCategory = (e) => {
    setCategoryId(e.target.value);
    BASIC.SESSION.DTO.BASIC.categoryId = e.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: BASIC.SESSION.DTO.BASIC,
    });
  };
  const handleConsentChange = (consentInd) => {
    setDocumentConsent(consentInd);
    BASIC.SESSION.DTO.BASIC.binary.documents.consent = consentInd;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: BASIC.SESSION.DTO.BASIC,
    });
  };
  const handlePastSessionChange = (e) => {
    setPastSessionId(e.target.value);
    if (e.target.value > 0) {
      UserDataService.getSessionDetailPerCourse(e.target.value)
        .then((res) => {
          if (res.data) {
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              selected_past_session: res.data,
            });
            BASIC.SESSION.DTO.BASIC.pastSessionId = res.data.courseId;
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              basic: BASIC.SESSION.DTO.BASIC,
            });
            setPastSessionId(res.data.courseId);
          } else {
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              selected_past_session: null,
            });
            BASIC.SESSION.DTO.BASIC.pastSessionId = 0;
            dispatch({
              type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
              basic: BASIC.SESSION.DTO.BASIC,
            });
            setPastSessionId(0);
            handleResponse(
              BASIC.MESSAGES.ERRORS.EDITS.SESSION_CHANGE,
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
          BASIC.SESSION.DTO.BASIC.pastSessionId = 0;
          dispatch({
            type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
            basic: BASIC.SESSION.DTO.BASIC,
          });
          setPastSessionId(0);
          handleResponse(
            BASIC.MESSAGES.ERRORS.EDITS.SESSION_CHANGE,
            RESPONSE_TYPES.ERROR,
            toast.POSITION.TOP_CENTER
          );
        });
    } else {
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
        selected_past_session: null,
      });
      BASIC.SESSION.DTO.BASIC.pastSessionId = 0;
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
        basic: BASIC.SESSION.DTO.BASIC,
      });
      setPastSessionId(0);
    }
  };
  useEffect(() => {
    const pastSession = data.selected_past_session;
    if (pastSession) {
      if (pastSession.categories[0]) {
        BASIC.SESSION.DTO.BASIC.categoryId =
          pastSession?.categories[0]?.courseCategoryId;
        BASIC.SESSION.DTO.BASIC.name = pastSession?.courseFullName;
        BASIC.SESSION.DTO.BASIC.shortName = pastSession?.courseShortName;
        BASIC.SESSION.DTO.BASIC.summary.html = pastSession?.courseSummary;
        BASIC.SESSION.DTO.BASIC.url = pastSession?.url;
        BASIC.SESSION.DTO.BASIC.binary.images.poster = pastSession?.imageURL;
        if (pastSession?.imageURL) {
          BASIC.SESSION.DTO.BASIC.binary.images.data = SESSION_POSTER;
        }
        dispatch({
          type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
          basic: BASIC.SESSION.DTO.BASIC,
        });
        setCategoryId(BASIC.SESSION.DTO.BASIC.categoryId);
        setFullName(BASIC.SESSION.DTO.BASIC.name);
        setShortName(BASIC.SESSION.DTO.BASIC.shortName);
        setSummary(BASIC.SESSION.DTO.BASIC.summary.html);
        setVideoPreviewURL(BASIC.SESSION.DTO.BASIC.url);
        const _posterData = posterData;
        if (_posterData) {
          _posterData.imageURL = BASIC.SESSION.DTO.BASIC.binary.images.poster;
          if (_posterData.imageURL) setPosterData(_posterData);
        }
      }
    }
  }, [data.selected_past_session]);
  const handlefullNameChange = (e) => {
    setFullName(e.target.value);
    BASIC.SESSION.DTO.BASIC.name = e.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: BASIC.SESSION.DTO.BASIC,
    });
  };
  const handleShortNameChange = (e) => {
    setShortName(e.target.value);
    BASIC.SESSION.DTO.BASIC.shortName = e.target.value;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: BASIC.SESSION.DTO.BASIC,
    });
  };
  const handleEditorDataOnChange = (data) => {
    setSummary(data);
    BASIC.SESSION.DTO.BASIC.summary.html = data;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: BASIC.SESSION.DTO.BASIC,
    });
  };
  const handleFileOnChange = (blob) => {
    if (blob.length === 0) return;
    if (blob[0]?.type.indexOf("image") !== -1) {
      SESSION_POSTER.binary = blob[0];
      SESSION_POSTER.imageURL = blob[0].preview;
      // if image blob
      // preview
      BASIC.SESSION.DTO.BASIC.binary.images.poster = SESSION_POSTER.imageURL;
      BASIC.SESSION.DTO.BASIC.binary.images.data = SESSION_POSTER;
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
        basic: BASIC.SESSION.DTO.BASIC,
      });
      setPosterData(BASIC.SESSION.DTO.BASIC.binary.images.data);
    } else {
      // document
      SESSION_DOCUMENT.binary = blob[0];
      // if DOC blob
      BASIC.SESSION.DTO.BASIC.binary.documents.data = SESSION_DOCUMENT;
      dispatch({
        type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
        basic: BASIC.SESSION.DTO.BASIC,
      });
      setDocumentData(BASIC.SESSION.DTO.BASIC.binary.documents.data);
    }
  };
  useEffect(() => {
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
  }, []);
  return (
    <div className={`p-2`}>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            {/* Category */}
            <FormControl
              fullWidth={true}
              variant="standard"
              sx={{ marginBottom: 1 }}
            >
              <InputLabel id="select-category-label">
                Choose a category
              </InputLabel>
              <Select
                onChange={handleSessionCategory}
                labelId="select-category-label"
                id="select-category"
                value={categoryId}
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
                onChange={handlefullNameChange}
                required
                label="Full Name"
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
                onChange={handleShortNameChange}
                variant="standard"
                required
                label="Short Name"
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
                  className=" text-gray-600 font-normal"
                  id="session-summary"
                >
                  Summary
                </label>
                <small className="text-blue-800 text-bold">*</small>
              </div>

              <CEditor
                data={summary}
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
              <FileUpload data={posterData} receptorData={handleFileOnChange} />
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
                  onChange={trackVideoPlayerUrlInput}
                  value={videoPreviewURL}
                  label="Video Preview URL"
                  variant="standard"
                  id="previewurl"
                />
              </FormControl>
              {isValidURL(videoPreviewURL) && (
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
    </div>
  );
}

export default Basic;

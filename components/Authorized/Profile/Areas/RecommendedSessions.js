import React, { useEffect, useRef, useState } from "react";
import NoData from "../../Shared/NoData";
import SnapPreview from "../../Sessions/Preview/SnapPreview";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, FormControl, Grid, TextField, Tooltip } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { COLOR_CODES, RESPONSE_TYPES } from "../../../../constants/constants";
import { getMode, THEME_MODES } from "../../../../theme/ThemeProvider";
import CommonSearchService from "../../../../pages/api/search/CommonSearchService";
import { toast } from "react-toastify";
import { handleResponse } from "../../../../toastr-response-handler/handler";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import { USER_PROFILE } from "../../../../constants/userdata";
toast.configure();
function RecommendedSessions(props) {
  const [recommendedSession, setRecommendedSession] = useState("");
  const [sessions, setSessions] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const deepGray = COLOR_CODES.GRAY.DEEP;
  const lightGray = COLOR_CODES.GRAY.LIGHT;
  const isDark = getMode() === THEME_MODES.DARK;
  const filteredSessionRef = useRef(null);
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

    icon: {
      fill: isDark ? deepGray : "inherit",
    },
  }));
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const handleRecommendedSessionChange = (e) => {
    setRecommendedSession(e.target.value);
    const target = e.target.value.trim() || null;
    if (target) {
      CommonSearchService.searchSessions(target)
        .then((response) => {
          if (response.data) {
            const slice = response.data.slice(0, 10);
            setSessions(slice);
          }
        })
        .catch((err) => {
          setSessions([]);
        });
    } else {
      setSessions([]);
      setSelectedSession(null);
    }
  };
  const handleSessionAdd = () => {
    if (!selectedSession) {
      handleResponse(
        "Select a session from the suggestive list to continue",
        RESPONSE_TYPES.WARNING,
        toast.POSITION.BOTTOM_CENTER
      );
      return;
    }
    setUpdating(true);
    let payload = [];
    const sessions = props?.sessions;
    sessions.map((session) => {
      payload.push(session.courseId);
    });
    payload.push(Number(selectedSession.entityId));
    UserDataService.editRecommendedSessions(payload)
      .then((response) => {
        const responseSessions = response.data;
        const addedSessionIdx = responseSessions.findIndex(
          (responseSession) =>
            responseSession.course.courseId === Number(selectedSession.entityId)
        );
        if (addedSessionIdx !== -1) {
          const addedSession = responseSessions[addedSessionIdx];
          const obj = {
            courseCreator: addedSession?.courseCreator,
            cost: addedSession?.course.cost,
            courseCreateTime: addedSession?.course.courseCreateTime,
            courseDuration: addedSession?.course.courseDuration,
            courseEndDTime: addedSession?.course.courseEndDTime,
            courseId: addedSession?.course.courseId,
            courseImageURL: addedSession?.course.imageURL,
            courseLastUpdateTime: addedSession?.course.courseLastUpdateTime,
            courseName: addedSession?.course.courseFullName,
            courseStartDTime: addedSession?.course.courseStartDTime,
          };
          props?.sessions.push(obj);
        }
        setUpdating(false);
        setRecommendedSession("");
        setSelectedSession(null);
        setSessions([]);

        handleResponse(
          `${USER_PROFILE.RECOMMENDED_SESSIONS_UPDATED}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.BOTTOM_CENTER
        );
      })
      .catch((err) => {
        setUpdating(false);
        setRecommendedSession("");
        setSelectedSession(null);
        setSessions([]);
        handleResponse(
          `${USER_PROFILE.RECOMMENDED_SESSIONS_UPDATE_FAILED}`,
          RESPONSE_TYPES.ERROR,
          toast.POSITION.BOTTOM_CENTER
        );
      });
  };

  const selectSession = (session) => {
    setRecommendedSession(session.content);
    setSelectedSession(session);
    setSessions([]);
  };
  const handleRecommendedSessionDelete=(session)=>{
   setUpdating(true)
    let sessions = props?.sessions.slice();
    const targetIdx= sessions.findIndex((_session)=>_session.courseId===session.courseId)
    if(targetIdx!==-1){
      let payload=[]
      sessions.splice(targetIdx,1)
      
      sessions.filter((_session)=>_session.courseId!==session.courseId).map((session) => {
      payload.push(session.courseId);
    });
    props.sessions.splice(targetIdx,1)
    UserDataService.editRecommendedSessions(payload)
      .then((response) => {
        setUpdating(false)
        handleResponse(
          `${USER_PROFILE.RECOMMENDED_SESSIONS_DELETED.replace('<#X#>',session.courseName)}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.BOTTOM_CENTER
        );
      }).catch((error) => {
        setUpdating(false)
        handleResponse(
          `${USER_PROFILE.RECOMMENDED_SESSIONS_DELETE_FAILED.replace('<#X#>',session.courseName)}`,
          RESPONSE_TYPES.ERROR,
          toast.POSITION.BOTTOM_CENTER
        );
      })
    }
    else {
      handleResponse(
        `${USER_PROFILE.RECOMMENDED_SESSIONS_DELETE_FAILED.replace('<#X#>',session.courseName)}`,
        RESPONSE_TYPES.ERROR,
        toast.POSITION.BOTTOM_CENTER
      );
    }
  }
  const classes = useStyles();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filteredSessionRef.current &&
        !filteredSessionRef.current.contains(event.target)
      ) {
        setSessions([]);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [sessions]);
  return (
    <>
      {props?.sessions && props?.sessions.length > 0 ? (
        <>
          <Box className="  min-h-min overflow-auto p-2" sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >
              {props?.sessions
                ?.filter(
                  (v, i, a) =>
                    a.findIndex((v2) => v2.courseId === v.courseId) === i
                )
                .map((session, idx) => (
                  <Grid key={idx} item xs={12} md={6} lg={6} sm={12}>
                    <div className="flex">
                      <SnapPreview
                        consumeEvent={props.consumeEvent}
                        session={session}
                      />
                      {props?.owner && (
                        <div className=" ml-auto justify-end">
                          <Tooltip title={USER_PROFILE.PLACEHOLDERS.REMOVE_SESSION_FROM_RECOMMENDATIONS}>
                            <div onClick={()=>handleRecommendedSessionDelete(session)} className={` ${updating?'control__disabled':''} hover:cursor-pointer dark:text-blue-800 text-gray-dark`}>
                              <DeleteIcon  size="small" />
                            </div>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </>
      ) : (
        <NoData message="No sessions recommended." />
      )}

      {props?.owner && (
        <Box
          disabled={updating}
          className="flex flex-col overflow-auto"
          sx={{ width: "100%" }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <FormControl
                fullWidth={true}
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <TextField
                  disabled={updating}
                  variant="standard"
                  fullWidth
                  value={recommendedSession}
                  onChange={(event) =>
                    debounce(handleRecommendedSessionChange(event), 500)
                  }
                  placeholder={USER_PROFILE.PLACEHOLDERS.ADD_SESSION_TO_RECOMMENDATIONS}
                  name="recommended-session-add-panel"
                  label={
                    <label className=" text-blue-800">Add a session</label>
                  }
                  InputProps={{
                    className: classes.input,
                    endAdornment: (
                      <Tooltip title="Add now">
                        <AddBoxIcon
                          onClick={handleSessionAdd}
                          className={
                            "cursor-pointer dark:text-white-100 text-blue-800"
                          }
                        />
                      </Tooltip>
                    ),
                  }}
                  className={classes.root}
                  id="add-a-session-to-recommendation-list"
                />
              </FormControl>
            </Grid>
          </Grid>

          {sessions && sessions.length > 0 && (
            <div ref={filteredSessionRef} className=" session-search-result-container flex flex-col gap-2  w-max max-h-48 overflow-auto ">
              {sessions.map((session, idx) => (
                <Grid
                  item
                  xs={12}
                  onClick={() => selectSession(session)}
                  key={idx}
                  
                >
                  <div className="text-gray-dark hover:text-white-100 hover:bg-gray-700  hover:dark:bg-gray-200 dark:text-gray-400 hover:dark:text-gray-800     hover:font-semibold cursor-pointer p-2 text-sm w-screen">
                    <SnapPreview resultOnSearch session={session} />
                  </div>
                </Grid>
              ))}
            </div>
          )}
        </Box>
      )}
    </>
  );
}

export default RecommendedSessions;

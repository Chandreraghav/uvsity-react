/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Grid,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import React, { useEffect, useState } from "react";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import {
  getTimezone, setLocalTimezone,
} from "../../../../../../utils/utility";
import {
  APP,
  VALIDATING_REQUEST,
} from "../../../../../../constants/userdata";
import {
  USER_CONFIDENCE_KEYWORDS_ON_WORKFLOW_COMPLETION,
} from "../../../../../../constants/constants";
import TimezoneBrowseDialog from "../../../../../shared/modals/TimezoneBrowseDialog";
import { actionTypes } from "../../../../../../context/reducer";
import moment from "moment-timezone";
import { THEME_MODES, useTheme } from "../../../../../../theme/ThemeProvider";
import ScheduleDetail from "../../../Details/ScheduleDetail";
import AttachmentDetail from "../../../Details/AttachmentDetail";
import QuestionairreDetail from "../../../Details/QuestionairreDetail";
import SponsorshipDetail from "../../../Details/SponsorshipDetail";
import CohostDetail from "../../../Details/CohostDetail";
import SummaryDetail from "../../../Details/SummaryDetail";
import PreviewCoverDetail from "../../../Details/PreviewCoverDetail";
import AuthorDetail from "../../../Details/AuthorDetail";
import BannerDetail from "../../../Details/BannerDetail";
import SweetMessageStrip from "../../../../../shared/MessageStrip";
function Final(props) {
  const [data, dispatch] = useDataLayerContextValue();
  const [timezoneBrowserOpened, setTimezoneBrowser] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [theme, _dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
  const [tz, setTz] = useState(null);
  useEffect(() => {
    setDark(theme.mode === THEME_MODES.DARK);
  }, [theme])
  const getErrorMessage = () => {
    let msg = APP.MESSAGES.ERRORS.FINAL_STEP_COMPLETION_FAILED;
    if (props.errorMessage) msg = props.errorMessage;
    const _user = props.data.user.firstName;
    const _err = msg.replace("<user>", _user);
    return _err;
  };
  const getCompletionMessage = () => {
    const randomString = USER_CONFIDENCE_KEYWORDS_ON_WORKFLOW_COMPLETION[4]
    const _user = props?.data?.user?.firstName;
    const message = APP.MESSAGES.INFO.FINAL_STEP_COMPLETED.replace(
      "<user>",
      _user
    );
    return randomString + message;
  };
  const handleTimezoneBrowserChange = () => {
    setTimezoneBrowser(true);
  };
  const handleTimezoneCloseRequest = (obj) => {
    setTimezoneBrowser(false);
    if (obj?.timezone) {
      setNewTimezone(obj);
      dispatch({
        type: actionTypes.TIMEZONE,
        timezone:obj.timezone ,
      });
    }
  };
  
  const setNewTimezone = (obj) => {
    APP.SESSION.DTO.SCHEDULE.dirty = true;
    APP.SESSION.DTO.SCHEDULE.timezone = obj.timezone;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
    setTz(obj.timezone) 
  };
  const resetTimezoneToDefault = () => {
    setLocalTimezone()
    setNewTimezone({ timezone: getTimezone() });
    dispatch({
      type: actionTypes.TIMEZONE,
      timezone:getTimezone() ,
    });
  };

  useEffect(() => {
    setShowCompletionMessage(props.showCompletionMessage);
  }, []);

  useEffect(() => {
    setShowCompletionMessage(props.showCompletionMessage);
  }, [props.showCompletionMessage]);

  const sendRetryRequest = () => {
    if (props.onRetry) {
      props.onRetry(0);
    }
  };

  return (
    <Slide direction="left" in={true}>
      <Box className={`p-4 min-h-screen`}>


        {props.hasErrors ? (
          <SweetMessageStrip type='error' dark={isDark} message={getErrorMessage()} retry onRetry={sendRetryRequest} />
        ) : !props.preRequisiteSessionAPIComplete ? (
          <SweetMessageStrip type='in-progress' dark={isDark} message={VALIDATING_REQUEST} />
        ) : (
          <>
            {showCompletionMessage && (
              <SweetMessageStrip type='message' dark={isDark} message={getCompletionMessage()} subtitle={APP.MESSAGES.INFO.FINAL_STEP_EDITS_HELP_TEXT} />
            )}
            <Box sx={{ width: "100%", mt: 1 }}>
              <BannerDetail banner={data?.basic} secondary={{ schedule: data?.schedule, fees: data?.fees }} onNavigate={props.onNavigate} />
              <Grid
                className="py-2"
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item lg={6} sm={12} md={6} xs={12}>
                  <PreviewCoverDetail bgBlur cover={data?.basic?.binary} />
                  <AuthorDetail author={props?.data?.user} />
                  <SummaryDetail summary={data?.basic?.summary} />
                  <CohostDetail cohost={data?.participant?.cohost} onNavigate={props.onNavigate} />
                  <SponsorshipDetail isDark={isDark} sponsor={data?.sponsor} onNavigate={props.onNavigate} />
                </Grid>
                <Grid item lg={6} sm={12} md={6} xs={12}>
                  <ScheduleDetail viewScheduleFromFinalPreview schedule={data?.schedule} handleTimezoneBrowserChange={handleTimezoneBrowserChange} resetTimezoneToDefault={resetTimezoneToDefault} showTimeZone onNavigate={props.onNavigate} />
                  <AttachmentDetail isDark={isDark} attachment={data?.basic} onNavigate={props.onNavigate} />
                  <QuestionairreDetail participant={data?.participant} onNavigate={props.onNavigate} />
                </Grid>
              </Grid>
            </Box>
            <TimezoneBrowseDialog
              selectedTimezone={data?.schedule?.timezone ?? data.timezone}
              dialogCloseRequest={handleTimezoneCloseRequest}
              isOpen={timezoneBrowserOpened}
            />
          </>
        )}
      </Box>
    </Slide>
  );
}

export default Final;

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
  getTimezone,
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
  const [timeDisplay, setTimeDisplay] = useState(null);
  const [theme, _dispatch] = useTheme();
  const [isDark, setDark] = useState(theme.mode === THEME_MODES.DARK);
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
      setDynamicTimeDisplay(obj);
    }
  };
  const setDynamicTimeDisplay = (obj) => {
    const defaultTimezone = getTimezone();
    if (
      data?.schedule &&
      data?.schedule?.timezone !== defaultTimezone &&
      obj?.timezone !== defaultTimezone
    ) {
      const start = moment(data?.schedule?.startDate);
      const end = moment(data?.schedule?.endDate);
      const startTime = start.tz(obj?.timezone).format("HH:mm");
      const endTime = end.tz(obj?.timezone).format("HH:mm");
      const _obj = { startTime, endTime };
      setTimeDisplay(_obj);
      return;
    }
    // for default time zone.
    resetDefaultTimeDisplay();
  };
  const resetDefaultTimeDisplay = () => {
    const defaultTimezone = getTimezone();
    const start = moment(data?.schedule?.startDate);
    const end = moment(data?.schedule?.endDate);
    const startTime = start.tz(defaultTimezone).format("HH:mm");
    const endTime = end.tz(defaultTimezone).format("HH:mm");
    const _obj = { startTime, endTime };
    setTimeDisplay(_obj);
  };
  const setNewTimezone = (obj) => {
    APP.SESSION.DTO.SCHEDULE.dirty = true;
    APP.SESSION.DTO.SCHEDULE.timezone = obj.timezone;
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
  };
  const resetTimezoneToDefault = () => {
    setNewTimezone({ timezone: getTimezone() });
    resetDefaultTimeDisplay();
  };

  useEffect(() => {
    if (!props.hasErrors) {
      const obj = { timezone: data?.schedule?.timezone || getTimezone() };
      setDynamicTimeDisplay(obj);
    }
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
                  <ScheduleDetail schedule={data?.schedule} handleTimezoneBrowserChange={handleTimezoneBrowserChange} resetTimezoneToDefault={resetTimezoneToDefault} showTimeZone timeDisplay={timeDisplay} onNavigate={props.onNavigate} />
                  <AttachmentDetail isDark={isDark} attachment={data?.basic} onNavigate={props.onNavigate} />
                  <QuestionairreDetail participant={data?.participant} onNavigate={props.onNavigate} />
                </Grid>
              </Grid>
            </Box>
            <TimezoneBrowseDialog
              selectedTimezone={data?.schedule?.timezone || getTimezone()}
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

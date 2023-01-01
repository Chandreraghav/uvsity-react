import { Box, Grid, Slide } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { KEYS } from '../../../async/queries/keys/unique-keys';
import AttachmentDetail from '../../../components/Authorized/Sessions/Details/AttachmentDetail';
import AuthorDetail from '../../../components/Authorized/Sessions/Details/AuthorDetail';
import BannerDetail from '../../../components/Authorized/Sessions/Details/BannerDetail';
import CohostDetail from '../../../components/Authorized/Sessions/Details/CohostDetail';
import PreviewCoverDetail from '../../../components/Authorized/Sessions/Details/PreviewCoverDetail';
import QuestionairreDetail from '../../../components/Authorized/Sessions/Details/QuestionairreDetail';
import ScheduleDetail from '../../../components/Authorized/Sessions/Details/ScheduleDetail';
import SponsorshipDetail from '../../../components/Authorized/Sessions/Details/SponsorshipDetail';
import SummaryDetail from '../../../components/Authorized/Sessions/Details/SummaryDetail';
import Final from '../../../components/Authorized/Sessions/Forms/Steps/Session/Final'
import TimezoneBrowseDialog from '../../../components/shared/modals/TimezoneBrowseDialog';
import { APP, SESSION_DOCUMENT, SESSION_POSTER, SPONSORSHIP } from '../../../constants/userdata';
import { useDataLayerContextValue } from '../../../context/DataLayer';
import { actionTypes } from '../../../context/reducer';
import { THEME_MODES, useTheme } from '../../../theme/ThemeProvider';
import { getTimezone, setGlobalTimezone, setLocalTimezone } from '../../../utils/utility';
import QuestionairreService from '../../api/session/QuestionairreService';
import moment from "moment-timezone";
function SessionProfileDetail(props) {
  const [ctxTheme, dispatch] = useTheme();
  const [session, setSession] = useState(null)
  const [timezoneBrowserOpened, setTimezoneBrowser] = useState(false);
  const [segregatedSessionData, setSegregatedSessionData] = useState({ basic: null, schedule: null, fees: null, cohost: null, sponsor: null, participant: null, })
  const [isDark, setDark] = useState(ctxTheme.mode === THEME_MODES.DARK);
  const [timeDisplay, setTimeDisplay] = useState(null);
  const handleNavigate = (navigationObject) => {
  }
  const getQuestionairre = async () =>
    await QuestionairreService.getQuestionairre(props.session_data?.registrationQuestionnaireId);

  const QUESTIONAIRRE = useQuery(
    [KEYS.SESSION.QUESTIONAIRRE_BY_ID + "_" + props.session_data?.registrationQuestionnaireId],
    getQuestionairre,
    {
      refetchOnWindowFocus: false
    }
  );
  useEffect(() => {
    setDark(ctxTheme.mode === THEME_MODES.DARK);
  }, [ctxTheme]);
  useEffect(() => {
    const basic = {
      name: props.session_data?.courseFullName,
      coverImage: {
        images: {
          poster: props.session_data?.imageURL
        }
      },
      author: props.session_data?.creator,
      summary: {
        html: props.session_data?.courseSummary,
      },
      attachment: {
        url: props.session_data?.url,
        binary: {
          documents: {
            data: {
              binary: {
                name: props.session_data?.slideDeckFileNameOriginal
              }
            },
            consent: props.session_data?.slideDeckFileNameOriginal ? true : false
          }
        }
      }
    }
    const schedule = {
      startDate: new Date(props.session_data?.courseStartDTime),
      endDate: new Date(props.session_data?.courseEndDTime),
      startTime: props.session_data?.startTime,
      endTime: props.session_data?.endTime,
      courseScheduleSummaryLong: props.session_data?.courseScheduleSummaryLong || null,
      courseScheduleSummaryShort: props.session_data?.courseScheduleSummaryShort || null,
      viewScheduleFromSessionProfile: true,
      timezone: getTimezone(),
    }
    const fees = {
      paidInd: !isNaN(props.session_data?.cost) && props.session_data?.cost > 0,
      amount: props.session_data?.cost,
      validationError: false,
      errors: {},
      dirty: false,
    }
    const cohost = props.session_data?.coHosts && props.session_data.coHosts instanceof Array ? props.session_data?.coHosts.at(0) : null

    const hasSponsorshipEnabled = props.session_data?.sponsorshipRequired
    const sponsor = { sponsorshipLevels: hasSponsorshipEnabled ? props.session_data?.sponsorshipLevels : [], sponsorShipInd: hasSponsorshipEnabled, viewSponsorshipsFromSessionProfile: hasSponsorshipEnabled }
    if (hasSponsorshipEnabled) {
      sponsor.sponsorshipLevels.map((level, idx) => {
        const currPtr = SPONSORSHIP.LEVELS.at(idx)
        currPtr.alias = level.sponsorshipLevel
        currPtr.id = level.sponsorshipLevelId
        currPtr.current.price.text = level.amount.toString()
        currPtr.current.featured.html = level.benefits
      })
      sponsor.sponsorshipLevels = SPONSORSHIP.LEVELS
    }
    const participant = {
      questionairre: QUESTIONAIRRE.isSuccess ? QUESTIONAIRRE.data.data : {},
      questions: QUESTIONAIRRE.isSuccess
    }
    setSegregatedSessionData({ basic, schedule, fees, cohost, sponsor, participant })
  }, [QUESTIONAIRRE.data?.data, QUESTIONAIRRE.isSuccess, props.session_data])

  const resetDefaultTimeDisplay = () => {
    const defaultTimezone = getTimezone();
    const start = moment(segregatedSessionData?.schedule?.startDate);
    const end = moment(segregatedSessionData?.schedule?.endDate);
    const startTime = start.tz(defaultTimezone).format("HH:mm");
    const endTime = end.tz(defaultTimezone).format("HH:mm");
    const _obj = { startTime, endTime };
    setTimeDisplay(_obj);
  };


  const resetTimezoneToDefault = () => {
    setLocalTimezone()
    resetDefaultTimeDisplay();
  };
  const handleTimezoneBrowserChange = () => {
    setTimezoneBrowser(true);
  };
  const setDynamicTimeDisplay = (obj) => {
    const defaultTimezone = getTimezone();
    if (
      obj?.timezone !== defaultTimezone
    ) {
      const start = moment(segregatedSessionData?.schedule?.startDate);
      const end = moment(segregatedSessionData?.schedule?.endDate);
      const startTime = start.tz(obj?.timezone).format("HH:mm");
      const endTime = end.tz(obj?.timezone).format("HH:mm");
      const _obj = { startTime, endTime };
      setTimeDisplay(_obj);
      return;
    }
    // for default time zone.
    resetDefaultTimeDisplay();
  };
  const handleTimezoneCloseRequest = (obj) => {
    setTimezoneBrowser(false);
    if (obj?.timezone) {
      setGlobalTimezone(obj?.timezone, true)
      setDynamicTimeDisplay(obj);
    }
  };
  return (
    <div>

      <Slide direction="left" in={true}>
        <Box className={`p-4 min-h-screen`}>
          <Box sx={{ width: "100%", mt: 1 }}>
            <BannerDetail banner={segregatedSessionData.basic} secondary={{ schedule: segregatedSessionData.schedule, fees: segregatedSessionData.fees }} onNavigate={props.onNavigate} />
            <Grid
              className="py-2"
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <PreviewCoverDetail bgBlur cover={segregatedSessionData.basic?.coverImage} />
                <AuthorDetail author={segregatedSessionData.basic?.author} />
                <SummaryDetail summary={segregatedSessionData.basic?.summary} />
                <CohostDetail cohost={segregatedSessionData.cohost} onNavigate={props.onNavigate} />
                <SponsorshipDetail isDark={isDark} sponsor={segregatedSessionData.sponsor} onNavigate={props.onNavigate} />
              </Grid>

              <Grid item lg={6} sm={12} md={6} xs={12}>
                <ScheduleDetail schedule={segregatedSessionData?.schedule} handleTimezoneBrowserChange={handleTimezoneBrowserChange} resetTimezoneToDefault={resetTimezoneToDefault} showTimeZone timeDisplay={timeDisplay} onNavigate={props.onNavigate} />
                <AttachmentDetail isDark={isDark} attachment={segregatedSessionData?.basic?.attachment} onNavigate={props.onNavigate} />
                <QuestionairreDetail participant={segregatedSessionData?.participant} onNavigate={props.onNavigate} />
              </Grid>
            </Grid>

          </Box>
          <TimezoneBrowseDialog
            selectedTimezone={getTimezone()}
            dialogCloseRequest={handleTimezoneCloseRequest}
            isOpen={timezoneBrowserOpened}
          />
        </Box>
      </Slide>
    </div>

  )
}

export default SessionProfileDetail
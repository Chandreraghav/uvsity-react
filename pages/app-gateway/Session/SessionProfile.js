import { Box, Grid, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AttachmentDetail from '../../../components/Authorized/Sessions/Details/AttachmentDetail';
import AuthorDetail from '../../../components/Authorized/Sessions/Details/AuthorDetail';
import BannerDetail from '../../../components/Authorized/Sessions/Details/BannerDetail';
import CohostDetail from '../../../components/Authorized/Sessions/Details/CohostDetail';
import PreviewCoverDetail from '../../../components/Authorized/Sessions/Details/PreviewCoverDetail';
import QuestionairreDetail from '../../../components/Authorized/Sessions/Details/QuestionairreDetail';
import ScheduleDetail from '../../../components/Authorized/Sessions/Details/ScheduleDetail';
import SponsorshipDetail from '../../../components/Authorized/Sessions/Details/SponsorshipDetail';
import SummaryDetail from '../../../components/Authorized/Sessions/Details/SummaryDetail';
import TimezoneBrowseDialog from '../../../components/shared/modals/TimezoneBrowseDialog';
import { APP, SPONSORSHIP } from '../../../constants/userdata';
import { useDataLayerContextValue } from '../../../context/DataLayer';
import { actionTypes } from '../../../context/reducer';
import { THEME_MODES, useTheme } from '../../../theme/ThemeProvider';
import { getTimezone, setGlobalTimezone, setLocalTimezone } from '../../../utils/utility';
import QuestionairreService from '../../api/session/QuestionairreService';
function SessionProfileDetail(props) {
  const [ctxData, _dispatch] = useDataLayerContextValue();
  const [ctxTheme, dispatch] = useTheme();
  const [timezoneBrowserOpened, setTimezoneBrowser] = useState(false);
  const [segregatedSessionData, setSegregatedSessionData] = useState({ session_id: null, basic: null, schedule: null, fees: null, cohost: null, sponsor: null, participant: null, })
  const [isSessionOwner, setSessionOwner] = useState(false)
  const [isDark, setDark] = useState(ctxTheme.mode === THEME_MODES.DARK);
  const handleNavigate = (navigationObject) => {
  }
  useEffect(() => {
    setDark(ctxTheme.mode === THEME_MODES.DARK);
  }, [ctxTheme]);
  useEffect(() => {
    setSessionOwner(props.session_data?.owner)
    const session_id = props.session_data?.courseId;
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
      timezone: getTimezone()
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

    let participant = null; //participant questionairre.

    async function getQuestionairre() {
      const response = await QuestionairreService.getQuestionairre(props.session_data?.registrationQuestionnaireId);
      if (response.status === 200) {
        participant = {
          questionairre: response.data,
          questions: true
        }
        setSegregatedSessionData({ session_id, basic, schedule, fees, cohost, sponsor, participant })
      }
    }
    if (props.session_data?.registrationQuestionnaireId) {
      getQuestionairre();
      return
    }
    setSegregatedSessionData({ session_id, basic, schedule, fees, cohost, sponsor, participant })
    return (() => { setSegregatedSessionData(null); })
  }, [props.session_data])


  const resetTimezoneToDefault = () => {
    setLocalTimezone()
    _dispatch({
      type: actionTypes.TIMEZONE,
      timezone: getTimezone(),
    });
  };
  const handleTimezoneBrowserChange = () => {
    setTimezoneBrowser(true);
  };

  const handleTimezoneCloseRequest = (obj) => {
    setTimezoneBrowser(false);
    if (obj?.timezone) {
      const tempSession = segregatedSessionData
      tempSession.schedule.timezone = obj?.timezone
      setSegregatedSessionData(tempSession);
      setGlobalTimezone(obj?.timezone, true)
      _dispatch({
        type: actionTypes.TIMEZONE,
        timezone: obj?.timezone,
      });
    }
  };

  const canShowSponsorshipAction=()=>{
    return (props.session_data.courseStatus == APP.SESSION.ACTIONS.STATUS.APPROVED ||
        props.session_data.courseStatus == APP.SESSION.ACTIONS.STATUS.ACTIVE)
  }

 
  return (
    <React.Fragment>
      <Slide direction="left" in={true}>
        <Box className={`p-4 min-h-screen`}>
          <Box sx={{ width: "100%", mt: 1 }}>
            <BannerDetail oid={segregatedSessionData.session_id} sessionData={props.session_data} showOwnerLabel={true} owner={isSessionOwner} banner={segregatedSessionData.basic} secondary={{ schedule: segregatedSessionData.schedule, fees: segregatedSessionData.fees }} onNavigate={props.onNavigate} />
            <Grid
              className="py-2"
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <PreviewCoverDetail owner={isSessionOwner} bgBlur cover={segregatedSessionData.basic?.coverImage} />
                <AuthorDetail owner={isSessionOwner} author={segregatedSessionData.basic?.author} />
                <SummaryDetail owner={isSessionOwner} summary={segregatedSessionData.basic?.summary} />
                <CohostDetail owner={isSessionOwner} cohost={segregatedSessionData.cohost} onNavigate={props.onNavigate} />
                <SponsorshipDetail showSponsorshipAction={canShowSponsorshipAction()} oid={segregatedSessionData.session_id} owner={isSessionOwner} isDark={isDark} sponsor={segregatedSessionData.sponsor} userRegistered={props.userRegistered} onNavigate={props.onNavigate} />
              </Grid>

              <Grid item lg={6} sm={12} md={6} xs={12}>
                <ScheduleDetail owner={isSessionOwner} schedule={segregatedSessionData.schedule} handleTimezoneBrowserChange={handleTimezoneBrowserChange} resetTimezoneToDefault={resetTimezoneToDefault} showTimeZone onNavigate={props.onNavigate} />
                <AttachmentDetail owner={isSessionOwner} isDark={isDark} attachment={segregatedSessionData?.basic?.attachment} onNavigate={props.onNavigate} />
                <QuestionairreDetail owner={isSessionOwner} participant={segregatedSessionData?.participant} onNavigate={props.onNavigate} />

              </Grid>
            </Grid>

          </Box>
          <TimezoneBrowseDialog
            selectedTimezone={ctxData.timezone ?? getTimezone()}
            dialogCloseRequest={handleTimezoneCloseRequest}
            isOpen={timezoneBrowserOpened}
          />
        </Box>
      </Slide>
    </React.Fragment>

  )
}

export default SessionProfileDetail
import React, { useEffect } from 'react'
import Final from '../../../components/Authorized/Sessions/Forms/Steps/Session/Final'
import { APP, SESSION_DOCUMENT, SESSION_POSTER } from '../../../constants/userdata';
import { useDataLayerContextValue } from '../../../context/DataLayer';
import { actionTypes } from '../../../context/reducer';
import { getTimezone } from '../../../utils/utility';

function SessionProfileDetail(props) {
  const [data, dispatch] = useDataLayerContextValue();
  const handleNavigate = (navigationObject) => {
  }
  console.log(props.session_data)
  const session_data = props.session_data
  useEffect(() => {
    APP.SESSION.DTO.BASIC.name = session_data?.courseFullName;
    APP.SESSION.DTO.BASIC.pastSessionId = 0;
    APP.SESSION.DTO.BASIC.shortName = session_data?.courseShortName
    APP.SESSION.DTO.BASIC.summary.html=session_data?.courseSummary
    APP.SESSION.DTO.BASIC.url=session_data?.url
    SESSION_POSTER.binary = null;
    SESSION_POSTER.imageURL = session_data?.imageURL
    APP.SESSION.DTO.BASIC.binary.images.poster = SESSION_POSTER.imageURL;
    APP.SESSION.DTO.BASIC.binary.images.data = SESSION_POSTER;
    APP.SESSION.DTO.BASIC.binary.images.error = false;
    SESSION_DOCUMENT.consent.hasConsent = true
    SESSION_DOCUMENT.name = session_data?.slideDeckFileNameOriginal
    SESSION_DOCUMENT.binary={name:session_data?.slideDeckFileNameOriginal}
    APP.SESSION.DTO.BASIC.binary.documents.consent = true;
    APP.SESSION.DTO.BASIC.binary.documents.data = SESSION_DOCUMENT;
    APP.SESSION.DTO.BASIC.binary.documents.error = false;
    
    APP.SESSION.DTO.SCHEDULE.endDate = new Date(session_data?.displayStopDateOnly);
    APP.SESSION.DTO.SCHEDULE.endTime = {display:session_data?.displayStopDate};
    APP.SESSION.DTO.SCHEDULE.timezone = getTimezone()
    APP.SESSION.DTO.SCHEDULE.startDate = new Date(session_data?.displayStartDateOnly);
    APP.SESSION.DTO.SCHEDULE.startTime = {display:session_data?.displayStartDate};
    // APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeekChecked = updatedCheckedState;
    // APP.SESSION.DTO.SCHEDULE.repeatScheduleFixed = true;
    // APP.SESSION.DTO.SCHEDULE.repeatSchedule = obj;
    // APP.SESSION.DTO.SCHEDULE.repeatScheduleSummary = res.data.value.summary;
    // APP.SESSION.DTO.SCHEDULE.duration = event.target.value;
    // APP.SESSION.DTO.SCHEDULE.repeatEndsOnDate = event;
    // APP.SESSION.DTO.SCHEDULE.repeats = true;
    // APP.SESSION.DTO.SCHEDULE.repeatValue = "";
    // APP.SESSION.DTO.SCHEDULE.repeatEvery = ""
    // APP.SESSION.DTO.SCHEDULE.repeatObject = repeatObject;
    // APP.SESSION.DTO.SCHEDULE.occurenceCount = occurenceCount;
    // APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeek = weeklyRepeatObject;
    // APP.SESSION.DTO.SCHEDULE.repeatByDaysOfWeekChecked = weeklyRepeatsOn;


    APP.SESSION.DTO.PARTICIPANTS.visibility=(session_data?.coHosts && session_data.coHosts?.length>0)
    APP.SESSION.DTO.PARTICIPANTS.errors={}
    APP.SESSION.DTO.PARTICIPANTS.cohost=session_data?.coHosts[0]
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: APP.SESSION.DTO.BASIC,
    });
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: APP.SESSION.DTO.SCHEDULE,
    });
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: APP.SESSION.DTO.PARTICIPANTS,
    });
  }, [dispatch, session_data])
  return (
    <div>
      <Final
        onNavigate={handleNavigate}
        hasErrors={false}
        errorMessage={null}
        data={props.session_data}
        sessionProfile
      />
    </div>
  )
}

export default SessionProfileDetail
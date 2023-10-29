import React, { useMemo } from 'react'
import SessionCard from '../../../SessionCards/SessionCard'
import { APP, SHIMMER_TIMEOUT_IN_MILLIS, WORKFLOW_CODES } from '../../../../constants'
import { Typography } from '@mui/material'
import HistoryIcon from '@mui/icons-material/History';
import UpcomingIcon from '@mui/icons-material/Upcoming';
function EnrolledSessions(props) {
  const sessionCategoryMap = useMemo(() => {
    const data = props.data;
    const map = new Map();
    if (data instanceof Array && data.length > 0) {
      map.set(APP.SESSION.ACTIONS.STATUS.UPCOMING, data.filter((_data) => _data.courseStatus === APP.SESSION.ACTIONS.STATUS.ACTIVE))
      map.set(APP.SESSION.ACTIONS.STATUS.PAST, data.filter((_data) => _data.courseStatus === APP.SESSION.ACTIONS.STATUS.SESSION_EXPIRED_V2))
    }
    return map
  }, [props.data])
  const expiredSessions = useMemo(() => sessionCategoryMap.get(APP.SESSION.ACTIONS.STATUS.PAST), [sessionCategoryMap])
  const upcomingSessions = useMemo(() => sessionCategoryMap.get(APP.SESSION.ACTIONS.STATUS.UPCOMING), [sessionCategoryMap])
  return (
    <div
      className=" min-h-screen  
grid items-stretch grid-cols-12  
gap-2 px-2 mx-auto xl:container md:gap-4 
xl:grid-cols-8 2xl:px-5 "
    >

      <div className="z-40  col-span-12 md:pt-2 md:col-span-12 lg:col-span-12 xl:col-span-10">
        {props.data &&
          (
            <>
              {upcomingSessions && upcomingSessions instanceof Array && upcomingSessions.length > 0 && (
                <React.Fragment>
                  <div className=" flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
                    <Typography className="p-2 justify-center" variant="h5"><UpcomingIcon /> Enrolled Sessions - Upcoming</Typography>
                  </div>
                  <div className="grid p-4 grid-cols-1 mb-16 md:mb-12 lg:mb-4 md:grid-cols-2 lg:grid-cols-3  gap-4">
                    {upcomingSessions.map((_data) => (
                      <SessionCard
                        key={_data.courseId}
                        data={_data}
                        authorized={true}
                        shimmerTime={SHIMMER_TIMEOUT_IN_MILLIS}
                        shimmer={true}
                        origin={props.type}
                        workflow={WORKFLOW_CODES.USER.SESSION.VIEW}
                      />))}
                  </div>
                </React.Fragment>
              )}
              {expiredSessions && expiredSessions instanceof Array && expiredSessions.length > 0 && (
                <React.Fragment>
                  <div className=" flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
                    <Typography className="p-2 justify-center" variant="h5"><HistoryIcon /> Past Enrolled Sessions</Typography>
                  </div>
                  <div className="grid p-4 grid-cols-1 mb-16 md:mb-12 lg:mb-4 md:grid-cols-2 lg:grid-cols-3  gap-4">
                    {expiredSessions.map((_data) => (
                      <SessionCard
                        key={_data.courseId}
                        data={_data}
                        authorized={true}
                        shimmerTime={SHIMMER_TIMEOUT_IN_MILLIS}
                        shimmer={true}
                        origin={props.type}
                        workflow={WORKFLOW_CODES.USER.SESSION.VIEW}
                      />))}
                  </div>
                </React.Fragment>
              )}
            </>
          )
        }
      </div>
    </div>
  )
}

export default EnrolledSessions
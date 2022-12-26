/* eslint-disable @next/next/no-img-element */
import { Paper, Typography } from '@mui/material'
import React from 'react'
import { isEmptyObject } from '../../../utils/utility'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchRollDown from './SearchRollDown';
function SearchResult(props) {
  const results = props.results || null
  const handleUserClick = (obj) => {
    if (obj && props.onItemClick) {
      props.onItemClick(true)
    }
  }
  if (isEmptyObject(results)) {
    return <></>
  }
  return (
    <>
      <Paper
        className="dark:bg-gray-dark bg-gray-100 dark:text-gray-400  text-gray-dark shadow-md rounded-md absolute z-50 w-3/4 md:1/2 lg:w-1/2 max-h-96 overflow-auto"
        component="div"
        sx={{
          p: "4px 4px",
          display: "flex",
          flexDirection: 'column',
          flex: 1

        }}
      >
        <div className="p-2 flex flex-col gap-3">
          {props.recent && (<Typography variant="body2"><AccessTimeIcon /> Recent searches</Typography>)}


          {results && results.ESUserDetails && results.ESUserDetails.length > 0 && (

            <React.Fragment>
              <Typography className="first-letter:underline select-none font-semibold" variant="subtitle">Users</Typography>

              {results.ESUserDetails.map((user) => (

                <SearchRollDown type={`User_Profile`} key={user.entityId} data={user} onUserClicked={handleUserClick} />

              ))}


            </React.Fragment>
          )}

          {results && results.ESCourseDetails && results.ESCourseDetails.length > 0 && (

            <React.Fragment>
              <Typography className="first-letter:underline select-none font-semibold" variant="subtitle">Sessions</Typography>

              {results.ESCourseDetails.map((course) => (

                <SearchRollDown type={`Course`} noAvatarCheck key={course.entityId} data={course} onUserClicked={handleUserClick} />

              ))}
            </React.Fragment>
          )}


        </div>
      </Paper>
    </>
  )
}

export default SearchResult

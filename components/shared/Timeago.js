import React from 'react'
import TimeAgo from 'react-timeago'
function Timeago(props) {
    return (
        <TimeAgo date={props.date || new Date().toDateString()} />
    )
}

export default Timeago
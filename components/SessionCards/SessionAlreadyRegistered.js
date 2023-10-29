import { Typography } from '@mui/material'
import React from 'react'

function SessionAlreadyRegistered(props) {
    return (
        <>
            <Typography variant={props.variant || 'subtitle1'}>
                {props.label}
            </Typography>

        </>
    )
}

export default SessionAlreadyRegistered
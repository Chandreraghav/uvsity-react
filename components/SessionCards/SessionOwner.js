import { Chip, Tooltip } from '@mui/material'
import React from 'react'
import { SESSION } from '../../constants'

function SessionOwner() {
    return (
        <> <Tooltip arrow title={SESSION.OWNER.TOOLTIP}><Chip icon={<SESSION.OWNER.ICON />} color="success" label={SESSION.OWNER.LABEL} variant="filled" /></Tooltip></>
    )
}

export default SessionOwner

import React from 'react'
import { Button } from '@mui/material';
import { SESSION_ACTIONS } from '../../../../constants';

function SponsorSession(props) {
    return (
        <>
            <Button variant="contained" startIcon={SESSION_ACTIONS[1].icon}>
                {props.label || SESSION_ACTIONS[1].tooltip}
            </Button>
        </>
    )
}

export default SponsorSession
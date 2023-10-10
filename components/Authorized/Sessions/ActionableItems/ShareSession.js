import { Stack, Tooltip } from '@mui/material'
import React from 'react'
import { SESSION } from '../../../../constants'
function ShareSession(props) {
    return (
        <Stack direction="row" spacing={2}>
            {SESSION.SHARE_OPTIONS.map((action, index) =>
            (
                <div className="cursor-pointer" key={action.id}>
                    <Tooltip title={action.title}>
                        <action.icon className="hover:text-[#3b5999] transition-all duration-100 ease-in-out" />
                    </Tooltip>

                </div>)
            )}
        </Stack>
    )
}

export default ShareSession
import { Box, Tooltip, Typography } from '@mui/material'
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getLocalTimezone } from '../../../utils/utility';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { RESET_TO_LOCAL_TZ } from '../../../constants/timezones';

function TimezoneStrip(props) {
    if (!props.timezone) return (<></>)
    const handleTimezoneBrowserChange = (obj) => {
        if (props.onTimezoneBrowse) {
            props.onTimezoneBrowse(obj)
        }
    }
    return (
        <>
            <Box className=" ml-auto flex gap-1">
                <Tooltip title='Change timezone'>
                    <Typography
                        onClick={() => handleTimezoneBrowserChange()}
                        variant="caption"
                        className="text-xs cursor-pointer font-normal line-clamp-1 text-gray-500 leading-tight  ml-auto"
                    >
                        <AccessTimeIcon fontSize="small" />
                    </Typography>
                </Tooltip>
                <Box className="flex gap-1 flex-wrap text-sm text-gray-600">
                    <Typography className=" select-none" variant='subtitle2'>{props.timezone}</Typography>
                    {props.timezone !== getLocalTimezone() &&
                        (<Tooltip title={RESET_TO_LOCAL_TZ}>
                            <Typography onClick={() => handleTimezoneBrowserChange('revert')} variant="caption" className="text-xs cursor-pointer leading-tight italic">
                                <SettingsBackupRestoreIcon fontSize="small" /></Typography>
                        </Tooltip>)}

                </Box>

            </Box>
        </>
    )
}

export default TimezoneStrip
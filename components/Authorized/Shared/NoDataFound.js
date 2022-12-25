/* eslint-disable @next/next/no-img-element */
import { Typography } from '@mui/material';
import React from 'react'
import InfoIcon from "@mui/icons-material/Info";
import { IMAGE_PATHS } from '../../../constants/userdata';
import { GENERIC_NO_DATA_ERROR } from '../../../constants/error-messages';
function NoDataFound(props) {
    return (
        <>
            <div className=" p-2 flex gap-1 text-sm text-md justify-center items-center text-gray-600 font-normal">

                
                <Typography className=" flex gap-2 mt-1 text-md leading-snug font-medium" variant="subtitle">
                <InfoIcon/> <div className=" mt-0.5">{props.message ? props.message : GENERIC_NO_DATA_ERROR}</div>
                </Typography>
                 
            </div>

            <img
                alt="no-data-illustration"
                src={props.src || IMAGE_PATHS.NO_DATA.SESSION}
                className="  w-full h-60 object-contain"
            />
        </>
    )
}

export default NoDataFound
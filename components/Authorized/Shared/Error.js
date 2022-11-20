/* eslint-disable @next/next/no-img-element */
import { Button, Stack, Typography } from '@mui/material';
import React from 'react'
import StartIcon from "@mui/icons-material/Start";
import WarningIcon from "@mui/icons-material/Warning"
import { GENERIC_INTERNAL_ERROR } from '../../../constants/error-messages';
import { IMAGE_PATHS } from '../../../constants/userdata';
function Error(props) {
    return (
        <>
            <div className=" flex gap-1 text-sm text-md justify-center items-center text-gray-600 font-normal">
                <WarningIcon className="mt-1" />
                <Typography className=" mt-1" variant="div">
                    {props.message ? props.message : GENERIC_INTERNAL_ERROR}
                </Typography>
            </div>

             <img
                alt="something-went-wrong-illustration"
                src={props.src || IMAGE_PATHS.NO_DATA.SESSION}
                className="  w-full h-60 object-contain"
            />
            {props.retry && ( <div className=" flex justify-center items-center mt-5">
                <Stack direction="row" spacing={2}>

                    <Button
                        onClick={() => {
                            location.reload();
                        }}
                        variant="contained"
                        endIcon={<StartIcon />}
                    >
                        Retry
                    </Button>
                </Stack>
            </div>)}
           
        </>
    )
}

export default Error
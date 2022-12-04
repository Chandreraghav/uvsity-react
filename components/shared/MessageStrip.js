/* eslint-disable @next/next/no-img-element */
import { Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import InfoIcon from "@mui/icons-material/Info";
import Spacer from './Spacer';
import WarningIcon from "@mui/icons-material/Warning";
import ReplayIcon from "@mui/icons-material/Replay";
import StartIcon from "@mui/icons-material/Start";
function SweetMessageStrip(props) {
    if (!props.message) return (<></>)
    return (
        <>
            {props.type === 'message' && (<>
                <div className="mb-2 flex gap-1 text-md font-semibold">

                    <Typography className=" dark:text-gray-500 text-gray-700" variant="h6">
                        {props.icon ? <props.icon /> : <>🚀</>}{props.message}
                    </Typography>
                </div>

                {props?.subtitle && (
                    <React.Fragment>
                        <div className="flex ml-1 gap-1 mt-2">
                            <InfoIcon className="text-gray-600" fontSize="small" />
                            <Typography
                                variant="div"
                                className=" line-clamp-1 leading-tight text-sm text-gray-600"
                                sx={{ mt: 0 }}
                            >
                                {props?.subtitle}
                            </Typography>
                        </div>
                        <Spacer />
                        <Divider sx={{ borderColor: props?.dark ? 'lightgrey' : 'darkgrey' }} variant="fullWidth" light={!props?.dark}></Divider>

                    </React.Fragment>
                )}
            </>)}
            {props.type === 'success' && (<></>)}
            {props.type === 'info' && (<></>)}
            {props.type === 'warning' && (<></>)}
            {props.type === 'error' && (
                <>
                    <div className="mb-2 flex gap-1 text-sm text-md justify-center items-center text-gray-600 font-normal">
                        <WarningIcon className="mt-1" />
                        <Typography className=" mt-1" variant="div">
                            {props.message}
                        </Typography>
                    </div>
                    <img
                        alt="something-went-wrong-illustration"
                        src="/static/images/something-wrong-illustration-1.webp"
                        className="  w-full h-60 object-contain"
                    />
                    {props.retry && (<div className=" flex justify-center items-center mt-5">
                        <Stack direction="row" spacing={2}>
                            <Button
                                onClick={() => {
                                    props?.onRetry();
                                }}
                                variant="outlined"
                                startIcon={<ReplayIcon />}
                            >
                                Retry
                            </Button>
                            <Button
                                onClick={() => {
                                    location.reload();
                                }}
                                variant="contained"
                                endIcon={<StartIcon />}
                            >
                                Restart
                            </Button>
                        </Stack>
                    </div>)}

                </>)
            }
            {props.type === 'in-progress' && (<>
                <div className="mb-2 flex gap-1 text-md text-gray-600 font-semibold">
                    <CircularProgress className="text-sm -mt-1.5" color="inherit" />
                    <Typography className=" " variant="div">
                        {props.message}
                    </Typography>
                </div>

            </>)}

        </>
    )
}

export default SweetMessageStrip
import { Divider, Tooltip, Typography } from '@mui/material';
import React from 'react'
import VideocamIcon from "@mui/icons-material/Videocam";
import ReactPlayer from "react-player";
import AttachmentIcon from "@mui/icons-material/Attachment";
import EditIcon from "@mui/icons-material/Edit";
import { download, getFileExtension, getIconPerFileExtension, isEmptyObject } from '../../../../utils/utility';
import Spacer from '../../../shared/Spacer';
function AttachmentDetail(props) {
    if (!props.attachment || (!props.attachment?.url && !props.attachment?.binary?.documents?.consent)) return (<></>)
    return (
        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-950 px-4 p-4 mt-1 rounded-lg border-1 border-spacing-2 shadow-md bg-repeat-round">
            <div className="flex flex-col gap-1">
                {props.attachment?.url && (
                    <>
                         <div className="flex gap-1">
                            <VideocamIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                            <Typography
                                variant="div"
                                className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-600"
                            >
                                <u>P</u>review
                            </Typography>{" "}
                            <div
                                className="flex mr-2 text-blue-600
           ml-auto app-anchor-block cursor-pointer"
                            >
                                <Tooltip title="Change">
                                    <EditIcon
                                        onClick={() => {
                                            props.onNavigate
                                                ? props.onNavigate(0)
                                                : null;
                                        }}
                                        fontSize="small"
                                        className=" leading-3 font-semibold  text-sm"
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className="player__wrapper py-1">
                            <ReactPlayer
                                controls
                                loop={true}
                                muted
                                width="100%"
                                height="250px"
                                className="player"
                                url={props.attachment?.url}
                            />
                        </div>
                    </>
                )}

                {props.attachment?.binary?.documents?.consent && (
                    <>
                    <Spacer/>
                        <Divider sx={{ borderColor: props?.isDark ? 'lightgrey' : 'darkgrey' }} variant="fullWidth" light={!props?.isDark}></Divider>
                        <div className="flex gap-1">
                            <AttachmentIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                            <Typography
                                variant="div"
                                className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-600"
                            >
                                <u>A</u>ttachment
                            </Typography>{" "}
                        </div>

                        <div className="flex gap-1">
                            <div className="text-gray-600 line-clamp-1">
                                {getIconPerFileExtension(
                                    getFileExtension(
                                        props.attachment?.binary?.documents?.data?.binary
                                            ?.name
                                    )
                                )}
                            </div>

                            <div
                                onClick={() =>
                                    download(
                                        props.attachment?.binary?.documents?.data?.binary
                                            ?.preview,
                                        props.attachment?.binary?.documents?.data?.binary
                                            ?.name
                                    )
                                }
                            >
                                <Tooltip title="Click to download">
                                    <Typography
                                        variant="div"
                                        className="app-anchor-block cursor-pointer font-normal line-clamp-1 text-sm mt-1  leading-tight  text-gray-600"
                                    >
                                        {
                                            props.attachment?.binary?.documents?.data?.binary
                                                ?.name
                                        }
                                    </Typography>
                                </Tooltip>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AttachmentDetail
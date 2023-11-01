import React, { useState, useEffect, useMemo } from 'react'
import MacroSessionProfile from '../../../components/Authorized/Sessions/MacroSessionProfile'
import ProfileStyle from "../../../styles/Profile.module.css";
import { isPast } from '../../../utils/utility';
import { Tooltip, Typography } from '@mui/material';
import InfoIcon from "@mui/icons-material/Info";
import Timeago from '../../../components/shared/Timeago';
import HistoryIcon from '@mui/icons-material/History';
function SProfile(props) {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => {
            window.removeEventListener("scroll", transitionNavBar);

        };
    }, []);
    const transitionNavBar = () => {
        if (window.scrollY > 150) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };
    const startDate = useMemo(() => {
        return new Date(props.session_data?.courseStartDTime).getDate();
    }, [props.session_data?.courseStartDTime]);
    const startMonth = useMemo(() => {
        const date = new Date(props.session_data?.courseStartDTime);
        const fullMonthName = date.toLocaleString(undefined, { month: "long" })
        //const month = date?.toLocaleString("default", { month: "short" });
        return fullMonthName;
    }, [props.session_data?.courseStartDTime]);

    const startYear = useMemo(() => {
        const dateString = props.session_data?.courseStartDTime;
        const date = new Date(dateString);
        const year = date.getFullYear();
        return year
    }, [props.session_data?.courseStartDTime]);

    const timeAgoDateFormat = useMemo(() => {
        return startMonth + ' ' + startDate + ',' + startYear
    }, [startDate, startMonth, startYear])
    const _isPast = useMemo(() => {
        return isPast(new Date(props.session_data?.courseStartDTime))
    }, [props.session_data?.courseStartDTime])
    return (
        <div className=" min-h-screen">
            {props?.session_data && (
                <>
                    {/* Top Fixed Header */}
                    <div
                        className={` lg:w-3/4 xl:w-3/4 w-full xs:w-full ${ProfileStyle.profile__macro__top__fixed__header} ${show ? (_isPast ? (ProfileStyle.profile__macro__header__grayscale) : ProfileStyle.profile__macro__header__show) : "hidden"
                            }`}
                    >
                        <div className="flex-col">
                            <div>
                                {props?.session_data.courseFullName}
                            </div>

                            <div className=" flex justify-between">
                                <div className="-mt-1.5 text-sm text-gray-400 font-light line-clamp-1">
                                    <Tooltip title={timeAgoDateFormat}>
                                        <div className="text-sm flex gap-1">
                                            <HistoryIcon className="mt-1" sx={{
                                                fontSize: 16, // Adjust this value to change the icon size
                                            }} /><Timeago date={timeAgoDateFormat} /></div>
                                    </Tooltip>

                                </div>
                                {_isPast === true && (
                                    <div className="ml-auto -mt-1.5">
                                        <Typography variant='caption' className="text-gray-600 overflow-hidden leading-tight">
                                            <InfoIcon sx={{
                                                fontSize: 14, // Adjust this value to change the icon size
                                            }} /> This session has ended.
                                        </Typography>
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>
                </>
            )}

            <div
                className="  p-2
    grid items-stretch grid-cols-12  
    gap-2 px-2 mx-auto xl:container md:gap-4 
    xl:grid-cols-8 2xl:px-5 "
            >
                <div className="   col-span-12 md:pt-2">
                    {/* Main Content */}
                    <MacroSessionProfile
                        hasChangeEventTriggered={props?.hasChangeEventTriggered}
                        changeEvent={props?.changeEvent}
                        owner={props?.owner}
                        session_data={props?.session_data}
                        loggedInUser={props?.loggedInUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default SProfile
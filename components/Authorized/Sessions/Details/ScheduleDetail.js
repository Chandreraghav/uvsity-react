import { Tooltip } from '@material-ui/core';
import React from 'react'
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PublicIcon from "@mui/icons-material/Public";
import { getTimezone } from '../../../../utils/utility';

function ScheduleDetail(props) {
    if (!props.schedule) return (<></>)
    const handleTimezoneBrowserChange = () => {
        if (props.handleTimezoneBrowserChange) {
            props.handleTimezoneBrowserChange()
        }

    };
    const resetTimezoneToDefault = () => {
        if (props.resetTimezoneToDefault) {
            props.resetTimezoneToDefault()
        }
    };


    const getScheduleText = () => {
        if (props?.schedule?.viewScheduleFromSessionProfile) {
            return props?.schedule?.courseScheduleSummaryShort
        }
        if (props?.schedule?.repeats) {
            return props?.schedule?.repeatObject?.displayValue;
        }
        return "Once";
    };
    const getStartDate = () => {
        return props?.schedule?.startDate.getDate();
    };
    const getEndDate = () => {
        return props?.schedule?.endDate.getDate();
    };

    const getEndYear = () => {
        return props?.schedule?.endDate.getFullYear();
    };

    const getStartYear = () => {
        return props?.schedule?.startDate.getFullYear();
    };
    const getStartMonth = () => {
        const date = props?.schedule?.startDate;
        const month = date?.toLocaleString("default", { month: "short" });
        return month;
    };
    const getEndMonth = () => {
        const date = props?.schedule?.endDate;
        const month = date?.toLocaleString("default", { month: "short" });
        return month;
    };
    const getTime = (obj) => {
        let startDisplay, endDisplay;
        if (!obj) {
            startDisplay = props?.schedule?.startTime.display;
            endDisplay = props?.schedule?.endTime.display;
            startDisplay = startDisplay.replace(/^0+/, "");
            endDisplay = endDisplay.replace(/^0+/, "");
        } else {
            startDisplay = obj.startTime;
            endDisplay = obj.endTime;
        }

    if(props?.schedule?.startDate instanceof Date && props?.schedule?.endDate instanceof Date) {
        const startdate =   props?.schedule?.startDate
        startdate.setHours(parseInt(props?.schedule?.startTime.hour.replace(/^0+/, "")))
        startdate.setMinutes(parseInt(props?.schedule?.startTime.minute))
        const endDate = props?.schedule?.endDate
        endDate.setHours(parseInt(props?.schedule?.endTime.hour.replace(/^0+/, "")))
        endDate.setMinutes(parseInt(props?.schedule?.endTime.minute))
        const start_date_am_pm = startdate.getHours() >= 12 ? " PM" : " AM";
        startDisplay+=start_date_am_pm
        const end_date_am_pm = endDate.getHours() >= 12 ? " PM" : " AM";
        endDisplay+=end_date_am_pm
    }
        return `${startDisplay} - ${endDisplay}`;
    };

    const getEffectiveDate = (forcePartition=false) => {
        let startMonth = getStartMonth();
        let startYear = getStartYear();
        let startDate = getStartDate();
        let endDate = getEndDate();
        let endMonth = getEndMonth();
        let endYear = getEndYear();
        if(forcePartition){
            return `${startMonth} ${startDate},${startYear} - ${endMonth} ${endDate},${endYear}`;
        }
        const effectiveDate =
            startDate === endDate
                ? `${startMonth} ${startDate},${startYear}`
                : `${startMonth} ${startDate},${startYear} - ${endMonth} ${endDate},${endYear}`;
        return effectiveDate;
    };
    return (
        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-950 px-4 p-4 mt-1 rounded-lg border-1 border-spacing-2 shadow-md bg-repeat-round">
            <div className="flex gap-1">
                <ScheduleIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                <Typography
                    variant="div"
                    className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                >
                    Schedule:
                </Typography>
                <Typography
                    variant="div"
                    className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800 dark:text-gray-400"
                >
                    {getScheduleText()}
                </Typography>

                <div
                    className="flex mr-2 text-blue-600
           ml-auto app-anchor-block cursor-pointer"
                >
                    <Tooltip title="Change">
                        <EditIcon
                            onClick={() => {
                                props.onNavigate ? props.onNavigate(1) : null;
                            }}
                            fontSize="small"
                            className=" leading-3 font-semibold  text-sm"
                        />
                    </Tooltip>
                </div>
            </div>

            {!props?.schedule?.viewScheduleFromSessionProfile && (

                <div>
                    {!props?.schedule?.repeats && (
                        <div className="flex gap-1">
                            <DateRangeIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                            <Typography
                                variant="div"
                                className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                            >
                                Effective:
                            </Typography>

                            <Typography
                                variant="div"
                                className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800 dark:text-gray-500"
                            >
                                {getEffectiveDate()}
                            </Typography>
                        </div>
                    )}

                    {props?.schedule?.repeats &&
                        props?.schedule?.repeatScheduleSummary && (
                            <div className="flex gap-1 ">
                                <EventRepeatIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                                <Typography
                                    variant="div"
                                    className="  font-semibold  text-md  leading-tight w-20 text-gray-600"
                                >
                                    Occurence:
                                </Typography>
                                <Typography
                                    variant="div"
                                    className=" text-xs font-normal line-clamp-2 italic  leading-tight  text-gray-800 dark:text-gray-500"
                                >
                                    {props?.schedule?.repeatScheduleSummary.substring(
                                        0,
                                        props?.schedule?.repeatScheduleSummary.indexOf(
                                            "from"
                                        ) - 1
                                    )}
                                    .
                                </Typography>

                            </div>
                        )}
                </div>
            )}



            {props?.schedule?.viewScheduleFromSessionProfile &&

                (<>
                <div className="flex gap-1">

                     <DateRangeIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                    <Typography
                        variant="div"
                        className="  font-semibold line-clamp-1 text-md  leading-snug text-gray-600"
                    >
                        Effective:
                    </Typography>

                      

                    <Typography
                        variant="div"
                        className="  font-normal line-clamp-1 text-md  leading-tight  text-gray-800 dark:text-gray-500"
                    >
                        {getEffectiveDate(true)}
                    </Typography>

                     
                  
                </div>
                {props?.schedule?.courseScheduleSummaryLong && (
                    <div className="flex gap-1 ">
                    <EventRepeatIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                    <Typography
                        variant="div"
                        className="  font-semibold  text-md  leading-tight w-20 text-gray-600"
                    >
                        Occurence:
                    </Typography>
                    <Typography
                        variant="div"
                        className=" text-xs font-normal line-clamp-2 italic  leading-tight  text-gray-800 dark:text-gray-500"
                    >
                         
                       {props?.schedule?.courseScheduleSummaryLong}.
                    </Typography>

                </div>
                )}
                
                </>
                )
            }

            



            <div className="flex gap-1">
                <PublicIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                <Typography
                    variant="div"
                    className="  font-semibold line-clamp-1 text-sm  leading-snug text-gray-600"
                >
                    Time:
                </Typography>

                <Typography
                    variant="div"
                    className="  font-normal line-clamp-1 text-sm  leading-tight  text-gray-800 dark:text-gray-400"
                >
                    {getTime(props?.timeDisplay)}(
                    {props?.schedule?.timezone || getTimezone()})
                </Typography>
                {props.showTimeZone && (<Box className=" ml-auto flex gap-1">
                    <Typography
                        onClick={() => handleTimezoneBrowserChange()}
                        variant="caption"
                        className="text-xs app-anchor-block cursor-pointer font-normal line-clamp-1 text-gray-500    leading-tight  ml-auto"
                    >
                        See other timezones
                    </Typography>

                    {props?.schedule &&
                        props?.schedule?.timezone !== getTimezone() && (
                            <Tooltip title="Reset to region timezone">

                                <RestartAltIcon onClick={() => resetTimezoneToDefault()}
                                    className="text-gray-600  cursor-pointer" fontSize="small" />

                            </Tooltip>
                        )}
                </Box>)}


            </div>
        </div>
    )
}

export default ScheduleDetail
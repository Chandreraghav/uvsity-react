import { Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PublicIcon from "@mui/icons-material/Public";
import { getLocalTimezone, getTimezone, localTZDate } from '../../../../utils/utility';
import Spacer from '../../../shared/Spacer';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { RESET_TO_LOCAL_TZ } from '../../../../constants/timezones';
import { useDataLayerContextValue } from '../../../../context/DataLayer';
import { actionTypes } from '../../../../context/reducer';


function ScheduleDetail(props) {
    const [schedule, setSchedule] = useState(null)
    const [ctxData, dispatch] = useDataLayerContextValue();

    useEffect(() => {
        setSchedule(props.schedule)
        return (() => setSchedule(null))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.schedule])
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
        if (schedule?.viewScheduleFromSessionProfile) {
            return schedule?.courseScheduleSummaryShort
        }
        if (schedule?.repeats) {
            return schedule?.repeatObject?.displayValue;
        }
        return "Once";
    };
    const getStartDate = () => {
        return schedule?.startDate?.getDate()

    };
    const getEndDate = () => {
        return schedule?.endDate.getDate();
    };

    const getEndYear = () => {
        return schedule?.endDate.getFullYear();
    };

    const getStartYear = () => {
        return schedule?.startDate.getFullYear();

    };
    const getStartMonth = () => {
        const date = schedule?.startDate
        const month = date?.toLocaleString("default", { month: "short" });
        return month;
    };
    const getEndMonth = () => {
        const date = schedule?.endDate;
        const month = date?.toLocaleString("default", { month: "short" });
        return month;
    };
    const getTime = () => {
        let tz = ctxData?.timezone ?? getTimezone()
        if (props.viewScheduleFromFinalPreview) {
            tz = props.schedule?.timezone ?? ctxData?.timezone
        }
        let startDate = localTZDate(schedule?.startDate, tz, true)
        let endDate = localTZDate(schedule?.endDate, tz, true)
        return `${startDate} - ${endDate}`
    };

    const getEffectiveDate = (forcePartition = false) => {
        let startMonth = getStartMonth();
        let startYear = getStartYear();
        let startDate = getStartDate();
        let endDate = getEndDate();
        let endMonth = getEndMonth();
        let endYear = getEndYear();
        if (forcePartition) {
            return `${startMonth} ${startDate},${startYear} - ${endMonth} ${endDate},${endYear}`;
        }
        const effectiveDate =
            startDate === endDate
                ? `${startMonth} ${startDate},${startYear}`
                : `${startMonth} ${startDate},${startYear} - ${endMonth} ${endDate},${endYear}`;
        return effectiveDate;
    };
    return (

        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-950 px-4 p-4 mt-1 mb-4 rounded-lg border-1 dark:border-gray-800 dark:shadow-gray-700 border-spacing-2 shadow-md bg-repeat-round">
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

                {props.owner === true && (
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
                )}

            </div>

            {!schedule?.viewScheduleFromSessionProfile && (

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

                    {schedule?.repeats &&
                        schedule?.repeatScheduleSummary && (
                            <div className="flex gap-1 ">
                                <EventRepeatIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                                <Typography
                                    variant="div"
                                    className="  font-semibold  text-md  leading-tight w-20 text-gray-600"
                                >
                                    Occurence:
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    className=" font-normal line-clamp-2 italic  leading-tight  text-gray-800 dark:text-gray-500"
                                >
                                    {schedule?.repeatScheduleSummary.substring(
                                        0,
                                        schedule?.repeatScheduleSummary.indexOf(
                                            "from"
                                        ) - 1
                                    )}
                                    .
                                </Typography>

                            </div>
                        )}
                </div>
            )}
            {schedule?.viewScheduleFromSessionProfile &&

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
                            {getEffectiveDate()}
                        </Typography>
                    </div>
                    {schedule?.courseScheduleSummaryLong && (
                        <div className="flex gap-1 ">
                            <EventRepeatIcon className=" leading-3 font-semibold  text-xl text-gray-600" />
                            <Typography
                                variant="div"
                                className="  font-semibold  text-md  leading-tight w-20 text-gray-600"
                            >
                                Occurence:
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                className="   font-normal line-clamp-2 italic  leading-tight  text-gray-800 dark:text-gray-500"
                            >

                                {schedule?.courseScheduleSummaryLong}.
                            </Typography>

                        </div>
                    )}

                </>
                )
            }

            <div className="flex flex-col">
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
                        {getTime()}

                        {/* Read Timezone from props if schedule is viewed from Final Preview Component. Otherwise, always show timezone from factory context API. */}
                        {
                            props.viewScheduleFromFinalPreview && props.schedule?.timezone ? (<>(
                                {props.schedule?.timezone})
                            </>) : ctxData && ctxData.timezone && (<>({ctxData?.timezone})</>)
                        }
                    </Typography>
                </div>
                <Spacer />
                {props.showTimeZone && (

                    <Box className=" py-1 flex gap-1">
                        <Typography
                            onClick={() => handleTimezoneBrowserChange()}
                            variant="caption"
                            className="text-xs app-anchor-block cursor-pointer font-normal line-clamp-1 text-gray-500    leading-tight"
                        >
                            See other timezones
                        </Typography>

                        {
                            ctxData?.timezone !== getLocalTimezone() && (
                                <Tooltip title={RESET_TO_LOCAL_TZ}>
                                    <SettingsBackupRestoreIcon onClick={() => resetTimezoneToDefault()}
                                        className="text-gray-600  cursor-pointer" fontSize="small" />
                                </Tooltip>
                            )}
                    </Box>)}
            </div>
        </div>

    )
}

export default ScheduleDetail
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useMemo } from "react";
import Preview from "./Preview";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Spacer from "../../../shared/Spacer";
import Shimmer from "./Shimmer/Shimmer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import { IMAGE_PATHS, TOOLTIPS } from "../../../../constants/userdata";
import EndOfFeed from "./EndOfFeed";
import { getMode, THEME_MODES } from "../../../../theme/ThemeProvider";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useQuery } from "@tanstack/react-query";
import { KEYS } from "../../../../async/queries/keys/unique-keys";
import { standardStaleTime } from "../../../../async/subscriptions";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import { getTimezone, setGlobalTimezone, setLocalTimezone } from "../../../../utils/utility";
import TimezoneStrip from "../../Shared/TimezoneStrip";
import TimezoneBrowseDialog from "../../../shared/modals/TimezoneBrowseDialog";
import { actionTypes } from "../../../../context/reducer";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { useGetAllTopics } from '../../../../hooks';

function CompactCard({ title }) {

  const [isSticky, setSticky] = useState(false);
  const [timezone, setTimezone] = useState(getTimezone());
  const [timezoneBrowserOpened, setTimezoneBrowser] = useState(false);
  const [ctxData, _dispatch] = useDataLayerContextValue();
 
  const getTopCourses = async () =>
    (await UserDataService.getTopCourses()).data;

  const TOP_SESSIONS = useQuery([KEYS.SESSION.TOP], getTopCourses, {
    staleTime: standardStaleTime,
  });

  const topicsData = useGetAllTopics();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollheightLimit = 100;
      if (window.scrollY > scrollheightLimit) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
    return () => {
      try {
        window.removeEventListener("scroll");
      } catch (error) { }
    };
  }, []);

  const topicsMapByCourseName = useMemo(() => {
    const newTopicsData = topicsData?.data || [];
    return new Map(
      newTopicsData
        .filter((currentTopic) => !!currentTopic?.topic?.topicName)
        .map(({ topic }) => [topic.topicName, topic])
    );
  }, [topicsData]);

  const handleTimeZoneBrowse = (obj) => {
    if(obj==='revert'){
      setLocalTimezone();
      setTimezone(getTimezone())
      _dispatch({
        type: actionTypes.TIMEZONE,
        timezone:getTimezone() ,
      });
      return;
    }
    setTimezoneBrowser(true)
  }

  const handleTimezoneCloseRequest = (obj) => {
    setTimezoneBrowser(false);
    if (obj?.timezone) {
      setTimezone(obj.timezone)
      setGlobalTimezone(obj.timezone)
      _dispatch({
        type: actionTypes.TIMEZONE,
        timezone:obj.timezone ,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Box className="flex">
          <Typography className="font-bold text-lg pr-8" variant="subtitle"><TrendingUpIcon />&nbsp;{title}</Typography>
          {TOP_SESSIONS.data && TOP_SESSIONS.data?.length > 0 && (
           <>
            <TimezoneStrip onTimezoneBrowse={handleTimeZoneBrowse} timezone={timezone} />
            <TimezoneBrowseDialog
              selectedTimezone={ctxData.timezone ?? timezone}
              dialogCloseRequest={handleTimezoneCloseRequest}
              isOpen={timezoneBrowserOpened}
            />
          </>)}
        </Box>
        <Spacer />
        <Divider />
        <div
          className="grid items-stretch grid-cols-1 gap-2 px-2 
       py-4 xl:container md:gap-4 xl:grid-cols-1 2xl:px-5 "
        >
          {[1, 2].map((i, v) => (
            <Shimmer key={v} visible={TOP_SESSIONS.isLoading} />
          ))}

          {TOP_SESSIONS.isSuccess &&
            TOP_SESSIONS.data.length > 0 &&
            TOP_SESSIONS?.data?.map((value) => (
              <Stack key={value.courseId}>
                <Preview
                  data={value}
                  mappedTopic={topicsMapByCourseName.get(value?.courseFullName || '')}
                />
                <Spacer />
              </Stack>
            ))}

          {TOP_SESSIONS?.data?.length > 0 && (
            <EndOfFeed
              src={IMAGE_PATHS.NO_DATA.FEED}
              title={TOOLTIPS.YOU_HAVE_REACHED_END}
              subtitle={TOOLTIPS.SEEN_ALL_FEEDS}
              color="text-blue-700"
              icon={CheckCircleIcon}
            />
          )}
          {TOP_SESSIONS?.data?.length == 0 && (<div className={`mb-4 ${isSticky ? 'sticky top-20' : ''}`}>
            <EndOfFeed
              src={IMAGE_PATHS.NO_DATA.SESSION}
              title={TOOLTIPS.NO_POPULAR_SESSIONS}
              subtitle={TOOLTIPS.COME_BACK_AGAIN}
              color={getMode() === THEME_MODES.DARK ? ' text-gray-600' : 'text-gray-800'}
              icon={InfoIcon}
            />
          </div>)}


        </div>
      </div>



    </>
  );
}

export default CompactCard;

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Preview from "./Preview";
import { Divider, Typography } from "@mui/material";
import Spacer from "../../../shared/Spacer";
import Shimmer from "./Shimmer/Shimmer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import { IMAGE_PATHS, TOOLTIPS } from "../../../../constants/userdata";
import EndOfFeed from "./EndOfFeed";
import { getMode, THEME_MODES } from "../../../../theme/ThemeProvider";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useQuery } from "react-query";
import { KEYS } from "../../../../async/queries/keys/unique-keys";
import { standardStaleTime } from "../../../../async/subscriptions";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
function CompactCard({ title }) {
  const [isSticky, setSticky] = useState(false);
  const getTopCourses = async () =>
    (await UserDataService.getTopCourses()).data;

  const TOP_SESSIONS = useQuery([KEYS.SESSION.TOP], getTopCourses, {
    staleTime: standardStaleTime,
  });
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
  return (
    <>
      {TOP_SESSIONS.data?.length > 0 ? (
        <div className="flex flex-col">
          <Typography className="font-bold text-lg pr-8" variant="subtitle"><TrendingUpIcon />&nbsp;{title}</Typography>
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
                <div key={value.courseId}>
                  <Preview
                    data={value}
                  />
                  <Spacer />
                </div>
              ))}
            <EndOfFeed
              src={IMAGE_PATHS.NO_DATA.FEED}
              title={TOOLTIPS.YOU_HAVE_REACHED_END}
              subtitle={TOOLTIPS.SEEN_ALL_FEEDS}
              color="text-blue-700"
              icon={CheckCircleIcon}
            />
          </div>
        </div>
      ) : (
        <div className={`mb-4 ${isSticky ? 'sticky top-20' : ''}`}>
          <EndOfFeed
            src={IMAGE_PATHS.NO_DATA.SESSION}
            title={TOOLTIPS.NO_POPULAR_SESSIONS}
            subtitle={TOOLTIPS.COME_BACK_AGAIN}
            color={getMode() === THEME_MODES.DARK ? ' text-gray-600' : 'text-gray-800'}
            icon={InfoIcon}
          />
        </div>
      )}
    </>
  );
}

export default CompactCard;

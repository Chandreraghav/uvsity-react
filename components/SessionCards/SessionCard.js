import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import SessionStyle from "../../styles/Session.module.css";
import Actions from "../Authorized/Sessions/ActionableItems/Actions";
import {
  avatarToString,
  formattedName,
  formattedProfileSubtitle,
  localTZDate,
} from "../../utils/utility";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Divider from "@mui/material/Divider";
import Shimmer from "./Shimmer";
import {
  SESSION_REVIEW_MAX_STAR_COUNT,
  SHIM_MAX_TIMEOUT_IN_MILLIS,
} from "../../constants/constants";
import { IMAGE_PATHS, PLACEHOLDERS, TOOLTIPS } from "../../constants/userdata";
import { Tooltip, Typography } from "@mui/material";
import { THEME_MODES, useTheme } from "../../theme/ThemeProvider";
import CategoryIcon from '@mui/icons-material/Category';
export default function SessionCard({
  data,
  shimmer,
  shimmerTime,
  authorized,
  origin,
  workflow
}) {

  const [shimTimeOut, setShimTimeOut] = useState(SHIM_MAX_TIMEOUT_IN_MILLIS);
  const [showOriginalContent, setShowOriginalContent] = useState(false);
  const [showShimmers, setShowShimmers] = useState(shimmer);
  const [theme, dispatch] = useTheme();
  const session_author = formattedName(
    data?.creator?.firstName,
    data?.creator?.lastName
  );
  useEffect(() => {
    let controller = new AbortController();
    let _shimmerTime = shimmerTime || shimTimeOut;
    setTimeout(() => {
      setShowOriginalContent(true);
      setShowShimmers(false);
    }, _shimmerTime);
    return () => {
      controller?.abort();
    };
  }, []);
  const userTitle = formattedProfileSubtitle(
    data.creator.userType,
    data.creator.educationalInstitute
  );
  const getSessionRatingDesignLayout = (reviewCount) => {
    if (
      !reviewCount ||
      reviewCount == 0 ||
      isNaN(reviewCount) ||
      reviewCount > 5
    ) {
      return <></>;
    }
    let design = [];
    let _rc = reviewCount;
    for (var j = 0; j < SESSION_REVIEW_MAX_STAR_COUNT; j++) {
      if (_rc <= 0)
        design.push(
          <StarBorderIcon
            className={SessionStyle.session__card__review__unstar}
          />
        );
      else
        design.push(
          <StarRateIcon className={`${SessionStyle.session__card__review__star} `} />
        );
      _rc--;
    }

    return design;
  };
  const generateMonetizationAmountOnCard = (amount) => {
    if (!amount || amount == 0 || isNaN(amount)) {
      return (
        <Tooltip title={TOOLTIPS.FREE_SESSION}>
          <div className={`${SessionStyle.session__card__costing}`}>
            {PLACEHOLDERS.FREE}
          </div>
        </Tooltip>
      );
    }
    return (
      <Tooltip title={TOOLTIPS.PAID_SESSION}>
        <div
          className={`${SessionStyle.session__card__costing} ${SessionStyle.session__card__currency__amount}`}
        >
          <MonetizationOnIcon />
          <span className={`${SessionStyle.session__card__currency__amount}`}>
            {amount}
          </span>
        </div>
      </Tooltip>
    );
  };

  if (!showOriginalContent && origin !== "profile_timeline") {
    return (
      <div
        className={`${SessionStyle.session__card__shimmering__behavior} ${authorized ? "mt-0" : ""
          }`}
      >
        <Shimmer visible={!showOriginalContent} />
      </div>
    );
  }
  if (origin === "profile_timeline" && showShimmers) {
    return (
      <div>
        <Shimmer visible={showShimmers} />
      </div>
    );
  }
  return (
    workflow !== undefined ? (<Card
      className={`${SessionStyle.session__card
        } ${theme.mode === THEME_MODES.DARK ? SessionStyle.session__card__darkgrey__variant : SessionStyle.session__card__white__variant
        } 
        "mt-2 lg:max-w-lg sm:max-w-sm xl:max-w-xl xs:max-w-xs md:max-w-md"
        
    shadow-2xl antialiased`}
    >
      <CardMedia
        component="img"
        image={
          data?.imageURL ? data?.imageURL : IMAGE_PATHS.NO_DATA.EVENT_POSTER
        }
        alt={data?.courseFullName}
      />

      <CardContent>
        {/* session title */}
        <Tooltip title={data?.courseFullName}>
          <div className={` line-clamp-1 ${SessionStyle.session__card__title}`}>
            {data?.courseFullName}
          </div>
        </Tooltip>
        {/* Category */}
        {data?.categories[0] &&
          <Tooltip arrow title='Category'>
            <Typography className="dark:text-gray-500 text-gray-700 leading-tight" variant="caption">
              <CategoryIcon /> {data?.categories[0].categoryFullText}
            </Typography>
          </Tooltip>
        }


        <Divider
          variant="fullwidth"
          className={SessionStyle.session__card__divider}
          component="div"
        />

        <div className="flex  flex-col py-2">

          <div className=" justify-center text-center mx-auto">
            {/* avatar */}
            {data?.courseCreatorImageURL !== "" && (
              <Avatar
                alt={`${session_author}`}
                src={data.courseCreatorImageURL}
                className="avatar-sm"
              />
            )}
            {(data?.courseCreatorImageURL === "" ||
              data?.courseCreatorImageURL == null ||
              data?.courseCreatorImageURL.includes(
                IMAGE_PATHS.NO_PROFILE_PICTURE
              )) && (
                <Avatar
                  className="avatar-sm avatar-text-sm"
                  {...avatarToString(`${session_author}`)}
                />
              )}
          </div>


          <div className="flex flex-col">
            {/* author name */}

            <div className="mb-1 justify-center text-center  lg:text-lg md:text-md sm:text-xs text-xs font-bold line-clamp-1 text-gray-600 dark:text-gray-400">
              {session_author}
            </div>


            {/* profile info */}

            <Tooltip title={userTitle}>
              <div
                className={`mb-1 line-clamp-1 flex gap-2  ${SessionStyle.session__card__profile__subtitle}`}
              >
                <SchoolIcon
                   
                />
                {userTitle}
              </div>
            </Tooltip>


            {/* starts on */}

            <div
              className={`mb-2 flex gap-2  sm:line-clamp-1  ${SessionStyle.session__card__event__time__subtitle}`}
            >
              <EventIcon
                 
              />
               
              {localTZDate(data.displayStartDate)}
            </div>

          </div>
        </div>
        <div
          className={`  flex flex-row justify-between`}
        >
          {/* Reviews */}

          <>
            <div className="flex">
              {getSessionRatingDesignLayout(data?.avgReviewIntValue)}
            </div>
          </>
          {/* Attending count */}
          {data?.numberOfAttendees > 0 && (
            <div className="flex flex-row space-x-1 ml-auto">
              <div
                className={`${SessionStyle.session__card__attendance__count}  primary`}
              >
                {data?.numberOfAttendees}
              </div>
              <div
                className={`${SessionStyle.session__card__attendance__text} line-clamp-1`}
              >
                {PLACEHOLDERS.ATTENDING}
              </div>
            </div>
          )}
          {data?.numberOfAttendees === 0 && (
            <div className="flex flex-row space-x-1 ml-auto">
              <div
                className={`${SessionStyle.session__card__attendance__text} mb-2 line-clamp-1`}
              >
                {PLACEHOLDERS.BE_THE_FIRST}
              </div>
            </div>
          )}

        </div>
      </CardContent>
      <Divider
        variant="fullWidth"
        className={SessionStyle.session__card__divider}
        component="div"
      />
      <CardActions>{generateMonetizationAmountOnCard(data.cost)}
      <Actions data={data} />
      </CardActions>
    </Card>)



      : (<Card
        className={`${origin === "profile_timeline"
          ? SessionStyle.session__card__profile__timeline
          : SessionStyle.session__card
          } ${!authorized
            ? SessionStyle.session__card__lightblue__variant
            : SessionStyle.session__card__lightblue__variant
          } 
      ${!authorized
            ? "mt-2 ml-5 mr-5  max-w-lg"
            : "mt-2 lg:max-w-lg sm:max-w-sm xl:max-w-xl xs:max-w-xs md:max-w-md"
          }
    shadow-2xl antialiased`}
      >
        <CardMedia
          component="img"
          image={
            data?.imageURL ? data?.imageURL : IMAGE_PATHS.NO_DATA.EVENT_POSTER
          }
          alt={data?.courseFullName}
        />

        <CardContent>
          {/* session title */}
          <Tooltip title={data?.courseFullName}>
            <div className={` line-clamp-1 ${SessionStyle.session__card__title}`}>
              {data?.courseFullName}
            </div>
          </Tooltip>

          <Divider
            variant="fullwidth"
            className={SessionStyle.session__card__divider}
            component="div"
          />
          {origin !== "profile_timeline" && (
            <div className="flex  flex-col py-2">
              {origin !== "profile_timeline" && (
                <div className=" justify-center text-center mx-auto">
                  {/* avatar */}
                  {data?.courseCreatorImageURL !== "" && (
                    <Avatar
                      alt={`${session_author}`}
                      src={data.courseCreatorImageURL}
                      className="avatar-sm"
                    />
                  )}
                  {(data?.courseCreatorImageURL === "" ||
                    data?.courseCreatorImageURL == null ||
                    data?.courseCreatorImageURL.includes(
                      IMAGE_PATHS.NO_PROFILE_PICTURE
                    )) && (
                      <Avatar
                        className="avatar-sm avatar-text-sm"
                        {...avatarToString(`${session_author}`)}
                      />
                    )}
                </div>
              )}

              <div className="flex flex-col">
                {/* author name */}
                {origin !== "profile_timeline" && (
                  <div className="mb-1 justify-center text-center  lg:text-lg md:text-md sm:text-xs text-xs font-bold line-clamp-1 text-gray-400">
                    {session_author}
                  </div>
                )}

                {/* profile info */}
                {origin !== "profile_timeline" && (
                  <Tooltip title={userTitle}>
                    <div
                      className={`mb-1 line-clamp-1  ${SessionStyle.session__card__profile__subtitle}`}
                    >
                      <SchoolIcon
                        className={SessionStyle.session__card__profile__icon}
                      />
                      {userTitle}
                    </div>
                  </Tooltip>
                )}

                {/* starts on */}
                {origin !== "profile_timeline" && (
                  <div
                    className={`mb-2 sm:line-clamp-1  ${SessionStyle.session__card__event__time__subtitle}`}
                  >
                    <EventIcon
                      className={SessionStyle.session__card__event__icon}
                    />
                    {localTZDate(data.displayStartDate)}
                  </div>
                )}
              </div>
            </div>
          )}

          {origin === "profile_timeline" && (
            <div className="">
              <span
                className={`sm:line-clamp-1  ${SessionStyle.session__card__event__time__subtitle__profile__timeline}`}
              >
                <EventIcon />
                {localTZDate(data.displayStartDate)}
              </span>
            </div>
          )}

          <div
            className={`${origin === "profile_timeline" ? "mt-2" : ""
              } flex flex-row justify-between`}
          >
            {/* Reviews */}
            {data?.avgReviewIntValue ? (
              <>
                <div className="flex">
                  {getSessionRatingDesignLayout(data?.avgReviewIntValue)}
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Attending count */}
            {data?.numberOfAttendees > 0 && (
              <div className="flex flex-row space-x-1 ml-auto">
                <div
                  className={`${SessionStyle.session__card__attendance__count}  primary`}
                >
                  {data?.numberOfAttendees}
                </div>
                <div
                  className={`${SessionStyle.session__card__attendance__text} line-clamp-1`}
                >
                  {PLACEHOLDERS.ATTENDING}
                </div>
              </div>
            )}
            {data?.numberOfAttendees === 0 && origin !== "profile_timeline" && (
              <div className="flex flex-row space-x-1 ml-auto">
                <div
                  className={`${SessionStyle.session__card__attendance__text} mb-2 line-clamp-1`}
                >
                  {PLACEHOLDERS.BE_THE_FIRST}
                </div>
              </div>
            )}
            {data?.numberOfAttendees === 0 && origin === "profile_timeline" && (
              <div className="flex flex-row space-x-1 ml-auto">
                <div
                  className={`${SessionStyle.session__card__attendance__text} mb-2 line-clamp-1`}
                >
                  {PLACEHOLDERS.BE_THE_FIRST}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <Divider
          variant="fullWidth"
          className={SessionStyle.session__card__divider}
          component="div"
        />
        <CardActions>{generateMonetizationAmountOnCard(data.cost)}</CardActions>
      </Card>)

  )

}

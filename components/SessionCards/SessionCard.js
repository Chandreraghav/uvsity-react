import * as React from "react";
import { useState } from "react";
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
import {
  SESSION_REVIEW_MAX_STAR_COUNT,
} from "../../constants/constants";
import { IMAGE_PATHS, ME, PLACEHOLDERS, SESSION, TOOLTIPS } from "../../constants/userdata";
import { Button, Tooltip, Typography } from "@mui/material";
import { THEME_MODES, useTheme } from "../../theme/ThemeProvider";
import CategoryIcon from '@mui/icons-material/Category';
import { useMemo } from "react";
import { useDataLayerContextValue } from "../../context";
import { navigateToProfile, navigateToSessionProfile } from "../Authorized/Shared";
import { useRouter } from "next/router";
import Session_Attendees_ListDialog from "../shared/modals/Session_AttendeesListDialog";
import { AUTHORIZED_ROUTES, WORKFLOW_CODES } from "../../constants";
import SessionOwner from "./SessionOwner";
import ReviewSession from "../Authorized/Sessions/ActionableItems/ReviewSession";
export default function SessionCard({
  data,
  shimmer,
  authorized,
  origin,
  workflow,
}) {
  const router = useRouter();
  const [ctxUserdata, _dispatch] = useDataLayerContextValue();
  const [theme, dispatch] = useTheme();
  const session_author = formattedName(
    data?.creator?.firstName,
    data?.creator?.lastName
  );
  const [openAttendeesDialog, setOpenAttendeesDialog] = useState(false);
  const userdata = useMemo(() => {
    return (ctxUserdata?.userdata)
  }, [ctxUserdata?.userdata])
  const isLoggedInUserSessionCreator = useMemo(() => {
    const user_id = data?.userDetailsId || data?.creator?.userDetailsId;
    return user_id === userdata?.userDetailsId;
  }, [data?.creator?.userDetailsId, data?.userDetailsId, userdata?.userDetailsId])
  const userTitle = formattedProfileSubtitle(
    data.creator.userType,
    data.creator.educationalInstitute
  );
  const getSessionRatingDesignLayout = (reviewCount, canHaveZeroReviews = false) => {
    if (canHaveZeroReviews === false) {
      if (
        !reviewCount ||
        reviewCount == 0 ||
        isNaN(reviewCount) ||
        reviewCount > 5
      ) {
        return <></>;
      }
    }
    let design = canHaveZeroReviews === true ? [(<small className=" text-gray-600 first-letter:uppercase align-middle px-1 block" key={0}>Reviews</small>)] : [];
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
  const handleAttendeesDialogClose = () => {
    setOpenAttendeesDialog(false);
  };
  const handleAttendeesDialogOpen = () => {
    setOpenAttendeesDialog(true);
  };
  return (
    workflow !== undefined ? (<Card
      className={`${SessionStyle.session__card
        } ${theme.mode === THEME_MODES.DARK ? SessionStyle.session__card__darkgrey__variant : SessionStyle.session__card__white__variant
        } 
        "mt-2 lg:max-w-lg sm:max-w-sm xl:max-w-xl xs:max-w-xs md:max-w-md"
        
    shadow-2xl antialiased`}
    >
      <div className="relative">
        <CardMedia onClick={() => navigateToSessionProfile(data.courseId, router)}
          component="img"
          image={
            data?.imageURL ? data?.imageURL : IMAGE_PATHS.NO_DATA.EVENT_POSTER
          }
          alt={data?.courseFullName}

        />
        {isLoggedInUserSessionCreator && (<div className="p-2 flex" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <SessionOwner />
        </div>)}

        {/* Sessions which are enrolled by logged in user and not created by logged in user, can be given reviews and sent messages to the author of the session. */}
        {!isLoggedInUserSessionCreator && origin !== undefined && origin == AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ENROLLED_SESSIONS && (<div className="p-2 flex gap-2" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <ReviewSession session={data} />
        </div>)}
      </div>
      <CardContent>
        {/* session title */}
        <Tooltip title={data?.courseFullName}>
          <div onClick={() => navigateToSessionProfile(data.courseId, router)} className={` line-clamp-1 ${SessionStyle.session__card__title} hover:underline hover:text-blue-800 transition-all duration-50 ease-in-out`}>
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
            <Tooltip
              title={
                isLoggedInUserSessionCreator
                  ? TOOLTIPS.GO_TO_PROFILE
                  : TOOLTIPS.VIEW_PROFILE
              }
            >
              <div onClick={() => navigateToProfile(data.creator.userDetailsId, router)} className="hover:underline hover:text-blue-800 text-gray-600 dark:text-gray-400 transition-all duration-50 ease-in-out mb-1 justify-center text-center  lg:text-lg md:text-md sm:text-xs text-xs font-bold line-clamp-1  ">
                {session_author}{isLoggedInUserSessionCreator ? ME : <></>}
              </div>
            </Tooltip>
            {/* profile info */}
            <Tooltip title={userTitle}>
              <div
                className={`mb-1 line-clamp-1 flex gap-2  ${SessionStyle.session__card__profile__subtitle}`}
              >
                <SchoolIcon
                />
                {userTitle || 'Information unavailable'}
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
          {/* Show Session Reviews Only for Online Sessions */}
          {origin !== undefined && origin == AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ONLINE_SESSIONS
            && (<>
              <div className="flex">
                <div>{getSessionRatingDesignLayout(data?.avgReviewIntValue, true)}</div>
              </div>
            </>)
          }

          {/* Attending count */}
          {data?.numberOfAttendees > 0 && (
            <React.Fragment>
              <div onClick={() => handleAttendeesDialogOpen()} className="flex flex-row space-x-1 ml-auto">
                <Typography gutterBottom className=" font-normal  h-min w-20 bg-[#5cb85c] text-center overflow-hidden text-ellipsis" variant="caption">
                  <span className=" font-bold text-[16px] ">{data?.numberOfAttendees}</span> {PLACEHOLDERS.ATTENDING}
                </Typography>
              </div>
              <Session_Attendees_ListDialog
                dialogCloseRequest={handleAttendeesDialogClose}
                isOpen={openAttendeesDialog}
                data={data}
                workflow_code={WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION}
              />
            </React.Fragment>
          )}
          {data?.numberOfAttendees === 0 && !isLoggedInUserSessionCreator && (
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
      <CardActions>
        {generateMonetizationAmountOnCard(data.cost)}
        {origin !== undefined && origin !== AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ENROLLED_SESSIONS && (<Actions data={data} />)}

      </CardActions>
    </Card>)
      // For all other session requests without a workflow prop.
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

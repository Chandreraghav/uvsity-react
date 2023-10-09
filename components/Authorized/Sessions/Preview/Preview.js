/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CommentIcon from '@mui/icons-material/Comment';

import { 
  SESSION_REVIEW_MAX_STAR_COUNT,
  IMAGE_PATHS,
  PLACEHOLDERS,
  TOOLTIPS,
  WORKFLOW_CODES,
  AUTHORIZED_ROUTES 
} from "../../../../constants";
import SessionStyle from "../../../../styles/Session.module.css";
import Profile from "../../Network/People/Dashboard/Profile";
import Spacer from "../../../shared/Spacer";
import Actions from "../ActionableItems/Actions";
import { parseMarkdownToHTML } from "../../../../utils/utility";
import { getMode, THEME_MODES } from "../../../../theme/ThemeProvider";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { navigateToPath } from "../../Shared/Navigator";
import Session_Attendees_ListDialog from "../../../shared/modals/Session_AttendeesListDialog";
import CommentSection from './CommentSection';

function Preview({ data, mappedTopic }) {
  console.log(mappedTopic);
  const router = useRouter();
  const [context, dispatch] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(context?.logged_in_info);
  const [showTopic, setShowTopic] = useState(false);
  const [openAttendeesDialog, setOpenAttendeesDialog] = useState(false);
  const [eventPosterSrc, setEventPosterSrc] = useState(data.imageURL ? data.imageURL : IMAGE_PATHS.NO_DATA.EVENT_POSTER);
  if (!data) return <></>;

  const handleAttendeesDialogClose = () => {
    setOpenAttendeesDialog(false);
  };

  const { topicCommentsCount = 0, topicDetailId = '' } = mappedTopic || {};

  const onCommentClick = () => {
    if (mappedTopic) {
      setShowTopic(true);
    }
  };

 
  const handleAttendeesDialogOpen = () => {
    setOpenAttendeesDialog(true);
  };
  const getAttendanceJSX = () => {
    return (
      <>
        <div
          className={`  dialog-title text-xs font-medium leading-tight mt-0.5`}
        >
            <>
              <Typography variant="caption">
                {data?.numberOfAttendees} {PLACEHOLDERS.ATTENDING}
              </Typography>
            </>
          
        </div>
      </>
    );
  };

  const getSessionRatingDesignLayout = (reviewCount) => {
    if (
      !reviewCount ||
      reviewCount == 0 ||
      isNaN(reviewCount) ||
      reviewCount > 5
    ) {
      return (
        <img
          alt={`logo`}
          className={SessionStyle.session__card__review__star__replacement}
          src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE_SHORTHAND}
        />
      );
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
          <StarRateIcon className={SessionStyle.session__card__review__star} />
        );
      _rc--;
    }
    return design;
  };
  const generateMonetizationAmountOnCard = (amount) => {
    if (!amount || amount == 0 || isNaN(amount)) {
      return (
        <Tooltip title={TOOLTIPS.FREE_SESSION}>
          <div className={`${SessionStyle.session__card__costing} mt-2`}>
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
  return (
    <div className=" shadow-lg py-2 uvsity__card__border__theme bg-gray-100 dark:bg-gray-900 w-full px-2 rounded-lg">
      {/* EVENT/SESSION/AUTHOR NAME */}
      <div className="flex flex-row flex-wrap flex-grow-0">
        <div className="flex-auto w-full pr-0 xl:w-auto xl:flex-1 xl:pr-5 px-2 py-2">
          <Tooltip title={data?.courseFullName}>
            <h1 onClick={() => navigateToPath(router, AUTHORIZED_ROUTES.AUTHORIZED.SESSION.PROFILE_INDEX + data?.courseId, { token: uuidv4() }
            )}
              className={`${SessionStyle.preview__session__title} line-clamp-2 mb-1 text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100`}
            >
              {data?.courseFullName}
            </h1>
          </Tooltip>
          <Spacer />
          <div className="flex flex-col px-2 py-2">
            <Profile
              oid={data.createdByUser}
              firstName={data.creator.firstName}
              lastName={data.creator.lastName}
              avatar={data.courseCreatorImageURL}
              sessionStartDTime={data.courseStartDTime}
              userType={data.creator.userType}
              instituition={data.creator.educationalInstitute}
              isVisibleOnSessionCard
              metaData={data}
              userdata={userdata}
              dark={getMode() === THEME_MODES.DARK ? true : false}
              options={{ connect: false, mixedMode: true }}
            />
            <div
              className={` line-clamp-3  text-gray-700 dark:text-gray-300 py-1 mb-1 leading-snug`}
            >
              {parseMarkdownToHTML(data?.courseSummary)}
            </div>
          </div>
        </div>

        {/* EVENT POSTER & CO-HOST   */}
        <div className="flex flex-col">
          <div className="w-full h-auto pt-2 xl:w-56">
            <img
              className="block w-full overflow-hidden object-contain bg-gray-100 bg-center bg-cover rounded post-cover dark:bg-brand-grey-800 dark:border-brand-grey-800"
              src={eventPosterSrc}
              alt={data?.courseFullName}
            />
            {data.coHosts.length > 0 && (
              <div>
                <div className="text-md flex gap-1 text-gray-700 font-medium py-2 px-2">
                  <CoPresentIcon />
                  <div>Co-Host</div>
                </div>
                <Divider />
                <div className=" transform scale-100 flex flex-row flex-wrap flex-grow-0 px-2 py-2">
                  <Profile
                    //oid={}
                    firstName={data.coHosts[0]?.firstName}
                    lastName={data.coHosts[0]?.lastName}
                    avatar={data.coHosts[0]?.profilePicName}
                    userType={data.coHosts[0]?.userBaseType}
                    instituition={data.coHosts[0]?.educationalInstitution}
                    isVisibleAsCoHost
                    metaData={{ associatedCoHostData: data.coHosts[0]||null }}
                    options={{ connect: false, mixedMode: true }}
                    userdata={userdata}
                    dark={getMode() === THEME_MODES.DARK ? true : false}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MORE DETAIL */}
      {data.coHosts.length == 0 && <Spacer />}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-0 px-2 py-2">
            {getSessionRatingDesignLayout(data?.avgReviewIntValue)}
          </div>
          {data?.numberOfAttendees > 0 && (
            <div
              onClick={() => handleAttendeesDialogOpen()}
              className={`flex flex-row cursor-pointer leading-slug px-2 py-2`}
            >
              {getAttendanceJSX()}
            </div>
          )}

          <Box className="flex ml-auto">
            {generateMonetizationAmountOnCard(data.cost)}
          </Box>
        </div>

        <Spacer />
        <div>
          <Divider className={SessionStyle.preview__card__divider} />
        </div>
      </div>
      {/* Session Actions */}
      <div className="flex items-center justify-between">
        <Actions data={data} />
        { topicDetailId && (
          <Tooltip title="Comments" className="cursor-pointer" onClick={() => onCommentClick()}>
            <Typography 
              className="hover:bg-blue-800 hover:dark:text-gray-300 hover:text-gray-100  dark:text-gray-500  hover:font-bold text-gray-700 w-max p-2" 
              variant="caption"
            >
              <CommentIcon /> {topicCommentsCount} Comment(s)
            </Typography>
          </Tooltip>
        )}
      </div>
      {showTopic && <CommentSection topicId={topicDetailId} />}

      {data?.numberOfAttendees > 0 && (<Session_Attendees_ListDialog
        dialogCloseRequest={handleAttendeesDialogClose}
        isOpen={openAttendeesDialog}
        data={data}
        workflow_code={WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION}

      />)}

    </div>
  );
}

export default Preview;

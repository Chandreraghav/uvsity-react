/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { SESSION_REVIEW_MAX_STAR_COUNT } from "../../../../constants/constants";
import {
  IMAGE_PATHS,
  PLACEHOLDERS,
  TOOLTIPS,
} from "../../../../constants/userdata";
import SessionStyle from "../../../../styles/Session.module.css";
import Profile from "../../Network/People/Dashboard/Profile";
import Spacer from "../../../shared/Spacer";
import CustomDialog from "../../../shared/modals/CustomDialog";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import Actions from "../ActionableItems/Actions";
import { parseMarkdownToHTML } from "../../../../utils/utility";
import { getMode, THEME_MODES } from "../../../../theme/ThemeProvider";
function Preview({ data, authorized, userdata }) {
  const [openAttendeesDialog, setOpenAttendeesDialog] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [sessionDetail, setSessionDetail] = useState({});
  const [sessionCreatorDetail, setSessionCreatorDetail] = useState({});
  const [cohostDetail, setCoHostDetail] = useState({});
  const [eventPosterSrc, setEventPosterSrc] = useState(data.imageURL?data.imageURL:IMAGE_PATHS.NO_DATA.EVENT_POSTER);
 
  // THE NEEDFUL OR DEPENDENT DATA FOR EACH SESSION PREVIEW
  // ARE BEING CALLED VIA USE EFFECT AND NOT WITH REACT QUERY BECAUSE WE CANNOT DO
  // THAT AND IF DONE WILL HAVE SLOWNESS AND ENORMOUS PERFORMANCE IMPACT.

  // Reason of Using UseEffect over UseQuery:
  // THE TOP LEVEL DATA(data) THAT IS COMING IN HERE IS BEING FETCHED FROM REACT QUERY AND
  // AS A RESULT THIS USE-EFFECT TAKES CARE OF REFETCHING/CACHING THE DEPENDENT DATA
  // AS THE MASTER DATA IS CACHED/FETCHED VIA REACT QUERY.
  // THIS IS A TRANSITIVE REACT QUERY IMPLEMENTATION FOR A ITERATIVE COMPONENT RENDER.
  useEffect(() => {
    let isSubscribed = true;
    let controller = new AbortController();
    if (data.numberOfAttendees > 0 && isSubscribed) {
      UserDataService.getAttendeesPerCourse(data.courseId).then((response) => {
        setAttendees(response?.data?.users);
      });
    }
    return () => {
      setAttendees([])
      controller?.abort();
      isSubscribed = false;
    };
  }, [data]);

  useEffect( () => {
    let isSubscribed = true;
    let controller = new AbortController();
    
    async function evalAttendees(){
      if (openAttendeesDialog===true && data.numberOfAttendees > 0 && isSubscribed) {
        await UserDataService.getAttendeesPerCourse(data.courseId).then((response) => {
         setAttendees(response?.data?.users);
       });
     }
    }
    evalAttendees()
    return () => {
      setAttendees([])
      controller?.abort();
      isSubscribed = false;
    };
  }, [openAttendeesDialog]);



  useEffect(() => {
    let isSubscribed = true;
    let controller = new AbortController();
    if (isSubscribed) {
      UserDataService.getSessionDetailPerCourse(data.courseId).then(
        (response) => {
          setSessionDetail(response?.data);
        }
      );
    }
    return () => {
      setSessionDetail({})
      controller?.abort();
      isSubscribed = false;
    };
  }, [data]);

  useEffect(() => {
    let isSubscribed = true;
    let controller = new AbortController();
    if (isSubscribed) {
      UserDataService.getUserById(data.creator.userDetailsId).then(
        (response) => {
          setSessionCreatorDetail(response?.data);
          data.associatedUserData = response?.data;
        }
      );
    }
    return () => {
      setSessionCreatorDetail({})
      controller?.abort();
      isSubscribed = false;
    };
  }, [data]);

  useEffect(() => {
    let isSubscribed = true;
    let controller = new AbortController();
    if (isSubscribed && data.coHosts.length === 1) {
      UserDataService.getUserById(data.coHosts[0].userDetailsId).then(
        (response) => {
          setCoHostDetail(response?.data);
        }
      );
    }
    return () => {
      setCoHostDetail({})
      controller?.abort();
      isSubscribed = false;
    };
  }, [data.coHosts]);
  if (!data) return "";

  

  const amIAttending = () => {
    const index = attendees?.findIndex((x) => {
      return x.userDetailsId == userdata?.userDetailsId;
    });
    return index !== -1;
  };
  const handleAttendeesDialogClose = () => {
    setOpenAttendeesDialog(false);
  };

  const amITheOnlyOneAttending = amIAttending() && data?.numberOfAttendees == 1;

  const handleAttendeesDialogOpen = () => {
    if (amITheOnlyOneAttending) {
      return;
    }

    setOpenAttendeesDialog(true);
  };
  const getAttendanceJSX = () => {
    return (
      <>
        <div
          className={` ${
            amITheOnlyOneAttending ? "" : "dialog-title"
          }  text-xs font-medium leading-tight`}
        >
          {amIAttending() && data?.numberOfAttendees > 1 ? (
            <>
              <span>
                You and {data?.numberOfAttendees - 1}{" "}
                {data?.numberOfAttendees - 1 === 1 ? "other" : "others"}{" "}
                {PLACEHOLDERS.ATTENDING}
              </span>
            </>
          ) : amITheOnlyOneAttending ? (
            <>
              <span>You are {PLACEHOLDERS.ATTENDING}</span>
            </>
          ) : (
            <>
              <span>
                {data?.numberOfAttendees} {PLACEHOLDERS.ATTENDING}
              </span>
            </>
          )}
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
    <div className=" uvsity__card__border__theme bg-gray-100 dark:bg-gray-950 w-full rounded-bl-lg rounded-br-lg px-2">
      {/* EVENT/SESSION/AUTHOR NAME */}
      <div className="flex flex-row flex-wrap flex-grow-0">
        <div className="flex-auto w-full pr-0 xl:w-auto xl:flex-1 xl:pr-5 px-2 py-2">
          <Tooltip title={data?.courseFullName}>
            <h1
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
              sessionStartDTime={data.displayStartDate}
              userType={data.creator.userType}
              instituition={data.creator.educationalInstitute}
              isVisibleOnSessionCard
              metaData={data}
              userdata={userdata}
              dark={getMode()===THEME_MODES.DARK?true:false}
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
                    metaData={{ associatedCoHostData: cohostDetail }}
                    options={{ connect: false, mixedMode: true }}
                    userdata={userdata}
                    dark={getMode()===THEME_MODES.DARK?true:false}
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
              onClick={(e) => handleAttendeesDialogOpen()}
              className={`flex flex-row cursor-pointer leading-slug px-2 py-2`}
            >
              {getAttendanceJSX()}
            </div>
          )}
        </div>
        <Spacer />
        <div>
          <Divider className={SessionStyle.preview__card__divider} />
        </div>
      </div>
      {/* Session Actions */}
      <div className="flex flex-wrap px-2 py-2 gap-4">
        {generateMonetizationAmountOnCard(data.cost)}

        <Actions data={sessionDetail} />
        
      </div>

      <CustomDialog
        dialogCloseRequest={handleAttendeesDialogClose}
        isOpen={openAttendeesDialog}
        title={data.courseFullName}
        data={data}
        secondaryData={attendees}
        workflow_code={WORKFLOW_CODES.PEOPLE.ATTENDING_SESSION}
        name="Attendees-Dialog"         
        dark={getMode()===THEME_MODES.DARK?true:false}
      />
    </div>
  );
}

export default Preview;

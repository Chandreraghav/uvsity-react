import { Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { SESSION_REVIEW_MAX_STAR_COUNT } from "../../../../constants/constants";
import { PLACEHOLDERS, TOOLTIPS } from "../../../../constants/userdata";
import SessionStyle from "../../../../styles/Session.module.css";
import Profile from "../../Network/People/Dashboard/Profile";
import Spacer from "../../../shared/Spacer";
import CustomDialog from "../../../shared/modals/CustomDialog";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import parse from "html-react-parser";
import Actions from "../ActionableItems/Actions";
import { actionTypes, initialState } from "../../../../context/reducer";

function Preview({ data, authorized }) {
  if (!authorized || !data) return "";
  const [openAttendeesDialog, setOpenAttendeesDialog] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [sessionDetail, setSessionDetail] = useState({});
  const [USER, dispatch] = useDataLayerContextValue();
  useEffect(() => {
    let isSubscribed = true;
    let controller = new AbortController();
    if (data.numberOfAttendees > 0 && isSubscribed) {
      UserDataService.getAttendeesPerCourse(data.courseId).then((response) => {
        setAttendees(response?.data?.users);
         
        
      });
    }
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, [data]);


  useEffect(() => {
    let isSubscribed = true;
    let controller = new AbortController();
    if (  isSubscribed) {
      UserDataService.getSessionDetailPerCourse(data.courseId).then((response) => {
        setSessionDetail(response?.data);
      });
    }
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, [data]);



  const amIAttending = () => {
    const index = attendees?.findIndex((x) => {
      return x.userDetailsId == USER?.LOGGED_IN_INFO?.data?.userDetailsId;
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
    <div className=" uvsity__card__border__theme bg-white w-full dark:bg-brand-dark-grey-800 dark:border-brand-grey-800 rounded-bl-lg rounded-br-lg md:px-2">
      {/* EVENT/SESSION/AUTHOR NAME */}
      <div className="flex flex-row flex-wrap flex-grow-0">
        <div className="flex-auto w-full pr-0 xl:w-auto xl:flex-1 xl:pr-5">
          <Tooltip title={data?.courseFullName}>
            <h1
              className={`${SessionStyle.preview__session__title} line-clamp-2 mb-1 text-3xl font-semibold leading-tight tracking-tight text-brand-black dark:text-brand-grey-100`}
            >
              {data?.courseFullName}
            </h1>
          </Tooltip>
          <Spacer />
          <div className="flex flex-col ">
            <Profile
              oid={data.createdByUser}
              firstName={data.creator.firstName}
              lastName={data.creator.lastName}
              avatar={data.courseCreatorImageURL}
              sessionStartDTime={data.courseStartDTime}
              userType={data.creator.userType}
              instituition={data.creator.educationalInstitute}
              isVisibleOnSessionCard
            />
            <div className="  line-clamp-2 text-gray-700 py-1 mb-1 leading-snug  ">
              {parse(
                data.courseSummary.substring(
                  0,
                  data.courseSummary.lastIndexOf("</p>") + 4
                )
              )}
            </div>
          </div>
        </div>

        {/* EVENT POSTER & CO-HOST   */}
        <div className="flex flex-col">
          <div className="w-full h-auto pt-2 xl:w-56">
            <img
              className="block w-full overflow-hidden object-contain bg-gray-100 bg-center bg-cover rounded post-cover dark:bg-brand-grey-800 dark:border-brand-grey-800"
              src={data?.imageURL}
              alt={data?.courseFullName}
            />
          </div>
          {data.coHosts.length > 0 && (
            <div>
              <div className="text-md text-gray-700 font-medium py-1">
                Co-Host
              </div>
              <Divider />
              <div className=" transform scale-100 flex flex-row flex-wrap flex-grow-0 px-2 py-2">
                <Profile
                  firstName={data.coHosts[0]?.firstName}
                  lastName={data.coHosts[0]?.lastName}
                  avatar={data.coHosts[0]?.profilePicName}
                  userType={data.coHosts[0]?.userBaseType}
                  instituition={data.coHosts[0]?.educationalInstitution}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MORE DETAIL */}
      {data.coHosts.length==0 && ( <Spacer />)}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-0">
            {getSessionRatingDesignLayout(data?.avgReviewIntValue)}
          </div>
          {data?.numberOfAttendees > 0 && (
            <div
              onClick={(e) => handleAttendeesDialogOpen()}
              className={`flex flex-row cursor-pointer leading-slug`}
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
        theme="dark"
      />
    </div>
  );
}

export default Preview;

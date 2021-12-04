import { Avatar, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import {
  IMAGE_PATHS,
  NETWORK,
  TITLES,
  TOOLTIPS,
} from "../../../../../constants/userdata";
import { useDataLayerContextValue } from "../../../../../context/DataLayer";
import {
  avatarToString,
  formattedName,
  formattedProfileSubtitle,
  localTZDate,
} from "../../../../../utils/utility";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import ProfileStyle from "../../../../../styles/DashboardProfile.module.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ConnectionService from "../../../../../pages/api/people/network/ConnectionService";
import { handleResponse } from "../../../../../toastr-response-handler/handler";
import { toast } from "react-toastify";
import { RESPONSE_TYPES } from "../../../../../constants/constants";
import { PEOPLE } from "../../../../../constants/error-messages";
import { getWorkflowError } from "../../../../../error-handler/handler";
import { ClipLoader } from "react-spinners";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import AddTaskIcon from "@mui/icons-material/AddTask";
toast.configure();
function Profile({
  options,
  firstName,
  lastName,
  avatar,
  sessionStartDTime,
  userType,
  instituition,
  isVisibleOnSessionCard,
  metaData,
}) {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [isConnectToPersonOptionShown, setConnectToPersonShown] =
    useState(false);

  const [isAcceptPersonRequestOptionShown, setAcceptPersonRequestOptionShown] =
    useState(false);

  const [isConnectionRequestSent, setConnectionRequestSent] = useState(false);
  const [isConnectionAcceptRequestSent, setConnectionAcceptRequestSent] =
    useState(false);
  const [isConnectionRequestInProgress, setConnectionRequestInProgress] =
    useState(false);

  const [
    isConnectionAcceptRequestInProgress,
    setConnectionAcceptRequestInProgress,
  ] = useState(false);
  const [isConnectionRequestSendError, setConnectionRequestSendError] =
    useState(false);
  const [
    isConnectionAcceptRequestSendError,
    setConnectionAcceptRequestSendError,
  ] = useState(false);
  const onHover = () => {
    setConnectToPersonShown(true);
  };

  const onLeave = () => {
    setConnectToPersonShown(false);
  };

  const onHoverAccept = () => {
    setAcceptPersonRequestOptionShown(true);
  };

  const onLeaveAccept = () => {
    setAcceptPersonRequestOptionShown(false);
  };
  const profilePrimaryLine = formattedName(firstName, lastName);
  const profileSecondaryLine = formattedProfileSubtitle(userType, instituition);
  const profileTertiaryLine = metaData
    ? formattedProfileSubtitle(metaData?.city, metaData?.country)
    : "";

  const addToNetwork = (event) => {
    setConnectionRequestInProgress(true);
    let payload = {
      requestFrom: {
        userDetailsId: USERDATA?.LOGGED_IN_INFO?.data?.userDetailsId,
      },
      requestTo: { userDetailsId: metaData.userDetailsId },
      userRequestText: "",
      userRequestType: "INVITATION_REQUEST",
    };
    payload.userRequestText = `Invitation Request sent by User Id ${payload.requestFrom} to User Id ${payload.requestTo}. Sent by REST Service.`;
    ConnectionService.sendConnectionRequest(payload)
      .then((response) => {
        setConnectionRequestSendError(false);
        handleResponse(
          `Connection request sent to ${firstName}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.TOP_RIGHT
        );
      })
      .catch(() => {
        setConnectionRequestSendError(true);
        handleResponse(
          getWorkflowError(
            PEOPLE.NETWORK.CONNECTION_REQUEST_ERROR + " " + firstName
          ),
          RESPONSE_TYPES.ERROR,
          toast.POSITION.TOP_RIGHT
        );
      })
      .finally(() => {
        setConnectionRequestInProgress(false);
        setConnectionRequestSent(true);
      });
  };

  const acceptRequest = (event) => {
    setConnectionAcceptRequestInProgress(true);
    ConnectionService.acceptConnectionRequest(metaData.invitationAction.invitationRequestId)
      .then((response) => {
        setConnectionAcceptRequestSendError(false);
        handleResponse(
          `You and ${firstName} are now connected`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.TOP_LEFT
        );
      })
      .catch(() => {
        setConnectionAcceptRequestSendError(true);
        handleResponse(
          getWorkflowError(
            PEOPLE.NETWORK.CONNECTION_ACCEPT_ERROR + " " + firstName
          ),
          RESPONSE_TYPES.ERROR,
          toast.POSITION.TOP_LEFT
        );
      })
      .finally(() => {
        setConnectionAcceptRequestInProgress(false);
        setConnectionAcceptRequestSent(true);
      });
  };

  if (
    profilePrimaryLine.trim() == "" &&
    profileSecondaryLine.trim() == "" &&
    profileTertiaryLine.trim() == ""
  ) {
    return "";
  }
  return (
    <div>
      <div className="flex flex-row items-center flex-1 mb-4 gap-2 pt-2">
        {/* AVATAR */}
        <div className="avatar flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 rounded-full bg-brand-grey-200 dark:bg-brand-grey-700">
          {avatar !== "" && !avatar?.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) && (
            <Tooltip title={TOOLTIPS.VIEW_PROFILE}>
              <Avatar
                className={`${
                  isVisibleOnSessionCard ? "avatar-sm" : "avatar-dashboard"
                }`}
                alt={`${profilePrimaryLine}`}
                src={avatar}
              />
            </Tooltip>
          )}
          {(avatar === "" ||
            avatar == null ||
            avatar?.includes(IMAGE_PATHS.NO_PROFILE_PICTURE)) && (
            <Tooltip title={TOOLTIPS.VIEW_PROFILE}>
              <Avatar
                className={`${
                  isVisibleOnSessionCard ? "avatar-sm" : "avatar-dashboard"
                }`}
                {...avatarToString(`${profilePrimaryLine}`)}
              />
            </Tooltip>
          )}
        </div>

        {/* NAME OF PROFILE, SUBTITLE & EVENT DATE */}
        <div className={`flex flex-col text-sm leading-snug w-full`}>
          <div className={"flex"}>
            <div
              className={`name font-bold flex flex-row flex-wrap items-center mb-px ${ProfileStyle.profile__name}`}
            >
              <Tooltip title={TOOLTIPS.VIEW_PROFILE}>
                <span className="name">{profilePrimaryLine}</span>
              </Tooltip>
            </div>
            {options && options.connect && (
              <div
                className={`flex cursor-pointer ml-auto slow-transition ${
                  isConnectionRequestSent && "control__disabled"
                }`}
                role="button"
                onTouchStart={onHover}
                onTouchEnd={onLeave}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                <IconButton
                  className=" cursor-pointer inline-flex "
                  fontSize="small"
                  color="primary"
                  aria-label="connect-to-person"
                >
                  {isConnectionRequestInProgress ? (
                    <ClipLoader className=" text-gray-600" size={20} />
                  ) : isConnectionRequestSent ? (
                    <>
                      <DoneIcon fontSize="small" />
                      <small className="text-sm font-small">
                        {TITLES.CONNECTION_REQUEST_SENT}
                      </small>
                    </>
                  ) : (
                    <PersonAddAltIcon />
                  )}
                </IconButton>

                {isConnectToPersonOptionShown && (
                  <div
                    onClick={(e) => addToNetwork(e)}
                    className={`${ProfileStyle.profile__connect__request__text} 
                      font-small mt-3-5 font-medium text-gray-600 leading-tight cursor-pointer ${
                        isConnectionRequestInProgress &&
                        "control__disabled"
                      }`}
                  >
                    {TITLES.CONNECT_TO_PERSON}
                  </div>
                )}
              </div>
            )}
            {/* CONNECTED/CONNECT/ACCEPT/AWAITING OR PENDING RESPONSE */}
            {options && options.mixedMode && (
              <>
                {metaData.invitationAction?.invitationAction ===
                  NETWORK.CONNECTION_RELATION_STATE.CONNECT && (
                  <div
                    className={`flex cursor-pointer ml-auto slow-transition ${
                      isConnectionRequestSent && "control__disabled"
                    }`}
                    role="button"
                    onTouchStart={onHover}
                    onTouchEnd={onLeave}
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                  >
                    <IconButton
                      className=" cursor-pointer inline-flex "
                      fontSize="small"
                      color="primary"
                      aria-label="connect-to-person"
                    >
                      {isConnectionRequestInProgress ? (
                        <ClipLoader className=" text-gray-600" size={20} />
                      ) : isConnectionRequestSent ? (
                        <>
                          <DoneIcon fontSize="small" />
                          <small className="text-sm font-small">
                            {TITLES.CONNECTION_REQUEST_SENT}
                          </small>
                        </>
                      ) : (
                        <PersonAddAltIcon />
                      )}
                    </IconButton>

                    {isConnectToPersonOptionShown && (
                      <div
                        onClick={(e) => addToNetwork(e)}
                        className={`${
                          ProfileStyle.profile__connect__request__text
                        } 
                    font-small mt-3-5 font-medium text-gray-600 leading-tight cursor-pointer ${
                      isConnectionRequestInProgress &&
                      "control__disabled"
                    }`}
                      >
                        {TITLES.CONNECT_TO_PERSON}
                      </div>
                    )}
                  </div>
                )}

                {metaData.invitationAction?.invitationAction ===
                  NETWORK.CONNECTION_RELATION_STATE.ACCEPT_REQUEST && (
                  <div
                    className={`flex cursor-pointer ml-auto slow-transition ${
                      isConnectionAcceptRequestSent &&
                      "control__disabled"
                    }`}
                    role="button"
                    onTouchStart={onHoverAccept}
                    onTouchEnd={onLeaveAccept}
                    onMouseEnter={onHoverAccept}
                    onMouseLeave={onLeaveAccept}
                  >
                    <IconButton
                      className=" cursor-pointer inline-flex "
                      fontSize="small"
                      color="primary"
                      aria-label="accept-connection-request-from-person"
                    >
                      {isConnectionAcceptRequestInProgress ? (
                        <ClipLoader className=" text-gray-600" size={20} />
                      ) : isConnectionAcceptRequestSent ? (
                        <>
                          <CheckCircleIcon
                            sx={{ color: "green" }}
                            fontSize="small"
                          />
                          <small className="text-sm font-small text-green-600">
                            connected
                          </small>
                        </>
                      ) : (
                        <AddTaskIcon />
                      )}
                    </IconButton>

                    {isAcceptPersonRequestOptionShown && (
                      <div
                        onClick={(e) => acceptRequest(e)}
                        className={`${
                          ProfileStyle.profile__connect__request__text
                        } 
                    font-small mt-3-5 font-medium text-gray-600 leading-tight cursor-pointer ${
                      isConnectionAcceptRequestInProgress &&
                      "control__disabled"
                    }`}
                      >
                        Accept
                      </div>
                    )}
                  </div>
                )}

                {metaData.invitationAction?.invitationAction ===
                  NETWORK.CONNECTION_RELATION_STATE.IN_MY_NETWORK && (
                  <div
                    className={`flex cursor-pointer ml-auto slow-transition`}
                  >
                    <IconButton
                      title={`You and ${firstName} are connected`}
                      className=" cursor-pointer inline-flex "
                      fontSize="small"
                      sx={{ color: "green" }}
                      aria-label="connected-to-person"
                    >
                      <CheckCircleIcon fontSize="small" />
                      <small className="text-sm font-small">connected</small>
                    </IconButton>
                  </div>
                )}

                {metaData.invitationAction?.invitationAction ===
                  NETWORK.CONNECTION_RELATION_STATE.AWAITING_RESPONSE && (
                  <div
                    className={`flex cursor-pointer ml-auto slow-transition`}
                  >
                    <IconButton
                      title={`Your connection request is yet pending from ${firstName}`}
                      className=" cursor-pointer inline-flex "
                      fontSize="small"
                      sx={{ color: "#EF107D" }}
                      aria-label="awaiting-connection-response-from-person"
                    >
                      <PendingIcon fontSize="small" />
                      <small className="text-sm font-small">pending</small>
                    </IconButton>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="sm:line-clamp-1 text-gray-700 text-xs text-brand-grey-700 dark:text-brand-grey-500">
            {isVisibleOnSessionCard && profileSecondaryLine !== "" && (
              <>
                <SchoolIcon
                  className={`${ProfileStyle.profile__subtitle__icon}`}
                />
                &nbsp;
                {profileSecondaryLine}
              </>
            )}

            {!isVisibleOnSessionCard && profileSecondaryLine !== "" && (
              <Tooltip title={profileSecondaryLine}>
                <div>{profileSecondaryLine}</div>
              </Tooltip>
            )}
          </div>
          {isVisibleOnSessionCard && (
            <div
              className={` ${ProfileStyle.profile__event__time__subtitle} 
          sm:line-clamp-1 event-date text-brand-grey-700 dark:text-brand-grey-500`}
            >
              <div className="flex">
                <EventIcon
                  className={`${ProfileStyle.profile__event__time__subtitle__icon}`}
                />
                {localTZDate(sessionStartDTime)}
              </div>
            </div>
          )}

          {!isVisibleOnSessionCard && metaData && profileTertiaryLine != "" && (
            <div
              className={` ${ProfileStyle.profile__event__time__subtitle} 
          sm:line-clamp-1 event-date text-brand-grey-700 dark:text-brand-grey-500`}
            >
              <div className="flex">
                <Tooltip title={profileTertiaryLine}>
                  <div>{profileTertiaryLine}</div>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

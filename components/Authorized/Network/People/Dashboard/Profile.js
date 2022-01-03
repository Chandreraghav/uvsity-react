import { Avatar, IconButton, Popover, Tooltip } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import {
  IMAGE_PATHS,
  ME,
  NETWORK,
  PAYLOAD_DEFAULT_TEXTS,
  TITLES,
  TOOLTIPS,
} from "../../../../../constants/userdata";
import { useDataLayerContextValue } from "../../../../../context/DataLayer";
import {
  avatarToString,
  formattedName,
  formattedProfileSubtitle,
  getTimezone,
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
import PeekProfile from "../Peek/Profile";
import { makeStyles } from "@material-ui/core/styles";
toast.configure();
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    border: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

function Profile({
  options,
  firstName,
  lastName,
  avatar,
  sessionStartDTime,
  userType,
  instituition,
  isVisibleOnSessionCard,
  oid,
  metaData,
  origin,
}) {
  
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [isConnectToPersonOptionShown, setConnectToPersonShown] =
    useState(false);

  const classes = useStyles();
  const popoverAnchor = useRef(null);
  const [openedPopover, setOpenedPopover] = useState(false);
  const handlePopoverOpen = (event) => {
    setOpenedPopover(true);
  };

  const handlePopoverClose = () => {
    setOpenedPopover(false);
  };

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

  const [isMePrefixOnProfileName, setMePrefixOnProfileName] = useState(false);

  useEffect(() => {
    setMePrefixOnProfileName(isItMe());
  }, []);

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

  const profileTertiaryLine = ()=>{
    let _tertiaryLine = formattedProfileSubtitle(metaData?.city, metaData?.country);
    return _tertiaryLine===''? formattedProfileSubtitle(metaData?.creator?.city, metaData?.creator?.country):_tertiaryLine
  }

  const getPayload = () => {
    let payload = {
      requestFrom: {
        userDetailsId: USERDATA?.LOGGED_IN_INFO?.data?.userDetailsId,
      },
      requestTo: { userDetailsId: metaData.userDetailsId },
      userRequestText: "",
      userRequestType: NETWORK.REQUEST_TYPE,
    };
    let requestText =
      PAYLOAD_DEFAULT_TEXTS.CONNECTION_REQUEST_SENDING_TEXT.replace(
        "#X#",
        payload.requestFrom
      );
    requestText = PAYLOAD_DEFAULT_TEXTS.CONNECTION_REQUEST_SENDING_TEXT.replace(
      "#Y#",
      payload.requestTo
    );
    payload.userRequestText = requestText;
    return payload;
  };
  const isItMe = () => {
    return USERDATA?.LOGGED_IN_INFO?.data?.userDetailsId === oid;
  };
  const addToNetwork = () => {
    setConnectionRequestInProgress(true);
    ConnectionService.sendConnectionRequest(
      getPayload(NETWORK.CONNECTION_RELATION_STATE.CONNECT)
    )
      .then(() => {
        setConnectionRequestSendError(false);
        handleResponse(
          `${TITLES.CONNECTION_REQUEST_SENT_TO}${firstName}`,
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

  const acceptRequest = () => {
    setConnectionAcceptRequestInProgress(true);
    ConnectionService.acceptConnectionRequest(
      metaData.invitationAction.invitationRequestId
    )
      .then(() => {
        setConnectionAcceptRequestSendError(false);
        handleResponse(
          TITLES.CONNECTED_PEOPLE.replace("#X#", firstName),
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
    profileTertiaryLine().trim() == ""
  ) {
    return "";
  }

  return (
    <div>
       
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.popoverContent,
          }}
          open={openedPopover}
          anchorEl={popoverAnchor.current}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableRestoreFocus
          PaperProps={{
            onMouseEnter: handlePopoverOpen,
            onMouseLeave: handlePopoverClose,
          }}
        >
          <PeekProfile
            isOpen={openedPopover}
            options={{connect:options?.connect, mixedMode:options?.mixedMode}}
            metaData={metaData}
            addToNetwork={addToNetwork}
            acceptRequest={acceptRequest}
            isConnectToPersonOptionShown={isConnectToPersonOptionShown}
            isAcceptPersonRequestOptionShown={isAcceptPersonRequestOptionShown}
            isConnectionRequestSent={isConnectionRequestSent}
            isConnectionAcceptRequestSent={isConnectionAcceptRequestSent}
            isConnectionRequestInProgress={isConnectionRequestInProgress}
            isConnectionAcceptRequestInProgress={isConnectionAcceptRequestInProgress}
            isConnectionRequestSendError={isConnectionRequestSendError}
            isConnectionAcceptRequestSendError={isConnectionAcceptRequestSendError}
            onHover={onHover}
            onLeave={onLeave}
            onHoverAccept={onHoverAccept}
            onLeaveAccept={onLeaveAccept}
            dark
            data={{
              oid: oid,
              avatar: avatar,
              primary: profilePrimaryLine,
              secondary: profileSecondaryLine,
              tertiary: profileTertiaryLine(),
              isItMe:isItMe()
            }}
          />
        </Popover>
      
      <div className="flex flex-row items-center flex-1 mb-4 gap-2 pt-2">
        {/* AVATAR */}
        <div className="avatar flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 rounded-full bg-brand-grey-200 dark:bg-brand-grey-700">
          {avatar !== "" &&
            !avatar?.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) && (
              <Avatar
                ref={popoverAnchor}
                onTouchStart={handlePopoverOpen}
                onTouchEnd={handlePopoverClose}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                className={`${
                  isVisibleOnSessionCard ? "avatar-sm" : "avatar-dashboard"
                }`}
                alt={`${profilePrimaryLine}`}
                src={avatar}
              />
            )}
          {(avatar === "" ||
            avatar == null ||
            avatar?.includes(IMAGE_PATHS.NO_PROFILE_PICTURE)) && (
            <Avatar
              ref={popoverAnchor}
              onTouchStart={handlePopoverOpen}
              onTouchEnd={handlePopoverClose}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              className={`${
                isVisibleOnSessionCard ? "avatar-sm" : "avatar-dashboard"
              }`}
              {...avatarToString(`${profilePrimaryLine}`)}
            />
          )}
        </div>

        {/* NAME OF PROFILE, SUBTITLE & EVENT DATE */}
        <div className={`flex flex-col text-sm leading-snug w-full`}>
          <div className={"flex"}>
            <div
              className={`name font-bold flex flex-row flex-wrap items-center mb-px ${ProfileStyle.profile__name}`}
            >
              <Tooltip
                title={
                  isMePrefixOnProfileName
                    ? TOOLTIPS.GO_TO_PROFILE
                    : TOOLTIPS.VIEW_PROFILE
                }
              >
                <span className="name">
                  {profilePrimaryLine}
                  {isMePrefixOnProfileName ? <>{ME}</> : <></>}
                </span>
              </Tooltip>
            </div>
            {/* ONLY CONNECTED OPTIONS */}
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
                      <small
                        title={`${TITLES.CONNECTION_REQUEST_SENT_TO_LATENT}${firstName}`}
                        className="text-sm font-small"
                      >
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
                        isConnectionRequestInProgress && "control__disabled"
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
                      isConnectionRequestInProgress && "control__disabled"
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
                      isConnectionAcceptRequestSent && "control__disabled"
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
                            {NETWORK.CONNECTION_ACTION_STATUS.CONNECTED}
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
                      isConnectionAcceptRequestInProgress && "control__disabled"
                    }`}
                      >
                        {NETWORK.CONNECTION_ACTION_STATUS.ACCEPT}
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
                      title={`${TITLES.CONNECTED_PEOPLE_LATENT.replace(
                        "#X#",
                        firstName
                      )}`}
                      className=" cursor-pointer inline-flex "
                      fontSize="small"
                      sx={{ color: "green" }}
                      aria-label="connected-to-person"
                    >
                      <CheckCircleIcon fontSize="small" />
                      <small className="text-sm font-small">
                        {NETWORK.CONNECTION_ACTION_STATUS.CONNECTED}
                      </small>
                    </IconButton>
                  </div>
                )}

                {metaData.invitationAction?.invitationAction ===
                  NETWORK.CONNECTION_RELATION_STATE.AWAITING_RESPONSE && (
                  <div
                    className={`flex cursor-pointer ml-auto slow-transition`}
                  >
                    <IconButton
                      title={`${TITLES.CONNECTION_REQUEST_PENDING}${firstName}`}
                      className=" cursor-pointer inline-flex "
                      fontSize="small"
                      sx={{ color: "#EF107D" }}
                      aria-label="awaiting-connection-response-from-person"
                    >
                      <PendingIcon fontSize="small" />
                      <small className="text-sm font-small">
                        {NETWORK.CONNECTION_ACTION_STATUS.PENDING}
                      </small>
                    </IconButton>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="  sm:line-clamp-1 text-gray-700 text-xs text-brand-grey-700 dark:text-brand-grey-500">
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
                <div className={`${origin ? "" : "-mt-2-px"}`}>
                  {profileSecondaryLine}
                </div>
              </Tooltip>
            )}
          </div>
          {isVisibleOnSessionCard && (
            <div
              className={` ${ProfileStyle.profile__event__time__subtitle} 
          sm:line-clamp-1  event-date text-brand-grey-700 dark:text-brand-grey-500`}
            >
              <div className="flex text-xs  ">
                <EventIcon
                  className={` ${ProfileStyle.profile__event__time__subtitle__icon}`}
                />
                <div className="mt-0 leading-tight text-xs">
                  {localTZDate(sessionStartDTime)}
                </div>
                
              </div>
              <div>{getTimezone()}</div>
            </div>
          )}

          {!isVisibleOnSessionCard && metaData && profileTertiaryLine() != "" && (
            <div
              className={` ${ProfileStyle.profile__event__time__subtitle} 
          sm:line-clamp-1  event-date text-brand-grey-700 dark:text-brand-grey-500`}
            >
              <div className="flex">
                <Tooltip title={profileTertiaryLine()}>
                  <div>{profileTertiaryLine()}</div>
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

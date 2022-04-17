import { Avatar, Button, Stack, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import {
  COMPLETION_DETAIL_ACTION,
  IMAGE_PATHS,
  ME,
  NETWORK,
  TITLES,
} from "../../../../../constants/userdata";
import { avatarToString } from "../../../../../utils/utility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import SendIcon from "@mui/icons-material/Send";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import { ClipLoader } from "react-spinners";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ProfileStyle from "../../../../../styles/DashboardProfile.module.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { navigateToProfile } from "../../../Shared/Navigator";
toast.configure();
function PeekProfile(props) {
  if (!props.isOpen) return <></>;
  const router = useRouter();
  const invitedState =
    props.metaData?.invitationAction?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE.CONNECT ||
    props.metaData?.associatedUserData?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT ||
    props.metaData?.associatedCoHostData?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT;
  const acceptanceState =
    props.metaData?.invitationAction?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE.ACCEPT_REQUEST ||
    props.metaData?.associatedUserData?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST ||
    props.metaData?.associatedCoHostData?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST;
  const pendingState =
    props.metaData?.invitationAction?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE.AWAITING_RESPONSE ||
    props.metaData?.associatedUserData?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.AWAITING_RESPONSE ||
    props.metaData?.associatedCoHostData?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.AWAITING_RESPONSE;
  const isAConnection = () => {
    let metadata = props.metaData;
    if (metadata) {
      if (metadata.courseId) {
        // meta data contains data about posted session and associated user data.
        if (metadata.associatedUserData) {
          if (
            metadata.associatedUserData.invitationAction ===
            NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK
          ) {
            return true;
          }
        }
      }

      if (metadata.associatedCoHostData) {
        // meta data contains data about posted session co-host and associated user data.

        if (
          metadata.associatedCoHostData.invitationAction ===
          NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK
        ) {
          return true;
        }
      }

      // meta data contains data only about user network status.
      return (
        metadata?.invitationAction?.invitationAction ===
        NETWORK.CONNECTION_RELATION_STATE.IN_MY_NETWORK
      );
    }
    return false;
  };
  const [isConnected, setIsConnected] = useState(isAConnection());

  const [isInAcceptanceState, setAcceptanceState] = useState(acceptanceState);

  const [isInInvitedState, setInvitedState] = useState(invitedState);

  const [isInPendingState, setPendingState] = useState(pendingState);

  const handleConnectRequest = () => {
    props?.addToNetwork();
  };
  const handleAcceptRequest = () => {
    props?.acceptRequest();
    setIsConnected(true);
  };
  const getUserID = () => {
    if (props?.data?.oid) return props?.data?.oid;
    if (props?.metaData?.creator?.userDetailsId)
      return props?.metaData?.creator?.userDetailsId;
    return props?.metaData?.associatedUserData?.userDetailsId;
  };

  return (
    <div
      className={` relative border-0   rounded
       overflow-hidden ${
         props.dark ? "dark-dialog-variant" : "default-dialog-variant"
       }  flex flex-col rectangular-md-card ${
        props?.options?.mixedMode === false
          ? "rectangular-md-card-fixed-height"
          : ""
      }`}
    >
      <div className="flex">
        <div className="flex flex-col">
          {props.data.avatar &&
          !props.data.avatar.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
            <Avatar
              className="mb-10 ml-2 mt-2"
              src={props.data.avatar}
              alt={props.data.primary}
            />
          ) : (
            <Avatar
              className="mb-10 ml-2  mt-2"
              {...avatarToString(`${props.data.primary}`)}
            />
          )}
        </div>
        <div className="flex flex-col px-2 py-2">
          <h2
            onClick={() => navigateToProfile(getUserID(), router)}
            className={`text-xl leading-snug font-semibold line-clamp-1 dialog-title`}
          >
            {props.data.primary}
            {props.data.isItMe ? ME : <></>}
          </h2>
          {props.data.secondary && (
            <h3 className="text-md leading-loose line-clamp-2 text-gray-500">
              <WorkIcon /> {props.data.secondary}
            </h3>
          )}
          {props.data.tertiary && (
            <h4
              className={`text-md leading-loose line-clamp-1  ${
                props.dark ? "text-gray-300" : "text-gray-500"
              }   `}
            >
              <LocationOnIcon /> {props.data.tertiary}
            </h4>
          )}

          {/* ONLY CONNECTED OPTIONS */}
          {props.options && props.options.connect && !props.data.isItMe && (
            <div
              className={`flex cursor-pointer  slow-transition ${
                props?.isConnectionRequestSent && "control__disabled"
              }`}
              role="button"
              // onTouchStart={props?.onHover}
              // onTouchEnd={props?.onLeave}
              // onMouseEnter={props?.onHover}
              // onMouseLeave={props?.onLeave}
            >
              <IconButton
                className=" cursor-pointer inline-flex "
                fontSize="small"
                color="primary"
                aria-label="connect-to-person"
              >
                {props?.isConnectionRequestInProgress ? (
                  <ClipLoader color={`${props.dark ? "#fff" : ""}`} size={20} />
                ) : props?.isConnectionRequestSent ? (
                  <>
                    <DoneIcon fontSize="small" />
                    <small
                      title={`${TITLES.CONNECTION_REQUEST_SENT_TO_LATENT}${props.metaData.firstName}`}
                      className={`text-sm font-small ${
                        props.dark ? "text-gray-400" : ""
                      }`}
                    >
                      {TITLES.CONNECTION_REQUEST_SENT}
                    </small>
                  </>
                ) : (
                  <span
                    onClick={(e) => handleConnectRequest()}
                    className="-mt-1"
                    title={`${
                      props?.metaData?.firstName
                        ? `Connect with ${props.metaData.firstName}`
                        : ""
                    }`}
                  >
                    <PersonAddAltIcon />
                  </span>
                )}
              </IconButton>

              {props?.isConnectToPersonOptionShown && (
                <div
                  onClick={(e) => handleConnectRequest()}
                  className={`${ProfileStyle.profile__connect__request__text} 
                      font-small mt-3-5 font-medium text-gray-600 leading-tight cursor-pointer ${
                        props?.isConnectionRequestInProgress &&
                        "control__disabled"
                      }`}
                >
                  {TITLES.CONNECT_TO_PERSON}
                </div>
              )}
            </div>
          )}
          {/* CONNECTED/CONNECT/ACCEPT/AWAITING OR PENDING RESPONSE */}
          {props?.options && props?.options.mixedMode && !props.data.isItMe && (
            <>
              {isInInvitedState && (
                <div
                  className={`flex cursor-pointer  slow-transition ${
                    props?.isConnectionRequestSent && "control__disabled"
                  }`}
                  role="button"
                  // onTouchStart={props?.onHover}
                  // onTouchEnd={props?.onLeave}
                  // onMouseEnter={props?.onHover}
                  // onMouseLeave={props?.onLeave}
                >
                  <IconButton
                    className=" cursor-pointer inline-flex "
                    fontSize="small"
                    color="primary"
                    aria-label="connect-to-person"
                  >
                    {props?.isConnectionRequestInProgress ? (
                      <ClipLoader
                        color={`${props.dark ? "#fff" : ""}`}
                        size={20}
                      />
                    ) : props?.isConnectionRequestSent ? (
                      <>
                        <DoneIcon fontSize="small" />
                        <small
                          className={`text-sm font-small ${
                            props.dark ? "text-gray-400" : ""
                          }`}
                        >
                          {TITLES.CONNECTION_REQUEST_SENT}
                        </small>
                      </>
                    ) : (
                      <span
                        onClick={(e) => handleConnectRequest()}
                        className="-mt-1"
                        title={`${
                          props?.metaData?.firstName
                            ? `Connect with ${props.metaData.firstName}`
                            : ""
                        }`}
                      >
                        <PersonAddAltIcon />
                      </span>
                    )}
                  </IconButton>

                  {props?.isConnectToPersonOptionShown && (
                    <div
                      onClick={(e) => handleConnectRequest()}
                      className={`${
                        ProfileStyle.profile__connect__request__text
                      } 
                    font-small mt-3-5 font-medium text-gray-600 leading-tight cursor-pointer ${
                      props?.isConnectionRequestInProgress &&
                      "control__disabled"
                    }`}
                    >
                      {TITLES.CONNECT_TO_PERSON}
                    </div>
                  )}
                </div>
              )}

              {isInAcceptanceState && (
                <div
                  className={`flex cursor-pointer  slow-transition ${
                    props?.isConnectionAcceptRequestSent && "control__disabled"
                  }`}
                  role="button"
                  // onTouchStart={props?.onHoverAccept}
                  // onTouchEnd={props?.onLeaveAccept}
                  // onMouseEnter={props?.onHoverAccept}
                  // onMouseLeave={props?.onLeaveAccept}
                >
                  <IconButton
                    className=" cursor-pointer inline-flex "
                    fontSize="small"
                    color="primary"
                    aria-label="accept-connection-request-from-person"
                  >
                    {props?.isConnectionAcceptRequestInProgress ? (
                      <ClipLoader
                        color={`${props.dark ? "#fff" : ""}`}
                        size={20}
                      />
                    ) : props?.isConnectionAcceptRequestSent ? (
                      <>
                        <CheckCircleIcon
                          sx={{ color: "green" }}
                          fontSize="small"
                        />
                        <small className={`text-sm font-small text-green-600`}>
                          {NETWORK.CONNECTION_ACTION_STATUS.CONNECTED}
                        </small>
                      </>
                    ) : (
                      <span
                        onClick={(e) => handleAcceptRequest(e)}
                        className="-mt-1"
                        title={`${
                          props?.metaData?.firstName
                            ? `Accept connection request from ${props.metaData.firstName}`
                            : ""
                        }`}
                      >
                        {" "}
                        <AddTaskIcon />
                      </span>
                    )}
                  </IconButton>

                  {props?.isAcceptPersonRequestOptionShown && (
                    <div
                      onClick={(e) => handleAcceptRequest()}
                      className={`${
                        ProfileStyle.profile__connect__request__text
                      } 
                    font-small mt-3-5 font-medium text-gray-600 leading-tight cursor-pointer ${
                      props?.isConnectionAcceptRequestInProgress &&
                      "control__disabled"
                    }`}
                    >
                      {NETWORK.CONNECTION_ACTION_STATUS.ACCEPT}
                    </div>
                  )}
                </div>
              )}

              {isConnected && (
                <div className={`flex cursor-pointer  slow-transition`}>
                  <IconButton
                    title={`${TITLES.CONNECTED_PEOPLE_LATENT.replace(
                      "#X#",
                      props.metaData.firstName ||
                        props.metaData?.associatedUserData?.firstName ||
                        props.metaData?.associatedCoHostData?.firstName
                    )}`}
                    className=" cursor-pointer inline-flex text-green-700 "
                    fontSize="small"
                    sx={{ color: NETWORK.COLOR_VARIANTS.CONNECTED }}
                    aria-label="connected-to-person"
                  >
                    <CheckCircleIcon fontSize="small" />
                    <small className={`text-sm font-small`}>
                      {NETWORK.CONNECTION_ACTION_STATUS.CONNECTED}
                    </small>
                  </IconButton>
                </div>
              )}

              {isInPendingState && (
                <div className={`flex cursor-pointer  slow-transition`}>
                  <IconButton
                    title={`${
                      props?.metaData?.firstName
                        ? TITLES.CONNECTION_REQUEST_PENDING +
                          (props.metaData.firstName ||
                            props.metaData.creator.firstName)
                        : TITLES.CONNECTION_REQUEST_PENDING +
                          props.data.primary.split(" ")[0]
                    }`}
                    className=" cursor-pointer inline-flex "
                    fontSize="small"
                    sx={{ color: NETWORK.COLOR_VARIANTS.PENDING }}
                    aria-label="awaiting-connection-response-from-person"
                  >
                    <PendingIcon fontSize="small" />
                    <small className={`text-sm font-small`}>
                      {NETWORK.CONNECTION_ACTION_STATUS.PENDING}
                    </small>
                  </IconButton>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {!props.data.isItMe && isConnected && (
        <div className="text-md actions-on-peek ">
          <Stack direction="row" spacing={2}>
            <Button size="small" variant="contained" endIcon={<SendIcon />}>
              Message
            </Button>
            <div className=" xl:flex inline md:flex inline lg:flex inline hidden">
              <Button
                size="small"
                variant="contained"
                endIcon={<RecommendOutlinedIcon />}
              >
                Ask Recommendation
              </Button>
            </div>
            <div className="flex xl:hidden md:hidden inline lg:hidden sm:flex inline xs:flex inline">
              <div className="text-blue-500 ml-auto cursor-pointer ">
                <Tooltip
                  title={`Ask a recommendation from ${
                    props.data.primary.split(" ")[0]
                  }`}
                >
                  <RecommendOutlinedIcon />
                </Tooltip>
              </div>
            </div>
          </Stack>
        </div>
      )}
      {props.data.isItMe && (
        <div className="text-md actions-on-peek ">
          <Stack direction="row" spacing={2}>
            {COMPLETION_DETAIL_ACTION.map((action, index) =>
              action.startIcon ? (
                <Button
                  key={index}
                  variant="contained"
                  startIcon={action.icon}
                  size={action.size}
                >
                  {action.title}
                </Button>
              ) : (
                <div key={index}>
                  <div className="  hidden xl:flex inline md:flex inline lg:flex inline ">
                    <Button
                      variant="contained"
                      endIcon={action.icon}
                      size={action.size}
                    >
                      {action.title}
                    </Button>
                  </div>

                  <div className="flex xl:hidden inline md:hidden inline lg:hidden inline sm:flex inline xs:flex inline">
                    <div className="ml-auto text-blue-500 cursor-pointer ">
                      <Tooltip title={`${action.tooltip}`}>
                        <RecommendOutlinedIcon />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )
            )}
          </Stack>
        </div>
      )}
    </div>
  );
}

export default PeekProfile;

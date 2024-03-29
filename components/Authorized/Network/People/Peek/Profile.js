/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Button, Stack, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  COMPLETION_DETAIL_ACTION,
  IMAGE_PATHS,
  ME,
  NETWORK,
  RECOMMENDATIONS,
  INBOX,
  TITLES,
  TOOLTIPS,
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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { navigateToProfile } from "../../../Shared/Navigator";
import { WORKFLOW_CODES } from "../../../../../constants/workflow-codes";
import Spacer from "../../../../shared/Spacer";

toast.configure();
function PeekProfile(props) {
  if (!props.isOpen) return <></>;
  const router = useRouter();
  const invitedState =
    props.metaData?.invitationAction?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE.CONNECT ||
    props.metaData?.invitationAction?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT ||
    props.metaData?.associatedUserData?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT ||
    props.metaData?.associatedCoHostData?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT;
  const acceptanceState =
    props.metaData?.invitationAction?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE.ACCEPT_REQUEST ||
    props.metaData?.invitationAction?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST ||
    props.metaData?.associatedUserData?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST ||
    props.metaData?.associatedCoHostData?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST;
  const pendingState =
    props.metaData?.invitationAction?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE.AWAITING_RESPONSE ||
    props.metaData?.invitationAction?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.AWAITING_RESPONSE ||
    props.metaData?.associatedUserData?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.AWAITING_RESPONSE ||
    props.metaData?.associatedCoHostData?.invitationAction ===
    NETWORK.CONNECTION_RELATION_STATE_ALT.AWAITING_RESPONSE;
  const isAConnection = useCallback(() => {
    if (props?.connected === true) return true;
    let metadata = props.metaData;
    if (metadata) {
      if (metadata?.courseId) {
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

      if (metadata?.associatedCoHostData) {
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
        NETWORK.CONNECTION_RELATION_STATE.IN_MY_NETWORK ||
        metadata?.invitationAction?.invitationAction === NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK
      );
    }
    return false;
  });
  const [isConnected, setIsConnected] = useState(isAConnection());

  const [isInAcceptanceState, setAcceptanceState] = useState(false);

  const [isInInvitedState, setInvitedState] = useState(false);

  const [isInPendingState, setPendingState] = useState(false);

  useEffect(() => {
    setInvitedState(invitedState)
    setPendingState(pendingState)
    setAcceptanceState(acceptanceState)
    setIsConnected(isAConnection())

    return (() => {
      setInvitedState(false)
      setPendingState(false)
      setAcceptanceState(false)
      setIsConnected(false)

    })
  }, [acceptanceState, invitedState, isAConnection, pendingState, props])

  const handleConnectRequest = () => {
    if (props.addToNetwork)
      props.addToNetwork(props);
  };
  const handleAcceptRequest = () => {
    if (props.acceptRequest)
      props.acceptRequest(props);
    setIsConnected(true);
  };
  const getUserID = () => {
    if (props?.data?.oid) return props?.data?.oid;
    if (props?.metaData?.creator?.userDetailsId)
      return props?.metaData?.creator?.userDetailsId;
    if (props?.metaData?.associatedCoHostData?.userDetailsId)
      return props?.metaData?.associatedCoHostData?.userDetailsId;
    return props?.metaData?.associatedUserData?.userDetailsId;
  };
  const handleProfileEdit = () => {
    navigateToProfile(getUserID(), router)
  }
  const handleRequestRecommendation = () => {
    const requestedTo = getUserID();
    const requestTitle = props.metaData?.firstName
    if (requestedTo) {
      const request = { requestedTo, requestTitle, event: RECOMMENDATIONS.REQUEST_TYPE };
      if (props.messageEvent) props?.messageEvent(request);
    }
  };

  const handleSendMessage = () => {
    const requestedTo = getUserID();
    const requestTitle = props.metaData?.firstName
    if (requestedTo) {
      const request = { requestedTo, requestTitle, event: INBOX.REQUEST_TYPE };
      if (props.messageEvent) props?.messageEvent(request);
    }
  }

  const getPendingTitle = () => {
    return props?.metaData?.firstName
      ? TITLES.CONNECTION_REQUEST_PENDING +
      (props.metaData.firstName ||
        props.metaData.creator.firstName)
      : TITLES.CONNECTION_REQUEST_PENDING +
      props.data.primary.split(" ")[0]
  }

  return (
    <div
      className={` relative border-0   rounded
       overflow-hidden ${props.dark ? "dark-dialog-variant" : "default-dialog-variant"
        }  flex flex-col ${props.fullWidth ? 'rectangular-md-card-fullWidth' : 'rectangular-md-card'} ${props?.options?.mixedMode === false
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
          <div className="flex gap-1">
            {props.workflow === WORKFLOW_CODES.PEOPLE.PROFILE_VIEW ? (<>
              <Tooltip title={TOOLTIPS.VIEW_PROFILE}>
                <h2
                  onClick={() => navigateToProfile(getUserID(), router)}
                  className={`text-xl leading-snug font-semibold line-clamp-1 dialog-title`}
                >
                  {props.data.primary}
                  {props.data.isItMe ? ME : <></>}
                </h2>
              </Tooltip>

            </>) : (<>

              <h2
                onClick={() => navigateToProfile(getUserID(), router)}
                className={`text-xl leading-snug font-semibold line-clamp-1 dialog-title`}
              >
                {props.data.primary}
                {props.data.isItMe ? ME : <></>}
              </h2>


            </>)}

            {(isConnected || props.connected) && (
              <Tooltip
                title={`${TITLES.CONNECTED_PEOPLE_LATENT.replace(
                  "#X#",
                  props.metaData.firstName)}`}
              >
                <CheckCircleIcon
                  sx={{ color: "green" }}
                  fontSize="small"
                />
              </Tooltip>

            )}
          </div>

          {props.data.secondary && (
            <h3 className={`text-md leading-loose ${props.fullWidth ? 'line-clamp-1' : 'line-clamp-2'} text-gray-500`}>
              {props.fullWidth ? (
                <Tooltip title={props.data.secondary}>
                  <div className="py-1 flex gap-2 leading-tight">
                    <WorkIcon className="mt-1" />
                    <Typography className="h-6 mt-1 line-clamp-1">
                      {props.data.secondary}
                    </Typography>
                  </div>
                </Tooltip>

              ) : (<> <WorkIcon /> {props.data.secondary}</>)}

            </h3>
          )}
          {props.data.tertiary && (
            <h4
              className={`text-md leading-loose line-clamp-1  ${props.dark ? "text-gray-300" : "text-gray-500"
                }   `}
            >
              <LocationOnIcon /> {props.data.tertiary}
            </h4>
          )}
          <Spacer />
          {/* OPTIONS THAT ARE MEANT TO CONNECT OR INVITE A PERSON */}
          {props.options && props.options.connect && !props.data.isItMe && (
            <div
              className={`flex cursor-pointer  slow-transition ${props?.isConnectionRequestSent && "control__disabled"
                }`}
              role="button"

            >
              {props?.isConnectionRequestInProgress && (
                <ClipLoader color={`${props.dark ? "#fff" : "#111"}`} size={20} />
              )}  {props?.isConnectionRequestSent && (
                <>
                  <Tooltip title={`${TITLES.CONNECTION_REQUEST_SENT_TO_LATENT}${props.metaData.firstName}`}
                  >
                    <div className="flex">

                      <DoneIcon color="primary" fontSize="small" />
                      <small
                        className={`text-sm font-small md:hidden lg:inline xl:inline sm:inline xs:inline ${props.dark ? "text-gray-400" : ""
                          }`}
                      >
                        {TITLES.CONNECTION_REQUEST_SENT}
                      </small>

                    </div>
                  </Tooltip>


                </>
              )}

              {!props?.isConnectionRequestSent && !props?.isConnectionRequestInProgress && (<Tooltip title={`${props?.metaData?.firstName
                ? `Connect with ${props.metaData.firstName}`
                : ""
                }`}>
                <PersonAddAltIcon onClick={(e) => handleConnectRequest()}
                  className="-mt-1" color="primary" />
              </Tooltip>)}

            </div>
          )}
          {/* CONNECTED/CONNECT/ACCEPT/AWAITING OR PENDING RESPONSE */}
          {props?.options && props?.options.mixedMode && !props.data.isItMe && (
            <>

              {isInInvitedState && (
                <div
                  className={`flex cursor-pointer  slow-transition ${props?.isConnectionRequestSent && "control__disabled"
                    }`}
                  role="button"

                >
                  <div
                    className=" text-sm cursor-pointer inline-flex "
                    aria-label="connect-to-person"
                  >
                    {props.isConnectionRequestInProgress && props?.isConnectionRequestInProgress==true ? (
                      <ClipLoader
                        color={`${props.dark ? "#fff" : "#111"}`}
                        size={20}
                      />
                    ) : props?.isConnectionRequestSent ? (
                      <>
                        <DoneIcon color="primary" fontSize="small" />
                        <small
                          className={`text-sm font-small md:hidden lg:inline xl:inline sm:inline xs:inline ${props.dark ? "text-gray-400" : ""
                            }`}
                        >
                          {TITLES.CONNECTION_REQUEST_SENT}
                        </small>
                      </>
                    ) : props?.isConnectToPersonOptionShown && (

                      <Tooltip title={`${props?.metaData?.firstName
                        ? `Connect with ${props.metaData.firstName}`
                        : ""
                        }`}
                      >
                        <PersonAddAltIcon onClick={(e) => handleConnectRequest()}
                          className="-mt-1" color="primary" />
                      </Tooltip>

                    )}
                  </div>


                </div>
              )}

              {isInAcceptanceState && (
                <div
                  className={`flex cursor-pointer  slow-transition ${props?.isConnectionAcceptRequestSent && "control__disabled"
                    }`}
                  role="button"
                >
                  <div
                    className=" text-sm cursor-pointer inline-flex "
                    aria-label="accept-connection-request-from-person"
                  >
                    {props?.isConnectionAcceptRequestInProgress && (
                      <ClipLoader
                        color={`${props.dark ? "#fff" : "#111"}`}
                        size={20}
                      />
                    )}
                    {!props?.isConnectionAcceptRequestInProgress && (
                      <Tooltip title={`${props?.metaData?.firstName
                        ? `Accept connection request from ${props.metaData.firstName}`
                        : ""
                        }`}>

                        <AddTaskIcon onClick={(e) => handleAcceptRequest(e)}
                          className="-mt-1" color="primary" />
                      </Tooltip>
                    )}
                  </div>
                </div>
              )}
              {isInPendingState && (
                <div className={`flex cursor-pointer  slow-transition`}>
                  <div aria-label="awaiting-connection-response-from-person" className=" text-sm cursor-pointer inline-flex">
                    <Tooltip title={getPendingTitle()}>
                      <div className="flex">
                        <PendingIcon sx={{ color: NETWORK.COLOR_VARIANTS.PENDING }} fontSize="small" />
                        <small style={{ color: NETWORK.COLOR_VARIANTS.PENDING }} className={`mt-0.5 text-sm font-small md:hidden lg:inline xl:inline sm:inline xs:inline`}>
                          {NETWORK.CONNECTION_ACTION_STATUS.PENDING}
                        </small>
                      </div>
                    </Tooltip>
                  </div>

                </div>
              )}
            </>
          )}
        </div>
      </div>

      {!props.data.isItMe && isConnected && (
        <div className="text-md actions-on-peek ">
          <Stack direction="row" spacing={2}>
            <Button onClick={handleSendMessage} size="small" variant="contained" endIcon={<SendIcon />}>
              {INBOX.SEND_MESSAGE}
            </Button>

            <Button
              onClick={handleRequestRecommendation}
              size="small"
              variant="contained"
              endIcon={<RecommendOutlinedIcon />}
            >
              {RECOMMENDATIONS.REQUEST_RECOMMENDATION}
            </Button>


          </Stack>
        </div>
      )}
      {props.data.isItMe && (
        <div className="text-md actions-on-peek ">
          <Stack direction="row" spacing={2}>
            {COMPLETION_DETAIL_ACTION.map((action, index) =>
            (<div key={index}>
              {action.id === 1 ? (<Button
                variant="contained"
                startIcon={action.icon}
                size={action.size}
                onClick={handleProfileEdit}
              >
                {action.title}
              </Button>) : (<Tooltip title={action.tooltip}>
                <Button
                  key={index}
                  variant="contained"
                  endIcon={action.icon}
                  size={action.size}
                >
                  {action.title}
                </Button>
              </Tooltip>)}
            </div>)
            )}
          </Stack>
        </div>
      )}
    </div>
  );
}

export default PeekProfile;

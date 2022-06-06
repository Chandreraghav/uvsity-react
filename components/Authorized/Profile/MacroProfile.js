/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { blue, green } from "@mui/material/colors";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import React, { useState, useEffect } from "react";
import {
  DEFAULT_COVER_IMAGE,
  IMAGE_PATHS,
  INBOX,
  ME,
  NETWORK,
  PAYLOAD_DEFAULT_TEXTS,
  PROFILE_AREAS,
  RATING,
  RECOMMENDATIONS,
  TITLES,
} from "../../../constants/userdata";
import ProfileStyle from "../../../styles/Profile.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  avatarToString,
  formattedName,
  formattedProfileSubtitle,
  _delay,
} from "../../../utils/utility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import StarRateIcon from "@mui/icons-material/StarRate";
import Actions from "./ActionableItems/Actions";
import { handleResponse } from "../../../toastr-response-handler/handler";
import { RESPONSE_TYPES } from "../../../constants/constants";
import { toast } from "react-toastify";
import {
  PEOPLE,
  PROFILE_PHOTO_UPDATE_FAILED,
} from "../../../constants/error-messages";
import { getWorkflowError } from "../../../error-handler/handler";
import ConnectionService from "../../../pages/api/people/network/ConnectionService";
import { ClipLoader } from "react-spinners";
import DoneIcon from "@mui/icons-material/Done";
import ProfileStats from "./Connection/ProfileStats";
import Spacer from "../../shared/Spacer";
import parse from "html-react-parser";
import About from "./Areas/About";
import SkillSets from "./Areas/SkillSets";
import WorkExperience from "./Areas/WorkExperience";
import Interests from "./Areas/Interests";
import RecommendationsFeed from "./Areas/RecommendationsFeed";
import { redirectToURI } from "../Shared/Navigator";
import { WORKFLOW_CODES } from "../../../constants/workflow-codes";
import Education from "./Areas/Education";
import RecommendedSessions from "./Areas/RecommendedSessions";
import Sessions from "./Areas/Sessions";
import SessionService from "../../../pages/api/session/SessionService";
import UserDataService from "../../../pages/api/users/data/UserDataService";
import { ENDPOINTS } from "../../../async/endpoints";
import MacroProfileShimmer from "./Shimmer/MacroProfileShimmer";
import ChangeProfilePicture from "./ActionableItems/ChangeProfilePicture";

import ChangeProfilePictureDialog from "../../shared/modals/ChangeProfilePictureModal";
import MessagingService from "../../../pages/api/people/Messaging/MessageService";
import PolyMessagingDialog from "../../shared/modals/PolyMessagingDialog";
import UserRatingDialog from "../../shared/modals/UserRatingDialog";
toast.configure();
function MacroProfile(props) {
  const [selectedpicture, setSelectedPictureEvent] = useState(null);
  const [openProfilePictureModal, setProfilePictureModal] = useState(false);
  const [showChangeAvatarOption, setShowChangeAvatarOption] = useState(false);
  const [lazySessionData, setLazySessionData] = useState(null);
  const [show, setShow] = useState(false);
  const [
    isConnectionAcceptRequestInProgress,
    setConnectionAcceptRequestInProgress,
  ] = useState(false);
  const [isConnectionAcceptRequestSent, setConnectionAcceptRequestSent] =
    useState(false);

  const [isConnectionRequestInProgress, setConnectionRequestInProgress] =
    useState(false);
  const [isConnectionRequestSent, setConnectionRequestSent] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const _messageEvent = {
    from: null,
    to: null,
    subject: null,
    message: null,
    dialogOpen: false,
    event: null,
  };
  const [messageEvent, setMessageEvent] = useState(_messageEvent);
  const _ratingEvent = {
    from: null,
    to: null,
    rating:null,
    dialogOpen: false,
    event: null,
  };
  const [ratingEvent, setRatingEvent] = useState(_ratingEvent);
  const [userRated, setUserRated] = useState(false);
  useEffect(() => {
    if (props?.hasChangeEventTriggered) {
      setShow(true);
      return;
    }
    _delay(1000).then(() => {
      setShow(true);
    });
    return () => {
      setShow(false);
      setProfilePic(null);
    };
  }, []);

  
  const isItMe = props?.data?.owner;
  const isConnected =
    isItMe === false &&
    props?.data?.userdata?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK;
  const isPending =
    isItMe === false &&
    props?.data?.userdata?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.AWAITING_RESPONSE;
  const canSendOutgoingConnectionInvite =
    isItMe === false &&
    props?.data?.userdata?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT;
  const canAcceptIncomingConnectionInvite =
    isItMe === false &&
    props?.data?.userdata?.invitationAction ===
      NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST;

  const userdata = props?.data?.userdata;
  const isRated= userdata.ratingAction===RATING.RATING_ALREADY_SENT?true:false
  const aboutMe = userdata?.aboutMe;
  const userSkillsets = userdata?.userSkillsets;
  const projectResearchWorkExperience = userdata?.projectResearchWorkExp;
  const interests = userdata?.myInterests;
  const recommendedSessions = userdata?.coursesIRecommend;
  const recommendations = userdata?.recommendationsReceived;
  const education = {
    highestLevel: userdata?.degreeCourse,
    pastEducation: userdata?.pastEducations,
  };
  const firstName = userdata?.firstName;
  const profileImage = userdata?.profilepicName;
  const profileName = formattedName(userdata?.firstName, userdata?.lastName);
  const userType = userdata?.userType;
  const starRating = Number(userdata?.noOfRatingStars);
  const hasRatings = starRating > 0;
  const metaData = {
    eduIns: userdata?.eduIns,
    location: userdata?.city,
    city: userdata?.city,
    country: userdata?.country,
    social_profiles: [
      {
        in: {
          url: userdata?.linkedInProfile,
          tooltip: `${isItMe ? "My" : firstName + "'s"} Linkedin`,
          icon: <LinkedInIcon />,
          display: isConnected || isItMe,
        },
      },
    ],
    invitationRequestId: userdata?.invitationRequestId,
  };
  const getTotalStatCount = () => {
    try {
      const count =
        Number(userdata?.noOfAlumniCOnnections) +
        Number(userdata?.noOfStudentConnections) +
        Number(userdata?.noOfProfessorConnections);
      if (isNaN(count)) {
        return 0;
      }
      return count;
    } catch (error) {
      return 0;
    }
  };
  const statCount = getTotalStatCount();

  const profileSecondaryLine = formattedProfileSubtitle(
    userType,
    metaData.eduIns
  );

  const profileTertiaryLine = formattedProfileSubtitle(
    metaData?.city,
    metaData?.country
  );

  useEffect(() => {
    if (props?.lazyAPI && userdata?.userDetailsId) {
      SessionService.getSessionsByUserID(userdata?.userDetailsId)
        .then((res) => {
          setLazySessionData(res.data?.courses);
        })
        .catch((err) => {
          setLazySessionData({ error: true });
          let endpoint = ENDPOINTS.USER.SESSION_BY_USER;
          endpoint = endpoint.replace("#X#", userdata?.userDetailsId);
        });
    }
    return () => setLazySessionData(null);
  }, [props?.lazyAPI]);
  const generateStarRatings = () => {
    const ratings = [];
    for (var i = 0; i < starRating; i++) {
      ratings.push(
        <div key={i}>
          <div className=" hidden lg:inline-block xl:inline-block">
            <StarRateIcon
              fontSize="large"
              className={`mt-1 ${ProfileStyle.profile__macro__review__star}`}
            />
          </div>
          <div className=" lg:hidden xl:hidden flex">
            <StarRateIcon
              fontSize="medium"
              className={`mt-1 ${ProfileStyle.profile__macro__review__star}`}
            />
          </div>
        </div>
      );
    }
    return <>{ratings}</>;
  };

  const acceptRequest = () => {
    setConnectionAcceptRequestInProgress(true);
    if (metaData.invitationRequestId) {
      const requestId = metaData.invitationRequestId;
      ConnectionService.acceptConnectionRequest(requestId)
        .then(() => {
          if (props.changeEvent) {
            props.changeEvent({
              trigger: "connection-status-change",
              changed: true,
            });
          }
          handleResponse(
            TITLES.CONNECTED_PEOPLE.replace("#X#", firstName),
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.TOP_LEFT
          );
          setConnectionAcceptRequestSent(true);
        })
        .catch(() => {
          handleResponse(
            getWorkflowError(
              PEOPLE.NETWORK.CONNECTION_ACCEPT_ERROR + " " + firstName
            ),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.TOP_LEFT
          );
          setConnectionAcceptRequestSent(false);
        })
        .finally(() => {
          setConnectionAcceptRequestInProgress(false);
        });
    } else {
      setConnectionAcceptRequestInProgress(false);
      handleResponse(
        TITLES.CONNECTED_PEOPLE_ALREADY.replace("#X#", firstName),
        RESPONSE_TYPES.INFO,
        toast.POSITION.TOP_RIGHT
      );
    }
  };

  const getPayload = () => {
    let payload = {
      requestFrom: {
        userDetailsId: props?.loggedInUserID,
      },
      requestTo: { userDetailsId: userdata?.userDetailsId },
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

  const addToNetwork = () => {
    setConnectionRequestInProgress(true);
    ConnectionService.sendConnectionRequest(
      getPayload(NETWORK.CONNECTION_RELATION_STATE.CONNECT)
    )
      .then(() => {
        if (props.changeEvent) {
          props.changeEvent({
            trigger: "connection-status-change",
            changed: true,
          });
        }
        handleResponse(
          `${TITLES.CONNECTION_REQUEST_SENT_TO}${firstName}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.TOP_RIGHT
        );
        setConnectionRequestSent(true);
      })
      .catch(() => {
        handleResponse(
          getWorkflowError(
            PEOPLE.NETWORK.CONNECTION_REQUEST_ERROR + " " + firstName
          ),
          RESPONSE_TYPES.ERROR,
          toast.POSITION.TOP_RIGHT
        );
        setConnectionRequestSent(false);
      })
      .finally(() => {
        setConnectionRequestInProgress(false);
      });
  };
  const getProfileAreaTitle = (area) => {
    let _area_title = area.title;
    _area_title = _area_title.replace("<#>", isItMe ? "me" : firstName);
    if (area.id === 7) {
      const numberOfSessions = lazySessionData?.length.toString() || "0";
      _area_title = _area_title + `(${numberOfSessions})`;
    }
    return parse(_area_title);
  };
  const handleEvent = (event, component) => {
    switch (component) {
      case "RecommendationsFeed":
      case "RecommendedSessions":
        if (
          event.triggerName === WORKFLOW_CODES.PEOPLE.PROFILE_VIEW &&
          event.id
        ) {
          if (Number(event.id) === userdata?.userDetailsId) return; // do nothing if same person
          redirectToURI(getProfileViewURI(event));
        } else {
          // generate a custom request failed error.
        }
        break;

      default:
        break;
    }
  };
  const getProfileViewURI = (event) => {
    let currentHref = window.location.href;
    currentHref = currentHref.substring(0, currentHref.lastIndexOf("/") + 1);
    return currentHref + event.id;
  };

  const showAvatarChangeOption = (event) => {
    setShowChangeAvatarOption(true);
  };
  const hideAvatarChangeOption = () => {
    setShowChangeAvatarOption(false);
  };
  const handleProfilePictureChange = (obj) => {
    if (obj) {
      if (!openProfilePictureModal) setProfilePictureModal(true);
      setSelectedPictureEvent(obj);
    }
  };
  const handleProfilePictureDialogClose = (obj) => {
    if (!obj.save) {
      setProfilePictureModal(false);
      setSelectedPictureEvent(null);
      return;
    }

    const image = selectedpicture?.target?.files[0];
    if (image) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(image);
    }
    const formData = new FormData();
    formData.append("profilepic", image);
    if (image && typeof image === "object") {
      UserDataService.uploadProfilePicture(formData)
        .then((res) => {
          if (res.data) {
            setProfilePic(res.data);
            setProfilePictureModal(false);
            setSelectedPictureEvent(null);
            handleResponse(
              TITLES.PROFILE_PHOTO_UPDATED,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
          }
        })
        .catch((err) => {
          console.log(err);
          setProfilePictureModal(false);
          setProfilePic(null);
          handleResponse(
            getWorkflowError(PROFILE_PHOTO_UPDATE_FAILED),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    } else {
      setProfilePic(null);
      setProfilePictureModal(false);
      handleResponse(
        getWorkflowError(PROFILE_PHOTO_UPDATE_FAILED),
        RESPONSE_TYPES.ERROR,
        toast.POSITION.BOTTOM_CENTER
      );
    }
  };

  const handleMessageEvent = (request) => {
    if (request) {
      const _messageEvent = {
        from: props?.loggedInUserID,
        to: userdata?.userDetailsId,
        subject: null,
        message: null,
        dialogOpen: true,
        event: request.event,
      };
      setMessageEvent(_messageEvent);
    }
  };

  const handleRatingEvent =(request)=>{
    if (request) {
      const _ratingEvent = {
        from: props?.loggedInUserID,
        to: userdata?.userDetailsId,
        rating: null,
        dialogOpen: true,
        event: request.event,
        
      };
      setRatingEvent(_ratingEvent);
    }
  }

  const handleMessageEventClosure = (request) => {
    if (request.close) {
      setMessageEvent(_messageEvent);
      return;
    }
    if (request.event === RECOMMENDATIONS.REQUEST_TYPE) {
      const payload = {
        requestTo: {
          userDetailsId: request.recommendation.to,
        },
        requestFrom: {
          userDetailsId: request.recommendation.from,
        },
        userRequestText: request.recommendation.subject,
        userRequestSubject: request.recommendation.message,
        userRequestType: RECOMMENDATIONS.REQUEST_TYPE,
      };

      MessagingService.sendRecommendationRequest(payload)
        .then((res) => {
          setMessageEvent(_messageEvent);
          handleResponse(
            `${RECOMMENDATIONS.REQUEST_SENT_TO}${firstName}`,
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .catch((err) => {
          setMessageEvent(_messageEvent);
          handleResponse(
            `${RECOMMENDATIONS.REQUEST_SENT_FAILED}${firstName}`,
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    }
    if(request.event===INBOX.REQUEST_TYPE){
      const payload={
        usersInTo: [
          request.message.to,
        ],
        messageSubject: request.message.subject,
        messageBody: request.message.message,
        senderUserId: request.message.from,
        htmlFormattedMessageBody: null,
        isMessageBodyHTMLFormatted: false,
        usersInCc: null
    }
    MessagingService.sendMessage(payload)
      .then((res) => {
        setMessageEvent(_messageEvent);
        handleResponse(
          `${INBOX.MESSAGE_SENT_TO}${firstName}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.BOTTOM_CENTER
        );
      })
      .catch((err) => {
        setMessageEvent(_messageEvent);
        handleResponse(
          `${INBOX.MESSAGE_SENT_FAILED}${firstName}`,
          RESPONSE_TYPES.ERROR,
          toast.POSITION.BOTTOM_CENTER
        );
      });
    
    }

  };
  const handleRatingEventClosure=(request)=>{
    if (request.close) {
      setRatingEvent(_ratingEvent);
      return;
    } 
     
    const payload= {
      responseTo: {
          userDetailsId: request.message.to
      },
      responseFrom: {
          userDetailsId: request.message.from
      },
      rating: {
          ratingText: request.message.rating
      },
      userResponseType: request.message.event
  }
  MessagingService.sendRating(payload)
  .then((res) => {
    setRatingEvent(_ratingEvent);
    handleResponse(
      `${RATING.RATING_SENT_TO}${firstName} as ${payload.rating.ratingText.toLowerCase()}`,
      RESPONSE_TYPES.SUCCESS,
      toast.POSITION.BOTTOM_CENTER
    );
    setUserRated(true)

  })
  .catch((err) => {
    setRatingEvent(_ratingEvent);
    setUserRated(false)
    handleResponse(
      `${RATING.RATING_FAILED}${firstName}`,
      RESPONSE_TYPES.ERROR,
      toast.POSITION.BOTTOM_CENTER
    );
  });
  }

  return (
    <>
      {!show ? (
        <>
          <MacroProfileShimmer visible />
        </>
      ) : (
        <>
          {/* SECTION 1 Profile Name, Image, Cover Picture and Secondary Information */}
          <div
            className={`Profile-Name-Image-Cover-Picture-Secondary-Information-Connection-Status-social-profile-reference-Star-Rating actionable-items-on-connected-state schedule-calendar Connection stats uvsity__card  uvsity__card__border__theme ${ProfileStyle.profile__macro}`}
          >
            {/* COVER IMAGE */}
            <div className="lg:hidden xl:hidden flex ">
              <img
                className={`${
                  !isConnected ? "-mb-12" : "  -mb-12"
                } w-screen h-28 lg:h-52 xl:h-52 md:h-48 `}
                src={DEFAULT_COVER_IMAGE}
                alt="profile-cover-image"
              />
            </div>

            <div className="hidden lg:inline-block xl:inline-block">
              <img
                className={`${
                  !isConnected ? "-mb-28" : "  -mb-28"
                } w-screen h-28 lg:h-52 xl:h-52 md:h-48 `}
                src={DEFAULT_COVER_IMAGE}
                alt="profile-cover-image"
              />
            </div>

            {/* AVATAR */}
            <div className="flex">
              {profileImage &&
              !profileImage.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
                <div
                  onMouseLeave={hideAvatarChangeOption}
                  onMouseEnter={showAvatarChangeOption}
                >
                  {/* AVATAR SAMPLE 1 */}
                  <div className=" hidden lg:inline-block xl:inline-block">
                    {isItMe && showChangeAvatarOption && (
                      <ChangeProfilePicture
                        consumeEvent={handleProfilePictureChange}
                        large
                      />
                    )}

                    <Avatar
                      alt={`${firstName}'s photo`}
                      className={` avatar-lg cursor-pointer  ml-3 opacity-100 ${ProfileStyle.profile__macro__avatar}`}
                      src={profilePic || profileImage}
                    />
                  </div>
                  {/* AVATAR SAMPLE 2 */}
                  <div className=" lg:hidden xl:hidden inline-block">
                    {isItMe && showChangeAvatarOption && (
                      <ChangeProfilePicture
                        consumeEvent={handleProfilePictureChange}
                      />
                    )}
                    <Avatar
                      alt={`${firstName}'s photo`}
                      className={`avatar-md  cursor-pointer  ml-3 opacity-100 ${ProfileStyle.profile__macro__avatar}`}
                      src={profilePic || profileImage}
                    />
                  </div>
                </div>
              ) : (
                <div
                  onMouseLeave={hideAvatarChangeOption}
                  onMouseEnter={showAvatarChangeOption}
                >
                  {/* AVATAR SAMPLE 3 */}
                  <div className=" hidden lg:inline-block xl:inline-block">
                    {isItMe && showChangeAvatarOption && (
                      <ChangeProfilePicture
                        consumeEvent={handleProfilePictureChange}
                        large
                      />
                    )}

                    <Avatar
                      alt={`${firstName}'s photo`}
                      className={` hidden lg:block xl:block avatar-lg   ml-3 opacity-100 ${ProfileStyle.profile__macro__avatar}`}
                      {...avatarToString(`${profileName}`)}
                    ></Avatar>
                  </div>
                  {/* AVATAR SAMPLE 4 */}
                  <div className="lg:hidden xl:hidden inline-block">
                    {isItMe && showChangeAvatarOption && (
                      <ChangeProfilePicture
                        consumeEvent={handleProfilePictureChange}
                      />
                    )}
                    <Avatar
                      alt={`${firstName}'s photo`}
                      className={` hidden lg:block xl:block  avatar-md  ml-3 opacity-100 ${ProfileStyle.profile__macro__avatar}`}
                      {...avatarToString(`${profileName}`)}
                    />
                  </div>
                </div>
              )}
              {/* INTER-USER COMMUNICATIVE ACTIONS */}
              <div className="ml-auto mr-0">
                <div className="mt-12 xl:mt-32 lg:mt-32">
                  {isConnected && (
                    <Actions
                      messageEvent={handleMessageEvent}
                      ratingEvent={handleRatingEvent}
                      isRated={isRated || userRated}
                      userdata={userdata}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={`  ml-3`}>
              {/* NAME(PRIMARY, SECONDARY, TERTIARY LINES) & STAR RATING */}
              <div className="flex">
                <div className="flex gap-1">
                  <div className="mb-2 hidden lg:inline-block xl:inline-block">
                    <Typography
                      className={`${ProfileStyle.profile__macro__profile__name} mb-1 leading-snug line-clamp-1`}
                      variant="h3"
                      gutterBottom
                    >
                      {profileName} {isItMe ? ME : <></>}
                    </Typography>
                  </div>

                  <div className="mb-2 lg:hidden xl:hidden inline-block">
                    <Typography
                      className={`${ProfileStyle.profile__macro__profile__name} mb-1 leading-snug line-clamp-1`}
                      variant="h5"
                      gutterBottom
                    >
                      {profileName} {isItMe ? ME : <></>}
                    </Typography>
                  </div>

                  {hasRatings && <>{generateStarRatings()}</>}
                </div>

                <div className="mr-2 ml-auto flex flex-col gap-1">
                  <div className="flex ml-auto">
                    <div className=" connection-status">
                      {isPending && (
                        <>
                          <div
                            className={`flex cursor-pointer non-actionable  slow-transition`}
                          >
                            <Tooltip
                              title={`${
                                TITLES.CONNECTION_REQUEST_PENDING + firstName
                              }`}
                            >
                              <IconButton
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
                            </Tooltip>
                          </div>
                        </>
                      )}

                      {isConnected && (
                        <div
                          className={`flex non-actionable cursor-pointer  slow-transition`}
                        >
                          <Tooltip
                            title={`${TITLES.CONNECTED_PEOPLE_LATENT.replace(
                              "#X#",
                              firstName
                            )}`}
                          >
                            <IconButton
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
                          </Tooltip>
                        </div>
                      )}

                      {canSendOutgoingConnectionInvite && (
                        <div
                          className={`flex actionable cursor-pointer  slow-transition`}
                        >
                          {!isConnectionRequestInProgress &&
                            !isConnectionRequestSent && (
                              <>
                                <Tooltip title={`Connect with ${firstName}`}>
                                  <IconButton
                                    className=" cursor-pointer inline-flex text-green-700 "
                                    fontSize="small"
                                    aria-label="connect or invite"
                                    onClick={addToNetwork}
                                  >
                                    <PersonAddAltIcon
                                      sx={{ color: blue[500] }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          {isConnectionRequestInProgress ? (
                            <>
                              <ClipLoader color={`darkgrey`} size={20} />
                            </>
                          ) : isConnectionRequestSent ? (
                            <>
                              <div className="flex">
                                <DoneIcon fontSize="small" />
                                <small className={`text-sm mt-0.5 font-small`}>
                                  {TITLES.CONNECTION_REQUEST_SENT}
                                </small>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}

                      {canAcceptIncomingConnectionInvite && (
                        <div
                          className={`flex actionable ${
                            isConnectionAcceptRequestInProgress
                              ? ""
                              : "cursor-pointer"
                          }   slow-transition`}
                        >
                          {!isConnectionAcceptRequestInProgress &&
                            !isConnectionAcceptRequestSent && (
                              <>
                                <Tooltip
                                  title={`Accept connection request from ${firstName}`}
                                >
                                  <IconButton
                                    onClick={acceptRequest}
                                    className=" cursor-pointer inline-flex text-green-700 "
                                    fontSize="small"
                                    aria-label="accept invite"
                                  >
                                    <AddTaskIcon sx={{ color: green[500] }} />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          {isConnectionAcceptRequestInProgress ? (
                            <>
                              <ClipLoader color={`darkgrey`} size={20} />
                            </>
                          ) : isConnectionAcceptRequestSent ? (
                            <>
                              <Tooltip
                                title={`${TITLES.CONNECTED_PEOPLE.replace(
                                  "#X#",
                                  firstName
                                )}`}
                              >
                                <div className="flex">
                                  <CheckCircleIcon
                                    sx={{
                                      color: NETWORK.COLOR_VARIANTS.CONNECTED,
                                    }}
                                    fontSize="small"
                                  />
                                  <small
                                    className={`mt-0.5 text-sm font-small text-green-700`}
                                  >
                                    {NETWORK.CONNECTION_ACTION_STATUS.CONNECTED}
                                  </small>
                                </div>
                              </Tooltip>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>
                    {metaData?.social_profiles && (
                      <>
                        <div className="social-handles">
                          {metaData?.social_profiles?.map((profile, index) => (
                            <div
                              key={index}
                              className={`${
                                profile.in.url && profile.in.display
                                  ? "mt-1"
                                  : ""
                              }`}
                            >
                              {profile.in.url && profile.in.display && (
                                <Tooltip title={profile.in.tooltip}>
                                  <a
                                    href={profile.in.url}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {profile.in.icon}
                                  </a>
                                </Tooltip>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`mb-2 -mt-2.5 ${ProfileStyle.profile__macro__secondary__information}`}
              >
                {profileSecondaryLine && (
                  <div className="flex gap-1">
                    <div className="text-sm md:text-md lg:text-lg xl:text-lg  text-gray-600 font-semibold leading-loose line-clamp-1">
                      <Typography variant="div">
                        <div className="flex gap-1">
                          <WorkIcon />
                          <div className="-mt-0.5 lg:-mt-1 xl:-mt-1">
                            {profileSecondaryLine}
                          </div>
                        </div>
                      </Typography>
                    </div>
                  </div>
                )}
                {profileTertiaryLine && (
                  <>
                    <div className="flex gap-1">
                      <div className="text-xs md:text-sm lg:text-md xl:text-md text-gray-500  font-normal leading-loose line-clamp-1">
                        <Typography variant="div">
                          <div className="flex gap-1">
                            <LocationOnIcon className="" fontSize="small" />
                            <div className="ml-1 -mt-0.5 lg:-mt-1 xl:-mt-1">
                              {profileTertiaryLine}
                            </div>
                          </div>
                        </Typography>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* SECTION 1.1 Connection stats(SMALL OR EXTRA SMALL SCREENS) */}
            {statCount > 0 && (
              <>
                <div className="Connection stats mb-2 px-2 inline-flex">
                  <ProfileStats userdata={userdata} />
                </div>
              </>
            )}
          </div>

          {/* SECTION 2 - consists of 8 sections, refer userdata.PROFILE_AREAS*/}
          <Spacer count={2} />
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {PROFILE_AREAS.filter((hidden) => hidden !== true).map((area) => (
                <React.Fragment key={area.id}>
                  <Grid item xs={12} lg={12} md={12} sm={12}>
                    <Paper elevation={1}>
                      <div className="profile__section__wrapper mb-1 py-2">
                        <Container className="profile__section__container">
                          <div className="flex flex-column">
                            <div className="flex gap-1 mb-1">
                              <area.icon sx={{ color: area.color }} />
                              <div className="line-clamp-1 text-gray-700 font-normal">
                                <Typography variant="div">
                                  {getProfileAreaTitle(area)}
                                </Typography>
                              </div>
                            </div>
                            <Divider />
                            <Spacer />
                            <div className="mb-1">
                              {area.id === 1 && (
                                <>
                                  <About owner={isItMe} aboutMe={aboutMe} />
                                </>
                              )}

                              {area.id === 2 && (
                                <>
                                  <SkillSets
                                    owner={isItMe}
                                    skillSetOwnerFirstName={firstName}
                                    userSkillsets={userSkillsets}
                                  />
                                </>
                              )}

                              {area.id === 3 && (
                                <>
                                  <WorkExperience
                                    owner={isItMe}
                                    experiences={projectResearchWorkExperience}
                                  />
                                </>
                              )}

                              {area.id === 4 && (
                                <>
                                  <RecommendedSessions
                                    consumeEvent={handleEvent}
                                    owner={isItMe}
                                    sessions={recommendedSessions}
                                  />
                                </>
                              )}

                              {area.id === 5 && (
                                <>
                                  <Interests
                                    owner={isItMe}
                                    interests={interests}
                                  />
                                </>
                              )}

                              {area.id === 6 && (
                                <>
                                  <RecommendationsFeed
                                    owner={isItMe}
                                    recommendations={recommendations}
                                    consumeEvent={handleEvent}
                                  />
                                </>
                              )}

                              {area.id === 7 && (
                                <>
                                  <Sessions
                                    sessions={lazySessionData}
                                    owner={isItMe}
                                    creator={firstName}
                                    consumeEvent={handleEvent}
                                  />
                                </>
                              )}

                              {area.id === 8 && (
                                <>
                                  <Education
                                    education={education}
                                    owner={isItMe}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </Container>
                      </div>
                    </Paper>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </>
      )}

      <ChangeProfilePictureDialog
        data={selectedpicture}
        dialogCloseRequest={handleProfilePictureDialogClose}
        theme
        isOpen={openProfilePictureModal}
        consumeEvent={handleProfilePictureChange}
      />
      <PolyMessagingDialog
        workflow={
          messageEvent.event === RECOMMENDATIONS.REQUEST_TYPE
            ? WORKFLOW_CODES.MESSAGING.RECOMMENDATIONS.SEND_RECOMMENDATION
            : WORKFLOW_CODES.MESSAGING.INBOX.SEND_MESSAGE
        }
        title={`${firstName}`}
        dialogCloseRequest={handleMessageEventClosure}
        data={messageEvent}
        isOpen={messageEvent.dialogOpen}
      ></PolyMessagingDialog>

      <UserRatingDialog
        title={`${firstName}`}
        dialogCloseRequest={handleRatingEventClosure}
        data={ratingEvent}
        isOpen={ratingEvent.dialogOpen}
      ></UserRatingDialog>
    </>
  );
}

export default MacroProfile;

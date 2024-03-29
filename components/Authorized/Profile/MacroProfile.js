/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { blue, green, purple } from "@mui/material/colors";
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
  SESSION_REQUEST,
  TITLES,
  USER_PROFILE,
} from "../../../constants/userdata";
import ProfileStyle from "../../../styles/Profile.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  avatarToString,
  formattedName,
  formattedProfileSubtitle,
  getTimezone,
  isUvsityLogicalError,
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
import ProfileStats from "./Connection/StatsForUserProfile";
import Spacer from "../../shared/Spacer";
import parse from "html-react-parser";
import About from "./Areas/About";
import SkillSets from "./Areas/SkillSets";
import WorkExperience from "./Areas/WorkExperience";
import Interests from "./Areas/Interests";
import RecommendationsFeed from "./Areas/RecommendationsFeed";
import { openNewTab, redirectToURI } from "../Shared/Navigator";
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
import UserSessionRequestDialog from "../../shared/modals/UserSessionRequestDialog";
import ChangeAboutInformationDialog from "../../shared/modals/ChangeAboutInformationModal";
import ChangeProfileHeadlineDialog from "../../shared/modals/ChangeProfileHeadlineDialog";
import EditIcon from "@mui/icons-material/Edit";
import { getLocalStorageObject } from "../../../localStorage/local-storage";
import ChangeInterests from "../../shared/modals/ChangeInterests";
import ChangeSocialProfileURIDialog from "../../shared/modals/ChangeSocialProfileURIDialog";
import AddIcon from "@mui/icons-material/Add";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { actionTypes } from "../../../context/reducer";
import ChangeHighestEducationDegreeModal from "../../shared/modals/ChangeHighestEducationDegreeModal";
import DateRangeIcon from "@mui/icons-material/DateRange";
toast.configure();

function MacroProfile(props) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [selectedpicture, setSelectedPictureEvent] = useState(null);
  const [openProfilePictureModal, setProfilePictureModal] = useState(false);
  const [showChangeAvatarOption, setShowChangeAvatarOption] = useState(true);
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
    rating: null,
    dialogOpen: false,
    event: null,
  };
  const [ratingEvent, setRatingEvent] = useState(_ratingEvent);
  const [userRated, setUserRated] = useState(false);

  const _sessionRequest = {
    from: null,
    to: null,
    request: null,
    dialogOpen: false,
    event: null,
  };
  const [sessionRequest, setSessionRequest] = useState(_sessionRequest);

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

  const [isItMe, setIsitMe] = useState(props?.data?.owner);
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

  const [userdata, setUserData] = useState(props?.data?.userdata);
  const [additionalUserData, setAdditionalUserData] = useState(props?.data?.additionalUserData);

  const isRated =
    userdata.ratingAction === RATING.RATING_ALREADY_SENT ? true : false;
  const aboutMe = userdata?.aboutMe;

  const _aboutInfo = {
    dialogOpen: false,
    aboutMe,
  };
  const [aboutInfo, setAboutInfo] = useState(_aboutInfo);
  const [userSkillsets, setUserSkillSets] = useState(userdata?.userSkillsets);
  const [projectResearchWorkExperience, setProjectResearchWorkExperience] = useState(additionalUserData?.workExperience?.data??additionalUserData?.workExperience);
  const interests = userdata?.myInterests;
  const _interests = {
    dialogOpen: false,
    interests,
  };
  const [interestData, setInterestData] = useState(_interests);
  const [recommendedSessions, setRecommendedSessions] = useState(
    userdata?.coursesIRecommend
  );
  const [userAcceptedRecommendations, setUserAcceptedRecommendations] =useState(additionalUserData?.recommendations?.data??null)
  const [recommendations, setRecommendations] = useState(userdata?.recommendationsReceived);
  const [education, setEducation] = useState({
    highestLevel: userdata?.degreeCourse,
    pastEducation: additionalUserData?.pastEducation?.data??additionalUserData.pastEducation,
  });
   
    
  const _education = {
    dialogOpen: false,
    education,
  };

  const [educationData, setEducationData] = useState(_education);

  const firstName = userdata?.firstName;
  const profileImage = userdata?.profilepicName;
  const profileName = formattedName(userdata?.firstName, userdata?.lastName);
  let userType = userdata?.userType;
  const starRating = Number(userdata?.noOfRatingStars);
  const hasRatings = starRating > 0;
  const metaData = {
    eduIns: userdata?.eduIns,
    location: userdata?.city,
    city: userdata?.city,
    country: userdata?.country,
    social_profiles: [
      {
        id: 1,
        url: userdata?.linkedInProfile,
        tooltip: `${isItMe === true ? "My" : firstName + "'s"} Linkedin`,
        icon: <LinkedInIcon />,
        alias: "linkedin",
        display: isConnected,
        editDialogOpened: false,
      },
    ],
    invitationRequestId: userdata?.invitationRequestId,
  };

  const [socialProfiles, setSocialProfiles] = useState(
    metaData.social_profiles
  );

  const [selectedSocialProfile, setSelectedSocialProfile] = useState(null);

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

  const _profileHighlight = {
    hasData: false,
    dialogOpen: false,
    designation: null,
    institution: null,
    city: null,
    country: null,
    social: null,
    education: null,
    specialization: null,
  };
  const [profileHighlight, setProfileHighlight] = useState(_profileHighlight);

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
      case "WorkExperience":
        setProjectResearchWorkExperience(event.data)
        
        break
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
      case "SessionRequest":
        const _request = event;
        _request.event = WORKFLOW_CODES.MESSAGING.SESSION_REQUEST.CREATE;
        const _sessionRequest = {
          from: props?.loggedInUserID,
          to: userdata?.userDetailsId,
          request: _request,
          dialogOpen: true,
          event: _request.event,
        };

        setSessionRequest(_sessionRequest);
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
            let context = ctxUserdata;
            if (context.userdata.profilePicName)
              context.userdata.profilePicName = res.data;
            dispatch({
              type: actionTypes.SET_USERDATA,
              userdata: context,
            });
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

  const handleRatingEvent = (request) => {
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
  };

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
    if (request.event === INBOX.REQUEST_TYPE) {
      const payload = {
        usersInTo: [request.message.to],
        messageSubject: request.message.subject,
        messageBody: request.message.message,
        senderUserId: request.message.from,
        htmlFormattedMessageBody: null,
        isMessageBodyHTMLFormatted: false,
        usersInCc: null,
      };
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
  const handleRatingEventClosure = (request) => {
    if (request.close) {
      setRatingEvent(_ratingEvent);
      return;
    }

    const payload = {
      responseTo: {
        userDetailsId: request.message.to,
      },
      responseFrom: {
        userDetailsId: request.message.from,
      },
      rating: {
        ratingText: request.message.rating,
      },
      userResponseType: request.message.event,
    };
    MessagingService.sendRating(payload)
      .then((res) => {
        setRatingEvent(_ratingEvent);
        handleResponse(
          `${
            RATING.RATING_SENT_TO
          }${firstName} as ${payload.rating.ratingText.toLowerCase()}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.BOTTOM_CENTER
        );
        setUserRated(true);
      })
      .catch((err) => {
        setRatingEvent(_ratingEvent);
        setUserRated(false);
        handleResponse(
          `${RATING.RATING_FAILED}${firstName}`,
          RESPONSE_TYPES.ERROR,
          toast.POSITION.BOTTOM_CENTER
        );
      });
  };
  const handleUserSessionRequestClosure = (request) => {
    if (request.close) {
      setSessionRequest(_sessionRequest);
      return;
    }

    const payload = {
      requestTo: {
        userDetailsId: request.message.to,
      },
      requestFrom: {
        userDetailsId: request.message.from,
      },
      skillSet: {
        skillSetId: request.message.request.skillSetId,
      },
      userRequestType: request.message.event,
    };

    MessagingService.sendSessionRequest(payload)
      .then((res) => {
        let message = SESSION_REQUEST.MESSAGE_SENT_TO;
        message = message.replace(
          "<#X#>",
          request.message.request?.userSkillSetName
        );
        message = message.replace("<#Y#>", firstName);
        setSessionRequest(_sessionRequest);
        handleResponse(
          `${message}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.BOTTOM_CENTER
        );
      })
      .catch((err) => {
        const error = JSON.parse(
          getLocalStorageObject("uvsity-internal-error-response")
        );
        handleResponse(
          isUvsityLogicalError(error)
            ? getWorkflowError(error)
            : `${SESSION_REQUEST.MESSAGE_SENT_FAILED}${firstName}`,
          RESPONSE_TYPES.ERROR,
          toast.POSITION.BOTTOM_CENTER
        );
        setSessionRequest(_sessionRequest);
      });
  };

  const handleProfileUpdateEvent = (obj) => {
    if (obj && obj.id == 0) {
      if (obj.event === "edit") {
        const updateObj = {
          isPresent: true,
          timeZone: getTimezone(),
          userEducation: {
            userEducationEducationInstitution: obj.data.organization,
          },
          userSubType: { userSubTypeMaster: obj.data.designation },
          userAddresses: [
            {
              countryTO: { countryId: obj.data.countryId },
              city: obj.data.city,
            },
          ],
        };
        UserDataService.editUserHeadline(updateObj)
          .then((res) => {
            const _profileHighlight = {
              hasData: true,
              dialogOpen: false,
              designation: obj.data.designation,
              institution: obj.data.organization,
              city: obj.data.city,
              country: obj.data.country,
              social: socialProfiles,
              education,
              specialization: userdata?.subject,
            };

            metaData.eduIns = _profileHighlight.institution;
            metaData.city = _profileHighlight.city;
            metaData.country = _profileHighlight.country;
            userType = _profileHighlight.designation;
            setProfileHighlight(_profileHighlight);
            handleResponse(
              `${USER_PROFILE.HEADLINE_UPDATED}`,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
          })
          .catch(() => {
            const _profileHighlight = {
              hasData: false,
              dialogOpen: false,
              designation: userType,
              institution: metaData?.eduIns,
              city: metaData?.city,
              country: metaData?.country,
              social: socialProfiles,
              education,
              specialization: userdata?.subject,
            };
            setProfileHighlight(_profileHighlight);
            handleResponse(
              `${USER_PROFILE.HEADLINE_UPDATE_FAILED}`,
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
          });
        return;
      }
      const _profileHighlight = {
        dialogOpen: false,
        designation: profileHighlight.designation
          ? profileHighlight.designation
          : userType,
        institution: profileHighlight.institution
          ? profileHighlight.institution
          : metaData?.eduIns,
        city: profileHighlight.city ? profileHighlight.city : metaData?.city,
        country: profileHighlight.country
          ? profileHighlight.country
          : metaData?.country,
        social: socialProfiles,
        education,
        specialization: userdata?.subject,
      };
      setProfileHighlight(_profileHighlight);
    }
    if (obj && obj.id == 1) {
      if (obj.event === "init_edit") {
        const _aboutInfo = {
          dialogOpen: true,
          aboutMe: aboutInfo.aboutMe,
        };
        setAboutInfo(_aboutInfo);
        return;
      }
      if (obj.event === "edit") {
        UserDataService.editUserBio({ aboutMe: obj.edits })
          .then((res) => {
            handleResponse(
              `${USER_PROFILE.BIO_UPDATED}`,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
            _aboutInfo.aboutMe = obj.edits;
            setAboutInfo(_aboutInfo);
          })
          .catch((err) => {
            setAboutInfo(_aboutInfo);
            handleResponse(
              `${USER_PROFILE.BIO_UPDATE_FAILED}`,
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
          });
        return;
      }
      const __aboutInfo = {
        dialogOpen: false,
        aboutMe: aboutInfo.aboutMe,
      };
      setAboutInfo(__aboutInfo);
    }
    if (obj && obj.id == 5) {
      if (obj.event === "init_edit") {
        const _interests = {
          dialogOpen: true,
          interests: interestData.interests,
        };
        setInterestData(_interests);
        return;
      }
      if (obj.event === "edit") {
        UserDataService.editInterests({ myInterests: obj.interest })
          .then((res) => {
            const _interests = {
              dialogOpen: false,
              interests: obj.interest,
            };
            setInterestData(_interests);
            handleResponse(
              `${USER_PROFILE.INTEREST_UPDATED}`,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
          })
          .catch((err) => {
            const _interests = {
              dialogOpen: false,
              interests: interestData.interests,
            };
            setInterestData(_interests);
            handleResponse(
              `${USER_PROFILE.INTEREST_UPDATE_FAILED}`,
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
          });
        return;
      }
      const _interests = {
        dialogOpen: false,
        interests: interestData.interests,
      };
      setInterestData(_interests);
    }

    if (obj && obj.id == 8) {
      if (obj.event === "init_edit") {
        const _education = {
          dialogOpen: true,
          education: educationData.education,
        };
        setEducationData(_education);
        return;
      }

      if (obj.event === "edit") {
        UserDataService.editHighestEducationDegree({
          userEducationDegreeCourse: obj.highestLevel,
        })
          .then((res) => {
           
            const modifiedEducationData = {
              highestLevel: obj?.highestLevel,
              pastEducation: obj?.pastEducation,
            };
            const _education = {
              dialogOpen: false,
              education: modifiedEducationData,
            };
            setEducation(modifiedEducationData);
            setEducationData(_education);
            handleResponse(
              `${USER_PROFILE.HIGHEST_DEGREE_UPDATED}`,
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.BOTTOM_CENTER
            );
          })
          .catch((err) => {
            const _education = {
              dialogOpen: false,
              education: educationData.education,
            };
            setEducationData(_education);
            handleResponse(
              `${USER_PROFILE.HIGHEST_DEGREE_UPDATE_FAILED}`,
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
          });
        return;
      }
      if (obj.event === "past_education_edit_done") {
         
        const modifiedEducationData = {
          highestLevel: obj?.highestLevel,
          pastEducation: obj?.pastEducation,
        };
        const _education = {
          dialogOpen: false,
          education: modifiedEducationData,
        };
        
        setEducation(modifiedEducationData);
        setEducationData(_education);
        return;
      }
      const _education = {
        dialogOpen: false,
        education: educationData.education,
      };
      setEducationData(_education);

      return;
    }

    if (obj && obj.id === 600) {
      // social profile update.
      const _social_profiles = socialProfiles.slice();
      if (obj.event === "edit") {
        const incomingUpdatedRequestUrl = obj.url.trim();
        if (!incomingUpdatedRequestUrl) {
          handleResponse(
            `${USER_PROFILE.LINKEDIN_PROFILE_URL_MISSING}`,
            RESPONSE_TYPES.WARNING,
            toast.POSITION.BOTTOM_CENTER
          );
          return;
        }
        let isQualifiedForSocialProfileUpdate = false;
        _social_profiles.map((profile) => {
          if (profile.id === obj.selectedId) {
            isQualifiedForSocialProfileUpdate = true;
          }
        });
        if (isQualifiedForSocialProfileUpdate) {
          if (obj.alias === "linkedin") {
            // Call linked in update service
            UserDataService.editLinkedInProfile({ linkedInProfile: obj.url })
              .then((response) => {
                _social_profiles.map((profile) => {
                  if (profile.id === obj.selectedId) {
                    profile.editDialogOpened = false;
                    profile.url = obj.url;
                    setSelectedSocialProfile(profile);
                  }
                });
                setSocialProfiles(_social_profiles);

                handleResponse(
                  `${USER_PROFILE.LINKEDIN_PROFILE_UPDATED}`,
                  RESPONSE_TYPES.SUCCESS,
                  toast.POSITION.BOTTOM_CENTER
                );
              })
              .catch((error) => {
                _social_profiles.map((profile) => {
                  if (profile.id === obj.selectedId) {
                    profile.editDialogOpened = false;
                    setSelectedSocialProfile(profile);
                  }
                });
                setSocialProfiles(_social_profiles);
                handleResponse(
                  `${USER_PROFILE.LINKEDIN_PROFILE_UPDATE_FAILED}`,
                  RESPONSE_TYPES.ERROR,
                  toast.POSITION.BOTTOM_CENTER
                );
              });
            return;
          }
        }
        return;
      }
      _social_profiles.map((profile) => {
        if (profile.id === obj.selectedId) {
          profile.editDialogOpened = false;
          setSelectedSocialProfile(profile);
        }
      });
      setSocialProfiles(_social_profiles);
    }
  };

  const handleEditHeadline = () => {
    const _profileHighlight = {
      hasData: false,
      dialogOpen: true,
      designation: profileHighlight.designation
        ? profileHighlight.designation
        : userType,
      institution: profileHighlight.institution
        ? profileHighlight.institution
        : metaData?.eduIns,
      city: profileHighlight.city ? profileHighlight.city : metaData?.city,
      country: profileHighlight.country
        ? profileHighlight.country
        : metaData?.country,
      social: socialProfiles,
      education,
      specialization: userdata?.subject,
    };
    setProfileHighlight(_profileHighlight);
  };
  const getSecondaryLine = () => {
    if (
      profileHighlight.hasData ||
      (profileHighlight.designation && profileHighlight.institution)
    )
      return formattedProfileSubtitle(
        profileHighlight.designation,
        profileHighlight.institution
      );

    return profileSecondaryLine;
  };
  const getTertiaryLine = () => {
    if (
      profileHighlight.hasData ||
      (profileHighlight.city && profileHighlight.country)
    )
      return formattedProfileSubtitle(
        profileHighlight.city,
        profileHighlight.country
      );

    return profileTertiaryLine;
  };

  useEffect(() => {
    const aboutMe = props?.data?.userdata?.aboutMe;
    const _aboutInfo = {
      dialogOpen: false,
      aboutMe,
    };
    const interests = props?.data?.userdata?.myInterests;
    const _interests = {
      dialogOpen: false,
      interests,
    };
    setRecommendedSessions(props?.data?.userdata?.coursesIRecommend);
    setInterestData(_interests);
    setAboutInfo(_aboutInfo);
    setUserSkillSets(props?.data?.userdata?.userSkillsets);
    setIsitMe(props?.data?.owner);
    const _social_profiles = socialProfiles.slice();
    let isQualifiedForSocialProfileUpdate = false;
    _social_profiles.map((profile) => {
      if (profile.alias === "linkedin") {
        isQualifiedForSocialProfileUpdate = true;
        profile.url = selectedSocialProfile?.url
          ? selectedSocialProfile.url
          : props?.data?.userdata?.linkedInProfile;
        profile.tooltip = `${
          isItMe === true ? "My" : firstName + "'s"
        } Linkedin`;
      }
    });
    if (isQualifiedForSocialProfileUpdate) setSocialProfiles(_social_profiles);
    return () => {
      setAboutInfo(null);
      setInterestData(null);
      setUserSkillSets([]);
      setRecommendedSessions([]);
      setSocialProfiles([]);
      setIsitMe(false);
    };
  }, [props?.data?.userdata, props?.data]);

  const handleSocialProfileUpdate = (_profile) => {
    const _social_profiles = socialProfiles.slice();
    let isProfileQualifiedForStateChange = false;
    _social_profiles.map((profile) => {
      if (profile.id === _profile.id) {
        profile.editDialogOpened = true;
        setSelectedSocialProfile(profile);
        isProfileQualifiedForStateChange = true;
      }
    });
    if (isProfileQualifiedForStateChange) setSocialProfiles(_social_profiles);
  };

  const handleOpenMyCalendar = () => {
    openNewTab(
      process.env.NEXT_PUBLIC_CALENDAR_APP_URL +
      "calendar-profile/home"
    );
  };

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
            <div className="lg:hidden xl:hidden flex relative ">
              <img
                className={`${
                  !isConnected ? "-mb-12" : "  -mb-12"
                } w-screen h-28 lg:h-52 xl:h-52 md:h-48 `}
                src={DEFAULT_COVER_IMAGE}
                alt="profile-cover-image"
              />
              {isItMe && (
                <Box> 
                <Tooltip title={`${USER_PROFILE.CHANGE_PROFILE_HEADLINE}`}>
                  <div className="absolute md:top-36 top-16 right-4">
                    <Button
                      onClick={handleEditHeadline}
                      variant="contained"
                      startIcon={<EditIcon />}
                    >
                      Edit Headline
                    </Button>
                  </div>
                </Tooltip>

                <Tooltip
            title={`My calendar`}
          >
                <div onClick={handleOpenMyCalendar} className="absolute md:top-32 top-12 mt-2 right-48">
          
            <IconButton aria-label="my-meeting-link" size="large">
              <DateRangeIcon sx={{ color: purple[500] }} fontSize="inherit" />
            </IconButton>
          
        </div>
        </Tooltip>
                </Box>
              )}
            </div>

            <div className="hidden lg:inline-block xl:inline-block relative">
              <img
                className={`${
                  !isConnected ? "-mb-28" : "  -mb-28"
                } w-screen h-28 lg:h-52 xl:h-52 md:h-48 `}
                src={DEFAULT_COVER_IMAGE}
                alt="profile-cover-image"
              />
              {isItMe && (
                <Box>

                <Tooltip title={`${USER_PROFILE.CHANGE_PROFILE_HEADLINE}`}>
                  <div className="absolute top-40 right-4">
                    <Button
                      onClick={handleEditHeadline}
                      variant="contained"
                      startIcon={<EditIcon />}
                    >
                      Edit Headline
                    </Button>
                  </div>
                </Tooltip>

                <Tooltip
            title={`My calendar`}
          >
                <div onClick={handleOpenMyCalendar} className="absolute top-36 mt-2.5 right-48">
          
            <IconButton aria-label="my-meeting-link" size="large">
              <DateRangeIcon sx={{ color: purple[500] }} fontSize="inherit" />
            </IconButton>
          
        </div>
        </Tooltip>

                </Box>
              )}
            </div>

            {/* AVATAR */}
            <div className="flex">
              {profileImage &&
              !profileImage.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
                <div>
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
                <div>
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
                      className={` avatar-lg cursor-pointer  ml-3 opacity-100 ${ProfileStyle.profile__macro__avatar}`}
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
                      className={` avatar-md  cursor-pointer  ml-3 opacity-100 ${ProfileStyle.profile__macro__avatar}`}
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
                                <small className={`font-small text-sm`}>
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
                              <small
                                className={`text-sm font-small md:hidden lg:inline xl:inline sm:inline xs:inline `}
                              >
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
                                    className={`mt-0.5   font-small text-green-700 text-sm`}
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
                    {socialProfiles && (
                      <>
                        <div className="social-handles">
                          {socialProfiles?.map((profile, index) => (
                            <div
                              key={index}
                              className={`${
                                profile.url && profile.display ? "mt-1" : ""
                              }`}
                            >
                              {profile.url && (profile.display || isItMe) && (
                                <>
                                  <Tooltip title={profile.tooltip}>
                                    <a
                                      href={profile.url}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {profile.icon}
                                    </a>
                                  </Tooltip>
                                </>
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
                            {getSecondaryLine()}
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
                              {getTertiaryLine()}
                            </div>
                          </div>
                        </Typography>
                      </div>
                    </div>
                  </>
                )}
                {isItMe && socialProfiles && (
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={2}
                      columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                    >
                      {socialProfiles.map((social_profile, idx) => (
                        <Grid key={idx} item xs={12} md={6} lg={6} sm={12}>
                          <div className="text-xs lg:text-md md:text-md sm:text-sm flex gap-2   font-normal leading-loose">
                            {social_profile.url && (
                              <div>
                                <a
                                  className="app__anchor__no__color text-gray-500"
                                  href={social_profile.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <div className="flex gap-1">
                                    <span>{social_profile.icon}</span>
                                    <span className="mt-0.5">
                                      {social_profile.url}
                                    </span>
                                  </div>
                                </a>
                              </div>
                            )}

                            <div
                              onClick={() =>
                                handleSocialProfileUpdate(social_profile)
                              }
                              className={`${
                                social_profile.url ? "ml-auto" : ""
                              } cursor-pointer`}
                            >
                              {social_profile.url ? (
                                <Tooltip
                                  title={`${USER_PROFILE.CHANGE_SOCIAL_URL}${social_profile.alias} profile url`}
                                >
                                  <EditIcon fontSize="small" />
                                </Tooltip>
                              ) : (
                                <div className=" dark: text-gray-600  text-gray-600  leading-loose flex gap-2">
                                  <AddIcon fontSize="small" />
                                  <Typography
                                    className="mt-0.5"
                                    variant="caption"
                                  >{`${USER_PROFILE.ADD_SOCIAL_URL}${social_profile.alias} profile`}</Typography>
                                </div>
                              )}
                            </div>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
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
                    <Paper
                      className=" dark:bg-gray-900 bg-white-100"
                      elevation={1}
                    >
                      <div className="profile__section__wrapper mb-1 py-2">
                        <Container className="profile__section__container">
                          <div className="flex flex-column">
                            <div className="flex gap-1 mb-1">
                              <area.icon sx={{ color: area.color }} />
                              <div className="line-clamp-1 dark:text-gray-100 text-gray-700 font-normal">
                                <Typography variant="div">
                                  {getProfileAreaTitle(area)}
                                </Typography>
                              </div>
                            </div>
                            <Divider />
                            <Spacer />
                            <div className=" ">
                              {area.id === 1 && (
                                <>
                                  <About
                                    consumeEvent={handleProfileUpdateEvent}
                                    owner={isItMe}
                                    aboutMe={aboutInfo.aboutMe}
                                  />
                                </>
                              )}

                              {area.id === 2 && (
                                <>
                                  <SkillSets
                                    owner={isItMe}
                                    skillSetOwnerFirstName={firstName}
                                    userSkillsets={userSkillsets}
                                    consumeEvent={handleEvent}
                                  />
                                </>
                              )}

                              {area.id === 3 && (
                                <>
                                  <WorkExperience
                                    consumeEvent={handleEvent}
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
                                    consumeEvent={handleProfileUpdateEvent}
                                    owner={isItMe}
                                    interests={interestData.interests}
                                  />
                                </>
                              )}

                              {area.id === 6 && (
                                <>
                                  <RecommendationsFeed
                                    owner={isItMe}
                                    recommendations={recommendations}
                                    userAcceptedRecommendations={userAcceptedRecommendations}
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
                                    consumeEvent={handleProfileUpdateEvent}
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

      <UserSessionRequestDialog
        theme
        title={`Send session request`}
        subtitle={`Request ${firstName} for a session on ${sessionRequest?.request?.userSkillSetName}`}
        dialogCloseRequest={handleUserSessionRequestClosure}
        data={sessionRequest}
        isOpen={sessionRequest.dialogOpen}
      ></UserSessionRequestDialog>

      <ChangeAboutInformationDialog
        title={`Edit bio`}
        theme
        dialogCloseRequest={handleProfileUpdateEvent}
        data={aboutInfo.aboutMe}
        isOpen={aboutInfo.dialogOpen}
      ></ChangeAboutInformationDialog>

      <ChangeInterests
        title={`Edit interests`}
        theme
        dialogCloseRequest={handleProfileUpdateEvent}
        data={interestData.interests}
        isOpen={interestData.dialogOpen}
      />

      <ChangeHighestEducationDegreeModal
        title={`Edit highest degree`}
        theme
        dialogCloseRequest={handleProfileUpdateEvent}
        data={educationData.education}
        isOpen={educationData.dialogOpen}
      />

      <ChangeProfileHeadlineDialog
        fullScreen
        title={`Edit profile headline`}
        dialogCloseRequest={handleProfileUpdateEvent}
        data={profileHighlight}
        isOpen={profileHighlight.dialogOpen}
      ></ChangeProfileHeadlineDialog>

      <ChangeSocialProfileURIDialog
        isOpen={selectedSocialProfile?.editDialogOpened}
        data={selectedSocialProfile}
        dialogCloseRequest={handleProfileUpdateEvent}
      ></ChangeSocialProfileURIDialog>
    </>
  );
}

export default MacroProfile;

import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ScienceIcon from "@mui/icons-material/Science";
import StarsIcon from "@mui/icons-material/Stars";
import SchoolIcon from "@mui/icons-material/School";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import InterestsIcon from "@mui/icons-material/Interests";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { WORKFLOW_CODES } from "./workflow-codes";
import { HTMLUnderlineByCharacterIndex, timeOfDay } from "../utils/utility";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoIcon from "@mui/icons-material/Info";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { RESPONSE_TYPES } from "./constants";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EjectOutlinedIcon from "@mui/icons-material/EjectOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PreviewIcon from "@mui/icons-material/Preview";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { AUTHORIZED_ROUTES } from "./routes";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import RsvpIcon from "@mui/icons-material/Rsvp";
import StarIcon from "@mui/icons-material/Star";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import {
  blue,
  green,
  red,
  purple,
  orange,
  pink,
  brown,
} from "@mui/material/colors";
import { getMode, THEME_MODES } from "../theme/ThemeProvider";
export const HEADER_OPTIONS = [
  {
    id: 1,
    title: "Home",
    tooltip: "Home",
    icon: HomeIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
    redirectTo: AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD,
  },
  {
    id: 2,
    title: "My Connections",
    tooltip: "View people in your network",
    icon: SupervisorAccountIcon,
    hasAvatar: false,
    avatar: null,
    hidden: true,
    name: null,
    redirectTo: null,
  },

  {
    id: 3,
    title: "Sessions",
    tooltip: "Browse Sessions",
    icon: EventNoteOutlinedIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
    redirectTo: null,
  },

  {
    id: 4,
    title: "Topics",
    tooltip: "Browse topics",
    icon: TopicOutlinedIcon,
    hasAvatar: false,
    avatar: null,
    hidden: true,
    name: null,
    redirectTo: null,
  },
  {
    id: 9,
    title: "Calendar",
    tooltip: "My Calendar",
    icon: CalendarTodayIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
    redirectTo: null,
  },

  {
    id: 5,
    title: "Sponsor",
    tooltip: "Sponsor a session or event",
    icon: AutoGraphOutlinedIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
    redirectTo: null,
  },

  {
    id: 6,
    title: "Messages",
    tooltip: "Go to mailbox",
    icon: MailOutlineIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
    redirectTo: null,
  },

  {
    id: 7,
    title: "Notifications",
    tooltip: "",
    icon: NotificationsIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
    redirectTo: null,
  },

  {
    id: 8,
    title: "me",
    tooltip: "Account Settings",
    icon: null,
    hasAvatar: true,
    avatar:
      "https://lh3.googleusercontent.com/a-/AOh14Gj4zE9yHsoBriErUebkmDlq2CUfcu30Ql72DiOaAdA=s96-c",
    hidden: false,
    name: "Swaroop Chakraborty",
    redirectTo: null,
  },
];

export const ACCOUNT_SETTINGS = [
  {
    id: 1,
    title: "Upgrade",
    code: WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.UPGRADE,
    tooltip: "Upgrade my account",
    icon: <UpgradeIcon />,
    hidden: false,
  },
  {
    id: 2,
    title: "My Earnings",
    code: WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.EARNING,
    tooltip: "View my earnings",
    icon: <MonetizationOnIcon />,
    hidden: false,
  },
  {
    id: 3,
    title: "My Account",
    code: WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.ACCOUNT,
    tooltip: "Account Profile",
    icon: <PersonIcon />,
    hidden: false,
  },
  {
    id: 4,
    title: "Sign out",
    code: WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.EXIT,
    tooltip: null,
    icon: <LogoutIcon />,
    hidden: false,
  },
];

export const CONNECTIONS = [
  {
    id: 1,
    title: "Students",
    hidden: false,
    tooltip: "Connections who are students",
    icon: "",
    code: WORKFLOW_CODES.USER.CONNECTION_TYPES.STUDENT,
  },
  {
    id: 2,
    title: "Professors",
    hidden: false,
    tooltip: "Connections who are professors",
    icon: "",
    code: WORKFLOW_CODES.USER.CONNECTION_TYPES.PROFESSOR,
  },
  {
    id: 3,
    title: "Alumni",
    hidden: false,
    tooltip: "Connections who are alumni",
    icon: "",
    code: WORKFLOW_CODES.USER.CONNECTION_TYPES.ALUMNI,
  },
];
export const INTRO_ACTIONS = [
  {
    id: 1,
    title: "Session",
    icon: <AddIcon />,
    hidden: false,
    disabled: false,
    tooltip: "Create a new session",
    code: WORKFLOW_CODES.USER.INTRO_PATHS.SESSION,
  },
  {
    id: 2,
    title: "Discussion",
    icon: <CreateIcon />,
    hidden: true,
    disabled: true,
    tooltip: "Post a new session",
    code: WORKFLOW_CODES.USER.INTRO_PATHS.TOPIC,
  },
];

export const COMPLETION_DETAIL_ACTION = [
  {
    id: 1,
    title: "Edit",
    icon: <ModeEditOutlineOutlinedIcon />,
    hidden: false,
    disabled: false,
    startIcon: true,
    size: "small",
    tooltip: "Edit Profile",
    code: WORKFLOW_CODES.USER.PROFILE.EDIT,
  },
  {
    id: 2,
    title: "Connections",
    icon: <SupervisorAccountIcon />,
    hidden: false,
    disabled: false,
    startIcon: false,
    size: "small",
    tooltip: "View people in your network and request for recommendations.",
    code: WORKFLOW_CODES.USER.PROFILE.REQUEST_RECOMMENDATION,
  },
];

export const PLACEHOLDERS = {
  SEARCH: "Search for people, sessions, topics...",
  VIEW_DETAIL: "View Detail",
  REGISTER_SESSION: "Register",
  SPONSOR_SESSION: "Sponsor",
  ATTENDING: "attending",
  FREE: "Free",
  NO_INTERESTING_PROFILE:
    "No interesting profiles found for you. Please try again  in a while. To discover more people around you, try updating your profile.",
  NO_PEOPLE_VIEWED_YOU:
    "No one has viewed your profile recently. Try adding new connections and updating your profile to discover more people around you.",

  NO_CONNECTIONS:
    "Uh Oh! it seems you do not have any connections in your network yet.Try adding few connections to your network for a better experience.",

  NO_POPULAR_SESSIONS:
    "There are no popular sessions available right now. How about creating your own session, invite people to join and grow your connectivity.",
  BE_THE_FIRST:'Be the first to attend'
};
export const TITLES = {
  CONNECTIONS: "Connections",
  POPULAR_SESSION: "Popular Sessions",
  PROBABLE_INTERESTING_CONNECTIONS: "Connections you might find interesting",
  PEOPLE_WHO_VIEWED_YOU: "People who viewed you",
  PEOPLE_ATTENDING: "People who are attending",
  CONNECT_TO_PERSON: "Connect",
  CONNECTION_REQUEST_SENT: "request sent",
  CONNECTION_REQUEST_SENT_TO: "Connection request sent to ",
  CONNECTED_PEOPLE: "You and #X# are now connected",
  CONNECTED_PEOPLE_LATENT: "You and #X# are connected",
  CONNECTED_PEOPLE_ALREADY: "You and #X# are already connected",
  CONNECTION_REQUEST_PENDING: "Your connection request is yet pending from ",
  CONNECTION_REQUEST_SENT_TO_LATENT: "You have sent a request to ",
  PROFILE_PHOTO_UPDATED: "Profile photo updated successfully 😊",
};
export const PAYLOAD_DEFAULT_TEXTS = {
  CONNECTION_REQUEST_SENDING_TEXT:
    "Invitation Request sent by User Id #X# to User Id #Y#. Sent by REST Service.",
};
export const TOOLTIPS = {
  GO_TO_PROFILE: "Go to profile",
  VIEW_ALL_CONNECTIONS: "View all connections",
  VIEW_SUGGESTIONS: "Toggle suggestions",
  VIEW_PROFILE: "View profile",
  FREE_SESSION: "This session is a free to attend session",
  PAID_SESSION: "Paid session",
  KNOW_MORE_SESSION: "Know more about this session",
  REGISTER_SESSION: "Register for this session",
  SPONSOR_SESSION: "Sponsor this session",
  NO_CONNECTIONS: "No connections",
  NO_INTERESTING_PROFILE: "No interesting profiles available",
  NO_PEOPLE_VIEWED_YOU: "No people viewed you yet",
  NO_POPULAR_SESSIONS: "No popular sessions available.",
  PROBABLE_INTERESTING_CONNECTIONS:
    "View more people whom you might be interested on",
  PEOPLE_WHO_VIEWED_YOU: "View more people who viewed your profile",
  VIEW_MORE: "View more of such people",
  SESSION_SUBMIT_CONFIRMATION: "Do you want to create this session now?",
  CREATING_SESSION: "Hold tight...creating your session",
  YOU_HAVE_REACHED_END: "You're all Caught Up.",
  COME_BACK_AGAIN: "Come back again later.",
  SEEN_ALL_FEEDS: "You've seen all new feeds.",
  PROFILE_NOT_FOUND: "The profile you are looking for could not be found."
};

export const GREETING = `${timeOfDay()} <user>`;
export const DEFAULT_COVER_IMAGE =
  "https://res.cloudinary.com/practicaldev/image/fetch/s--F7w_snYb--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vda3askm2sbfjl717q9q.png";
export const INTRO_BACKGROUND_GRADIENT =
  "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80";

export const INTRO_TEXT_KEYWORDS = [
  {
    id: 1,
    phrase: "Create something new today",
    icon: <AddOutlinedIcon className="md-icon" />,
    strength: 1,
  },
  {
    id: 2,
    phrase: "Welcome to the world of hassle free conferencing",
    icon: <LanguageOutlinedIcon className="md-icon" />,
    strength: 1,
  },
  {
    id: 3,
    phrase: "Connect with industry experts here",
    icon: <SupervisorAccountIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 4,
    phrase: "Connect, learn & grow here",
    icon: <GroupWorkOutlinedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 5,
    phrase: "Mobilize your knowledge to empower",
    icon: <LightbulbOutlinedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 6,
    phrase: "Earn from your online sessions",
    icon: <MonetizationOnOutlinedIcon className="md-icon" />,
    strength: 2,
  },

  {
    id: 7,
    phrase: "Evaluate your worth as a presenter",
    icon: <EjectOutlinedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 8,
    phrase: "Go to Sponsor to sponsor a session",
    icon: <AutoGraphOutlinedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 9,
    phrase: "Welcome to the changemaker of online conferencing",
    icon: <ThumbUpOutlinedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 10,
    phrase: "Your account is now preconfigured with zoom",
    icon: <VideoCameraFrontOutlinedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 11,
    phrase: "Your account is now verified",
    icon: <VerifiedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 12,
    phrase: "To upgrade your membership, go to Upgrade Account",
    icon: <UpgradeIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 13,
    phrase: "Hear from speakers from industry",
    icon: <SupervisedUserCircleOutlinedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 14,
    phrase: `Share your availability on your ${process.env.NEXT_PUBLIC_APP_NAME} Calendar`,
    icon: <EventAvailableIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 15,
    phrase: "You now have access to educational events",
    icon: <CastForEducationOutlinedIcon className="md-icon" />,
    strength: 1,
  },

  {
    id: 16,
    phrase: "Get access to healthcare seminars",
    icon: <FavoriteBorderOutlinedIcon className="md-icon" />,
    strength: 1,
  },
];

export const getProfileCompletionTexts = (profileCompletionData) => {
  let profileCompletionObject = {
    headerText: "",
    guidanceText: "",
    needsWork: true,
    alertLevel: "",
    icon: null,
    recommendedSteps: [],
  };
  if (!profileCompletionData?.isAboutYouCompleted) {
    profileCompletionObject.recommendedSteps.push(
      `Add ${profileCompletionData?.aboutYouPercent}% to your profile by updating about you.`
    );
  }
  if (!profileCompletionData?.isPastEducationAdded) {
    profileCompletionObject.recommendedSteps.push(
      `Add ${profileCompletionData?.pastEducationPercent}% to your profile by updating your past education details.`
    );
  }
  if (!profileCompletionData?.isPhotoAdded) {
    profileCompletionObject.recommendedSteps.push(
      `Add ${profileCompletionData?.photoAddedPercent}% to your profile by adding a new profile picture.`
    );
  }

  if (!profileCompletionData?.isProjResExpAdded) {
    profileCompletionObject.recommendedSteps.push(
      `Add ${profileCompletionData?.projResExpsPercent}% to your profile by updating your Project/Research/Work Experience.`
    );
  }

  if (!profileCompletionData?.isSkllsetAdded) {
    profileCompletionObject.recommendedSteps.push(
      `Add ${profileCompletionData?.skillSetPercent}% to your profile by updating your Specialties/Skills.`
    );
  }

  if (!profileCompletionData?.isFriendsPresent) {
    profileCompletionObject.recommendedSteps.push(
      `Add ${profileCompletionData?.friendPresentPercent}% to your profile by adding new connections.`
    );
  }

  if (!profileCompletionData?.isRecommendationsPresentInInbox) {
    profileCompletionObject.recommendedSteps.push(
      `Add ${profileCompletionData?.recommendationPercent}% to your profile by getting recommended from your connections.`
    );
  }
  if (profileCompletionData?.percentageOfProfileAlreadyCompleted == 100) {
    profileCompletionObject.headerText = "Yay!! your profile is complete.";
    profileCompletionObject.recommendedSteps = [];
    profileCompletionObject.guidanceText = `Superb. Though your profile is fully complete, but you may still want to keep your profile updated with the latest information and recommendations.`;
    profileCompletionObject.needsWork = false;
    profileCompletionObject.alertLevel = RESPONSE_TYPES.SUCCESS;
    profileCompletionObject.icon = <CheckOutlinedIcon />;
  } else if (
    profileCompletionData?.percentageOfProfileAlreadyCompleted >= 85 &&
    profileCompletionData?.percentageOfProfileAlreadyCompleted < 100
  ) {
    profileCompletionObject.headerText =
      "Great!! your profile is almost complete.";
    profileCompletionObject.guidanceText = `Awesome. You are almost there. Go ahead and complete the rest of your profile for enhanced experience at ${process.env.NEXT_PUBLIC_APP_NAME}. Click on the suggestions icon to know what you can do next.`;
    profileCompletionObject.alertLevel = RESPONSE_TYPES.INFO;
    profileCompletionObject.icon = <InfoOutlinedIcon />;
  } else if (
    profileCompletionData?.percentageOfProfileAlreadyCompleted >= 50 &&
    profileCompletionData?.percentageOfProfileAlreadyCompleted <= 84
  ) {
    profileCompletionObject.headerText =
      "Nice!! your profile needs some final touches.";
    profileCompletionObject.guidanceText = `Brilliant. You are slowly moving ahead in the game. Slow and steady wins the race is true but do not forget to complete the rest of your profile for a better experience at ${process.env.NEXT_PUBLIC_APP_NAME}. Click on the suggestions icon to know what you can do next.`;
    profileCompletionObject.alertLevel = RESPONSE_TYPES.WARNING;
    profileCompletionObject.icon = <WarningAmberOutlinedIcon />;
  } else {
    profileCompletionObject.headerText =
      "Uh Oh!! hey you got to work on your profile.";
    profileCompletionObject.guidanceText = `Action Required. You need to work on your profile and have few recommendations for a better reach and connectivity to your audience and peers. Do not slow down, you can do this better. Click on the suggestions icon to know what you can do to improve.`;
    profileCompletionObject.alertLevel = RESPONSE_TYPES.ERROR;
    profileCompletionObject.icon = <ErrorOutlinedIcon />;
  }

  return profileCompletionObject;
};

export const GREET_IMAGES = [
  "static/images/greet/welcome-2.jpg",
  "static/images/greet/welcome-1.jpg",
  "static/images/greet/hello-1.jpg",
  "static/images/greet/hello-2.jpg",
  "static/images/greet/hello-3.jpg",
  "static/images/greet/hello-4.jpg",
  "static/images/greet/hello-5.png",
];
export const IMAGE_PATHS = {
  NO_DATA: {
    CONNECTIONS: "/static/images/nodata-illustrations/no-connections.jpg",
    PEOPLE: "/static/images/nodata-illustrations/no-interesting-people.jpg",
    PEOPLE_VIEWS: "/static/images/nodata-illustrations/no-views-on-profile.PNG",
    SESSION:
      "/static/images/nodata-illustrations/broken-bike-3488525-2922411.webp",

    FEED: "/static/images/nodata-illustrations/all-done-illustration-woman-1-removebg-preview.png",
    EVENT_POSTER: "/static/images/session-poster-not-found.jpg",
    NO_PROFILE:"/static/images/nodata-illustrations/no-results.webp"
  },
  NO_PROFILE_PICTURE: "profilebig.png",
};
export const ICONS = {
  PROBABLE_INTERESTING_CONNECTIONS: <AutoAwesomeOutlinedIcon />,
  PEOPLE_WHO_VIEWED_YOU: <VisibilityOutlinedIcon />,
};
export const NETWORK = {
  CONNECTION_RELATION_STATE: {
    IN_MY_NETWORK: "IN_MY_NETWORK",
    AWAITING_RESPONSE: "WAITING_FOR_RESPONSE",
    ACCEPT_REQUEST: "ACCEPT",
    REJECT_REQUEST: "REJECT",
    CONNECT: "INVITE",
  },
  CONNECTION_RELATION_STATE_ALT: {
    IN_MY_NETWORK: "In My Network",
    AWAITING_RESPONSE: "Waiting for Response",
    ACCEPT_REQUEST: "Accept",
    REJECT_REQUEST: "Reject",
    CONNECT: "Invite",
  },
  REQUEST_TYPE: "INVITATION_REQUEST",
  CONNECTION_ACTION_STATUS: {
    PENDING: "pending",
    CONNECTED: "connected",
    ACCEPT: "Accept",
  },
  COLOR_VARIANTS: {
    PENDING: "#EF107D",
    CONNECTED: "green!important",
    ACCEPT: "",
  },
};

export const SESSION_ACTIONS = [
  {
    id: 1,
    title: PLACEHOLDERS.REGISTER_SESSION,
    icon: <AppRegistrationIcon />,
    hidden: false,
    disabled: false,
    size: "small",
    tooltip: TOOLTIPS.REGISTER_SESSION,
    code: WORKFLOW_CODES.USER.SESSION.REGISTER,
  },
  {
    id: 2,
    title: PLACEHOLDERS.SPONSOR_SESSION,
    icon: <AutoGraphOutlinedIcon />,
    hidden: false,
    disabled: false,
    size: "small",
    tooltip: TOOLTIPS.SPONSOR_SESSION,
    code: WORKFLOW_CODES.USER.SESSION.SPONSOR,
  },

  {
    id: 3,
    title: PLACEHOLDERS.VIEW_DETAIL,
    icon: <PreviewIcon />,
    hidden: false,
    disabled: false,
    size: "small",
    tooltip: TOOLTIPS.KNOW_MORE_SESSION,
    code: WORKFLOW_CODES.USER.SESSION.VIEW,
  },
];

export const ME = "(Me)";
export const SESSION_POSTER = {
  id: "session-poster",
  title: "Poster",
  description: "Drag and drop a poster or click to select one",
  preview: true,
  accept: "image/jpeg, image/png, image/jpg, image/gif",
  multiple: false,
  validation: {
    maxAllowedSize: 5,
    minAllowedDimension: "575x150",
    width: 575,
    height: 150,
    allowedExtensions: ["jpg", "png", "gif", "jpeg"],
    maxAllowedSizeInBytes: 5242880,
  },
  consent: null,
  icon: <ImageIcon />,
  required: false,
  imageURL: null,
  binary: null,
};

export const SESSION_DOCUMENT = {
  id: "session-document",
  title: "Document",
  description: "Drag and drop a doc or click to select one",
  preview: true,
  accept:
    "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation,text/xml,application/zip, application/x-zip-compressed, multipart/x-zip,application/zip,application/x-7z-compressed,text/plain",
  multiple: false,
  validation: {
    maxAllowedSize: 50,
    allowedExtensions: ["docx", "doc", "pdf", "zip", "txt"],
    maxAllowedSizeInBytes: 52428800,
  },
  icons: {
    TXT: <TextSnippetIcon />,
    DOCX: <ArticleIcon />,
    DOC: <ArticleIcon />,
    PDF: <PictureAsPdfIcon />,
    IMG: <InsertPhotoIcon />,
    ZIP: <FolderZipIcon />,
  },
  icon: <ArticleIcon />,
  required: false,
  consent: {
    text: `I agree that this document doesn't violate other's copyright or privacy rights.`,
    element: "checkbox",
    hasConsent: false,
  },
  binary: null,
};

export const PARTICIPANT_INVITATION_OPTIONS = [
  {
    id: 1,
    icon: <NotificationsActiveIcon />,
    hidden: false,
    disabled: false,
    size: "small",
    checked: true,
    name: "createCourse.notifyPastAttendees",
    text: "Auto notify all participants from my all previous sessions",
    value: 0,
  },
  {
    id: 2,
    icon: <RsvpIcon />,
    hidden: false,
    disabled: false,
    size: "small",
    checked: false,
    name: "createCourse.notifyPastAttendees",
    text: 'I will invite manually from "My Session"',
    value: 1,
  },
];

export const PARTICIPANT_QUESTIONAIRRES = {
  CREATED: "Questionairre created for participants successfully",
  UPDATED: "Questionairre updated successfully",
  DELETED: "Questionairre deleted successfully",
};
export const PARTICIPANT_VISIBILITY = {
  ON_PRIVATE_SESSION:
    "You are going to create a private session. This means your session will not appear in session search and viewable by the public users.",
};

export const FEE = {
  PROMO_CODES: {
    text: 'You can add promo codes for this session under "Sessions -> My Sessions"',
    icon: <StarIcon />,
  },
  HELP_TEXT: {
    SET_FEE_TYPEWRITER: "You've set a fee of $#XX for this session.",
    ICON: <PriceCheckIcon />,
  },
};

export const SPONSORSHIP = {
  ICONS: {
    EDIT: <EditIcon />,
    CUSTOMIZE: <DashboardCustomizeIcon />,
    RESET: <RestoreFromTrashIcon />,
  },
  LEVELS: [
    {
      id: 1,
      title: "Silver",
      icon: "",
      alias: "Silver",
      short: "Silver",
      workflow: {
        code: WORKFLOW_CODES.USER.SPONSORSHIP.EDITS.FEATURES.SILVER,
      },
      defaults: {
        price: {
          text: 500,
          display: "$500",
        },
        featured: {
          text: `<p><span style="color:hsl(0, 0%, 0%);"><strong>Example:</strong></span></p>
          <ul><li><span style="color:hsl(0, 0%, 0%);">Company logo and link on this session</span></li><li><span style="color:hsl(0, 0%, 0%);">Announcement by session owner during the session</span></li></ul>`,
          html: (
            <>
              <h3 className="text-bold font-semibold text-xl mb-1">
                <u>F</u>eatures
              </h3>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon /> Company logo and link on this session
              </p>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon /> Announcement by session owner during
                the session
              </p>
            </>
          ),
        },
      },
      current: {
        price: {
          text: null,
          display: "",
        },
        featured: {
          text: ``,
          html: null,
        },
      },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvr1_3DizGBjUT43njjHLIihWLjH8JgLgshQ&usqp=CAU",
      dirty: false,
    },
    {
      id: 2,
      title: "Gold",
      icon: "",
      alias: "Gold",
      short: "Gold",
      workflow: {
        code: WORKFLOW_CODES.USER.SPONSORSHIP.EDITS.FEATURES.GOLD,
      },
      defaults: {
        price: {
          text: 1000,
          display: "$1000",
        },
        featured: {
          text: `<p><span style="color:hsl(0, 0%, 0%);"><strong>Example:</strong></span></p>
          <ul><li><span style="color:hsl(0, 0%, 0%);">Company logo and link on this session</span></li><li><span style="color:hsl(0, 0%, 0%);">Announcement by session owner during the session</span></li><li><span style="color:hsl(0, 0%, 0%);">2 min time during the session to showcase your company or product</span></li></ul>`,
          html: (
            <>
              <h3 className="text-bold font-semibold text-xl mb-1">
                <u>F</u>eatures
              </h3>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon className=" text-yellow-700" /> Company
                logo and link on this session
              </p>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon className=" text-yellow-700" />{" "}
                Announcement by session owner during the session
              </p>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon className=" text-yellow-700" /> 2 min
                time during the session to showcase your company or product
              </p>
            </>
          ),
        },
      },
      current: {
        price: {
          text: null,
          display: "",
        },
        featured: {
          text: ``,
          html: null,
        },
      },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXG2UQ2x9iS_Wr03vZBZHLzNDbWyxKbx0bTQ&usqp=CAU",
      dirty: false,
    },
    {
      id: 3,
      title: "Platinum",
      short: "Plat",
      icon: "",
      defaults: {
        price: {
          text: 5000,
          display: "$5000",
        },
        featured: {
          text: `<p><span style="color:hsl(0, 0%, 0%);"><strong>Example:</strong></span></p>
          <ul><li><span style="color:hsl(0, 0%, 0%);">Company logo and link on this session</span></li><li><span style="color:hsl(0, 0%, 0%);">Announcement by session owner during the session</span></li><li><span style="color:hsl(0, 0%, 0%);">5 min time during the session to showcase your company or product</span></li><li><span style="color:hsl(0, 0%, 0%);">Include company logo and link in social media as proud sponsor</span></li></ul>`,
          html: (
            <>
              <h3 className="text-bold font-semibold text-xl mb-1">
                <u>F</u>eatures
              </h3>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon color="primary" /> Company logo and link
                on this session
              </p>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon color="primary" /> Announcement by
                session owner during the session
              </p>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon color="primary" /> 5 min time during the
                session to showcase your company or product
              </p>
              <p className="leading-loose text-sm text-gray-600">
                <CheckCircleOutlineIcon color="primary" /> Include company logo
                and link in social media as proud sponsor
              </p>
            </>
          ),
        },
      },
      current: {
        price: {
          text: null,
          display: "",
        },
        featured: {
          text: ``,
          html: null,
        },
      },
      alias: "Platinum",
      workflow: {
        code: WORKFLOW_CODES.USER.SPONSORSHIP.EDITS.FEATURES.PLATINUM,
      },
      image:
        "data:image/jpeg;base64,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",
      dirty: false,
    },
  ],
  MESSAGES: {
    ERRORS: {
      EDITS: "Failed to modify sponsorhsip offerings. Please try again.",
    },
    INFO: {
      SET_FEE_TYPEWRITER:
        "Great going, you've set an offer of $#XX from the sponsor.",
      PRE_CUSTOMIZED_TEMPLATE_HELP_TEXT:
        "This is a pre-customized sponsorship offering example template for you. You are free to tailor it according to your sponsorship needs.",

      SESSION_FEE_HELPTEXT:
        "Paid sessions enable you to earn a fixed amount on your session. However, if you opt to conduct your session for free, you do not have to do anything in this step.",
      SESSION_SPONSORSHIP_HELPTEXT:
        "Sponsorships enable you to have your session sponsored by others for which you can customize your own sponsorship rates. By opening yourself to sponsorships you get a chance to earn a fixed amount from people or organizations who may sponsor your session.",
    },
  },
};

export const APP = {
  ICONS: {
    EDIT: <EditIcon />,
    CUSTOMIZE: <DashboardCustomizeIcon />,
    RESET: <RestoreFromTrashIcon />,
  },

  MESSAGES: {
    ERRORS: {
      EDITS: {
        SESSION_CHANGE:
          "Failed to select a past session, please try again or choose from a new category to create one.",
      },
      FINAL_STEP_VISIT_DENIED:
        "Hey <user>, looks like you have not completed the other steps correctly. Revisit the steps and try completing again.",

      FINAL_STEP_COMPLETION_FAILED:
        "Hey <user>, something happened on our side. It's not you but us. Please try again in a while.",
    },
    INFO: {
      TERMS_ACCEPT_TEXT: "By clicking on submit you agree to our ",
      TnC: "terms and conditions.",
      FINAL_STEP_COMPLETED: ` <user>, now that you are almost done, review your changes and submit this session.`,
      FINAL_STEP_EDITS_HELP_TEXT:
        "To make any changes, click on the pencil icon.",
    },
  },
  SESSION: {
    DTO: {
      BASIC: {
        categoryId: 0,
        pastSessionId: 0,
        name: "",
        shortName: "",
        summary: {
          html: "",
          plain: "",
        },
        binary: {
          images: {
            poster: "",
            data: null,
            error: false,
          },
          documents: {
            consent: false,
            document: "",
            data: null,
            error: false,
          },
        },
        url: "",
        validationError: false,
        errors: {},
        dirty: false,
      },
      SCHEDULE: {
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        timezone: null,
        duration: null,
        repeats: false,
        repeatScheduleFixed: false,
        repeatSchedule: null,
        repeatScheduleSummary: null,
        repeatEndsOnDate: null,
        repeatEndsAfter: null,
        repeatByDaysOfWeek: null,
        repeatByDaysOfWeekChecked: null,
        repeatObject: null,
        repeatValue: null,
        repeatEvery: null,
        occurenceCount: null,
        validationError: false,
        errors: {},
        dirty: false,
      },
      PARTICIPANTS: {
        cohost: null,
        numberOfParticipants: null,
        visibility: null,
        choiceOfInvitation: null,
        questions: null,
        questionairre: null,
        validationError: false,
        errors: {},
        dirty: false,
      },
      FEE: {
        paidInd: false,
        amount: null,
        validationError: false,
        errors: {},
        dirty: false,
      },
      SPONSOR: {
        sponsorShipInd: false,
        amount: null,
        plans: [],
        validationError: false,
        errors: {},
        dirty: false,
      },
      user: null,
      requestPath: null,
    },
  },
};
export const AUTH_TOKENS = {
  SESSION_MONITOR: "SESSION_MONITOR",
  IDLE_MONITOR: "IDLE_MONITOR",
};
export const SESSION = {
  CREATED: "<user>, your session has been created successfully",
  EDITED: "<user>, your session has been modified successfully",
  DELETED: "<user>, your session has been deleted permanently",
};
export const VALIDATING_REQUEST =
  "Please wait, we are validating your request...";

export const PROFILE_AREAS = [
  {
    id: 1,
    title: HTMLUnderlineByCharacterIndex("About <#>", 0),
    icon: InfoIcon,
    hidden: false,
    color: '#0081CB',
  },
  {
    id: 8,
    title: HTMLUnderlineByCharacterIndex("Education", 0),
    icon: SchoolIcon,
    hidden: false,
    color: brown[500],
  },
  {
    id: 2,
    title: HTMLUnderlineByCharacterIndex("Specialities &amp; Skills", 0),
    icon: StarsIcon,
    hidden: false,
    color: pink[500],
  },

  {
    id: 3,
    title: HTMLUnderlineByCharacterIndex("Project/Research/Work Experience", 0),
    icon: ScienceIcon,
    hidden: false,
    color: purple[500],
  },

  {
    id: 4,
    title: HTMLUnderlineByCharacterIndex("Recommended sessions by <#>", 0),
    icon: AssistantPhotoIcon,
    hidden: false,
    color: green[500],
  },
  {
    id: 5,
    title: HTMLUnderlineByCharacterIndex("Interests", 0),
    icon: InterestsIcon,
    hidden: false,
    color: red[500],
  },

  {
    id: 6,
    title: HTMLUnderlineByCharacterIndex("Recommendations received", 0),
    icon: ThumbUpIcon,
    hidden: false,
    color: orange[500],
  },

  {
    id: 7,
    title: HTMLUnderlineByCharacterIndex("Sessions by <#>", 0),
    icon: EventNoteOutlinedIcon,
    hidden: false,
    color: blue[500],
  },
];
export const USER_PROFILE = {
  CHANGE_PROFILE_PICTURE: "Change profile picture",
  CHANGE_ABOUT_INFO: "Update your About or bio information",
  CHANGE_SKILLS: "Update your specialities & skills",
  CHANGE_INTERESTS: "Update your interests",
  CHANGE_PROFILE_HEADLINE:'Update prime highlights to your profile such as designation, organization, location...',
  BIO_UPDATED:'🚀Awesome!! Bio updated successfully',
  BIO_UPDATE_FAILED:'Oops, there encountered an error while updating your bio, please try again.',
  HEADLINE_UPDATED:'👍Superb!! Headline updated successfully',
  SKILLS_UPDATED:'🚀Great!! Specialities & skills updated successfully',
  SKILLS_UPDATE_FAILED:'Oops, there encountered an error while updating your skills, please try again.',
  RECOMMENDED_SESSIONS_UPDATED:'👍Superb!! We have updated your recommended sessions',
  RECOMMENDED_SESSIONS_UPDATE_FAILED:'Oops, there encountered an error while updating your recommended sessions, please try again.',
  HEADLINE_UPDATE_FAILED:'Oops, there encountered an error while updating your headline, please try again.',
  INTEREST_UPDATED:'👍Superb!! Interests updated successfully',
  INTEREST_UPDATE_FAILED:'Oops, there encountered an error while updating your interests, please try again.',
  PLACEHOLDERS: {
    WRITE_BIO: "Write something about yourself here...",
    ABOUT_INFO: "About",
  },
};

export const RECOMMENDATIONS = {
  REQUEST_RECOMMENDATION: "Ask Recommendation",
  REQUEST_SENT_TO: "Great, you just sent a recommendation request to ",
  REQUEST_SENT_FAILED:
    "Uh, oh! there was an error sending the recommendation request to ",
  REQUEST_RECOMMENDATION_CUSTOM: "Ask <#> for a recommendation",
  SEND_RECOMMENDATION: "Send request for recommendation",
  REQUEST_TYPE: "RECOMMENDATION_REQUEST",
  REQUEST_RECOMMENDATION_PLACEHOLDER: "Write a recommendation request...",
  REQUEST_RECOMMENDATION_SUBJECT_LABEL: "Subject",
  REQUEST_RECOMMENDATION_NOTE_LABEL: "Recommendation note",
};

export const INBOX = {
  SEND_MESSAGE: "Send message",
  MESSAGE_SENT_TO: "Message sent to ",
  MESSAGE_SENT_FAILED: "Uh, oh! there was an error sending this message to ",

  SEND_MESSAGE_CUSTOM: "Message <#>",
  REQUEST_TYPE: "SEND_MESSAGE",
  MESSAGE_TEXT_PLACEHOLDER: "Write your message...",
  MESSAGE_SUBJECT_LABEL: "Subject",
  MESSAGE_TEXT_LABEL: "Message",
};
export const RATING = {
  TYPES: [
    {
      id: 1,
      code: "fair",
      alias: "Fair",
      value: "FAIR",
    },
    {
      id: 2,
      code: "good",
      alias: "Good",
      value: "GOOD",
    },
    {
      id: 3,
      code: "best",
      alias: "Best",
      value: "BEST",
    },
  ],

  RATING_SENT_TO: "Yay! you just rated ",
  RATING_FAILED: "Uh, oh! there was an error rating your review to ",
  REQUEST_TYPE: "RATING_RESPONSE",
  RATING_ALREADY_SENT: "RATING_ALREADY_SENT",
};

export const SESSION_REQUEST = {
  SEND_SESSION_REQUEST: "Send session request",
  MESSAGE_SENT_TO: "Superb! Session request for <#X#> has been sent to <#Y#>",
  MESSAGE_SENT_FAILED:
    "Uh, oh! there was an error sending this session request to ",
};

import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { WORKFLOW_CODES } from "./workflow-codes";
import { timeOfDay } from "../utils/utility";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { RESPONSE_TYPES } from "./constants";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
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
    code: WORKFLOW_CODES.USER.CONNECTION_TYPES.STUDENT,
  },
  {
    id: 2,
    title: "Professors",
    hidden: false,
    tooltip: "Connections who are professors",
    code: WORKFLOW_CODES.USER.CONNECTION_TYPES.PROFESSOR,
  },
  {
    id: 3,
    title: "Alumni",
    hidden: false,
    tooltip: "Connections who are alumni",
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
    hidden: false,
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
    title: "Get Recommended",
    icon: <RecommendOutlinedIcon />,
    hidden: false,
    disabled: false,
    startIcon: false,
    size: "small",
    tooltip: "Request a recommendation from your connections",
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
};
export const TITLES = {
  CONNECTIONS: "Connections",
  POPULAR_SESSION: "Popular Sessions",
  PROBABLE_INTERESTING_CONNECTIONS: "Connections you might find interesting",
  PEOPLE_WHO_VIEWED_YOU: "People who viewed you",
  CONNECT_TO_PERSON: "Connect",
  CONNECTION_REQUEST_SENT: "request sent",
  CONNECTION_REQUEST_SENT_TO: "Connection request sent to ",
  CONNECTED_PEOPLE:'You and #X# are now connected',
  CONNECTED_PEOPLE_LATENT:'You and #X# are connected',
  CONNECTION_REQUEST_PENDING:'Your connection request is yet pending from ',
  CONNECTION_REQUEST_SENT_TO_LATENT:'You have sent a request to '
  };
export const PAYLOAD_DEFAULT_TEXTS={
  CONNECTION_REQUEST_SENDING_TEXT:'Invitation Request sent by User Id #X# to User Id #Y#. Sent by REST Service.'
}
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
  PROBABLE_INTERESTING_CONNECTIONS:
    "View more people whom you might be interested on",
  PEOPLE_WHO_VIEWED_YOU: "View more people who viewed your profile",
  VIEW_MORE: "View more of such people",
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
  },
  NO_PROFILE_PICTURE: "profilebig.png",
};
export const ICONS = {
  PROBABLE_INTERESTING_CONNECTIONS: <AutoAwesomeOutlinedIcon />,
  PEOPLE_WHO_VIEWED_YOU: <VisibilityOutlinedIcon />,
};
export const NETWORK= 
  {
    CONNECTION_RELATION_STATE:{
      IN_MY_NETWORK:'IN_MY_NETWORK',
      AWAITING_RESPONSE:'WAITING_FOR_RESPONSE',
      ACCEPT_REQUEST:'ACCEPT',
      REJECT_REQUEST:'REJECT',
      CONNECT:'INVITE'
    },
    REQUEST_TYPE:'INVITATION_REQUEST',
    CONNECTION_ACTION_STATUS:{
      PENDING:'pending',
      CONNECTED:'connected',
      ACCEPT:'Accept',

    }
  }
   
  

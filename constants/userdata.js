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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { RESPONSE_TYPES } from "./constants";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";

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
    size:'small',
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
    size:'small',
    tooltip: "Request a recommendation from your connections",
    code: WORKFLOW_CODES.USER.PROFILE.REQUEST_RECOMMENDATION,
  },
];

export const PLACEHOLDERS = {
  SEARCH: "Search for people, sessions, topics...",
};
export const TITLES = {
  CONNECTIONS: "Connections",
};
export const TOOLTIPS = {
  GO_TO_PROFILE: "Go to profile",
  VIEW_ALL_CONNECTIONS: "View all connections",
  VIEW_SUGGESTIONS: "Toggle suggestions"
};

export const GREETING = `👋 ${timeOfDay()} <user>`;
export const DEFAULT_COVER_IMAGE =
  "https://res.cloudinary.com/practicaldev/image/fetch/s--F7w_snYb--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vda3askm2sbfjl717q9q.png";
export const INTRO_BACKGROUND_GRADIENT =
  "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80";
export const INTRO_TEXT_KEYWORDS = [
  "➕ Create something new today",
  "🌐 Welcome to the world of hassle free conferencing",
  "👩‍💼 Connect with industry experts here ",
  "🌐 Connect, learn & grow here",
  "💡 Mobilize your knowledge to empower",
  "💰 Earn from your online sessions",
  "🔼 Evaluate your worth as a presenter",
  "💟 Go to Sponsor to sponsor a session",
  "🤝 Welcome to the changemaker of online conferencing",
  "⭐️ Your account is now preconfigured with zoom",
  "🔐 Your account is now verified",
  "⭐️ To upgrade your membership, go to Upgrade Account",
  "👩‍💼 Hear from speakers from industry",
  `🗓 Share your availability on your ${process.env.NEXT_PUBLIC_APP_NAME} Calendar `,
  "👨‍🏫 You now have access to educational events",
  "👨‍⚕️ Get access to healthcare seminars",
]; 
export const getProfileCompletionTexts = (profileCompletionData) => {
  let profileCompletionObject = {
    headerText: "",
    guidanceText: "",
    needsWork: true,
    alertLevel:'',
    icon:null,
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
      `Add ${profileCompletionData.recommendationPercent}% to your profile by getting recommended from your connections.`
    );
  }
  if (profileCompletionData?.percentageOfProfileAlreadyCompleted == 100) {
    profileCompletionObject.headerText = "☑️Yay!! your profile is complete.";
    profileCompletionObject.recommendedSteps = [];
    profileCompletionObject.guidanceText=`Superb. Though your profile is fully complete, but you may still want to keep your profile updated with the latest information and recommendations.`
    profileCompletionObject.needsWork = false;
    profileCompletionObject.alertLevel=RESPONSE_TYPES.SUCCESS
    profileCompletionObject.icon=<CheckOutlinedIcon/>
  } else if (
    profileCompletionData?.percentageOfProfileAlreadyCompleted >= 85 &&
    profileCompletionData?.percentageOfProfileAlreadyCompleted < 100
  ) {
    profileCompletionObject.headerText =
      "🌟Great!! your profile is almost complete.";
      profileCompletionObject.guidanceText=`Awesome. You are almost there. Go ahead and complete the rest of your profile for enhanced experience at ${process.env.NEXT_PUBLIC_APP_NAME}. Click on the suggestions icon to know what you can do next.`
      profileCompletionObject.alertLevel=RESPONSE_TYPES.INFO
      profileCompletionObject.icon=<InfoOutlinedIcon/>
  } else if (
    profileCompletionData?.percentageOfProfileAlreadyCompleted >= 50 &&
    profileCompletionData?.percentageOfProfileAlreadyCompleted <= 84
  ) {
    profileCompletionObject.headerText =
      "📝Nice!! your profile needs some final touches.";
      profileCompletionObject.guidanceText=`Brilliant. You are slowly moving ahead in the game. Slow and steady wins the race is true but do not forget to complete the rest of your profile for a better experience at ${process.env.NEXT_PUBLIC_APP_NAME}. Click on the suggestions icon to know what you can do next.`
      profileCompletionObject.alertLevel=RESPONSE_TYPES.WARNING
      profileCompletionObject.icon=<WarningAmberOutlinedIcon/>
  } else {
    profileCompletionObject.headerText =
      "⚠️Uh Oh!! hey you got to work on your profile.";
      profileCompletionObject.guidanceText=`Action Required. You need to work on your profile and have few recommendations for a better reach and connectivity to your audience and peers. Do not slow down, you can do this better. Click on the suggestions icon to know what you can do to improve.`
      profileCompletionObject.alertLevel=RESPONSE_TYPES.ERROR
      profileCompletionObject.icon=<ErrorOutlinedIcon/>
  }

  return profileCompletionObject
};

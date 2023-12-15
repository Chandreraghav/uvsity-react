import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ShareIcon from "@mui/icons-material/Share";
import GroupIcon from "@mui/icons-material/Group";
import DraftsIcon from "@mui/icons-material/Drafts";
import InfoIcon from "@mui/icons-material/Info";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import StoreIcon from "@mui/icons-material/Store";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PublicIcon from "@mui/icons-material/Public";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EjectOutlinedIcon from "@mui/icons-material/EjectOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import StreamOutlinedIcon from "@mui/icons-material/StreamOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

export const LANDING_PAGE_APP_FEATURES = [
  {
    id: 1,
    img: "./static/images/feature-1.png",
    title: "Create a session",
    messages: [
      {
        text: "Signup today and host your online sessions, talks or events.",
        icon: <LockOpenIcon />,
      },
      {
        text: "To create your session, go to Create Session.",
        icon: <AddBoxIcon />,
      },
      {
        text: "Fill out session details, select schedule, price, preview and submit.",
        icon: <CheckCircleOutlineIcon />,
      },
      { text: "Share the session in social media.", icon: <ShareIcon /> },
      { text: "Stay connected to your followers.", icon: <GroupIcon /> },
    ],
    url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    watch_video: "Watch video",
    video_icon: <VideocamIcon />,
  },
  {
    id: 2,
    img: "./static/images/feature-2.png",
    title: "Set up a meeting",
    messages: [
      {
        text: "No back and forth emails or phone calls.",
        icon: <DraftsIcon />,
      },
      {
        text: "Get your free personal appointment app integrated with zoom.",
        icon: <LockOpenIcon />,
      },
      {
        text: "Share your appointment link in social media.",
        icon: <ShareIcon />,
      },
    ],

    url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    watch_video: "Watch video",
    video_icon: <VideocamIcon />,
  },
  {
    id: 3,
    img: "./static/images/feature-3.png",
    title: "Fix your availability",

    messages: [
      {
        text: "Don't forget to set your availability.",
        icon: <InfoIcon />,
      },
      {
        text: "To set, go to My Calendar, click on Availability Settings.",
        icon: <DateRangeIcon />,
      },
      {
        text: "Embed your link on your website or share in email signatures.",
        icon: <FileCopyIcon />,
      },
    ],

    url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    watch_video: "Watch video",
    video_icon: <VideocamIcon />,
  },
];

export const SESSION_REVIEW_MAX_STAR_COUNT = 5;
export const SHIM_MAX_TIMEOUT_IN_MILLIS = 10000;
export const LOGIN_POLICY_ACCEPTANCE = `By clicking “Sign in with Google” or “Sign up” or "Sign in", I
confirm I’ve read and agree to ${process.env.NEXT_PUBLIC_APP_NAME}'s
<a href='#' className='app__anchor'>Terms of Use</a>, Privacy Policy.`;

export const REGISTER_POLICY_ACCEPTANCE = `By clicking “Sign in with Google” or “Sign up”, I
confirm I’ve read and agree to ${process.env.NEXT_PUBLIC_APP_NAME}'s
<a href='#' className='app__anchor'>Terms of Use</a>, Privacy Policy.`;

export const REGISTRATION_ACCEPTANCE_OATH = `I agree to ${process.env.NEXT_PUBLIC_APP_NAME}'s <a href='#' className='app__anchor'>Terms and Conditions</a>.`;
export const LANDING_PAGE_HERO_KEYWORDS = [
  {
    id: 1,
    phrase: "Create your free session today",
    icon: <AddOutlinedIcon className="lg-icon" />,
    strength: 1,
  },
  {
    id: 2,
    phrase: "Hassle free online conferencing",
    icon: <LanguageOutlinedIcon className="lg-icon" />,
    strength: 1,
  },
  {
    id: 3,
    phrase: "Learn from industry experts",
    icon: <SupervisedUserCircleOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 4,
    phrase: "Connect, learn & grow",
    icon: <GroupWorkOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 5,
    phrase: "Mobilize your knowledge to empower",
    icon: <LightbulbOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 6,
    phrase: "Get paid for holding an online event",
    icon: <MonetizationOnOutlinedIcon className="lg-icon" />,
    strength: 2,
  },

  {
    id: 7,
    phrase: "Evaluate your worth as a presenter",
    icon: <EjectOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 8,
    phrase: "Sponsor a session",
    icon: <AutoGraphOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 9,
    phrase: "Join the changemaker of online conferencing",
    icon: <ThumbUpOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 10,
    phrase: "Get your account pre-configured with zoom",
    icon: <VideoCameraFrontOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 11,
    phrase: "Host your own private session today",
    icon: <StreamOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 12,
    phrase: "Invite speakers from industry",
    icon: <SupervisedUserCircleOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 13,
    phrase: "Share your availability with peers",
    icon: <ShareOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 14,
    phrase: "Get access to educational events",
    icon: <CastForEducationOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 15,
    phrase: "Hold your business meetings here for free",
    icon: <WorkOutlineIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 16,
    phrase: "Get access to healthcare seminars",
    icon: <FavoriteBorderOutlinedIcon className="lg-icon" />,
    strength: 1,
  },

  {
    id: 17,
    phrase: "Earn from your own online sessions",
    icon: <MonetizationOnOutlinedIcon className="lg-icon" />,
    strength: 1,
  },
  {
    id: 18,
    phrase: "Become a member and enjoy premium benefits",
    icon: <StarOutlinedIcon className="lg-icon" />,
    strength: 2,
  },
];

export const LANDING_PAGE_HERO_MESSAGE_LIST = [
  {
    id: 1,
    text: "A Marketplace for all educators, coaches and session organizers.",
    icon: <StoreIcon />,
  },
  {
    id: 2,
    text: "Earn from your paid sessions and sponsorships.",
    icon: "💰",
  },
  {
    id: 3,
    text: "Monetize your one on one appointments.",
    icon: <LocalAtmIcon />,
  },
  {
    id: 4,
    text: "Stay connected with your audience and followers.",
    icon: "📶",
  },
  { id: 5, text: "No Payment required.", icon: <MoneyOffIcon /> },
];
export const SHIMMER_TIMEOUT_IN_MILLIS = 4000;
export const LANDING_PAGE_STATS_DETAIL = [
  {
    id: 1,
    text: "Live Sessions",
    count: 100,
    icon: <DynamicFeedIcon />,
    altIcon: "fa fa-television",
    className: "primary",
  },
  {
    id: 2,
    text: "Meetings",
    count: 600,
    icon: <VideocamIcon />,
    altIcon: "fa fa-video-camera",
    className: "danger",
  },
  {
    id: 3,
    text: "Countries",
    count: 47,
    icon: <PublicIcon />,
    altIcon: "fa fa-group",
    className: "success",
  },
];
export const MIN_LENGTH_PASSWORD = 8;
export const PRE_AUTH_SIGNUP_MESSAGE_BAR_TEXT =
  "Sign Up today and get your free personal appointment app pre-configured with zoom.";
export const TOAST_MESSAGE_DEFAULT_DURATION_SECONDS = 3000;
export const RESPONSE_TYPES = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warn",
  INFO: "info",
};
export const RESPONSE_TYPES_COLOR = {
  ERROR: { hex: "#A40000", rgb: "rgba(164,0,0)" },
  SUCCESS: { hex: "#5CB85C", rgb: "rgba(92,184,92)" },
  WARNING: { hex: "#ECBB27", rgb: "rgba(236,187,39)" },
  INFO: { hex: "#22AB4B", rgb: "rgba(34,171,75)" },
};
export const DEFAULT_TIMEZONE = "Asia/Calcutta";
export const DEFAULT_IP = "192.168.29.10";
export const LOGIN_SOURCE = {
  UVSITY: "uvsity",
  GOOGLE: "Google",
};
export const LOADING_MESSAGE_DEFAULT = "Loading...";
export const LOAD_MORE = "Load more...";
export const TIME_OF_DAY_GREETING = {
  MORNING: "Good morning",
  AFTERNOON: "Good afternoon",
  EVENING: "Good evening",
};
export const USER_CONFIDENCE_IMAGES_ON_WORKFLOW_COMPLETION = [
  "all-done-illustration-woman.jpg",
  "all-done-illustration-woman-1.jpg",
  "all-done-illustration-woman-2.jpg",
  "all-done-illustration-man.jpg",
  "all-done-illustration.jpg",
  "all-done-man-illustration.png",
  "all-done-woman-illustration.webp",
];

export const USER_CONFIDENCE_KEYWORDS_ON_WORKFLOW_COMPLETION = [
  "Great job.",
  "Superb!",
  "Yay!!",
  "Nailed it!!",
  "Awesome.",
  "You did it.",
  "That's it.",
];
export const USER_PAGE_LEAVE_CONFIRM_MESSAGE =
  "Are you sure want to leave this page?";
export const ERROR_DETAILS = "Click to check error details";
export const CONTACT_SUPPORT =
  "Please contact support if the problem persists further.";
export const REQUEST_FAILED_HEADER = "Request failed";
export const READ_MORE_MAX_LENGTH = 200;
export const READ_MORE = "...read more";
export const READ_LESS = " show less";
export const SEE_MORE = "See more";
export const COLOR_CODES = {
  GRAY: {
    LIGHT: "dimgray",
    DEEP: "#e2e2e2",

  },
  BLUE: {
    LIGHT: "#029BFE",
    DARK: "#4100BC",
  },
  BLACK: {
    DARK: "#111",
  },
  DARK_BLUE_PALLETTE: {
    PRIMARY: "#041E42",
    SECONDARY: "#5499C7",
    TERTIARY: "#FFD700",
    TEXT_PRIMARY: "#FFFFFF",
    TEXT_SECONDARY: "#F2F2F2",
    TEXT_PRIMARY_DARK: "#000000",
  }
};
export const RTE_TOOLBAR = {
  ADVANCED: ['Bold', 'Italic', 'Underline', 'StrikeThrough', '|', 'Cut', 'Copy', 'Paste', '|', 'Undo', 'Redo', '|', 'Image', 'CreateLink',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', 'createTable', '|',

    'ClearFormat', 'ClearAll', 'Print',
    'SourceCode', 'FullScreen'],
  CLASSIC: ['Bold', 'Italic', 'Underline', 'StrikeThrough', '|', 'Cut', 'Copy', 'Paste', '|', 'Undo', 'Redo', '|', 'Image', 'CreateLink', '|', 'SourceCode', 'FullScreen']
}




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
  "➕ Create your free session today",
  "🌐 Hassle free online conferencing",
  "👩‍💼 Learn from industry experts",
  "🌐 Connect, learn & grow",
  "💡 Mobilize your knowledge to empower",
  "💰 Get paid for holding an online event",
  "🔼 Evaluate your worth as a presenter",
  "💟 Sponsor a session",
  "🤝 Join the changemaker of online conferencing",
  "⭐️ Get your account pre-configured with zoom",
  "💻 Host your own private session today",
  "👩‍💼 Invite speakers from industry",
  "💼 Share your availability with peers ",
  "👨‍🏫 Get access to educational events",
  "💼 Hold your business meetings here for free",
  "👨‍⚕️ Get access to healthcare seminars",
  "💰 Earn from your own online sessions",
  "🌟 Become a member and enjoy premium benefits",
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
  },
  {
    id: 2,
    text: "Meetings",
    count: 600,
    icon: <VideocamIcon />,
  },
  {
    id: 3,
    text: "Countries",
    count: 47,
    icon: <PublicIcon />,
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
};
export const DEFAULT_TIMEZONE='Asia/Calcutta'
export const DEFAULT_IP='192.168.29.10'

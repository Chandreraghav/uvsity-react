import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

export const HEADER_OPTIONS = [
  {
    id: 1,
    title: "Home",
    tooltip:'Home',
    icon: HomeIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
  },
  {
    id: 2,
    title: "My Connections",
    tooltip:'View people in your network',
    icon: SupervisorAccountIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
  },

 

  {
    id: 3,
    title: "Sessions",
    tooltip:'Browse Sessions',
    icon: EventNoteOutlinedIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
  },

  {
    id: 4,
    title: "Topics",
    tooltip:'Browse topics',
    icon: TopicOutlinedIcon,
    hasAvatar: false,
    avatar: null,
    hidden: true,
    name: null,
  },

  {
    id: 5,
    title: "Sponsor",
    tooltip:"Sponsor a session or event",
    icon: AutoGraphOutlinedIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
  },

  {
    id: 6,
    title: "Messages",
    tooltip:"Go to mailbox",
    icon: MailOutlineIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
  },

  {
    id: 7,
    title: "Notifications",
    tooltip:"",
    icon: NotificationsIcon,
    hasAvatar: false,
    avatar: null,
    hidden: false,
    name: null,
  },

  {
    id: 8,
    title: "me",
    tooltip:"",
    icon: null,
    hasAvatar: true,
    avatar: 'https://lh3.googleusercontent.com/a-/AOh14Gj4zE9yHsoBriErUebkmDlq2CUfcu30Ql72DiOaAdA=s96-c',
    hidden: false,
    name: 'Swaroop Chakraborty'
  },

];

export const PLACEHOLDERS={
    SEARCH: 'Search for people, sessions, topics...'
}

import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { WORKFLOW_CODES } from "./workflow-codes";

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
    tooltip:"Account Settings",
    icon: null,
    hasAvatar: true,
    avatar: 'https://lh3.googleusercontent.com/a-/AOh14Gj4zE9yHsoBriErUebkmDlq2CUfcu30Ql72DiOaAdA=s96-c',
    hidden: false,
    name: 'Swaroop Chakraborty'
  },

];

export const ACCOUNT_SETTINGS=[
  {
    id:1,
    title:'Upgrade',
    code:WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.UPGRADE,
    tooltip:'Upgrade my account',
    icon: <UpgradeIcon/>,
    hidden: false,
  },
  {
    id:2,
    title:'My Earnings',
    code:WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.EARNING,
    tooltip:'View my earnings',
    icon: <MonetizationOnIcon/>,
    hidden: false,
  },
  {
    id:3,
    title:'My Account',
    code:WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.ACCOUNT,
    tooltip:'Account Profile',
    icon: <PersonIcon/>,
    hidden: false,
  },
  {
    id:4,
    title:'Sign out',
    code:WORKFLOW_CODES.USER.ACCOUNT_SETTINGS.EXIT,
    tooltip:null,
    icon: <LogoutIcon/>,
    hidden: false,
  }
]

export const PLACEHOLDERS={
    SEARCH: 'Search for people, sessions, topics...'
}

import MailOutlineOutlined from '@mui/icons-material/MailOutlineOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import { ENDPOINTS } from '../../../async';
import { MessageTypes } from '../../../converter';

export const MessageData = [
  {
    type: MessageTypes.INBOX,
    text: 'Inbox',
    icon: InboxOutlinedIcon,
    default: true,
    children: [{
      type: MessageTypes.INBOX_MESSAGE,
      text: 'Messages',
      icon: MailOutlineOutlined,
      api: ENDPOINTS.MESSAGE.ALL_INBOX_CONVERSATION,
      default: true
    },
    {
      type: MessageTypes.INBOX_REQUEST,
      text: 'Requests',
      icon: HandshakeOutlinedIcon,
      api: ENDPOINTS.MESSAGE.ALL_INBOX_REQUEST
    },
    {
      type: MessageTypes.INBOX_RECOMMENDATION,
      text: 'Recommendations',
      icon: RecommendOutlinedIcon,
      api: ENDPOINTS.MESSAGE.ALL_INBOX_RECOMMENDATION
    }]
  },
  {
    type: MessageTypes.SENT,
    text: 'Sent',
    icon: SendOutlined,
    children: [{
      type: MessageTypes.SENT_MESSAGE,
      text: 'Messages',
      icon: MailOutlineOutlined,
      api: ENDPOINTS.MESSAGE.ALL_SENT_CONVERSATION,
      default: true
    },
    {
      type: MessageTypes.SENT_REQUEST,
      text: 'Requests',
      icon: HandshakeOutlinedIcon,
      api: ENDPOINTS.MESSAGE.ALL_SENT_REQUEST
    },
    {
      type: MessageTypes.SENT_RECOMMENDATION,
      text: 'Recommendations',
      icon: RecommendOutlinedIcon,
      api: ENDPOINTS.MESSAGE.ALL_SENT_RECOMMENDATION
    }]
  },
  {
    type: MessageTypes.TRASH,
    text: 'Trash',
    icon: DeleteOutlineOutlined,
    api: ENDPOINTS.MESSAGE.TRASH
  }
];

export const MessageEvent = {
  MESSAGE_DETAILS: 'MESSAGE_DETAILS',
  DELETE_MESSAGE: 'DELETE_MESSAGE',
  FLAG_MESSAGE: 'FLAG_MESSAGE',
  RESTORE_MESSAGE: 'RESTORE_MESSAGE'
}
import React, { useContext } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import { MessageEvent } from '../constants';
import { MessageTypes } from "../../../../converter";
import { MessageContext } from '../context';

const MessageRow = ({ 
  messageType,
  id,
  date,
  noOfMessagesInConversation,
  senderNames,
  shortMessage,
  onMessageEvent
}) => {
  const  { setDetailsData } = useContext(MessageContext)

  const handleOnClick = (event, msgEvent) => {
    event.stopPropagation();
    if (msgEvent === MessageEvent.MESSAGE_DETAILS) {
      setDetailsData({
        messageType,
        id
      });
    } else {
      onMessageEvent(id, msgEvent);
    }
  };

  const isTrash = messageType === MessageTypes.TRASH;

  return (
    <div 
      className={
        `table-row
          h-12 min-h-full items-center px-2
          dark:text-white-100
          ${isTrash ? 'cursor-auto' : 'cursor-pointer hover:shadow-lg hover:shadow-blue-200/50'}
        `
      }
      onClick={(event) => handleOnClick(event, MessageEvent.MESSAGE_DETAILS)}
    >
      <div className="table-cell text-left p-4">
        {senderNames} {noOfMessagesInConversation ? `(${noOfMessagesInConversation})` : ''}
      </div>
      <div className="table-cell text-left font-bold p-2">
        {shortMessage}
      </div>
      <div className="table-cell text-left p-2">
        <div className="flex justify-between">
          <div>{date}</div>
          <DeleteOutlineOutlinedIcon className="cursor-pointer" onClick={(event) => handleOnClick(event, MessageEvent.DELETE_MESSAGE)} />
          {isTrash && <RestoreIcon  className="cursor-pointer" onClick={(event) => handleOnClick(event, MessageEvent.RESTORE_MESSAGE)} />}
        </div>
      </div>
    </div>
  );
};

export default MessageRow;

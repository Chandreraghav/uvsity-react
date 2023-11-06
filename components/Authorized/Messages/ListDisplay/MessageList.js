import React, { useContext, useMemo } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { convertMessagesResponseToList } from '../../../../converter';
import { MessageEvent } from '../constants';
import { MessageContext } from '../context';

const MessageList = ({
  activeTabType,
  data,
  onMessageEvent
}) => {
  const { setDetailsData } = useContext(MessageContext);

  const uiData = useMemo(() => {
    if (Array.isArray(data)) {
      return convertMessagesResponseToList(activeTabType, data || []);
    } else {
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleOnClick = (event, msgEvent) => {
    event.stopPropagation();
    if (msgEvent === MessageEvent.MESSAGE_DETAILS) {
      setDetailsData({
        activeTabType,
        id
      });
    } else {
      onMessageEvent(id, msgEvent);
    }
  };

  return (
    <>
      {
        uiData?.map(({ id, senderNames, noOfMessagesInConversation, shortMessage, date }) => {
          return (
            <div
              key={id}
              className={
                `table-row h-12 min-h-full items-center px-2 dark:text-white-100`
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
                </div>
              </div>
            </div>
          );
        })
      }
    </>
  );
};

export default MessageList;

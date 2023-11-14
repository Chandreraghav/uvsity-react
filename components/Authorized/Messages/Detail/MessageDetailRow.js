import React, { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { UVSityAvatar } from '../../../shared';
import { useDataLayerContextValue } from '../../../../context';
import { NameTooltip } from '../../Shared';

const MessageDetailRow = ({
  senderUserId,
  senderPic,
  senderName,
  isLatestMessage,
  date,
  body,
  recipientNames,
  sendReply,
  className = ''
}) => {
  const [expanded, setExpanded] = useState(!!isLatestMessage);
  const [showReplyBlock, setShowReplyBlock] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [ctxUserdata] = useDataLayerContextValue();

  const userdata = useMemo(() => {
    return ctxUserdata?.userdata;
  }, [ctxUserdata?.userdata]);

  const handleHeaderClick = () => {
    if (!isLatestMessage) {
      setExpanded(!expanded);
    }
  };

  const handleDiscardMessage = () => {
    setShowReplyBlock(false);
    setTextAreaValue('');
  }

  const handleSendReply = () => {
    sendReply(textAreaValue, userdata.userDetailsId);
    handleDiscardMessage();
  }

  return (
    <div className={`${className} flex items-start py-4`}>
      <UVSityAvatar src={senderPic} name={senderName} className="mr-2 avatar-xs" />
      <div className="w-full">
        <div className={`flex justify-between ${isLatestMessage ? '' : 'cursor-pointer'}`} onClick={() => handleHeaderClick()}>
          <div className="text-sm leading-snug">
            <NameTooltip userId={senderUserId}>{senderName}</NameTooltip>
            {!expanded && <span className="sm:line-clamp-1 text-gray-700 dark:text-gray-600 text-xs" dangerouslySetInnerHTML={{ __html: body }} />}
            {expanded && <span className="sm:line-clamp-1 text-gray-700 dark:text-gray-600 text-xs">To: {recipientNames}</span>}
          </div>
          <div>
            {date}
          </div>
        </div>
        {expanded && (
          <>
            <div className={`mt-4 pb-4 text-gray-700 dark:text-gray-600 ${isLatestMessage ? 'border-b' : ''}`} dangerouslySetInnerHTML={{ __html: body }} />
            <div className="mt-4">
              {!showReplyBlock && <Button variant="contained" onClick={() => setShowReplyBlock(true)}>Reply</Button>}
              {
                showReplyBlock && (
                  <div className="flex mt-4 border rounded-2xl flex-col p-4">
                    <textarea
                      value={textAreaValue}
                      className="p-2 border"
                      placeholder="Reply Here"
                      onChange={(event) => setTextAreaValue(event?.currentTarget?.value || '')}
                    />
                    <footer className="flex mt-2 items-center">
                      <Button variant="contained" endIcon={<SendIcon />} className="mr-2" onClick={handleSendReply}>Send</Button>
                      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDiscardMessage()}>Discard</Button>
                    </footer>
                  </div>
                )
              }
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MessageDetailRow;
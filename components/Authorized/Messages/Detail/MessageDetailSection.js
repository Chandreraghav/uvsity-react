import React, { useMemo } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useGetMessageDetail, useSendReplyToMessage } from '../../../../hooks';
import { convertToMessageDetail, createSendReplyPayload } from '../../../../converter';
import MessageDetailRow from './MessageDetailRow';

const MessagesDetailSection = ({ messageId = ''}) => {
  const { data, isLoading, isError, refetch } = useGetMessageDetail(messageId);
  const { mutate: sendReply } = useSendReplyToMessage();

  const uiData = useMemo(() => {
    if (data) {
      return convertToMessageDetail(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box className="flex justify-center">
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoading && (isError || !uiData)) {
    return (
      <div role="tabpanel" className="mt-4">
        <div className="px-4">Unable to fetch the message. Please try after sometime.</div>
      </div>
    );
  }

  const { subject = '', messages = [], messageThread = '' } = uiData || {};

  const handleSendReply = (messageBody, senderUserId, desiredUIData) => {
    const sendReplyPayload = createSendReplyPayload(messageBody, subject, messageThread, senderUserId, desiredUIData);
    sendReply && sendReply(sendReplyPayload, {
      onSuccess: () => refetch(),
      onError: () => console.error('Send Reply Failed')
    });
  }

  return (
    <>
      <div className="text-2xl">{subject}</div>
      <section>
        {
          messages.map((props, index) => {
            const isLatestMessage = messages?.length === index + 1;
            return (
              <MessageDetailRow 
                {...props}
                key={props.id}
                isLatestMessage={isLatestMessage}
                className={`${!isLatestMessage && 'border-b'}`} 
                sendReply={(messageBody, senderUserId) => handleSendReply(messageBody, senderUserId, props)}
              />
            );
          })
        }
      </section>
    </>
  );
}

export default MessagesDetailSection;

import { useMutation } from "@tanstack/react-query"
import MessageDataService from '../../../../pages/api/messages/MessageDataService';

export const useSendReplyToMessage = () => {
  return useMutation(
    (payload) => MessageDataService.replyMessage(payload).then(({ data }) => data)
  );
};

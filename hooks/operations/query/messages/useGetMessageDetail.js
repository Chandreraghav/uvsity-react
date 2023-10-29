import { useQuery } from "@tanstack/react-query"
import { KEYS } from '../../../../async';
import MessageDataService from '../../../../pages/api/messages/MessageDataService';

export const useGetMessageDetail = (messageId) => {
  return useQuery(
    [KEYS.MESSAGES.MESSAGE_DETAIL, messageId],
    () => MessageDataService.getMessageDetail(messageId).then(({ data }) => data), {
      enabled: !!messageId
    }
  );
};

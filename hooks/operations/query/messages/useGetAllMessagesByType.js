import { useQuery } from "@tanstack/react-query"
import { KEYS } from '../../../../async';
import MessageDataService from '../../../../pages/api/messages/MessageDataService';

export const useGetAllMessagesByType = (type, endpoint) => {
  return useQuery(
    [KEYS.MESSAGES.ALL, type],
    () => MessageDataService.getMessagesByApi(endpoint).then(({ data }) => data), {
      enabled: false
    }
  );
};

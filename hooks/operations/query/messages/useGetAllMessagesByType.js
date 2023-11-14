import { useQuery } from "@tanstack/react-query"
import { KEYS } from '../../../../async';
import MessageDataService from '../../../../pages/api/messages/MessageDataService';

export const useGetAllMessagesByType = (type, endpoint, isLoadMore) => {
  return useQuery(
    [KEYS.MESSAGES.ALL, type],
    () => MessageDataService.getMessagesByApi({endpoint, isLoadMore}).then(({ data }) => data), {
      enabled: false,
      cacheTime: 0
    }
  );
};

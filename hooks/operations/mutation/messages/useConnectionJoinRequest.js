import { useMutation } from "@tanstack/react-query"
import MessageDataService from '../../../../pages/api/messages/MessageDataService';

export const useConnectionJoinRequest = () => {
  return useMutation(
    (payload) => MessageDataService.connectJoinRequest(payload).then(({ data }) => data)
  );
};

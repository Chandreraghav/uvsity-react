import { useMutation } from "@tanstack/react-query"
import MessageDataService from '../../../../pages/api/messages/MessageDataService';

export const useTopicJoinRequest = () => {
  return useMutation(
    (payload) => MessageDataService.topicJoinRequest(payload).then(({ data }) => data)
  );
};

import { useMutation } from "@tanstack/react-query"
import MessageDataService from '../../../../pages/api/messages/MessageDataService';

export const useSendRecommendationRequest = () => {
  return useMutation(
    (payload) => MessageDataService.sendRecommendation(payload).then(({ data }) => data)
  );
};

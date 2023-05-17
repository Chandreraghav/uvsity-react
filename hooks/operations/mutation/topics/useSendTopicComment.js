import { useMutation } from "react-query"
import TopicDataService from '../../../../pages/api/topics/TopicDataService';

export const useSendTopicComment = () => {
  return useMutation(
    (payload) => TopicDataService.sendTopicComment(payload).then(({ data }) => data)
  );
};

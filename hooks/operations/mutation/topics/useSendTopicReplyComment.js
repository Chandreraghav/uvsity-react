import { useMutation } from "react-query"
import TopicDataService from '../../../../pages/api/topics/TopicDataService';

export const useSendTopicReplyComment = () => {
  return useMutation(
    (payload) => TopicDataService.sendTopicReplyComment(payload).then(({ data }) => data)
  );
};

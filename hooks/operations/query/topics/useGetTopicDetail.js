import { useQuery } from "react-query"
import { KEYS } from '../../../../async';
import TopicDataService from '../../../../pages/api/topics/TopicDataService';

export const useGetTopicDetail = (topicId) => {
  return useQuery(
    [KEYS.TOPICS.DETAIL, topicId],
    () => TopicDataService.getTopicDetail(topicId).then(({ data }) => data), {
      enabled: !!topicId
    }
  );
};

import { useQuery } from "react-query"
import { KEYS } from '../../../../async';
import TopicDataService from '../../../../pages/api/topics/TopicDataService';

export const useGetAllTopics = () => {
  return useQuery(
    [KEYS.TOPICS.ALL],
    () => TopicDataService.getAllTopics().then(({ data }) => data)
  );
};

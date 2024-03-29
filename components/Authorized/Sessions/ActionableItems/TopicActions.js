import CommentIcon from '@mui/icons-material/Comment';
import ThumbsUp from '@mui/icons-material/ThumbUpSharp';
import { TOPIC_ACTIONS } from '../../../../constants';
import TooltipIconAction from './TooltipIconAction';
import { Box } from '@mui/material';

const TopicActions = ({ mappedTopic, onTopicAction }) => {
  const { topicCommentsCount = 0, topicDetailId = '', noOfLikes = 0 } = mappedTopic || {};

  return (
    <div>
      {topicDetailId && (
        <Box
          className={` flex px-1 py-2 gap-2`}
        >
          {/* TODO - Like is not available as part all-topic summary call. */}
          {/* <TooltipIconAction title="Likes"><ThumbsUp /> {noOfLikes} Like(s)</TooltipIconAction> */}
          <TooltipIconAction title="Comments" onTooltipAction={() => onTopicAction(TOPIC_ACTIONS.COMMENTS)}>
            <CommentIcon /> {topicCommentsCount} Comment(s)
          </TooltipIconAction>
        </Box>
      )}
    </div>
  )
}

export default TopicActions;

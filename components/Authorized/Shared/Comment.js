import { useState } from 'react';
import Button from '@mui/material/Button';
import { UVSityAvatar, CommentInput, ReadMore } from '../../shared';
import { READ_MORE_MAX_LENGTH } from '../../../constants';
import ProfileStyle from "../../../styles/DashboardProfile.module.css";
import { ME, SESSION_COMMENTS, TOOLTIPS } from '../../../constants';
import { Tooltip } from '@mui/material';
import { useDataLayerContextValue } from '../../../context';
import { useMemo } from 'react';

export const Comment = ({
  id,
  comment,
  userName,
  userDetailsId,
  userPic,
  userProfession,
  commentTime,
  replies,
  isReplyToTopicCommentsAllowed = false,
  className = '',
  onUserNameClick,
  currentUserPic,
  currentUserName,
  replyTrigerred
}) => {
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [ctxUserdata, dispatch] = useDataLayerContextValue();

  const onUserClick = (event) => {
    event.preventDefault();
    onUserNameClick && onUserNameClick(userDetailsId);
  };

  const userdata = useMemo(()=>{
    return (ctxUserdata?.userdata)
  },[ctxUserdata?.userdata])


  const isItMe=()=>{
   return userdata.userDetailsId===userDetailsId
  }


  const onReplyCommentTrigger = (comment) => {
    replyTrigerred(id, comment);
    setShowReplyComment(false);
  }

  return (
    <div className={`${className} flex items-start mb-2`}>
      <UVSityAvatar src={userPic} name={userName} className="mr-2 avatar-xs" />
      <div className="w-full">
        <div className="bg-gray-200 dark:bg-gray-dark rounded-md p-2">
          <div className="flex justify-between text-sm leading-snug">
            <Tooltip
              title={
                isItMe()
                  ? TOOLTIPS.GO_TO_PROFILE
                  : TOOLTIPS.VIEW_PROFILE
              }
            >
              <a className={`font-bold ${ProfileStyle.profile__name}  `} onClick={(event) => onUserClick(event)}>{userName}{isItMe() ? ME : <></>}</a>
            </Tooltip>
            <span className="sm:line-clamp-1 text-gray-700 dark:text-gray-600 text-xs">{commentTime}</span>
          </div>
          <span className="mb-2 sm:line-clamp-1 text-xs text-gray-700 dark:text-gray-600">{userProfession}</span>
          <ReadMore
            className="dark:text-gray-500 text-gray-800"
            initialReadLimit={READ_MORE_MAX_LENGTH}
          >
            {comment}
          </ReadMore>
        </div>
        {replies !== undefined && 
          <div className="flex items-center mt-2">
            <div className="pl-2 sm:line-clamp-1 text-gray-700 dark:text-gray-600 text-xs">
              {replies?.length || 0} replies
            </div>
            {
              isReplyToTopicCommentsAllowed && <Button size='small' onClick={() => setShowReplyComment(true)}>Reply</Button>
            }
          </div>
        }
        { !!replies?.length && (
          replies.map((eachReply) => (
            <Comment key={eachReply.id} className="mt-2" isReplyToTopicCommentsAllowed={isReplyToTopicCommentsAllowed} {...eachReply} />
          ))
        )}
        { showReplyComment && (
          <CommentInput 
            label={SESSION_COMMENTS.REPLY_COMMENT}
            userPic={currentUserPic}
            userName={currentUserName}
            className="my-2"
            disabled={!isReplyToTopicCommentsAllowed}
            helperText={(!isReplyToTopicCommentsAllowed) && SESSION_COMMENTS.UNAUTHORIZED}
            commentTrigerred={(comment) => onReplyCommentTrigger(comment)}
          />
        )}
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Divider from "@mui/material/Divider";
import { useGetTopicDetail, useSendTopicComment, useSendTopicReplyComment } from '../../../../hooks';
import { CommentInput } from '../../../shared';
import {
  convertTopicsToCommentProps,
  createSendTopicCommentPayload,
  createReplyTopicCommentPayload
} from '../../../../converter';
import SessionStyle from "../../../../styles/Session.module.css";
import { Comment, navigateToProfile } from '../../Shared';
import { useDataLayerContextValue } from '../../../../context';
import { SESSION_COMMENTS } from '../../../../constants';
import CommentShimmer from './Shimmer/CommentShimmer';

const CommentSection = ({ topicId }) => {
  const router = useRouter();
  const [ctxUserdata] = useDataLayerContextValue();
  const { data, isLoading } = useGetTopicDetail(topicId);
  const { mutate: sendComment } = useSendTopicComment();
  const { mutate: sendReply } = useSendTopicReplyComment();
  const [commentUIData, setCommentUIData] = useState([]);

  const isTopicCommentsAllowed = data?.isTopicCommentsAllowed || false;
  const isReplyToTopicCommentsAllowed = data?.isReplyToTopicCOmmentsAllowed || false;

  const { profilePicName, firstName, lastName, userDetailsId } = ctxUserdata?.userdata || { profilePicName: '', firstName: '', lastName: '', userDetailsId: '' };

  useEffect(() => {
    if (data) {
      const uiData = convertTopicsToCommentProps(data?.topicTO?.topicComments || []);
      setCommentUIData(uiData);
    }
  }, [data]);

  const onSuccessPostComment = (data) => {
    if (data?.topicComments) {
      const uiData = convertTopicsToCommentProps(data.topicComments, ctxUserdata?.userdata);
      setCommentUIData(uiData);
    }
  };

  const triggerCreateComment = (comment) => {
    const sendCommentPayload = createSendTopicCommentPayload(userDetailsId, topicId, comment);

    if (sendCommentPayload) {
      sendComment(sendCommentPayload, {
        onSuccess: onSuccessPostComment
      });
    } else {
      console.error('Something wrong with the payload.');
    }
  };

  const triggerReplyComment = (commentId, comment) => {
    const sendCommentPayload = createReplyTopicCommentPayload(userDetailsId, topicId, comment, commentId);

    if (sendCommentPayload) {
      sendReply(sendCommentPayload, {
        onSuccess: onSuccessPostComment
      });
    } else {
      console.error('Something wrong with the payload.');
    }
  };

  return (
    <>
      <Divider className={SessionStyle.preview__card__divider} />
      <CommentInput
        className="m-2"
        userPic={profilePicName}
        userName={`${firstName} ${lastName}`}
        disabled={!isTopicCommentsAllowed}
        helperText={(!isLoading && !isTopicCommentsAllowed) && SESSION_COMMENTS.UNAUTHORIZED}
        commentTrigerred={(comment) => triggerCreateComment(comment)}
      />
      {[1, 2].map((_, id) => <CommentShimmer key={id} visible={isLoading} />)}
      {!isLoading && (
        <section className="p-2">
          {commentUIData.map((eachComment) => {
            return (
              <Comment
                key={eachComment.id}
                {...eachComment}
                isReplyToTopicCommentsAllowed={isReplyToTopicCommentsAllowed}
                currentUserPic={profilePicName}
                currentUserName={`${firstName} ${lastName}`}
                onUserNameClick={(userDetailsId) => navigateToProfile(userDetailsId, router)}
                replyTrigerred={(id, comment) => triggerReplyComment(id, comment)}
              />
            )
          })}
        </section>
      )}
    </>

  )
}

export default CommentSection;

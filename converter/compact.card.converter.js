import { USER_PROFILE } from '../constants';
import { formatDate } from '../utils';

const convertTopicCommentRepliesToCommentProps = (topicCommentReplies) => {
  const newTopicCommentReplies = topicCommentReplies ?? [];
  const replies = newTopicCommentReplies
    .sort((previousReply, nextReply) => {
      const prevCreatedOn = previousReply?.createdOn ?? 0;
      const nextCreatedOn = nextReply?.createdOn ?? 0;

      return prevCreatedOn - nextCreatedOn;
    })
    .map((eachReply) => {
      const { topicCommentReplyId, topicCommentReply = '', userReplyingToComment, formattedCreatedDateForDisplay } = eachReply || {};
      const {
        firstName = USER_PROFILE.ANONYMOUS,
        lastName = USER_PROFILE.ANONYMOUS,
        profilePicName = '',
        userType = '',
        userDetailsId = ''
      } = userReplyingToComment || {};

      return {
        id: topicCommentReplyId,
        comment: topicCommentReply,
        userName: `${firstName} ${lastName}`,
        userPic: profilePicName,
        userProfession: userType,
        commentTime: formattedCreatedDateForDisplay ?? 'Just Now',
        userDetailsId
      };
    });

  return replies;
}

export const convertTopicsToCommentProps = (topicComments) => {
  const newTopicComments = topicComments ?? [];
  const newCommentsData = newTopicComments.map((eachComment) => {
    const {
      topicCommentId,
      topicComment = '',
      userDetailsSummaryTO,
      topicCommentReplies = [],
      formattedCreatedDateForDisplay
    } = eachComment || {};

    const {
      firstName = USER_PROFILE.ANONYMOUS,
      lastName = USER_PROFILE.ANONYMOUS,
      profilePicName = '',
      userType = '',
      userDetailsId = ''
    } = userDetailsSummaryTO || {};

    return {
      id: topicCommentId,
      comment: topicComment,
      userName: `${firstName} ${lastName}`,
      userPic: profilePicName,
      userProfession: userType,
      commentTime: formattedCreatedDateForDisplay ?? 'Just Now',
      replies: convertTopicCommentRepliesToCommentProps(topicCommentReplies),
      userDetailsId
    };
  });

  return newCommentsData;
}

export const createSendTopicCommentPayload = (userId, topicId, comment, commentId) => {
  const [todayFormattedDate] = formatDate(new Date())?.split(" ") || '';

  let payload = null;
  if (userId && topicId && comment && todayFormattedDate ) {
    payload = {
      userDetailsSummaryTO: {
        userDetailsId: userId
      },
      topicComment: comment,
      topicDetailId: topicId,
      formattedDate: todayFormattedDate
    };
  }

  return payload;
}

export const createReplyTopicCommentPayload = (userId, topicId, comment, commentId) => {
  const [todayFormattedDate] = formatDate(new Date())?.split(" ") || '';

  let payload = null;
  if (userId && topicId && comment && commentId && todayFormattedDate ) {
    payload = {
      userReplyingToComment: {
        userDetailsId: userId
      },
      topicCommentReply: comment,
      topicDetailId: topicId,
      topicCommentId: commentId,
      formattedDate: todayFormattedDate
    };
  }

  return payload;
}

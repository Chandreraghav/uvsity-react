import { USER_PROFILE } from '../constants';

const convertTopicCommentRepliesToCommentProps = (topicCommentReplies = []) => {
  const replies = topicCommentReplies?.map((eachReply) => {
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
      commentTime: formattedCreatedDateForDisplay,
      userDetailsId
    };
  });

  return replies;
}

export const convertTopicsToCommentProps = (topicComments = []) => {
  const newCommentsData = topicComments.map((eachComment) => {
    const {
      topicCommentId,
      topicComment = '',
      userDetailsSummaryTO,
      topicCommentReplies = [],
      formattedCreatedDateForDisplay = ''
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
      commentTime: formattedCreatedDateForDisplay,
      replies: convertTopicCommentRepliesToCommentProps(topicCommentReplies),
      userDetailsId
    };
  });

  return newCommentsData;
}

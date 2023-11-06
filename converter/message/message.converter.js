const RequestMapping = {
  INVITATION_REQUEST: 'Connection Request',
  CREATE_COURSE_REQUEST: 'Session Request',
  RECOMMENDATION_REQUEST: 'Recommendation Request',
  RATING_REQUEST: 'Rating Request',
  TOPIC_JOIN_REQUEST: 'Join Topic Request'
}

export const MessageTypes = {
  INBOX: 'inbox',
  INBOX_MESSAGE: 'inbox_message',
  INBOX_REQUEST: 'inbox_request',
  INBOX_RECOMMENDATION: 'inbox_recommendation',
  SENT: 'sent',
  SENT_MESSAGE: 'sent_message',
  SENT_REQUEST: 'sent_request',
  SENT_RECOMMENDATION: 'sent_recommendation',
  TRASH: 'trash'
}

const convertMessageDataToList = (messageItem) => {
  const { messageConversation, userMessageContainerId } = messageItem;
  const { messageSenders, noOfMessagesInConversation } = messageConversation || {};
  const { messageSubject, createdOnDateInDDMmYYYFormat } = messageConversation?.latestMessageInConversation || {};

  return {
    id: userMessageContainerId,
    senderNames: messageSenders,
    noOfMessagesInConversation,
    date: createdOnDateInDDMmYYYFormat,
    shortMessage: messageSubject
  };
};

const convertRecommendationDataToList = (recommendationItem) => {
  const { createdOnDateInDDMmYYYFormat, requestFrom, userRequestType, userRequestId } = recommendationItem || {};
  const { firstName, lastName, } = requestFrom || {};

  return {
    id: userRequestId,
    senderNames: `${firstName} ${lastName}`,
    noOfMessagesInConversation: undefined,
    date: createdOnDateInDDMmYYYFormat,
    shortMessage: RequestMapping[userRequestType] || ''
  }
};

const convertTrashDataToList = (trashItem) => {
  const { containerId, firstName, lastName, subject } = trashItem;
  return {
    id: containerId,
    senderNames: `${firstName} ${lastName}`,
    noOfMessagesInConversation: undefined,
    date: undefined,
    shortMessage: subject
  }
};

export const convertMessagesResponseToList = (messageType, messageResponse = []) => {
  try {
    const uiData = messageResponse
      .map((currentMessage) => {
        let uiItem = {};
        if (messageType === MessageTypes.INBOX_MESSAGE || messageType === MessageTypes.SENT_MESSAGE) {
          uiItem = convertMessageDataToList(currentMessage);
        } else if (messageType === MessageTypes.INBOX_REQUEST || messageType === MessageTypes.SENT_REQUEST) {
          uiItem = convertRecommendationDataToList(currentMessage);
        } else if (messageType === MessageTypes.TRASH) {
          uiItem = convertTrashDataToList(currentMessage);
        } else if (messageType === MessageTypes.INBOX_RECOMMENDATION) {
          uiItem = null;
        }

        return {
          messageType,
          ...uiItem,
        }
      })
      .filter((newData) => !!newData);

      return uiData;
  } catch (ex) {
    console.error('convertMessageResponseToList error', ex)
  }
}

export const getNumberOfNewItemsCountForInboxTabs = (ctxUserdata = {}, currentTabs = []) => {
  let newCurrentTabs = currentTabs;
  const {
    noOfNewMessages = 0,
    noOfNewCreateCourseRequestsReceived = 0,
    noOfNewInvitationsReceived = 0,
    noOfNewRatingRequestsReceived = 0,
    noOfNewRecommendationRequestsReceived = 0,
    noOfNewRecommendationsReceived = 0,
    noOfNewTopicJoinRequestsReceived = 0
  } = ctxUserdata?.logged_in_info || {};

  const noOfRequests = noOfNewCreateCourseRequestsReceived + noOfNewInvitationsReceived + noOfNewRatingRequestsReceived + noOfNewRecommendationRequestsReceived + noOfNewTopicJoinRequestsReceived;

  newCurrentTabs = currentTabs.map((eachTab) => {
    const { text, type } = eachTab;
    const numberOfNewItemsByType =
      type === MessageTypes.INBOX_MESSAGE ?
        noOfNewMessages : type === MessageTypes.INBOX_REQUEST ?
          noOfRequests : noOfNewRecommendationsReceived;
    return {
      ...eachTab,
      newItemsCount: numberOfNewItemsByType
    }
  });

  return newCurrentTabs;
}
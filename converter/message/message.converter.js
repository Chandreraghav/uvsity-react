export const UserRequestType = {
  INVITATION_REQUEST: 'INVITATION_REQUEST',
  CREATE_COURSE_REQUEST: 'CREATE_COURSE_REQUEST',
  RECOMMENDATION_REQUEST: 'RECOMMENDATION_REQUEST',
  RATING_REQUEST: 'RATING_REQUEST',
  TOPIC_JOIN_REQUEST: 'TOPIC_JOIN_REQUEST'
};

export const UserResponseType = {
  RECOMMENDATION_RESPONSE: 'RECOMMENDATION_RESPONSE'
};

const RequestMapping = {
  [UserRequestType.INVITATION_REQUEST]: 'Connection Request',
  [UserRequestType.CREATE_COURSE_REQUEST]: 'Session Request',
  [UserRequestType.RECOMMENDATION_REQUEST]: 'Recommendation Request',
  [UserRequestType.RATING_REQUEST]: 'Rating Request',
  [UserRequestType.TOPIC_JOIN_REQUEST]: 'Join Topic Request'
};

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
};

export const RequestStatus = {
  PENDING: 'PENDING',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  WAITING_FOR_RESPONSE: 'Waiting For Response',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected'
};

/**
 * Convert message response to UI Data
 * @param {*} messageItem 
 * @returns 
 */
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

/**
 * Convert request response to UI Data
 * @param {*} messageItem 
 * @returns 
 */
const convertRequestDataToList = (requestItem) => {
  const { createdOnDateInDDMmYYYFormat, requestFrom, userRequestType, userRequestId, userRequestText, requestStatus, requestTo } = requestItem || {};
  const { firstName, lastName, profilePicName, userType, city, country, educationalInstitution, userDetailsId: requestFromUserDetailsId = '' } = requestFrom || {};
  const { userDetailsId: requestToUserDetailsId = ''} = requestTo || {};

  const isAccepted = [RequestStatus.ACCEPT, RequestStatus.ACCEPTED].includes(requestStatus);
  const isRejected = [RequestStatus.REJECT, RequestStatus.REJECTED].includes(requestStatus);
  const isPending = [RequestStatus.PENDING, RequestStatus.WAITING_FOR_RESPONSE].includes(requestStatus);

  const requestTextByType = RequestMapping[userRequestType];
  const requestStatusText = isAccepted ? 'Accepted' : isRejected ? 'Rejected' : '';

  return {
    id: userRequestId,
    userInfo: {
      id: userRequestId,
      name: `${firstName} ${lastName}`,
      image: profilePicName,
      profession: userType,
      city,
      country,
      educationalInstitution
    },
    body: userRequestText,
    date: createdOnDateInDDMmYYYFormat,
    requestType: userRequestType,
    requestTypeText: requestTextByType ? `${requestTextByType} ${requestStatusText}` : '',
    isPending,
    isAccepted,
    isRejected,
    isApprovalRequired: [UserRequestType.INVITATION_REQUEST, UserRequestType.TOPIC_JOIN_REQUEST].includes(userRequestType),
    requestFromUserDetailsId,
    requestToUserDetailsId
  }
};

export const createRecommendationRequestPayload = (requestUIData, recommendation) => {
  const { requestFromUserDetailsId,requestToUserDetailsId  } = requestUIData || {};

  return {
    responseTo: {
      userDetailsId: requestFromUserDetailsId
    },
    responseFrom: {
      userDetailsId: requestToUserDetailsId
    },
    recommendation: {
      recommendation
    },
    userResponseType: UserResponseType.RECOMMENDATION_RESPONSE
  }
};

export const updateApprovalRequestUIDataOnAction = (requestUIData = [], userRequestId, accepted) => {
  return requestUIData.map((currentRequestUIData) => {
    const { id = '', requestType } = currentRequestUIData || {};
    const desiredRequest = userRequestId === id;

    if (desiredRequest) {
      const isAccepted = !!accepted;
      const isRejected = !accepted;
      const isPending = false;
      const requestTextByType = RequestMapping[requestType];
      const requestStatusText = isAccepted ? 'Accepted' : isRejected ? 'Rejected' : '';

      return {
        ...currentRequestUIData,
        isAccepted,
        isRejected,
        isPending,
        requestTypeText: requestTextByType ? `${requestTextByType} ${requestStatusText}` : ''
      };
    } else {
      return currentRequestUIData;
    }
  })
}

/**
 * Convert trash response to UI Data
 * @param {*} messageItem 
 * @returns 
 */
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
          uiItem = convertRequestDataToList(currentMessage);
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
};

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
};

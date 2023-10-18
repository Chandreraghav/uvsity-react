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

export const convertMessageResponseToList = (messageType, messageResponse = []) => {
  try {
    // TODO - Not sure about Recommendation
    if (messageType === MessageTypes.INBOX_RECOMMENDATION) {
      return [];
    }

    return messageResponse.map((currentMessage) => {
      const uiData = {
        messageType
      };

      if (messageType === MessageTypes.INBOX_MESSAGE || messageType === MessageTypes.SENT_MESSAGE) {
        const { messageConversation, userMessageContainerId } = currentMessage;
        const { messageSenders, noOfMessagesInConversation } = messageConversation || {};
        const { messageSubject, createdOnDateInDDMmYYYFormat } = messageConversation?.latestMessageInConversation || {};

        return {
          ...uiData,
          id: userMessageContainerId,
          senderNames: messageSenders,
          noOfMessagesInConversation,
          date: createdOnDateInDDMmYYYFormat,
          shortMessage: messageSubject
        }
      } else if (messageType === MessageTypes.INBOX_REQUEST || messageType === MessageTypes.SENT_REQUEST) {
        const { createdOnDateInDDMmYYYFormat, requestFrom, userRequestType, userRequestId } = currentMessage || {};
        const { firstName, lastName, } = requestFrom || {};

        return {
          ...uiData,
          id: userRequestId,
          senderNames: `${firstName} ${lastName}`,
          noOfMessagesInConversation: undefined,
          date: createdOnDateInDDMmYYYFormat,
          shortMessage: RequestMapping[userRequestType] || ''
        }
      } else if (messageType === MessageTypes.TRASH) {
        const { containerId, firstName, lastName, subject } = currentMessage;
        return {
          ...uiData,
          id: containerId,
          senderNames: `${firstName} ${lastName}`,
          noOfMessagesInConversation: undefined,
          date: undefined,
          shortMessage: subject
        }
      }
      
    }).filter((newData) => !!newData);
  } catch (ex) {
    console.error('convertMessageResponseToList error', ex)
  }
}
export const convertToMessageDetail = (data) => {
  const allMessages = Array.isArray(data) && !!data.length ?  data : [];
  const subject = allMessages[0]?.messageSubject || 'Default Subject';
  const messageThread = allMessages[0]?.messageThread || '';
  console.log('data', data);

  const uiMessages = data.map((currentMessage) => {
    const { id, senderProfilePicName, senderUserId, sendername, messageBody, userNamesInTo, createdOnDateInDDMmYYYFormat } = currentMessage || {};

    return {
      id,
      senderPic: senderProfilePicName,
      senderUserId,
      senderName: sendername,
      recipientNames: (userNamesInTo || []).join(', '),
      date: createdOnDateInDDMmYYYFormat,
      body: messageBody
    };
  });
  return {
    subject,
    messageThread,
    messages: uiMessages
  }
};

export const createSendReplyPayload = (body, subject, messageThread, senderUserId, uiData) => {
  const {
    id,
    senderUserId: recipientUserId
  } = uiData || {};
  return {
    // TODO - Need to check regarding this
    htmlFormattedMessageBody: null,
    isMessageBodyHTMLFormatted: false,
    messageBody: body,
    messageSubject: subject,
    messageThread,
    senderUserId,
    usersInTo: [recipientUserId]
  }
}
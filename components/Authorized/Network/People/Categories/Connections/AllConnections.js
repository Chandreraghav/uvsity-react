import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { KEYS } from "../../../../../../async/queries/keys/unique-keys";
import { standardStaleTime } from "../../../../../../async/subscriptions";
import { RESPONSE_TYPES } from "../../../../../../constants/constants";
import { INBOX, RECOMMENDATIONS } from "../../../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../../../constants/workflow-codes";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import MessagingService from "../../../../../../pages/api/people/Messaging/MessageService";
import SearchService from "../../../../../../pages/api/people/network/Search/SearchService";
import { THEME_MODES, useTheme } from "../../../../../../theme/ThemeProvider";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import {
  formattedName,
  formattedProfileSubtitle,
} from "../../../../../../utils/utility";
import PolyMessagingDialog from "../../../../../shared/modals/PolyMessagingDialog";
import PeekProfile from "../../Peek/Profile";
toast.configure();

function AllConnections() {
  const [userdata, _dispatch] = useDataLayerContextValue();
  const _messageEvent = {
    from: null,
    to: null,
    subject: null,
    message: null,
    title:null,
    dialogOpen: false,
    event: null,
  };
  const [messageEvent, setMessageEvent] = useState(_messageEvent);
  const [ctxTheme, dispatch] = useTheme();
  const [isAcceptPersonRequestOptionShown, setAcceptPersonRequestOptionShown] =
    useState(false);

  const [isConnectionRequestSent, setConnectionRequestSent] = useState(false);
  const [isConnectionAcceptRequestSent, setConnectionAcceptRequestSent] =
    useState(false);
  const [isConnectionRequestInProgress, setConnectionRequestInProgress] =
    useState(false);

  const [
    isConnectionAcceptRequestInProgress,
    setConnectionAcceptRequestInProgress,
  ] = useState(false);
  const [isConnectionRequestSendError, setConnectionRequestSendError] =
    useState(false);
  const [
    isConnectionAcceptRequestSendError,
    setConnectionAcceptRequestSendError,
  ] = useState(false);

  const [isMePrefixOnProfileName, setMePrefixOnProfileName] = useState(false);

  const getAllConnections = async (loadMore = false) =>
    (
      await SearchService.searchPeople(
        { isOnlyFriendsRequired: true },
        loadMore
      )
    ).data;
  const ALL_CONNECTIONS = useQuery(
    [KEYS.NETWORK.PEOPLE.CONNECTIONS],
    getAllConnections,
    {
      refetchOnWindowFocus: false,
      staleTime: standardStaleTime,
    }
  );
  const getData = {
    ALL_CONNECTIONS,
  };

  const profilePrimaryLine = (firstName, lastName) =>
    formattedName(firstName, lastName);
  const profileSecondaryLine = (userType, instituition) =>
    formattedProfileSubtitle(userType, instituition);

  const profileTertiaryLine = (city, country) => {
    if (!city && !country) return null;
    if (!country) return city;
    return formattedProfileSubtitle(city, country);
  };
  const handleMessageEvent = (request) => {
    const from = userdata?.userDetailsId;
    const to = request.requestedTo;
    const _messageEvent = {
      from,
      to,
      subject: null,
      message: null,
      title:request.requestTitle,
      dialogOpen: true,
      event: request.event,
    };
    setMessageEvent(_messageEvent);
  };

  const handleMessageEventClosure = (request) => {
    if (request.close) {
      setMessageEvent(_messageEvent);
      return;
    }
    if (request.event === RECOMMENDATIONS.REQUEST_TYPE) {
      const payload = {
        requestTo: {
          userDetailsId: request.recommendation.to,
        },
        requestFrom: {
          userDetailsId: request.recommendation.from,
        },
        userRequestText: request.recommendation.subject,
        userRequestSubject: request.recommendation.message,
        userRequestType: RECOMMENDATIONS.REQUEST_TYPE,
      };
      MessagingService.sendRecommendationRequest(payload)
        .then((res) => {
          setMessageEvent(_messageEvent);
          handleResponse(
            `${RECOMMENDATIONS.REQUEST_SENT_TO}${request.requestTitle}`,
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .catch((err) => {
          setMessageEvent(_messageEvent);
          handleResponse(
            `${RECOMMENDATIONS.REQUEST_SENT_FAILED}${request.requestTitle}`,
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    }
    if (request.event === INBOX.REQUEST_TYPE) {
      const payload = {
        usersInTo: [request.message.to],
        messageSubject: request.message.subject,
        messageBody: request.message.message,
        senderUserId: request.message.from,
        htmlFormattedMessageBody: null,
        isMessageBodyHTMLFormatted: false,
        usersInCc: null,
      };
      MessagingService.sendMessage(payload)
        .then((res) => {
          setMessageEvent(_messageEvent);
          handleResponse(
            `${INBOX.MESSAGE_SENT_TO}${request.requestTitle}`,
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .catch((err) => {
          setMessageEvent(_messageEvent);
          handleResponse(
            `${INBOX.MESSAGE_SENT_FAILED}${request.requestTitle}`,
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        });
    }
  };
  const getMetaData = (data) => {
    const metadata = {
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.cityFullName,
      country: data.countryFullName,
      invitationAction: { invitationAction: data.invitationAction },
      invitationRequestId: data.invitationRequestId,
    };
    return metadata;
  };

  return (
    <div className="    py-2 px-4">
      {getData.ALL_CONNECTIONS.isSuccess &&
        getData.ALL_CONNECTIONS.data &&
        getData.ALL_CONNECTIONS.data instanceof Array && (
          <Box sx={{ width: "100%", display: "flex" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >
              {getData.ALL_CONNECTIONS.data.map((data, index) => (
                <Grid
                  key={data.userDetailsId}
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <PeekProfile
                    isOpen={true}
                    fullWidth
                    options={{ connect: false, mixedMode: false }}
                    metaData={getMetaData(data)}
                    isConnectToPersonOptionShown={false}
                    isAcceptPersonRequestOptionShown={
                      isAcceptPersonRequestOptionShown
                    }
                    isConnectionRequestSent={isConnectionRequestSent}
                    isConnectionAcceptRequestSent={
                      isConnectionAcceptRequestSent
                    }
                    isConnectionRequestInProgress={
                      isConnectionRequestInProgress
                    }
                    isConnectionAcceptRequestInProgress={
                      isConnectionAcceptRequestInProgress
                    }
                    isConnectionRequestSendError={isConnectionRequestSendError}
                    isConnectionAcceptRequestSendError={
                      isConnectionAcceptRequestSendError
                    }
                    dark={ctxTheme.mode === THEME_MODES.DARK}
                    data={{
                      oid: data.userDetailsId,
                      avatar: data.profilePicName,
                      primary: profilePrimaryLine(
                        data.firstName,
                        data.lastName
                      ),
                      secondary: profileSecondaryLine(
                        data.userTypeFullDescription,
                        data.educationalInstitutionFullName
                      ),
                      tertiary: profileTertiaryLine(
                        data.cityFullName,
                        data.countryFullName
                      ),
                      isItMe: false,
                    }}
                    messageEvent={handleMessageEvent}
                  />
                </Grid>
              ))}
            </Grid>
            <PolyMessagingDialog
              workflow={
                messageEvent.event === RECOMMENDATIONS.REQUEST_TYPE
                  ? WORKFLOW_CODES.MESSAGING.RECOMMENDATIONS.SEND_RECOMMENDATION
                  : WORKFLOW_CODES.MESSAGING.INBOX.SEND_MESSAGE
              }
              title={`${messageEvent.title}`}
              dialogCloseRequest={handleMessageEventClosure}
              data={messageEvent}
              isOpen={messageEvent.dialogOpen}
            ></PolyMessagingDialog>
          </Box>
        )}
    </div>
  );
}

export default AllConnections;

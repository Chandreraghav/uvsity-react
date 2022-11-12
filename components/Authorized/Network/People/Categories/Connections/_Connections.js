import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RESPONSE_TYPES } from "../../../../../../constants/constants";
import { PEOPLE } from "../../../../../../constants/error-messages";
import { INBOX, NETWORK, PAYLOAD_DEFAULT_TEXTS, RECOMMENDATIONS, TITLES } from "../../../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../../../constants/workflow-codes";
import { useDataLayerContextValue } from "../../../../../../context/DataLayer";
import { getWorkflowError } from "../../../../../../error-handler/handler";
import MessagingService from "../../../../../../pages/api/people/Messaging/MessageService";
import ConnectionService from "../../../../../../pages/api/people/network/ConnectionService";
import { THEME_MODES, useTheme } from "../../../../../../theme/ThemeProvider";
import { handleResponse } from "../../../../../../toastr-response-handler/handler";
import {
  formattedName,
  formattedProfileSubtitle,
} from "../../../../../../utils/utility";
import PolyMessagingDialog from "../../../../../shared/modals/PolyMessagingDialog";
import Profile from "../../Listing/View/Cards/Profile";
toast.configure();

function Connections(props) {
  const [userdata, _dispatch] = useDataLayerContextValue();
  console.log(userdata);
  const _messageEvent = {
    from: null,
    to: null,
    subject: null,
    message: null,
    title: null,
    dialogOpen: false,
    event: null,
  };
  const [messageEvent, setMessageEvent] = useState(_messageEvent);
  const [ctxTheme, dispatch] = useTheme();
  

  const [connData, setConnectionData] = useState([])

  

  

  const [isMePrefixOnProfileName, setMePrefixOnProfileName] = useState(false);
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
    const to = request?.requestedTo;
    const _messageEvent = {
      from,
      to,
      subject: null,
      message: null,
      title: request.requestTitle,
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
            `${RECOMMENDATIONS.REQUEST_SENT_TO}${request.recommendation.title}`,
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .catch((err) => {
          setMessageEvent(_messageEvent);
          handleResponse(
            `${RECOMMENDATIONS.REQUEST_SENT_FAILED}${request.recommendation.title}`,
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
            `${INBOX.MESSAGE_SENT_TO}${request.message.title}`,
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .catch((err) => {
          setMessageEvent(_messageEvent);
          handleResponse(
            `${INBOX.MESSAGE_SENT_FAILED}${request.message.title}`,
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
  const getPayload = (obj) => {
    let payload = {
      requestFrom: {
        userDetailsId: userdata.userdata.userDetailsId,
      },
      requestTo: { userDetailsId: obj.data.oid },
      userRequestText: "",
      userRequestType: NETWORK.REQUEST_TYPE,
    };
    let requestText =
      PAYLOAD_DEFAULT_TEXTS.CONNECTION_REQUEST_SENDING_TEXT.replace(
        "#X#",
        payload.requestFrom
      );
    requestText = PAYLOAD_DEFAULT_TEXTS.CONNECTION_REQUEST_SENDING_TEXT.replace(
      "#Y#",
      payload.requestTo
    );
    payload.userRequestText = requestText;
    return payload;
  };
  const addToNetwork = (obj) => {
    if (!obj) return;
    const tempConn = connData;
    let objectIdx = -1
    if (tempConn.length > 0) {
      objectIdx = tempConn.findIndex((connData) => connData.userDetailsId === obj.data.oid)
      if (objectIdx !== -1) {
        tempConn[objectIdx].isConnectionRequestInProgress = true
        setConnectionData(tempConn)
      }
    }
    const firstName = obj.metaData.firstName;
    ConnectionService.sendConnectionRequest(
      getPayload(obj)
    )
      .then(() => {

        if (objectIdx !== -1) {
          tempConn[objectIdx].isConnectionRequestSendError = false
          setConnectionData(tempConn)
        }
        //props.dataChange(true)
        handleResponse(
          `${TITLES.CONNECTION_REQUEST_SENT_TO}${firstName}`,
          RESPONSE_TYPES.SUCCESS,
          toast.POSITION.TOP_RIGHT
        );
      })
      .catch(() => {

        if (objectIdx !== -1) {
          tempConn[objectIdx].isConnectionRequestSendError = true
          setConnectionData(tempConn)
        }
        //props.dataChange(false)
        handleResponse(
          getWorkflowError(
            PEOPLE.NETWORK.CONNECTION_REQUEST_ERROR + " " + firstName
          ),
          RESPONSE_TYPES.ERROR,
          toast.POSITION.TOP_RIGHT
        );
      })
      .finally(() => {

        if (objectIdx !== -1) {
          tempConn[objectIdx].isConnectionRequestInProgress = false
          tempConn[objectIdx].isConnectionRequestSent = true
          setConnectionData(tempConn)
        }
      });
  };

  const acceptRequest = (obj) => {
    if (!obj) return
    const tempConn = connData;
    let objectIdx = -1
    if (tempConn.length > 0) {

      objectIdx = tempConn.findIndex((connData) => connData.userDetailsId === obj.data.oid)
      if (objectIdx !== -1) {
        tempConn[objectIdx].isConnectionAcceptRequestInProgress = true
        setConnectionData(tempConn)
      }
    }

    const firstName = obj.metaData.firstName;
    if (
      obj.metaData.invitationRequestId
    ) {
      const requestId =
        obj.metaData.invitationRequestId
      ConnectionService.acceptConnectionRequest(requestId)
        .then(() => {

          if (objectIdx !== -1) {
            tempConn[objectIdx].isConnectionAcceptRequestSendError = false
            setConnectionData(tempConn)
          }
        //props
        //  props.dataChange(true)
          handleResponse(
            TITLES.CONNECTED_PEOPLE.replace("#X#", firstName),
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.TOP_LEFT
          );
        })
        .catch(() => {

          if (objectIdx !== -1) {
            tempConn[objectIdx].isConnectionAcceptRequestSendError = true
            setConnectionData(tempConn)
          }
          //props.dataChange(false)
          handleResponse(
            getWorkflowError(
              PEOPLE.NETWORK.CONNECTION_ACCEPT_ERROR + " " + firstName
            ),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.TOP_LEFT
          );
        })
        .finally(() => {

          if (objectIdx !== -1) {
            tempConn[objectIdx].isConnectionAcceptRequestInProgress = false
            tempConn[objectIdx].isConnectionAcceptRequestSent = true

            setConnectionData(tempConn)
          }
        });
    } else {

      if (objectIdx !== -1) {
        tempConn[objectIdx].isConnectionAcceptRequestInProgress = false
        tempConn[objectIdx].isConnectionAcceptRequestSendError = true
        setConnectionData(tempConn)
      }
      handleResponse(
        TITLES.CONNECTED_PEOPLE_ALREADY.replace("#X#", firstName),
        RESPONSE_TYPES.INFO,
        toast.POSITION.TOP_RIGHT
      );
    }
  };

  useEffect(() => {
    if (props && props?._data instanceof Array) {
      props?._data.forEach((data, index) => {
        data.isConnectToPersonOptionShown = data.invitationAction !== NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK
        data.isAcceptPersonRequestOptionShown = data.invitationAction === NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST || NETWORK.CONNECTION_RELATION_STATE.ACCEPT_REQUEST;
        data.isConnectionRequestSent = false;
        data.isConnectionAcceptRequestSent = false;
        data.isConnectionRequestInProgress = false
        data.isConnectionAcceptRequestInProgress = false;
        data.isConnectionRequestSendError = false;
        data.isConnectionAcceptRequestSendError = false
      })
      setConnectionData(props?._data)
    }
    return () => {
      setConnectionData([])
    }
  }, [props, props?._data])

  return (
    <div className="py-2 px-4">
      {props.properties && (
        <Typography className="py-1" variant="h5">
          {<props.properties.icon />} {props.properties.title}
        </Typography>

      )}
      {connData &&
        connData instanceof Array && (
          <Box sx={{ width: "100%", display: "flex" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            >
              {connData.map((data, index) => (
                <Grid
                  key={data.userDetailsId}
                  item
                  lg={6}
                  xl={4}
                  md={12}
                  sm={12}
                  xs={12}
                >
                  <Profile
                    isOpen={true}
                    listed={true}
                    connected={data.invitationAction === NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK}
                    workflow={WORKFLOW_CODES.PEOPLE.PROFILE_VIEW}
                    fullWidth
                    options={{ connect: false, mixedMode: true }}
                    metaData={getMetaData(data)}
                    isConnectToPersonOptionShown={data.isConnectToPersonOptionShown}
                    isAcceptPersonRequestOptionShown={
                      data.isAcceptPersonRequestOptionShown
                    }
                    isConnectionRequestSent={data.isConnectionRequestSent}
                    isConnectionAcceptRequestSent={
                      data.isConnectionAcceptRequestSent
                    }
                    isConnectionRequestInProgress={
                      data.isConnectionRequestInProgress
                    }
                    isConnectionAcceptRequestInProgress={
                      data.isConnectionAcceptRequestInProgress
                    }
                    isConnectionRequestSendError={data.isConnectionRequestSendError}
                    isConnectionAcceptRequestSendError={
                      data.isConnectionAcceptRequestSendError
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
                    addToNetwork={addToNetwork}
                    acceptRequest={acceptRequest}
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

export default Connections;

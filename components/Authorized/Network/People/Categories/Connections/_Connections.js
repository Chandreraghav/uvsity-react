import { CoPresentOutlined } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RESPONSE_TYPES } from "../../../../../../constants/constants";
import { PEOPLE } from "../../../../../../constants/error-messages";
import { INBOX, NETWORK, PAYLOAD_DEFAULT_TEXTS, RECOMMENDATIONS, TITLES } from "../../../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../../../constants/workflow-codes";
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
  const [userdata,setUserData] = useState(props?.userdata)
   
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
  const [i, setI]=useState(0)

  const [connData, setConnectionData] = useState([])
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
        userDetailsId: userdata.userDetailsId,
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
    const tempConn = connData.slice()
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
      .then((res) => {
        if (objectIdx !== -1) {
          tempConn[objectIdx].invitationAction =NETWORK.CONNECTION_RELATION_STATE_ALT.AWAITING_RESPONSE
          tempConn[objectIdx].isConnectionRequestSendError = false
          tempConn[objectIdx].isConnectionRequestInProgress = false
          tempConn[objectIdx].isConnectionRequestSent = true
          tempConn[objectIdx].isConnectToPersonOptionShown=false
          setConnectionData(current =>
            current.map(obj => {
              if (obj.id === objectIdx) {
                return {...obj, ...tempConn[objectIdx]};
              }
              return obj;
            }),
          );
          handleResponse(
            `${TITLES.CONNECTION_REQUEST_SENT_TO}${firstName}`,
            RESPONSE_TYPES.SUCCESS,
            toast.POSITION.TOP_RIGHT
          );
           
        }
       
      })
      .catch((err) => {
         props.dataChange(false)
        if (objectIdx !== -1) {
          tempConn[objectIdx].invitationAction =NETWORK.CONNECTION_RELATION_STATE_ALT.CONNECT
          tempConn[objectIdx].isConnectionRequestSendError = true
          tempConn[objectIdx].isConnectionRequestInProgress = false
          tempConn[objectIdx].isConnectionRequestSent = false
          tempConn[objectIdx].isConnectToPersonOptionShown=true
          setConnectionData(current =>
            current.map(obj => {
              if (obj.id === objectIdx) {
                return {...obj, ...tempConn[objectIdx]};
              }
              return obj;
            }),
          );
          handleResponse(
            getWorkflowError(
              PEOPLE.NETWORK.CONNECTION_REQUEST_ERROR + " " + firstName
            ),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.TOP_RIGHT
          );
        }
       
      })
  };

  const acceptRequest = (obj) => {
    if (!obj) return
    const tempConn = connData.slice()
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
        .then((res) => {
          if (objectIdx !== -1) {
            tempConn[objectIdx].invitationAction =NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK
            tempConn[objectIdx].isConnectionAcceptRequestInProgress = false
            tempConn[objectIdx].isConnectionAcceptRequestSent = true
            tempConn[objectIdx].isConnectionAcceptRequestSendError = false
            tempConn[objectIdx].isConnectionRequestSent = false
            tempConn[objectIdx].isConnectToPersonOptionShown=false
            tempConn[objectIdx].isConnectionRequestInProgress = false
            setConnectionData(current =>
              current.map(obj => {
                if (obj.id === objectIdx) {
                  return {...obj, ...tempConn[objectIdx]};
                }
                return obj;
              }),
            );
            handleResponse(
              TITLES.CONNECTED_PEOPLE.replace("#X#", firstName),
              RESPONSE_TYPES.SUCCESS,
              toast.POSITION.TOP_LEFT
            );
             
          }
         
       
        
        })
        .catch(() => {
          props.dataChange(false)
          if (objectIdx !== -1) {
            tempConn[objectIdx].invitationAction =NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST
            tempConn[objectIdx].isConnectionAcceptRequestSendError = true
            tempConn[objectIdx].isConnectionAcceptRequestInProgress = false
            tempConn[objectIdx].isConnectionAcceptRequestSent = false
            tempConn[objectIdx].isConnectionRequestSent = false
            tempConn[objectIdx].isConnectToPersonOptionShown=false
            tempConn[objectIdx].isConnectionRequestInProgress = false
            setConnectionData(current =>
              current.map(obj => {
                if (obj.id === objectIdx) {
                  return {...obj, ...tempConn[objectIdx]};
                }
                return obj;
              }),
            );

            handleResponse(
              getWorkflowError(
                PEOPLE.NETWORK.CONNECTION_ACCEPT_ERROR + " " + firstName
              ),
              RESPONSE_TYPES.ERROR,
              toast.POSITION.TOP_LEFT
            );
          }
          
          //props.dataChange(false)
       
        })
    } 
  };

  useEffect(() => {
    if (props && props?._data instanceof Array) {
      props?._data.forEach((data, index) => {
        data.isConnectToPersonOptionShown = data.invitationAction !== NETWORK.CONNECTION_RELATION_STATE_ALT.IN_MY_NETWORK
        data.isAcceptPersonRequestOptionShown = (data.invitationAction === NETWORK.CONNECTION_RELATION_STATE_ALT.ACCEPT_REQUEST || data.invitationAction===NETWORK.CONNECTION_RELATION_STATE.ACCEPT_REQUEST)?true:false;
        data.isConnectionRequestSent = false;
        data.isConnectionAcceptRequestSent = false;
        data.isConnectionRequestInProgress = false
        data.isConnectionAcceptRequestInProgress = false;
        data.isConnectionRequestSendError = false;
        data.isConnectionAcceptRequestSendError = false
      })
      setConnectionData(props?._data)
      setUserData(props?.userdata)
    }
    return () => {
      setConnectionData([])
      setUserData(null)
    }
  }, [props, props?._data,props?.userdata])

  return (
    <div className="py-2 px-4">
       
      {props.properties && (
        <Typography className="py-2 flex lg:justify-start md:justify-start xs:justify-center sm:justify-center " variant="h5">
          {<props.properties.icon fontSize="large" className="mt-1" />}
          <div className=" space-x-2 px-2 w-2"></div>
          <div className="mt-2 flex">
          <div>{props.properties.title}
          </div>

          {props.properties.subtitle && (
            <div className="flex  dark:text-gray-500 text-gray-700">
          <div className=" space-x-2 px-2">&raquo;</div>
          <div className=" ml-auto leading-tight mt-0.5 ">{props.properties.subtitle}</div>
          
          </div>
          )}

          </div>
          
                 </Typography>

      )}
      {connData &&
         (
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
                    workflow={props.workflow??WORKFLOW_CODES.PEOPLE.PROFILE_VIEW}
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

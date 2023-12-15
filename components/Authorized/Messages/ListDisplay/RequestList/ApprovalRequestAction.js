import React from "react";
import Button from "@mui/material/Button";
import ThumbDown from '@mui/icons-material/ThumbDown';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { useTopicJoinRequest, useConnectionJoinRequest } from '../../../../../hooks';
import { UserRequestType } from '../../../../../converter';

const ApprovalRequestAction = ({ requestUIData, handleAction }) => {
  
  const { mutate: triggerTopicJoinAction } = useTopicJoinRequest();
  const { mutate: triggerConnectionJoinAction } = useConnectionJoinRequest();

  const { isPending = true, requestType, id } = requestUIData || {};

  const onActionCompletion = (status) => {
    handleAction && handleAction(id, status);
  }

  const handleAccept = () => {
    const payload = {userRequestId: id, isAccepting: true};
    if (requestType === UserRequestType.INVITATION_REQUEST) {
      triggerConnectionJoinAction(payload, { onSuccess: () => {
        onActionCompletion(true);
      }});
    } else if (requestType === UserRequestType.TOPIC_JOIN_REQUEST) {
      triggerTopicJoinAction(payload, { onSuccess: () => {
        onActionCompletion(true);
      }});
    }
  };

  const handleReject = () => {
    const payload = {userRequestId: id, isAccepting: false};
    if (requestType === UserRequestType.INVITATION_REQUEST) {
      triggerConnectionJoinAction(payload, { onSuccess: () => {
        onActionCompletion(false);
      }});
    } else if (requestType === UserRequestType.TOPIC_JOIN_REQUEST) {
      triggerTopicJoinAction(payload, { onSuccess: () => {
        onActionCompletion(false);
      }});
    }
  }

  return isPending ? (
    <div className="flex mt-4 items-center">
      <Button variant="contained" endIcon={<ThumbUp />} className="mr-2" onClick={() => handleAccept()}>Accept</Button>
      <Button variant="outlined" startIcon={<ThumbDown />} onClick={() => handleReject()}>Reject</Button>
    </div>
  ) : null;
};

export default ApprovalRequestAction;

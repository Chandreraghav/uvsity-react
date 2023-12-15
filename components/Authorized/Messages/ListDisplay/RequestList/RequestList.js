import React, { useEffect, useState } from "react";
import { convertMessagesResponseToList, UserRequestType, updateApprovalRequestUIDataOnAction, MessageTypes } from '../../../../../converter';
import { UVSityAvatar } from '../../../../shared';
import NameCard from './NameCard';
import ApprovalRequestAction from './ApprovalRequestAction';
import RecommendationRequestAction from './RecommendationRequestAction';

const RequestList = ({
  parentActiveTab,
  activeTabType,
  data
}) => {
  const [uiData, setUIData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const newUIData = convertMessagesResponseToList(activeTabType, data || []);
      setUIData(newUIData);
    } else {
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const isSentMessageType = parentActiveTab === MessageTypes.SENT;

  const handleApprovalRequestAction = (userRequestId, accepted) => {
    const newUIData = updateApprovalRequestUIDataOnAction(uiData, userRequestId, accepted) || [];
    setUIData(newUIData);
  }

  const getRequestAction = (requestUIData) => {
    const { requestType = '' } = requestUIData || {};

    switch(requestType) {
      case UserRequestType.INVITATION_REQUEST:
      case UserRequestType.TOPIC_JOIN_REQUEST: {
        return <ApprovalRequestAction requestUIData={requestUIData} handleAction={handleApprovalRequestAction} />
      }
      case UserRequestType.RECOMMENDATION_REQUEST: {
        return <RecommendationRequestAction requestUIData={requestUIData} />
      }
      default: {
        return null;
      }
    }
  };

  return (
    <>
      {
        uiData?.map((eachData) => {
          const { id, userInfo } = eachData;
          return (
            <div
              key={id}
              className={`table-row h-12 min-h-full items-center px-2 dark:text-white-100`}
            >
              <div className="flex items-start py-4">
                <UVSityAvatar src={userInfo?.image || ''} name={userInfo?.name || ''} className="mr-2 avatar-xs" />
                <div className="flex flex-col grow">
                  <NameCard uiData={eachData} />
                  {!isSentMessageType && <>{getRequestAction(eachData)}</>}
                </div>
              </div>
            </div>
          );
        })
      }
    </>
  );
};

export default RequestList;

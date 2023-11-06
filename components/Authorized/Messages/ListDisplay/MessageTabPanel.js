import React, { useEffect, useMemo } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useGetAllMessagesByType } from '../../../../hooks';
import { MessageTypes } from '../../../../converter';
import MessageList from './MessageList';

const MessageTabPanel = ({ activeTabType, activeTabApi }) => {
  const { data, isLoading, isError, refetch } = useGetAllMessagesByType(activeTabType, activeTabApi);

  useEffect(() => {
    if (activeTabApi) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabApi]);

  const RowSection = useMemo(() => {
    if (activeTabType === MessageTypes.INBOX_MESSAGE || activeTabType === MessageTypes.SENT_MESSAGE) {
      return <MessageList activeTabType={activeTabType} data={data} />
    } else if (activeTabType === MessageTypes.INBOX_REQUEST || activeTabType === MessageTypes.SENT_REQUEST) {
      return <MessageList activeTabType={activeTabType} data={data} />
    } else {
      return (
        <div className={`table-row h-12 min-h-full items-center px-2 dark:text-white-100`}>
          Coming Soon ...
        </div>
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!isLoading && isError) {
    return (
      <div role="tabpanel" className="mt-4">
        <div className="px-4">Unable to fetch the messages. Please try after sometime.</div>
      </div>
    );
  }

  if (!isLoading && data?.length === 0) {
    return (
      <div role="tabpanel" className="mt-4">
        <div className="px-4">There are no messages.</div>
      </div>
    );
  }

  const handleMessageEvent = (id, eventType) => {
    console.log('id', id);
    console.log('eventType', eventType);
  }

  return (
    <div role="tabpanel" className="mt-4">
      {isLoading ? (
        <Box className="flex justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <div className="table w-full">
          <div className="table-row-group">
            <>{RowSection}</>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageTabPanel;

import React, { useState, useEffect, useMemo } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useGetAllMessagesByType, useGetAllMessagesByTypeLoadMore } from '../../../../hooks';
import { MessageTypes } from '../../../../converter';
import MessageList from './MessageList';
import RequestList from './RequestList/RequestList';

const MessageTabPanel = ({ parentActiveTab, activeTabType, activeTabApi }) => {
  const [currentData, setCurrentData] = useState([]);
  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const { data, isLoading, isError, refetch, isFetching } = useGetAllMessagesByType(activeTabType, activeTabApi, isLoadMoreClicked);

  useEffect(() => {
    if (activeTabApi) {
      setIsLoadMoreClicked(false);
      setCurrentData([]);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabApi]);

  useEffect(() => {
    if (isLoadMoreClicked) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadMoreClicked])

  useEffect(() => {
    if (data) {
      const dataLength = data?.length || 0; 
      if (!isLoadMoreClicked || !!dataLength) {
        const nonNullCurrentData = currentData || [];
        setCurrentData([...currentData, ...data]);
        setIsLoadMoreClicked(false);
      }
      setShowLoadMore(dataLength === 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const RowSection = useMemo(() => {
    if (!!currentData?.length) {
      if (activeTabType === MessageTypes.INBOX_MESSAGE || activeTabType === MessageTypes.SENT_MESSAGE) {
        return <MessageList activeTabType={activeTabType} data={currentData} />
      } else if (activeTabType === MessageTypes.INBOX_REQUEST || activeTabType === MessageTypes.SENT_REQUEST) {
        return <RequestList parentActiveTab={parentActiveTab} activeTabType={activeTabType} data={currentData} />
      } else {
        return (
          <div className={`table-row h-12 min-h-full items-center px-2 dark:text-white-100`}>
            Coming Soon ...
          </div>
        );
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  if (!isLoading && isError) {
    return (
      <div role="tabpanel" className="mt-4">
        <div className="px-4">Unable to fetch the messages. Please try after sometime.</div>
      </div>
    );
  }

  if (!isLoading && currentData?.length === 0) {
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
        <>
          <div className="table w-full">
            <div className="table-row-group">
              <>{RowSection}</>
            </div>
          </div>
          {showLoadMore && <Button variant="contained" className="flex mt-2 mb-2 w-full" onClick={() => setIsLoadMoreClicked(true)} disabled={isFetching}>
            {isFetching ? 'Loading More Data ...' : 'Load More'}
          </Button>}
        </>
      )}
    </div>
  );
};

export default MessageTabPanel;

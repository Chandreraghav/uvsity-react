import React, { useEffect, useMemo } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useGetAllMessagesByType } from '../../../../hooks';
import { convertMessageResponseToList } from '../../../../converter';
import MessageRow from './MessageRow';

const MessageTabPanel = ({ activeTabType, api }) => {
  const { data, isLoading, isError, refetch } = useGetAllMessagesByType(activeTabType, api);

  useEffect(() => {
    if (api) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const uiData = useMemo(() => {
    if (data) {
      return convertMessageResponseToList(activeTabType, data || []);
    } else {
      return [];
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

  if (!isLoading && uiData?.length === 0) {
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
            {
              uiData?.map((props) => {
                return (
                  <MessageRow {...props} key={props.id} onMessageEvent={handleMessageEvent} />
                );
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageTabPanel;

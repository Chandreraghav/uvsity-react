import React, { useState } from "react";
import { Button } from '@mui/material'
import CreateOutlined from '@mui/icons-material/CreateOutlined';
import { MessageData } from './constants';
import MessageTypeItem from './MessageTypeItem';
import ListDisplay from './ListDisplay/ListDisplay';
import Detail from './Detail/Detail';
import { MessageContextProvider } from './context';

const Messages = () => {
  const [currentActive, setCurrentActive] = useState(MessageData.find((eachType) => !!eachType.default)?.type || '');
  const [detailsData, setDetailsData] = useState(null);

  const contextValue = {
    detailsData,
    setDetailsData
  };

  const onNavItemClick = (type) => {
    setCurrentActive(type || '');
    setDetailsData(null);
  }

  return (
    <MessageContextProvider value={contextValue}>
      <div className="grid grid-cols-12 px-2 mx-auto xl:container gap-4 mt-6 mb-14">
        <aside className="col-span-12 md:col-span-3">
          <Button variant="contained" startIcon={<CreateOutlined />} className="mb-4">
            Compose
          </Button>
          <ul>
            {MessageData.map((props) => {
              return (
                <MessageTypeItem 
                  {...props} 
                  key={props.type} 
                  className="mb-2" 
                  currentActive={currentActive} 
                  onActiveItemChange={() => onNavItemClick(props?.type)} 
                />
              );
            })}
          </ul>
        </aside>
        <section className="col-span-12 md:col-span-8 rounded-lg p-2 uvsity__card__border__theme bg-gray-100 dark:bg-gray-900">
          {detailsData ? <Detail /> : <ListDisplay currenMessageItemType={currentActive} />}
        </section>
      </div>
    </MessageContextProvider>
  );
}

export default Messages;

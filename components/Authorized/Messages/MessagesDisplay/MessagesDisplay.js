import React, { useState, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { MessageData } from '../constants';
import MessageTabPanel from './MessageTabPanel';

const MessagesDisplay = ({ currenMessageItemType = MessageData?.at(0)?.type }) => {
  const [currentActiveTabApi, setCurrentActiveTabApi] = useState('');
  const [currentActiveTab, setCurrentActiveTab] = useState('');
  const [currentTabs, setCurrentTabs] = useState([]);

  useEffect(() => {
    if (currenMessageItemType) {
      const newMessageItem = MessageData.find(({ type }) => type === currenMessageItemType);
      const defaultChildrenItem = newMessageItem?.children?.find((eachChild) => !!eachChild?.default) || newMessageItem;
      setCurrentActiveTab(defaultChildrenItem?.type || '');
      setCurrentActiveTabApi(defaultChildrenItem?.api || '');
      setCurrentTabs(newMessageItem?.children || []);
    }
  }, [currenMessageItemType]);

  const handleTabChange = (event, newActiveTabType) => {
    const newMessageItem = MessageData.find(({ type }) => type === currenMessageItemType);
    const activeChildrenItem = newMessageItem?.children?.find((eachChild) => newActiveTabType === eachChild?.type);
    setCurrentActiveTab(activeChildrenItem?.type || '');
    setCurrentActiveTabApi(activeChildrenItem?.api || '');
  }

  if (!currentActiveTab) {
    return <div>There is something wrong. Please try again later.</div>;
  }

  const isTabsAvailable = !!currentTabs.length;

  return (
    <>
      {isTabsAvailable && (
        <Tabs
          value={currentActiveTab}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          {
            currentTabs.map(({ icon: Icon, text, type }) => {
              return (
                <Tab icon={<Icon />} iconPosition="start" label={text} value={type} key={type} />
              )
            })
          }
        </Tabs>
      )}
      <MessageTabPanel activeTabType={currentActiveTab} api={currentActiveTabApi} />
    </>
  );
}

export default MessagesDisplay;

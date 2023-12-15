import React, { useState, useEffect, useContext } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import { useDataLayerContextValue } from '../../../../context';
import { MessageTypes, getNumberOfNewItemsCountForInboxTabs } from "../../../../converter";
import { MessageData } from '../constants';
import MessageTabPanel from './MessageTabPanel';

const ListDisplay = ({ currenMessageItemType = MessageData?.at(0)?.type }) => {
  const [currentTabData, setCurrentTabData] = useState({
    activeTabType: '',
    activeTabApi: ''
  });

  const { activeTabType: currentActiveTab } = currentTabData;

  const [currentTabs, setCurrentTabs] = useState([]);

  const [ctxUserdata] = useDataLayerContextValue();

  useEffect(() => {
    if (currenMessageItemType && ctxUserdata) {
      const newMessageItem = MessageData.find(({ type }) => type === currenMessageItemType);
      const defaultChildrenItem = newMessageItem?.children?.find((eachChild) => !!eachChild?.default) || newMessageItem;
      setCurrentTabData({
        parentActiveTab: newMessageItem?.type || '',
        activeTabType: defaultChildrenItem?.type || '',
        activeTabApi: defaultChildrenItem?.api || ''
      });

      let currentTabs = newMessageItem?.children || [];
      

      if (currenMessageItemType === MessageTypes.INBOX) {
        currentTabs = getNumberOfNewItemsCountForInboxTabs(ctxUserdata, currentTabs) || [];
      }

      setCurrentTabs(currentTabs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxUserdata, currenMessageItemType]);

  const handleTabChange = (event, newActiveTabType) => {
    const newMessageItem = MessageData.find(({ type }) => type === currenMessageItemType);
    const activeChildrenItem = newMessageItem?.children?.find((eachChild) => newActiveTabType === eachChild?.type);

    setCurrentTabData({
      parentActiveTab: newMessageItem?.type || '',
      activeTabType: activeChildrenItem?.type || '',
      activeTabApi: activeChildrenItem?.api || ''
    });
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
            currentTabs.map(({ icon: Icon, text, type, newItemsCount = 0 }) => {
              return (
                <Tab icon={<Icon />} iconPosition="start" label={<CustomTabLabel text={text} newItemsCount={newItemsCount} />} value={type} key={type} />
              )
            })
          }
        </Tabs>
      )}
      <MessageTabPanel {...currentTabData} />
    </>
  );
}

const CustomTabLabel = ({ text, newItemsCount }) => {
  return (
    <div className="dark:text-white-100">
      {text}
      {newItemsCount > 0 && (
        <Chip className="ml-2" label={`${newItemsCount} new`} size="small" color="primary" />
      )}
    </div>
  );
}

export default ListDisplay;

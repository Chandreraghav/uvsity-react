import { createContext } from 'react';

export const MessageContext = createContext({
  detailsData: {},
  setDetailsData: () => null
});

export const MessageContextProvider = MessageContext.Provider;

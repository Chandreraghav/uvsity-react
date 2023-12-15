import { createContext } from 'react';

export const MessageContext = createContext({
  detailsData: null,
  setDetailsData: () => null
});

export const MessageContextProvider = MessageContext.Provider;

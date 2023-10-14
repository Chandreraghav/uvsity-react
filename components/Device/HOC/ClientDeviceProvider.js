import React, { createContext, useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from "../../../localStorage/local-storage";

const ClientDeviceContext = createContext();

export const useClientDevice = () => {
  return useContext(ClientDeviceContext);
};
//HOC
function ClientDeviceProvider(props) {
  const isExtraSmallScreen = useMediaQuery({query:'(max-width:400px)'});
  const isSmallScreen = useMediaQuery({query:'(max-width:600px)'});
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrPad = useMediaQuery({query:'(min-width: 768px) and (max-width: 1024px)'});
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const clientDeviceValues = {
    isExtraSmallScreen,
    isSmallScreen,
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrPad,
    isPortrait,
    isRetina,
  };
  useEffect(() => {
    if (!getLocalStorageObject("media-query")) {
      const deviceResolutionInfo = {
        xsScreen: isExtraSmallScreen,
        smallScreen: isSmallScreen,
        bigScreen: isBigScreen,
        desktopOrLaptop: isDesktopOrLaptop,
        tabletOrMobile: isTabletOrPad,
        retina: isRetina,
        orientation: isPortrait ? "portrait" : "landscape",
      };
      setLocalStorageObject("media-query", JSON.stringify(deviceResolutionInfo));
    }
  }, [isBigScreen, isDesktopOrLaptop, isExtraSmallScreen, isPortrait, isRetina, isSmallScreen, isTabletOrPad])


  return (<ClientDeviceContext.Provider value={clientDeviceValues}>
    {props.children}
  </ClientDeviceContext.Provider>);
}

export default ClientDeviceProvider;

import React,{useEffect} from "react";
import { useMediaQuery } from "react-responsive";
import {
  getLocalStorageObject,
  setLocalStorageObject,
} from "../../../localStorage/local-storage";

//HOC
function ClientDeviceProvider(props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  useEffect(()=>{
    if (!getLocalStorageObject("media-query")) {
      const deviceResolutionInfo = {
        bigScreen: isBigScreen,
        desktopOrLaptop: isDesktopOrLaptop,
        tabletOrMobile: isTabletOrMobile,
        retina: isRetina,
        orientation: isPortrait ? "portrait" : "landscape",
      };
      setLocalStorageObject("media-query", JSON.stringify(deviceResolutionInfo));
    }
  },[isBigScreen, isDesktopOrLaptop, isPortrait, isRetina, isTabletOrMobile])
  

 

  return <>{props.children}</>;
}

export default ClientDeviceProvider;

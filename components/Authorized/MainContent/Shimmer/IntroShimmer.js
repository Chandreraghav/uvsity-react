import React, { useMemo } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useClientDevice } from "../../../Device/HOC/ClientDeviceProvider";

function IntroShimmer({ visible, animation }) {
  
  const {
    isExtraSmallScreen,
    isSmallScreen,
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrPad,
} = useClientDevice();
const width = useMemo(() => {
    if (isExtraSmallScreen) {
        return 'w-80'
    }
    if (isSmallScreen) {
        return 'w-96'
    }
    if (isTabletOrPad || isDesktopOrLaptop || isBigScreen) {
        return 'w-full'
    }
    return 'w-full'
}, [isBigScreen, isDesktopOrLaptop, isExtraSmallScreen, isSmallScreen, isTabletOrPad])

  if (!visible) return <></>;

  return (
    <div className={`flex flex-col gap-2  dark:bg-gray-dark rounded-md p-2   ${width}`}>
      <Skeleton
        animation={animation ? animation : "wave"}
        variant="text"
        width={300}
        height={40}
        className={'dark:bg-gray-500 '}
      />
      
      <Skeleton
        animation={animation ? animation : "wave"}
        variant="text"
        height={40}
        className={'dark:bg-gray-500 '}
      />
      <div className="flex gap-3">
        <Skeleton
          animation={animation ? animation : "wave"}
          variant="rectangular"
          width={100}
          height={30}
          className={'dark:bg-gray-500 rounded-md'}
        />
        <Skeleton
          animation={animation ? animation : "wave"}
          variant="rectangular"
          width={100}
          height={30}
          className={'dark:bg-gray-500 rounded-md'}
        />
      </div>
    </div>
  );
}

export default IntroShimmer;

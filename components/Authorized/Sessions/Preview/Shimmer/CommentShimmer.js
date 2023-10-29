import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { useClientDevice } from "../../../../Device/HOC/ClientDeviceProvider";
import { useMemo } from "react";

function CommentShimmer({ visible, animation }) {

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

    if (!visible) return (<></>);



    return (
        <div className="   flex items-start mb-2 ">

            <div className="flex gap-0 px-2 py-2">
                <Skeleton
                    animation={animation ? animation : "wave"}
                    variant="circular"
                    height={40}
                    width={40}
                    className='dark:bg-gray-600 '
                />
            </div>

            <div className={`${width}`}>
                <div className={`bg-gray-200 dark:bg-gray-dark    rounded-md p-2 `}>
                    <div className="flex justify-between text-sm leading-snug">
                        <div>
                            <Skeleton
                                animation={animation ? animation : "wave"}
                                variant="text"
                                height={25}
                                width={200}
                                className={'dark:bg-gray-600 '}
                            />
                        </div>

                        <div className="ml-auto">
                            <Skeleton
                                animation={animation ? animation : "wave"}
                                variant="text"
                                height={25}
                                width={70}
                                className={'dark:bg-gray-600 '}
                            />
                        </div>


                    </div>
                    <div>
                        <Skeleton
                            animation={animation ? animation : "wave"}
                            variant="text"
                            height={20}
                            width={150}
                            className={'dark:bg-gray-600 '}
                        />
                    </div>

                    <div className="spacer"></div>

                    <div>
                        <Skeleton
                            animation={animation ? animation : "wave"}
                            variant="text"
                            height={30}
                            width={300}
                            className={'dark:bg-gray-600 '}
                        />
                    </div>
                </div>
                <div className="flex items-center mt-2">
                    <div>
                        <Skeleton
                            animation={animation ? animation : "wave"}
                            variant="text"
                            height={30}
                            width={70}
                            className={'dark:bg-gray-600 '}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CommentShimmer;

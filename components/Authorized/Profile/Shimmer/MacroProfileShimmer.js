import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { DEFAULT_COVER_IMAGE } from "../../../../constants/userdata";

function MacroProfileShimmer({ visible, animation }) {
  if (!visible) return "";
  return (
    <>
      <div
        className={`uvsity__card  uvsity__card__border__theme flex flex-col`}
      >
        <div>
          <img
            className="grayscale-filter grayscale opacity-70 w-screen h-28 lg:h-52 xl:h-52 md:h-48"
            src={DEFAULT_COVER_IMAGE}
            alt=""
          />
        </div>

        <div className="flex">
          <>
            <div className=" hidden lg:inline-block xl:inline-block">
              <Skeleton
                className={`-mt-24 hidden lg:block xl:block avatar-lg   ml-3 opacity-100  `}
                animation={animation ? animation : "wave"}
                variant="circular"
                width={80}
                height={80}
              />
            </div>

            <div className="lg:hidden xl:hidden inline-block">
              <Skeleton
                className={` -mt-10 hidden lg:block xl:block ml-3 opacity-100`}
                animation={animation ? animation : "wave"}
                variant="circular"
                width={80}
                height={80}
              />
            </div>
          </>

          <div className=" ml-auto mr-0">
            <div className="mt-12 xl:mt-32 lg:mt-32">
              <div className="hidden  lg:flex xl:flex  gap-4 mr-2">
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="circular"
                  width={30}
                  height={30}
                />
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="circular"
                  width={30}
                  height={30}
                />
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="circular"
                  width={30}
                  height={30}
                />
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="circular"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`-mt-2 lg:-mt-10  md:-mt-2 flex gap-2`}>
          <Skeleton
            className=""
            animation={animation ? animation : "wave"}
            variant="text"
            width={400}
            height={40}
          />
          <Skeleton
            className=""
            animation={animation ? animation : "wave"}
            variant="circular"
            width={20}
            height={20}
          />
        </div>
        <div className={`text-center`}>
          <Skeleton
            className=""
            animation={animation ? animation : "wave"}
            variant="text"
            width={300}
            height={30}
          />
        </div>
        <div className={`text-center`}>
          <Skeleton
            className=""
            animation={animation ? animation : "wave"}
            variant="text"
            width={200}
            height={30}
          />
        </div>

        <div className={`flex gap-4 mt-2`}>
          <Skeleton
            className=""
            animation={animation ? animation : "wave"}
            variant="text"
            width={100}
            height={30}
          />
          <Skeleton
            className="mt-1"
            animation={animation ? animation : "wave"}
            variant="circular"
            width={20}
            height={20}
          />
          <Skeleton
            className="mt-1"
            animation={animation ? animation : "wave"}
            variant="circular"
            width={20}
            height={20}
          />
          <Skeleton
            className="mt-1"
            animation={animation ? animation : "wave"}
            variant="circular"
            width={20}
            height={20}
          />
        </div>

        <div className="lg:hidden xl:hidden md:hidden flex-col">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
            <>
              <div className="-mt-2 ml-4" key={idx}>
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="text"
                  width={450}
                  height={200}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default MacroProfileShimmer;

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { DEFAULT_COVER_IMAGE } from "../../../constants/userdata";

function Shimmer({ visible, animation }) {
  if (!visible) return "";
  return (
    <>
      <div
        className={`uvsity__card  uvsity__card__border__theme flex flex-col place-content-center place-items-center items-center`}
      >
          <div >
          <img className="grayscale-filter" src={DEFAULT_COVER_IMAGE} alt="" />
          </div>
       

        <Skeleton
          className=" -mt-10"
          animation={animation ? animation : "wave"}
          variant="circular"
          width={80}
          height={80}
        />

        <div className={`text-center items-center place-content-center`}>
          <Skeleton
            className=""
            animation={animation ? animation : "wave"}
            variant="text"
            width={200}
            height={40}
          />
        </div>
        <div className={`text-center`}>
          <Skeleton
            className=""
            animation={animation ? animation : "wave"}
            variant="text"
            width={250}
            height={30}
          />
        </div>
      </div>
    </>
  );
}

export default Shimmer;

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import ProfileCompletionDetailStyle from "../../../../styles/ProfileCompletionDetail.module.css";

function CompletionDetailShimmer({ visible, animation }) {
  if (!visible) return "";
  return (
    <div style={{ borderBottom: "5px solid gray" }} className={` uvsity__card`}>
      <div
        className={
          ProfileCompletionDetailStyle.profile__completion__detail__card
        }
      >
        <div
          className={
            ProfileCompletionDetailStyle.profile__completion__detail__graph
          }
        >
          <Skeleton
          className='dark:bg-gray-600'
            animation={animation ? animation : "wave"}
            variant="circular"
            width={300}
            height={300}
          />
        </div>

        <div>
          <div className=" flex flex-col items-center place-content-center justify-center">
            <Skeleton
             className='dark:bg-gray-600'
              animation={animation ? animation : "wave"}
              variant="text"
              width={250}
              height={30}
            />
            <Skeleton
             className='dark:bg-gray-600'
              animation={animation ? animation : "wave"}
              variant="text"
              width={250}
              height={30}
            />
            <Skeleton
             className='dark:bg-gray-600'
              animation={animation ? animation : "wave"}
              variant="text"
              width={250}
              height={30}
            />
          </div>
        </div>
        <div className=" items-baseline p-2 flex gap-2">
          <Skeleton
           className='dark:bg-gray-600'
            animation={animation ? animation : "wave"}
            variant="rectangular"
            width={200}
            height={30}
          />
          <Skeleton
           className='dark:bg-gray-600'
            animation={animation ? animation : "wave"}
            variant="rectangular"
            width={200}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}

export default CompletionDetailShimmer;

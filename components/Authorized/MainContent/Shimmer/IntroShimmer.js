import React from "react";
import Skeleton from "@mui/material/Skeleton";

function IntroShimmer({ visible, animation }) {
  if (!visible) return <></>;

  return (
    <div className="flex flex-col gap-2">
      <Skeleton
        animation={animation ? animation : "wave"}
        variant="text"
        width={500}
        height={40}
      />
      <div></div>
      <Skeleton
        animation={animation ? animation : "wave"}
        variant="text"
        width={480}
        height={40}
      />
      <div className="flex gap-3">
        <Skeleton
          animation={animation ? animation : "wave"}
          variant="rectangular"
          width={100}
          height={40}
        />
        <Skeleton
          animation={animation ? animation : "wave"}
          variant="rectangular"
          width={100}
          height={40}
        />
      </div>
    </div>
  );
}

export default IntroShimmer;

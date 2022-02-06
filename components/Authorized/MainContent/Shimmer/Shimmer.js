import React from "react";
import Skeleton from "@mui/material/Skeleton";

function Shimmer({ visible, animation }) {
  if (!visible) return <></>;

  return (
    <div className="flex">
      <Skeleton
        animation={animation ? animation : "wave"}
        variant="text"
        width={280}
        height={40}
      />
    </div>
  );
}

export default Shimmer;

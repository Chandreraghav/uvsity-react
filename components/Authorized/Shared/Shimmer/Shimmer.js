import React from "react";
import Skeleton from "@mui/material/Skeleton";

function Shimmer({ visible, animation }) {
  if (!visible) return "";
  return (
    <div>
      <div className="flex gap-3 mr-4">
          <Skeleton animation={animation ? animation : "wave"} variant="circular" width={40} height={40} />
          <Skeleton animation={animation ? animation : "wave"} variant="circular" width={40} height={40} />
          <Skeleton animation={animation ? animation : "wave"} variant="circular" width={40} height={40} />
          <Skeleton animation={animation ? animation : "wave"} variant="circular" width={40} height={40} />
          <Skeleton animation={animation ? animation : "wave"} variant="circular" width={40} height={40} />
          <Skeleton animation={animation ? animation : "wave"} variant="circular" width={40} height={40} />
        </div>
    </div>
  );
}

export default Shimmer;

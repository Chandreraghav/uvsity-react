import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
function Shimmer({ visible }) {
  if (!visible) return "";
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Skeleton
          variant="rectangular"
          className=" w-max"
          width={400}
          height={150}
        />
        <CardContent>
          <div className="-mt-4">
            <Skeleton variant="text" width={310} height={60} />
          </div>

          <div className="flex justify-between">
            <div className="flex mt-2">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className="flex flex-col">
              <Skeleton variant="text" width={250} height={40} />
              <Skeleton variant="text" width={250} height={40} />
              <Skeleton
                variant="text"
                className="float-right mr-2"
                width={200}
                height={40}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-evenly gap-1 mt-4">
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
              <Skeleton variant="circular" width={15} height={15} />
            </div>

            <div className="flex">
              <Skeleton variant="text" width={80} height={40} />
            </div>
          </div>
        </CardContent>

        <div className="flex justify-between px-3">
          <Skeleton variant="text" width={80} height={40} />
          <Skeleton variant="text" width={70} height={40} />
        </div>
      </Card>
    </div>
  );
}

export default Shimmer;

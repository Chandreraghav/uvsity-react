import React from "react";
import Preview from "./Preview";
import { Divider } from "@mui/material";
import Spacer from "../../../shared/Spacer";
import Shimmer from "./Shimmer/Shimmer";
function CompactCard({ data, title }) {
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="font-bold text-lg pr-8">{title}</h2>
        <Spacer />
        <Divider />
        <div
          className="grid items-stretch grid-cols-1 gap-2 px-2 
      py-4 xl:container md:gap-4 xl:grid-cols-1 2xl:px-5 "
        >
          {[1, 2].map((i, v) => (
             
              <Shimmer key={v} visible={data?.TOP_SESSIONS.isLoading} />
          
          ))}

          {data?.TOP_SESSIONS.isSuccess &&
            data?.TOP_SESSIONS.data.length > 0 &&
            data?.TOP_SESSIONS?.data?.map((value) => (
              <div key={value.courseId}>
                <Preview data={value} userdata={data?.USER_LOGIN_INFO?.data} />
                <Spacer />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CompactCard;

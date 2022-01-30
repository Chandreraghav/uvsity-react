import React, { useState, useEffect } from "react";
import { AuthGuardService } from "../../../../auth-guard/service/AuthGuardService";
import Preview from "./Preview";
import { Divider, Typography } from "@mui/material";
import Spacer from "../../../shared/Spacer";
import { IMAGE_PATHS, PLACEHOLDERS } from "../../../../constants/userdata";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Loader from "../../../shared/Loader";
import Shimmer from "./Shimmer/Shimmer";
function CompactCard({data, title }) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  if (!loggedIn || data?.TOP_SESSIONS.isError || data?.TOP_SESSIONS?.data?.length == 0) {
    return (
      <>
        <div>
          <Typography
            className={`font-semibold leading-tight no__data`}
            component="div"
            variant="h5"
          >
            <InfoOutlinedIcon />
            {PLACEHOLDERS.NO_POPULAR_SESSIONS}
          </Typography>
          <img className={"object-contain"} src={IMAGE_PATHS.NO_DATA.SESSION} />
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="font-bold text-lg pr-2">{title}</h2>
        <Spacer />
        <Divider />
        <div
          className="grid items-stretch grid-cols-1 gap-2 px-2 
      py-4 xl:container md:gap-4 xl:grid-cols-1 2xl:px-5 "
        >
         <Shimmer visible={data?.TOP_SESSIONS.isLoading}/>
         <Shimmer visible={data?.TOP_SESSIONS.isLoading}/>
          {data?.TOP_SESSIONS.isSuccess &&
            data?.TOP_SESSIONS?.data?.map((value) => (
              <div key={value.courseId}>
                <Preview data={value} userdata={data?.USER_LOGIN_INFO?.data} authorized={loggedIn} />
                <Spacer />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CompactCard;

import React, { useState, useEffect } from "react";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { AuthGuardService } from "../../../../auth-guard/service/AuthGuardService";
import Preview from "./Preview";
import { Divider } from "@mui/material";
import Spacer from "../../../shared/Spacer";

function CompactCard({ title }) {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  if (!loggedIn || USERDATA?.TOP_COURSES?.length == 0) {
    return "";
  }
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="font-bold text-lg pr-2">{title}</h2>
        <Spacer/>
        <Divider />
        <div
          className="grid items-stretch grid-cols-1 gap-2 px-2 
      py-4 xl:container md:gap-4 xl:grid-cols-1 2xl:px-5 "
        >
          {USERDATA?.TOP_COURSES?.data.map((value) => (
            <div key={value.courseId}>
            <Preview data={value}  authorized={loggedIn} />
            <Spacer count={1}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompactCard;

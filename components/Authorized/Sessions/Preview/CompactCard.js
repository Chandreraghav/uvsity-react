import React, { useState, useEffect } from "react";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { AuthGuardService } from "../../../../auth-guard/service/AuthGuardService";
import SessionCard from "../../../SessionCards/SessionCard";

function CompactCard({title}) {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);
   
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  if (!loggedIn || USERDATA?.TOP_COURSES?.length==0 ) {
    return "";
  }
  return (
    <div className="flex flex-col">
     {USERDATA?.TOP_COURSES?.length>0 &&( <h2>{title}</h2>)}
      <div className="grid items-stretch grid-cols-2 gap-2 px-2 py-2 xl:container md:gap-4 xl:grid-cols-2 2xl:px-5">
        {USERDATA?.TOP_COURSES?.data.map((value) => (
          <SessionCard data={value} authorized={loggedIn} />
        ))}
      </div>
    </div>
  );
}

export default CompactCard;

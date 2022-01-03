import React, { useState, useEffect } from "react";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { AuthGuardService } from "../../../../auth-guard/service/AuthGuardService";
import Preview from "./Preview";
import { Divider, Typography } from "@mui/material";
import Spacer from "../../../shared/Spacer";
import {
  IMAGE_PATHS,
  PLACEHOLDERS,
  TOOLTIPS,
} from "../../../../constants/userdata";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
function CompactCard({ title }) {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  if (!loggedIn || USERDATA?.TOP_COURSES?.data.length == 0) {
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
          <img
            className={"object-contain"}
            src={IMAGE_PATHS.NO_DATA.SESSION}
          />
          
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
          {USERDATA?.TOP_COURSES?.data.map((value) => (
            <div key={value.courseId}>
              <Preview data={value} authorized={loggedIn} />
              <Spacer />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompactCard;

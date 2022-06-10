import React from "react";
import { READ_MORE_MAX_LENGTH } from "../../../../constants/constants";
import ReadMore from "../../../shared/ReadMore";
import NoData from "../../Shared/NoData";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { USER_PROFILE } from "../../../../constants/userdata";
function About(props) {
  const aboutMe = props?.aboutMe;

  return aboutMe ? (
    <>
      {props?.owner && (
        <div
          onClick={()=>props.consumeEvent({id:1, event: "init_edit", component: "AboutMe" })}
          className=" text-sm  -mt-1 cursor-pointer ml-auto float-right"
        >
          <Tooltip title={USER_PROFILE.CHANGE_ABOUT_INFO}>
            <EditIcon fontSize="small" />
          </Tooltip>
        </div>
      )}
      <div className="  text-gray-700 text-sm lg:text-md xl:text-md    ">
        <ReadMore
          initialReadLimit={READ_MORE_MAX_LENGTH}
          color="text.secondary"
        >
          {aboutMe}
        </ReadMore>
      </div>
    </>
  ) : (
    <NoData message="No intro available yet." />
  );
}

export default About;

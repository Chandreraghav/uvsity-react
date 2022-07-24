import { Tooltip } from "@mui/material";
import React from "react";
import ReadMore from "../../../shared/ReadMore";
import NoData from "../../Shared/NoData";
import EditIcon from "@mui/icons-material/Edit";
import { USER_PROFILE } from "../../../../constants/userdata";
function Interests(props) {
  const interest = props?.interests;

  return (
    <>
      <div className=" flex ">
        {interest ? (
          <div className=" dark:text-gray-500 text-gray-700  text-sm lg:text-md xl:text-md    ">
            <ReadMore initialReadLimit={100}>{interest}</ReadMore>
          </div>
        ) : (
          <NoData message="No interests found." />
        )}

        {props.owner && (
          <div
            onClick={() =>
              props.consumeEvent({
                id: 5,
                event: "init_edit",
                component: "Interests",
              })
            }
            className=" text-sm dark:text-gray-500 text-gray-700  -mt-1 cursor-pointer ml-auto float-right"
          >
            <Tooltip title={USER_PROFILE.CHANGE_INTERESTS}>
              <EditIcon fontSize="small" />
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
}

export default Interests;

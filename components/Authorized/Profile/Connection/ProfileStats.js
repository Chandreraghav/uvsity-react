import React from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { CONNECTIONS, TOOLTIPS } from "../../../../constants/userdata";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import { blue, green } from "@mui/material/colors";
function ProfileStats(props) {
  const getCount = (type) => {
    if (!type) return 0;
    switch (type) {
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.ALUMNI:
        return props?.userdata?.noOfAlumniCOnnections;
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.STUDENT:
        return props?.userdata?.noOfStudentConnections;
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.PROFESSOR:
        return props?.userdata?.noOfProfessorConnections;
      default:
        return 0;
    }
  };
  return (
    <div className="flex gap-4">
      <Tooltip title={TOOLTIPS.VIEW_ALL_CONNECTIONS}>
        <div className="app__anchor__block cursor-pointer flex gap-1">
          
          <Typography className="flex gap-1 text-gray-600 font-normal" variant="div">
          <SupervisorAccountIcon className="mt-0.5"   sx={{ color: blue[400] }} />
          
             <span  ><u>C</u>onnections</span>
          </Typography>
        </div>
      </Tooltip>
      <>
        <div className="flex gap-x-2 sm:gap-x-1 lg:gap-x-8 xl:gap-x-8  md:gap-x-4 ">
          {CONNECTIONS.filter((hidden) => hidden !== true).map(
            (connection) =>
              getCount(connection.code) > 0 && (
                <div key={connection.id}>
                <Tooltip title={`${getCount(connection.code)} ${connection.title.toLowerCase()}`}>
                <div
                  
                  className={`flex gap-x-1 sm:gap-x-1 lg:gap-x-2 xl:gap-x-2  md:gap-x-2 cursor-pointer text-sm items-center justify-center`}
                >
                  <Avatar
                    sx={{ bgcolor: blue[500] }}
                    className="ml-auto  avatar-2xs"
                    alt={getCount(connection.code).toString()}
                  >
                    <span className=" justify-center items-center"> {getCount(connection.code)}</span>
                   
                  </Avatar>
                  <div className=" text-xs ml-auto sm:text-xs  lg:text-base xl:text-base text-gray-500 font-normal line-clamp-1 ">
                    <Typography className="  app__anchor__block " variant="div">
                      {connection.title}
                    </Typography>
                  </div>
                </div>
                </Tooltip>
                </div>
              )
          )}
        </div>
      </>
    </div>
  );
}

export default ProfileStats;

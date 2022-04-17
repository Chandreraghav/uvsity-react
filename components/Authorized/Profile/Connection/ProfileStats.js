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
        <div className="app__anchor__block cursor-pointer flex gap-1 text-md mt-0.5">
          <SupervisorAccountIcon sx={{ color: blue[400] }} />
          <Typography className="  text-gray-600 font-normal" variant="div">
            <u>C</u>onnections
          </Typography>
        </div>
      </Tooltip>
      <>
        <div className="flex gap-4 mt-0.5">
          {CONNECTIONS.filter((hidden) => hidden !== true).map(
            (connection) =>
              getCount(connection.code) > 0 && (
                <div key={connection.id}>
                <Tooltip title={`${getCount(connection.code)} ${connection.title.toLowerCase()}`}>
                <div
                  
                  className={`flex gap-2 cursor-pointer text-sm items-center justify-center`}
                >
                  <Avatar
                    sx={{ bgcolor: green[500] }}
                    className="ml-auto avatar-2xs"
                    alt={getCount(connection.code)}
                  >
                    {getCount(connection.code)}
                  </Avatar>
                  <div className=" text-gray-500 font-normal line-clamp-1 ">
                    <Typography className="app__anchor__block " variant="div">
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

import { Divider, Tooltip } from "@mui/material";
import React from "react";
import { CONNECTIONS } from "../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import StatStyle from "../../../../styles/Stat.module.css";

function Stats({ tooltip, title, Icon, summary }) {
  if (!summary && !title) return "";
  const getTotalStatCount = () => {
    try {
      return (
        parseInt(summary?.data?.studentConnectionCount) +
        parseInt(summary?.data?.alumniConnectionCount) +
        parseInt(summary?.data?.professorConnectionCount)
      );
    } catch (error) {
      return 0;
    }
  };
  const getCount = (type) => {
    if (!type) return 0;
    switch (type) {
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.ALUMNI:
        return summary?.data?.alumniConnectionCount;
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.STUDENT:
        return summary?.data?.studentConnectionCount;
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.PROFESSOR:
        return summary?.data?.professorConnectionCount;
      default:
        return 0;
    }
  };
  return (
    getTotalStatCount() > 0 && (
      <div className={StatStyle.stats}>
        <Tooltip title={tooltip ? tooltip : ""}>
          <div className={StatStyle.stat__legend}>
            {Icon && <Icon />}
            <div>{title}</div>
          </div>
        </Tooltip>

        <Divider className={StatStyle.stat__divider} />
        {CONNECTIONS.filter((hidden) => hidden!==true).map(
          (connection) =>
            getCount(connection.code) > 0 && (
              <div key={connection.id} className={StatStyle.stat}>
                <p>{connection.title}</p>
                <p className={StatStyle.statNumber}>
                  {getCount(connection.code)}
                </p>
              </div>
            )
        )}
      </div>
    )
  );
}

export default Stats;

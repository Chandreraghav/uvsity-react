import { Divider, Tooltip, Typography } from "@mui/material";
import React,{useEffect, useState} from "react";
import {
  CONNECTIONS,
  IMAGE_PATHS,
  PLACEHOLDERS,
} from "../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import StatStyle from "../../../../styles/Stat.module.css";
import { TITLES, TOOLTIPS } from "../../../../constants/userdata";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AuthGuardService } from "../../../../auth-guard/service/AuthGuardService";
import Spacer from "../../../shared/Spacer";
function Stats() {
  let tooltip, title, Icon, summary;
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);  
  useEffect(() => {
      setLoggedIn(AuthGuardService.isUserLoggedIn());

  });
  if(!loggedIn) {return ''}
  summary = USERDATA?.SUMMARY;
  title = TITLES.CONNECTIONS;
  Icon = SupervisorAccountIcon;
  tooltip = TOOLTIPS.VIEW_ALL_CONNECTIONS;

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
    <div>
      <Spacer/>
      <div className={`${"uvsity__card uvsity__card__border__theme px-1 py-1"}`}>
      <Spacer/>
        <Tooltip title={tooltip ? tooltip : ""}>
          <div className={StatStyle.stat__legend}>
            {Icon && <Icon />}
            <div>
              {title}({getTotalStatCount()})
            </div>
          </div>
        </Tooltip>

        <Divider className={StatStyle.stat__divider} />
      
        {getTotalStatCount() > 0 ? (
          CONNECTIONS.filter((hidden) => hidden !== true).map(
            (connection) =>
              getCount(connection.code) > 0 && (
                <div key={connection.id} className={StatStyle.stat}>
                  <p>{connection.title}</p>
                  <p className={StatStyle.statNumber}>
                    {getCount(connection.code)}
                  </p>
                </div>
              )
          )
        ) : (
          <div>
              <img className={ 'object-contain'}
              alt={TOOLTIPS.NO_CONNECTIONS}
              src={IMAGE_PATHS.NO_DATA.CONNECTIONS}
            />
            <Typography
              className={`font-semibold leading-tight no__data`}
              component="div"
              variant="h5"
            >
              <InfoOutlinedIcon />
              {PLACEHOLDERS.NO_CONNECTIONS}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;

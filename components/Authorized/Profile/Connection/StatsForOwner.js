/* eslint-disable @next/next/no-img-element */
import { Divider, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CONNECTIONS,
  IMAGE_PATHS,
  PLACEHOLDERS,
} from "../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import StatStyle from "../../../../styles/Stat.module.css";
import { TITLES, TOOLTIPS } from "../../../../constants/userdata";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Spacer from "../../../shared/Spacer";
import { navigateToPath } from "../../Shared/Navigator";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
// This component shows the people stats for logged in user.
function StatsForOwner(props) {
  let tooltip, title, Icon;
  const router = useRouter();
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [summary, setSummary] = useState(null);
  title = TITLES.CONNECTIONS;
  Icon = SupervisorAccountIcon;
  tooltip = TOOLTIPS.VIEW_ALL_CONNECTIONS;

  const getTotalStatCount = () => {
    try {
      const count =
        parseInt(summary?.studentConnectionCount) +
        parseInt(summary?.alumniConnectionCount) +
        parseInt(summary?.professorConnectionCount);
      if (isNaN(count)) {
        return 0;
      }
      return count;
    } catch (error) {
      return 0;
    }
  };
  const getCount = (type) => {
    if (!type) return 0;
    switch (type) {
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.ALUMNI:
        return summary?.alumniConnectionCount;
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.STUDENT:
        return summary?.studentConnectionCount;
      case WORKFLOW_CODES.USER.CONNECTION_TYPES.PROFESSOR:
        return summary?.professorConnectionCount;
      default:
        return 0;
    }
  };

  useEffect(() => {
    setSummary(ctxUserdata?.userdata)
  }, [ctxUserdata?.userdata])
  return (
    <div>
      <Spacer />
      <div
        className={`${"uvsity__card uvsity__card__border__theme px-1 py-1"}`}
      >
        <Spacer />
        <Tooltip title={tooltip ? tooltip : ""}>
          <div
            onClick={()=>navigateToPath(
              router,
              AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.INDEX,
              {utrn:AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS,token:uuidv4(),owner:true, title:'My connections'}
            )}
            className={`${StatStyle.stat__legend} hover:underline dark:hover:text-gray-100 hover:text-gray-900`}
          >
            <div className="flex gap-1 ">
              {Icon && <Icon />}
              {title}({getTotalStatCount()})
            </div>
          </div>
        </Tooltip>

        <Divider className={StatStyle.stat__divider} />
       
        {getTotalStatCount() > 0 &&
          CONNECTIONS.filter((hidden) => hidden !== true).map(
            (filter) =>
              getCount(filter.code) > 0 && (
                <div  onClick={()=>navigateToPath(
                  router,
                  AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.INDEX,
                  {utrn:AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS,filter:filter.title,token:uuidv4(),owner:true,title:'My connections'}
                )} key={filter.id} className={StatStyle.stat}>
                  <p>{filter.title}</p>
                  <p className={StatStyle.statNumber}>
                    {getCount(filter.code)}
                  </p>
                </div>
              )
          )}
        {getTotalStatCount() === 0 && (
          <div>
            <img
              className={"object-contain"}
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

export default StatsForOwner;

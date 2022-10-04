/* eslint-disable @next/next/no-img-element */
import { Divider, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { TOOLTIPS } from "../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import Spacer from "../../../shared/Spacer";
import Profile from "./Dashboard/Profile";
import ProfileStyle from "../../../../styles/DashboardProfile.module.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IMAGE_PATHS, PLACEHOLDERS } from "../../../../constants/userdata";
import Shimmer from "../Shimmers/Shimmer";
import {
  getMode,
  THEME_MODES,
  useTheme,
} from "../../../../theme/ThemeProvider";
import { navigateToPath } from "../../Shared/Navigator";
import { useRouter } from "next/router";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { v4 as uuidv4 } from "uuid";
function Profiles({
  options,
  title,
  tooltip,
  icon,
  dashboardPreview,
  workflowRoute,
  sticky,
  data,
}) {
  const [bo, setBO] = useState([]);
  const [ctxTheme, dispatch] = useTheme();
  const [theme, setTheme] = useState(ctxTheme.mode);
  const router = useRouter();
  useEffect(() => {
    setTheme(ctxTheme.mode);
  }, [ctxTheme]);

  const getProfileCollection = () => {
    switch (workflowRoute) {
      case WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING:
        return data?.SUGGESTED_FRIENDS?.data;

      case WORKFLOW_CODES.PEOPLE.WHO_VIEWED_ME:
        return data?.PROFILE_VISITS?.data;
      default:
        break;
    }
  };

  useEffect(() => {
    let controller = new AbortController();
    let isSubscribed = true;
    if (isSubscribed) {
      let _bo = [];
      try {
        getProfileCollection()?.map((value) => {
          if (workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING) {
            _bo.push(value.suggestedFriend.webTO);
          } else if (workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_VIEWED_ME) {
            value.visitorUserSummary.invitationAction = value.invitationAction;

            _bo.push(value.visitorUserSummary);
          }
        });
      } catch (error) {
        isSubscribed = false;
      }
      setBO(_bo);
    }

    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, [data?.PROFILE_VISITS?.data, data?.SUGGESTED_FRIENDS?.data]);

  const handleViewMore = () => {
    if (bo.length > 0) {
      navigateToPath(router, AUTHORIZED_ROUTES.AUTHORIZED.PEOPLE.INDEX, {
        utrn:
          workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_VIEWED_ME
            ? AUTHORIZED_ROUTES.AUTHORIZED.UTRN.PROFILE_VISITS
            : AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ADD_TO_NETWORK,
        token: uuidv4(),
      });
      return;
    }
    return null;
  };

  if (!dashboardPreview) {
    return (
      <h1>
        Component to show all profiles listing according to specific workflow
        route
      </h1>
    );
  }
  return (
    <div
      
      className={`uvsity__card uvsity__card__border__theme ${
        sticky && bo.length > 0
          ? "md:sticky top-20 lg:sticky top-20 xl:sticky top-20  "
          : ""
      }`}
    >
      <Tooltip
        title={
          bo.length > 0
            ? tooltip
              ? tooltip
              : TOOLTIPS.VIEW_MORE
            : workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
            ? bo?.isLoading
              ? "Searching interesting profiles for you..."
              : TOOLTIPS.NO_INTERESTING_PROFILE
            : bo?.isLoading
            ? "Finding people who viewed you..."
            : TOOLTIPS.NO_PEOPLE_VIEWED_YOU
        }
      >
        <div
        onClick={() => handleViewMore()}
          className={`flex flex-row items-center px-2 pt-2 pb-2  gap-1
         text-gray-600 dark:hover:text-gray-100 hover:text-gray-900 font-medium leading-snug  ${
           workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
             ? "text-sm"
             : ""
         }  ${bo.length > 0 ? ProfileStyle.profiles__header__text : ""}`}
        >
          {icon ? (
            <>
              {icon}{" "}
              {bo.length > 0
                ? title
                : workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
                ? bo?.isLoading
                  ? "Searching interesting profiles for you..."
                  : TOOLTIPS.NO_INTERESTING_PROFILE
                : bo?.isLoading
                ? "Finding people who viewed you..."
                : TOOLTIPS.NO_PEOPLE_VIEWED_YOU}
            </>
          ) : (
            <>
              {bo.length > 0
                ? title
                : WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
                ? bo?.isLoading
                  ? "Searching interesting profiles for you..."
                  : TOOLTIPS.NO_INTERESTING_PROFILE
                : bo?.isLoading
                ? "Finding people who viewed you..."
                : TOOLTIPS.NO_PEOPLE_VIEWED_YOU}
            </>
          )}
        </div>
      </Tooltip>
      <Divider className="divider" />
      {bo?.isLoading && (
        <div className="px-1 text-base">
          <Spacer />
          {[1, 2, 3, 4, 5].map((shim, index) => (
            <div key={index}>
              <Shimmer visible />
              <Spacer />
            </div>
          ))}
        </div>
      )}

      {bo.length > 0 && (
        <div className={`px-3 text-base `}>
          <Spacer />
          {bo?.map((value) => (
            <Profile
              options={options}
              oid={value.userDetailsId}
              key={value.userDetailsId}
              firstName={value.firstName}
              lastName={value.lastName}
              avatar={value.profilePicName}
              userType={value.userType}
              instituition={value.educationalInstitution}
              metaData={value}
              sticky
              dark={theme === THEME_MODES.DARK}
              userdata={data?.USER_LOGIN_INFO?.data}
            />
          ))}
        </div>
      )}
      {bo.length === 0 && !bo?.isLoading && (
        <>
          <img
            className={"object-contain"}
            alt={
              workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
                ? TOOLTIPS.NO_INTERESTING_PROFILE
                : TOOLTIPS.NO_PEOPLE_VIEWED_YOU
            }
            src={
              workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
                ? IMAGE_PATHS.NO_DATA.PEOPLE
                : IMAGE_PATHS.NO_DATA.PEOPLE_VIEWS
            }
          />
          <Typography
            className={`font-semibold leading-tight no__data`}
            component="div"
            variant="h5"
          >
            <InfoOutlinedIcon />
            {workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
              ? PLACEHOLDERS.NO_INTERESTING_PROFILE
              : PLACEHOLDERS.NO_PEOPLE_VIEWED_YOU}
          </Typography>
        </>
      )}
    </div>
  );
}

export default Profiles;

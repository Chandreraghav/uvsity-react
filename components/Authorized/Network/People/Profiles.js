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
  THEME_MODES,
  useTheme,
} from "../../../../theme/ThemeProvider";
import { navigateToPath } from "../../Shared/Navigator";
import { useRouter } from "next/router";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { v4 as uuidv4 } from "uuid";
import UserDataService from "../../../../pages/api/users/data/UserDataService";
import { asyncSubscriptions } from "../../../../async/subscriptions";
import { useQuery } from "react-query";
import { KEYS } from "../../../../async/queries/keys/unique-keys";
function Profiles({
  options,
  title,
  tooltip,
  icon,
  workflowRoute,
  sticky,
  userdata,
}) {
  const [bo, setBO] = useState([]);
  const [ctxTheme, dispatch] = useTheme();
  const [theme, setTheme] = useState(ctxTheme.mode);
  const router = useRouter();

  const getProfileVisits = async () =>
    (await UserDataService.getProfileVisits()).data;
  const getSuggestedFriends = async () =>
    (await UserDataService.getSuggestedFriends()).data;
  const getProfilesData = async () => workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING ? getSuggestedFriends() : getProfileVisits()

  useEffect(() => {
    setTheme(ctxTheme.mode);
  }, [ctxTheme]);

  const PROFILES_DATA = useQuery(
    workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING ? [KEYS.NETWORK.PEOPLE.INTERESTING] : [KEYS.PROFILE.VISITS],
    getProfilesData,
    {
      staleTime: workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING ? asyncSubscriptions.INTERESTING_CONNECTIONS.staleTime : asyncSubscriptions.PROFILE_VISITS.staleTime,
      refetchInterval:workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING?asyncSubscriptions.INTERESTING_CONNECTIONS.pollEvery: false,
      refetchOnWindowFocus:false
    }
  );

 

  useEffect(() => {
    let controller = new AbortController();
    let isSubscribed = true;
    if (isSubscribed) {
      let _bo = [];
      try {
        PROFILES_DATA.data && PROFILES_DATA.data.map((value) => {
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
  }, [PROFILES_DATA.data, workflowRoute]);

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


  return (
    <div

      className={`uvsity__card uvsity__card__border__theme ${sticky && bo.length > 0
        ? "md:sticky  lg:sticky  xl:sticky top-20  "
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
              ? PROFILES_DATA?.isLoading
                ? "Searching interesting profiles for you..."
                : TOOLTIPS.NO_INTERESTING_PROFILE
              : PROFILES_DATA?.isLoading
                ? "Finding people who viewed you..."
                : TOOLTIPS.NO_PEOPLE_VIEWED_YOU
        }
      >
        <div
          onClick={() => handleViewMore()}
          className={`flex flex-row items-center px-2 pt-2 pb-2  gap-1
         text-gray-600 dark:hover:text-gray-100 hover:text-gray-900 font-medium leading-snug  ${workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
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
                  ? PROFILES_DATA?.isLoading
                    ? "Searching interesting profiles for you..."
                    : TOOLTIPS.NO_INTERESTING_PROFILE
                  : PROFILES_DATA?.isLoading
                    ? "Finding people who viewed you..."
                    : TOOLTIPS.NO_PEOPLE_VIEWED_YOU}
            </>
          ) : (
            <>
              {bo.length > 0
                ? title
                : WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING
                  ? PROFILES_DATA?.isLoading
                    ? "Searching interesting profiles for you..."
                    : TOOLTIPS.NO_INTERESTING_PROFILE
                  : PROFILES_DATA?.isLoading
                    ? "Finding people who viewed you..."
                    : TOOLTIPS.NO_PEOPLE_VIEWED_YOU}
            </>
          )}
        </div>
      </Tooltip>
      <Divider className="divider" />
      {PROFILES_DATA?.isLoading && (
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
              userdata={userdata}
            />
          ))}
        </div>
      )}
      {bo.length === 0 && !PROFILES_DATA?.isLoading && (
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

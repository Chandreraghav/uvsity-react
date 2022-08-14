/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { KEYS } from "../../../../async/queries/keys/unique-keys";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {
  asyncSubscriptions,
  standardStaleTime,
} from "../../../../async/subscriptions";
import PrivateRoute from "../../../../components/Auth/HOC/Routes/PrivateRoute";
import PhoneMenu from "../../../../components/Authorized/Shared/FireFighter/PhoneMenu";
import Header from "../../../../components/Authorized/Shared/Header";
import Layout from "../../../../components/Main/Layout";
import Footer from "../../../../components/shared/Footer";
import { formattedName } from "../../../../utils/utility";
import UserDataService from "../../../api/users/data/UserDataService";
import Profile from "./Profile";
import { LOADING_MESSAGE_DEFAULT } from "../../../../constants/constants";
import {
  getLocalStorageObject,
  removeLocalStorageObject,
} from "../../../../localStorage/local-storage";
import { Typography } from "@mui/material";
import { IMAGE_PATHS, TOOLTIPS } from "../../../../constants/userdata";
const UserProfile = () => {
  const router = useRouter();
  const { profileId } = router.query;
  const [isProfileOwner, setProfileOwner] = useState(false);
  const layoutObj = {
    title: LOADING_MESSAGE_DEFAULT,
    desc: null,
    poster: null,
  };
  const [layoutObject, setLayoutObject] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const [hasChangeEventTriggered, setChangeEventTriggered] = useState(false);
  const getLoggedInUserSummary = async () =>
    (await UserDataService.getSummary()).data;
  const getProfileSummary = async () =>
    await UserDataService.getUserProfileBy(profileId);

  const LOGGED_IN_USER_SUMMARY = useQuery(
    [KEYS.PROFILE.SUMMARY],
    getLoggedInUserSummary,
    { staleTime: standardStaleTime }
  );

  const { data, isError, isSuccess, isLoading } = useQuery(
    [KEYS.PROFILE.VIEWS + "_" + profileId],
    getProfileSummary,
    {
      refetchInterval: () =>
        asyncSubscriptions.PROFILE_VIEWS.enabled
          ? asyncSubscriptions.PROFILE_VIEWS.pollEvery
          : false,
      staleTime: asyncSubscriptions.PROFILE_VIEWS.staleTime,
      onError: (err) => {
        const _layoutObj = {
          title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
          desc: "Error",
          poster: null,
        };
        if (layoutObj.desc !== "Error") setLayoutObject(_layoutObj);
        if (!responseError) {
          setResponseError(
            JSON.parse(getLocalStorageObject("uvsity-internal-error-response"))
          );
          removeLocalStorageObject("uvsity-internal-error-response");
        }
      },
    }
  );

  const getData = {
    LOGGED_IN_USER_SUMMARY: LOGGED_IN_USER_SUMMARY,
    PROFILE_SUMMARY: data,
  };

  const isOwner = () => {
    return (
      Number(profileId) === getData.LOGGED_IN_USER_SUMMARY.data?.userDetailsId
    );
  };
  const profileName = () => {
    const _profileName = formattedName(
      getData.PROFILE_SUMMARY.data?.firstName,
      getData.PROFILE_SUMMARY.data?.lastName
    );
    return _profileName;
  };

  useEffect(() => {
    if (isSuccess) {
      const profile = profileName();
      const obj = {
        title: `${profileName()} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
        desc: `Profile of ${profile}`,
        poster: getData.PROFILE_SUMMARY.data?.profilepicName,
      };
      setLayoutObject(obj);
      setProfileOwner(isOwner());

      return () => {
        setLayoutObject(null);
        setResponseError(null);
      };
    }
  }, [data]);

  useEffect(() => {
    setLayoutObject(layoutObj);
    return () => {
      setLayoutObject(null);
      setChangeEventTriggered(false);
    };
  }, []);
  const handleChangeEvent = (event) => {
    if (event) {
      getProfileSummary().then((res) => {
        getData.PROFILE_SUMMARY = res;
        setChangeEventTriggered(event?.changed);
      });
    }
  };

  const handleNavigationError = (obj) => {
    console.log(obj);
  };

  return (
    <Layout private lowZoom={false} options={layoutObject}>
      <Header
        onHeaderNavigationError={handleNavigationError}
        data={getData.LOGGED_IN_USER_SUMMARY}
      />
      {isSuccess && (
        <div className="main xl:w-3/4 xl:mx-auto lg:w-3/4 lg:mx-auto">
          <Profile
            hasChangeEventTriggered={hasChangeEventTriggered}
            changeEvent={handleChangeEvent}
            owner={isProfileOwner}
            userdata={getData.PROFILE_SUMMARY?.data}
            loggedInUser={getData.LOGGED_IN_USER_SUMMARY?.data}
          />
        </div>
      )}
      {isError && (
        // profile not found custom error
        <div className="min-h-screen w-1/2 mx-auto">
          <div className="flex flex-col ">
            <Typography
              variant="caption"
              className="dark:text-white-100 mt-5  text-gray-800 text-center font-semibold"
            >
              <PersonOffIcon/>{TOOLTIPS.PROFILE_NOT_FOUND}
            </Typography>
            <img
              alt="Error"
              className=" object-cover"
              src={IMAGE_PATHS.NO_DATA.NO_PROFILE}
            />
          </div>
        </div>
      )}
      {isLoading && (
        <div className="  min-h-screen dark:bg-gray-dark bg-gray-100"></div>
      )}
      <PhoneMenu data={getData.LOGGED_IN_USER_SUMMARY} />
      <Footer minimizeOnSmallScreens />
    </Layout>
  );
};

export default PrivateRoute(UserProfile);

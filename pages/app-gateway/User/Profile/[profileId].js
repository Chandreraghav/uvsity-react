import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { KEYS } from "../../../../async/queries/keys/unique-keys";
import { asyncSubscriptions } from "../../../../async/subscriptions";
import PrivateRoute from "../../../../components/Auth/HOC/Routes/PrivateRoute";
import Header from "../../../../components/Authorized/Shared/Header";
import Layout from "../../../../components/Main/Layout";
import Footer from "../../../../components/shared/Footer";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { formattedName } from "../../../../utils/utility";
import UserDataService from "../../../api/users/data/UserDataService";
import Profile from "./Profile";

const UserProfile = () => {
  const router = useRouter();
  const { profileId } = router.query;
  const [isProfileOwner, setProfileOwner] = useState(false);
  const layoutObj = {
    title: `Loading....`,
    desc: null,
    poster: null,
  };
  const [layoutObject, setLayoutObject] = useState(null);
  const getLoggedInUserSummary = async () =>
    (await UserDataService.getSummary()).data;
  const getProfileSummary = async () =>
    await UserDataService.getUserProfileBy(profileId);

  const LOGGED_IN_USER_SUMMARY = useQuery(
    [KEYS.PROFILE.SUMMARY],
    getLoggedInUserSummary
  );

  const { data, isError, isSuccess, isLoading } = useQuery(
    [KEYS.PROFILE.VIEWS],
    getProfileSummary,
    {
      refetchInterval: () =>
        asyncSubscriptions.PROFILE_VIEWS.enabled
          ? asyncSubscriptions.PROFILE_VIEWS.pollEvery
          : false,
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

  if (isError) {
    router.push(AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD);
  }

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
      };
    }
  }, [data]);

  useEffect(() => {
    setLayoutObject(layoutObj);
    return () => {
      setLayoutObject(null);
    };
  }, []);
  return (
    <Layout private lowZoom={false} options={layoutObject}>
      <Header data={getData.LOGGED_IN_USER_SUMMARY} />
      {isSuccess && (
        <>
          <Profile
            owner={isProfileOwner}
            userdata={getData.PROFILE_SUMMARY.data}
          />
        </>
      )}
      {isLoading && <>Shimmering....</>}
      <Footer />
    </Layout>
  );
};

export default PrivateRoute(UserProfile);

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { KEYS } from "../../../../async/queries/keys/unique-keys";
import { asyncSubscriptions } from "../../../../async/subscriptions";
import PrivateRoute from "../../../../components/Auth/HOC/Routes/PrivateRoute";
import Header from "../../../../components/Authorized/Shared/Header";
import Layout from "../../../../components/Main/Layout";
import Footer from "../../../../components/shared/Footer";
import RequestFailedDialog from "../../../../components/shared/modals/RequestFailedDialog";
import { PROFILE_UNAVAILABLE } from "../../../../constants/error-messages";
import { AUTHORIZED_ROUTES } from "../../../../constants/routes";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
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
  const [requestFailed, setRequestFailed] = useState(false);
  const [requestFailureDetail, setRequestFailureDetail] = useState(null);
  const [layoutObject, setLayoutObject] = useState(null);
  const [hasChangeEventTriggered, setChangeEventTriggered] = useState(false);
  const getLoggedInUserSummary = async () =>
    (await UserDataService.getSummary()).data;
  const getProfileSummary = async () =>
    await UserDataService.getUserProfileBy(profileId);

  const LOGGED_IN_USER_SUMMARY = useQuery(
    [KEYS.PROFILE.SUMMARY],
    getLoggedInUserSummary
  );
   
 
  const { data, isError, isSuccess, isLoading,error } = useQuery(
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
    if(!requestFailed && !requestFailureDetail && error){
    const requestErr = {
      code: WORKFLOW_CODES.PEOPLE.PROFILE_VIEW,
      url: window.location.href,
      message:PROFILE_UNAVAILABLE,
      diagnostics:error.toString()
    };
    
      setRequestFailed(true);
      setRequestFailureDetail(requestErr);
    }
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

  const handleRequestFailedDialogCloseRequest =()=>{
    router.push(AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD);
  }
  return (
    <Layout private lowZoom={false} options={layoutObject}>
      <Header data={getData.LOGGED_IN_USER_SUMMARY} />
      {isSuccess && (
        <>
          <Profile
            hasChangeEventTriggered={hasChangeEventTriggered}
            changeEvent={handleChangeEvent}
            owner={isProfileOwner}
            userdata={getData.PROFILE_SUMMARY.data}
            loggedInUser={getData.LOGGED_IN_USER_SUMMARY.data}
          />
        </>
      )}
      {isLoading && <>Shimmering....</>}
      <Footer />

      <RequestFailedDialog
        theme
        url={requestFailureDetail?.url}
        message={requestFailureDetail?.message}
        code={requestFailureDetail?.code}
        dialogCloseRequest={handleRequestFailedDialogCloseRequest}
        isOpen={requestFailed}
        diagnostics={requestFailureDetail?.diagnostics}
      />
    </Layout>
  );
};

export default PrivateRoute(UserProfile);

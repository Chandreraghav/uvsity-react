import React, { useEffect, useState } from "react";
import Header from "../../../components/Authorized/Shared/Header";
import Layout from "../../../components/Main/Layout";
import Footer from "../../../components/shared/Footer";
import MetaDataService from "../../api/users/data/MetaDataService";
import CreateSession from "../../../components/Authorized/Sessions/Forms/CreateSession";
import { WORKFLOW_CODES } from "../../../constants/workflow-codes";
import { useQuery } from "react-query";
import { KEYS } from "../../../async/queries/keys/unique-keys";
import UserDataService from "../../api/users/data/UserDataService";
import PrivateRoute from "../../../components/Auth/HOC/Routes/PrivateRoute";
import dynamic from "next/dynamic";
import { eraseFormContext } from "../../../components/Authorized/Sessions/Clean/cleanup";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import PhoneMenu from "../../../components/Authorized/Shared/FireFighter/PhoneMenu";
import { standardStaleTime } from "../../../async/subscriptions";
import { setMode } from "../../../theme/ThemeProvider";

function Create() {
  const layoutObj = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} | Create Session`,
    desc: "Create a new session and invite people to attend your session. Session can be free or paid, where it can be co-hosts and panelists of your choice. You can also have your own sessions sponsored by organization and people.",
  };
  const workflowObj = {
    code: WORKFLOW_CODES.USER.SESSION.CREATE,
    workflow: {
      title: "Create Session",
      alias: "Create Session",
    },
  };
  const [formdata, dispatch] = useDataLayerContextValue();
  const [oldContextErased, setOldContextErased] = useState(false);
  const getRootMetaData = async () =>
    (await MetaDataService.getRootData()).data;
  const getStaticMetaData = async () =>
    (await MetaDataService.getStaticData()).data;
  const getSummary = async () => (await UserDataService.getSummary()).data;
  const USER_PROFILE_SUMMARY = useQuery([KEYS.PROFILE.SUMMARY], getSummary, {
    refetchOnWindowFocus: false,
    staleTime:standardStaleTime
  });
  const STATIC_META_DATA = useQuery([KEYS.METADATA.STATIC], getStaticMetaData, {
    refetchOnWindowFocus: false,
    staleTime:standardStaleTime
  });
  const ROOT_META_DATA = useQuery([KEYS.METADATA.ROOT], getRootMetaData, {
    refetchOnWindowFocus: false,
    staleTime:standardStaleTime
  });
  const getData = {
    USER_PROFILE_SUMMARY,
    STATIC_META_DATA,
    ROOT_META_DATA,
  };

  useEffect(() => {
    setMode('light')
    eraseFormContext(formdata, dispatch).then(() => {
      setOldContextErased(true);
    });
  }, []);
  const handleNavigationError = (obj) => {
    console.log(obj);
  };

  return (
    <Layout private options={layoutObj}>
      <Header onHeaderNavigationError={handleNavigationError} data={getData.USER_PROFILE_SUMMARY} />
      {oldContextErased && (
         
          <CreateSession
            data={{
              static: getData.STATIC_META_DATA.data,
              root: getData.ROOT_META_DATA.data,
              workflow: workflowObj,
              user: getData.USER_PROFILE_SUMMARY,
            }}
          />
         
      )}
      <PhoneMenu data={getData.USER_PROFILE_SUMMARY} />
      
    </Layout>
  );
}

export default PrivateRoute(Create);

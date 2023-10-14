import React, { useEffect, useState } from "react";
import Header from "../../../components/Authorized/Shared/Header";
import Layout from "../../../components/Main/Layout";
import MetaDataService from "../../api/users/data/MetaDataService";
import CreateSession from "../../../components/Authorized/Sessions/Forms/CreateSession";
import { WORKFLOW_CODES } from "../../../constants/workflow-codes";
import { useQuery } from "@tanstack/react-query";
import { KEYS } from "../../../async/queries/keys/unique-keys";
import PrivateRoute from "../../../components/Auth/HOC/Routes/PrivateRoute";
import { eraseFormContext } from "../../../components/Authorized/Sessions/Clean/cleanup";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import PhoneMenu from "../../../components/Authorized/Shared/FireFighter/PhoneMenu";
import { standardStaleTime } from "../../../async/subscriptions";

function Create() {
  const [userdata, setUserData] = useState(null);
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

  const STATIC_META_DATA = useQuery([KEYS.METADATA.STATIC], getStaticMetaData, {
    refetchOnWindowFocus: false,
    staleTime: standardStaleTime
  });
  const ROOT_META_DATA = useQuery([KEYS.METADATA.ROOT], getRootMetaData, {
    refetchOnWindowFocus: false,
    staleTime: standardStaleTime
  });
  const getData = {

    STATIC_META_DATA,
    ROOT_META_DATA,
  };

  useEffect(() => {
    //setMode('light')
    eraseFormContext(formdata, dispatch).then(() => {
      setOldContextErased(true);
    });
  }, []);
  const handleNavigationError = (obj) => {
    console.log(obj);
  };

  useEffect(() => {
    setUserData(formdata?.userdata)
  }, [formdata?.userdata])
  return (
    <Layout private options={layoutObj}>
      <Header onHeaderNavigationError={handleNavigationError} />
      {oldContextErased && (

        <CreateSession
          data={{
            static: getData.STATIC_META_DATA.data,
            root: getData.ROOT_META_DATA.data,
            workflow: workflowObj,
            user: userdata,
          }}
        />

      )}
      <PhoneMenu />

    </Layout>
  );
}

export default PrivateRoute(Create);

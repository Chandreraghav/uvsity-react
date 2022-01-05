import React, { useState, useEffect } from "react";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import Header from "../../../components/Authorized/Shared/Header";
import Layout from "../../../components/Main/Layout";
import Footer from "../../../components/shared/Footer";
import Splash from "../../../components/shared/Splash";
import MetaDataService from "../../api/users/data/MetaDataService";
import CreateSession from "../../../components/Authorized/Sessions/Forms/CreateSession";
import { WORKFLOW_CODES } from "../../../constants/workflow-codes";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [rootMetaData, setRootMetaData] = useState({});
  const [staticMetaData, setStaticMetaData] = useState({});

  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
    AuthGuardService.cancelAllSubscriptions(false);
  }, []);
  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await getStaticMetaData(isSubscribed);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await getRootMetaData(isSubscribed);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  const getRootMetaData = async (isSubscribed) => {
    await MetaDataService.getRootData()
      .then((_data) => (isSubscribed ? setRootMetaData(_data.data) : null))
      .catch((err) => {});
  };
  const getStaticMetaData = async (isSubscribed) => {
    await MetaDataService.getStaticData()
      .then((_data) => (isSubscribed ? setStaticMetaData(_data.data) : null))
      .catch((err) => {});
  };
  return loggedIn ? (
    <Layout options={layoutObj}>
      <Header isAuthorized={loggedIn} isShared={true} />
      <CreateSession
        data={{ static: staticMetaData, root: rootMetaData, workflow:workflowObj }}
      />
      <Footer isAuthorized={loggedIn} isShared={true} />
    </Layout>
  ) : (
    <Layout options={{ title: "Loading..." }}>
      <Splash />
    </Layout>
  );
}

export default Create;

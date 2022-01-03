import React, { useState, useEffect } from "react";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import Header from "../../../components/Authorized/Shared/Header";
import Layout from "../../../components/Main/Layout";
import Footer from "../../../components/shared/Footer";
import Splash from "../../../components/shared/Splash";
import MetaDataService from "../../api/users/data/MetaDataService";

function Create() {
  const layoutObj = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} | Create Session`,
    desc: "Create a new session and invite people to attend your session. Session can be free or paid, where it can be co-hosts and panelists of your choice. You can also have your own sessions sponsored by organization and people.",
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [rootMetaData, setRootMetaData] = useState({});
  const [staticMetaData, setStaticMetaData] = useState({});

  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
    AuthGuardService.cancelAllSubscriptions(false);
  }, []);
  useEffect(async () => {
    await getStaticMetaData();
  }, []);
  useEffect(async () => {
    await getRootMetaData();
  }, []);

  const getRootMetaData = async () => {
    await MetaDataService.getRootData()
      .then((_data) => {
        setRootMetaData(_data.data);
      })
      .catch((err) => {});
  };
  const getStaticMetaData = async () => {
    await MetaDataService.getStaticData()
      .then((_data) => {
        setStaticMetaData(_data.data);
      })
      .catch((err) => {});
  };
  return loggedIn ? (
    <Layout options={layoutObj}>
      <Header isAuthorized={loggedIn} isShared={true} />
      <h2>ok</h2>
      <Footer isAuthorized={loggedIn} isShared={true} />
    </Layout>
  ) : (
    <Layout options={{ title: "Loading..." }}>
      <Splash />
    </Layout>
  );
}

export default Create;

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { KEYS } from "../../async/queries/keys/unique-keys";
import { standardStaleTime } from "../../async/subscriptions";
import PrivateRoute from "../../components/Auth/HOC/Routes/PrivateRoute";
import AddToNetwork from "../../components/Authorized/Network/People/Categories/AddToNetwork";
import Main from "../../components/Authorized/Network/People/Categories/Connections/Main";
import ProfileVisits from "../../components/Authorized/Network/People/Categories/ProfileVisits";
import PhoneMenu from "../../components/Authorized/Shared/FireFighter/PhoneMenu";
import Header from "../../components/Authorized/Shared/Header";
import { navigateToPath } from "../../components/Authorized/Shared/Navigator";
import Layout from "../../components/Main/Layout";
import Footer from "../../components/shared/Footer";
import { AUTHORIZED_ROUTES } from "../../constants/routes";
import UserDataService from "../api/users/data/UserDataService";

function People() {
  const router = useRouter();
  const [routeFilter, setRouteFilter] = useState(null);
  const [routeutrn, setRouteUtrn] = useState(false);
  const [layoutObj, setLayoutObject] = useState(null);
  const handleNavigationError = (obj) => {
    console.log(obj);
  };
  const getSummary = async () => (await UserDataService.getSummary()).data;
  const USER_PROFILE_SUMMARY = useQuery([KEYS.PROFILE.SUMMARY], getSummary, {
    refetchOnWindowFocus: false,
    staleTime: standardStaleTime,
  });
  const getData = {
    USER_PROFILE_SUMMARY,
  };

  const setLayout = () => {
    const utrn = router.query.utrn;
    if (utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.MYCONNECTIONS) {
      setLayoutObject({
        title: `${process.env.NEXT_PUBLIC_APP_NAME} | My Connections`,
        desc: "uvsity lets you easily manage people in your network or rather people who are your connections. Your connections can be of 3 categories, students, professors and alumni.",
      });
    } else if (utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.PROFILE_VISITS) {
      setLayoutObject({
        title: `${process.env.NEXT_PUBLIC_APP_NAME} | Profile visits`,
        desc: "uvsity lets you know who among your connections have recently viewed your profile. Here you can also accept pending connection requests from others as well as view those people who are yet to accept your connection requests.",
      });
    } else {
      setLayoutObject({
        title: `${process.env.NEXT_PUBLIC_APP_NAME} | Add to network`,
        desc: "uvsity lets you easily add people to your network. Just press the connect option to send a connection request.",
      });
    }
  };
  useEffect(() => {
    if (!router.query?.utrn) {
      navigateToPath(router, AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD);
      return;
    }
    setRouteUtrn(router.query.utrn);
    setRouteFilter(router.query?.filter);
    setLayout();
    return () => {
      setRouteFilter(null);
      setRouteUtrn(null);
      setLayoutObject(null);
    };
  }, [router]);
  return (
    <Layout private options={layoutObj}>
      <Header
        onHeaderNavigationError={handleNavigationError}
        data={getData.USER_PROFILE_SUMMARY}
      />
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.MYCONNECTIONS && (
        <Main filter={routeFilter??'all'} />
      )}
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.PROFILE_VISITS && (
        <ProfileVisits />
      )}
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ADD_TO_NETWORK && (
        <AddToNetwork />
      )}

      <PhoneMenu data={getData.USER_PROFILE_SUMMARY} />
      <Footer minimizeOnSmallScreens />
    </Layout>
  );
}

export default PrivateRoute(People);

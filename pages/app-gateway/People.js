import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import PrivateRoute from "../../components/Auth/HOC/Routes/PrivateRoute";
import PhoneMenu from "../../components/Authorized/Shared/FireFighter/PhoneMenu";
import Header from "../../components/Authorized/Shared/Header";
import { navigateToPath } from "../../components/Authorized/Shared/Navigator";
import Layout from "../../components/Main/Layout";
import Footer from "../../components/shared/Footer";
import { AUTHORIZED_ROUTES } from "../../constants/routes";
import ConnectionsList from "../../components/Authorized/Network/People/Flows/Connections/ConnectionsList";
import ProfileVisits from "../../components/Authorized/Network/People/Flows/Connections/ProfileVisits";
import AddToNetwork from "../../components/Authorized/Network/People/Flows/Connections/AddToNetwork";
import { WORKFLOW_CODES } from "../../constants";
import { asyncSubscriptions } from "../../async/subscriptions";
  
function People() {
  const router = useRouter();
  const [routeutrn, setRouteUtrn] = useState(router.query?.utrn || null);
  const [layoutObj, setLayoutObject] = useState(null);
  const handleNavigationError = (obj) => {
    console.log(obj);
  };
  const setLayout = useCallback(() => {
    if (routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS) {
      const subtitle = router.query?.filter;
      const _title = router.query?.title
      if (subtitle) {
        setLayoutObject({
          title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${_title} | ${subtitle}`,
          desc: "uvsity lets you easily manage people in your network or rather people who are your connections. Connections can be of 3 categories, students, professors and alumni.",
        });
      }
      else {
        setLayoutObject({
          title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${_title}`,
          desc: "uvsity lets you easily manage people in your network or rather people who are your connections. Connections can be of 3 categories, students, professors and alumni.",
        });
      }

    } else if (routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.PROFILE_VISITS) {
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
  }, [router.query?.filter, router.query?.title, routeutrn])

  useEffect(() => {
    if (!routeutrn) {
      navigateToPath(router, AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD);
      return;
    }
    setLayout();
    return () => {
      setRouteUtrn(false);
      setLayoutObject(null);
    };
  }, [router, routeutrn, setLayout]);


  return (
    <Layout private options={layoutObj}>
      <Header
        onHeaderNavigationError={handleNavigationError}
      />
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS && (
        <ConnectionsList targetUID={router.query?.uid} self={router.query?.owner} title={router.query?.title} workflow={WORKFLOW_CODES.PEOPLE.MY_CONNECTIONS} filter={router.query?.filter ?? 'all'} />
      )}
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.PROFILE_VISITS && (
        <ProfileVisits workflow={WORKFLOW_CODES.PEOPLE.PROFILE_VIEW} filter={asyncSubscriptions.PROFILE_VISITS.alias} />
      )}
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ADD_TO_NETWORK && (
        <AddToNetwork workflow={WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING} filter={asyncSubscriptions.INTERESTING_CONNECTIONS.alias} />
      )}

      <PhoneMenu />
      <Footer minimizeOnSmallScreens />
    </Layout>
  );
}

export default PrivateRoute(People);

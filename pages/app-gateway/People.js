import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { asyncSubscriptions } from "../../async/subscriptions";
import PrivateRoute from "../../components/Auth/HOC/Routes/PrivateRoute";
import AddToNetwork from "../../components/Authorized/Network/People/Flows/AddToNetwork";
import ConnectionsList from "../../components/Authorized/Network/People/Flows/Connections/ConnectionsList";
import ProfileVisits from "../../components/Authorized/Network/People/Flows/ProfileVisits";
import PhoneMenu from "../../components/Authorized/Shared/FireFighter/PhoneMenu";
import Header from "../../components/Authorized/Shared/Header";
import { navigateToPath } from "../../components/Authorized/Shared/Navigator";
import Layout from "../../components/Main/Layout";
import Footer from "../../components/shared/Footer";
import { AUTHORIZED_ROUTES } from "../../constants/routes";
import { WORKFLOW_CODES } from "../../constants/workflow-codes";

function People() {
  const router = useRouter();
  const [routeFilter, setRouteFilter] = useState(null);
  const [routeutrn, setRouteUtrn] = useState(false);
  const [layoutObj, setLayoutObject] = useState(null);
  const handleNavigationError = (obj) => {
    console.log(obj);
  };
   
  const setLayout = () => {
    const utrn = router.query.utrn;
    if (utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS) {
      const subtitle = router.query?.filter;
      const _title = router.query?.title 
       if(subtitle){
        setLayoutObject({
          title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${_title} | ${subtitle}`,
          desc: "uvsity lets you easily manage people in your network or rather people who are your connections. Connections can be of 3 categories, students, professors and alumni.",
        });
       }
       else{
        setLayoutObject({
          title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${_title}`,
          desc: "uvsity lets you easily manage people in your network or rather people who are your connections. Connections can be of 3 categories, students, professors and alumni.",
        });
       }
      
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
      />
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.CONNECTIONS && (
        <ConnectionsList targetUID={router.query?.uid} self={router.query?.owner} title={router.query?.title} workflow={WORKFLOW_CODES.PEOPLE.MY_CONNECTIONS}   filter={routeFilter??'all'} />
      )}
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.PROFILE_VISITS && (
        <ProfileVisits workflow={WORKFLOW_CODES.PEOPLE.PROFILE_VIEW}  filter ={asyncSubscriptions.PROFILE_VISITS.alias} />
      )}
      {routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ADD_TO_NETWORK && (
        <AddToNetwork workflow={WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING}   filter ={asyncSubscriptions.INTERESTING_CONNECTIONS.alias}  />
      )}

      <PhoneMenu />
      <Footer minimizeOnSmallScreens />
    </Layout>
  );
}

export default PrivateRoute(People);

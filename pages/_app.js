// DO NOT CHANGE THIS FILE IF NOT NEEDED UTMOST
/***
 * GLOBAL APP CSS
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/responsive-menu.css";
import "react-quill/dist/quill.snow.css";
/***
 * GLOBAL APP CSS
 */

import { DataLayer } from "../context/DataLayer";
import reducer, { initialState } from "../context/reducer";
import IPService from "./api/ipdata/IPService";
import {
  setLocalStorageObject,
  getLocalStorageObject,
} from "../localStorage/local-storage";
import React, { useEffect, useState } from "react";
import { AuthGuardService } from "../auth-guard/service/AuthGuardService";
import { useRouter } from "next/router";
import { asyncSubscriptions } from "../async/subscriptions";
import { AuthService } from "./api/users/auth/AuthService";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../components/Main/Layout";
import Splash from "../components/shared/Splash";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [verified, setVerified] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  //MANDATORY PWA ENABLER ON TOP PF EVERY COMPONENT
  useEffect(() => {
    let controller = new AbortController();
    // ENABLE PWA ABILITY
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./serviceworker.js")
        .then((reg) => {})
        .catch((err) => {});
    }
    return () => {
      controller?.abort();
    };
  }, []);
  // MANDATORY IP DATA COLLECTION ON TOP OF EVERY COMPONENT(SUPER HOC)
  // THIS DATA IS NEEDED THROUGHOUT THE ENTIRE LIFECYCLE OF APPLICATION, 
  // SO WE CONDITIONALLY COLLECT THIS AT TOP LEVEL ONLY ONCE.
  useEffect(async () => {
    // GET IPDATA
    if (!getLocalStorageObject("uvsity-ipData")) {
      await new IPService()
        .getIPData()
        .then((response) => {
          setLocalStorageObject("uvsity-ipData", response.data);
        })
        .catch(() => {
          const ipDummyData = new IPService().getFakeIPData();
          setLocalStorageObject("uvsity-ipData", ipDummyData);
        });
    }
  }, []);

  
  // MANDATORY SESSION CHECK SUBSCRIPTION ON TOP OF EVERY LAYER(SUPER HOC).
  // THIS IS NEEDED BECAUSE THROUGHOUT THE LIFECYCLE OF THE APPLICATION 
  // WE NEED TO CHECK FROM SERVER SIDE IF SESSION IS VALID.
  // HERE WE ARE DEPENDENT ON SERVER TO CHECK SESSION EXPIRATION 
  // AND THEREFORE WE USE SET INTERVAL INSTEAD OF SET TIMEOUT
  // WE DO NOT CHECK FOR USER IDLE TIME ON APPLICATION. 
  // THIS IS NOT THE REQUIREMENT AND SHOULD NOT BE CONFUSED WHILE WORKING WITH.
  useEffect(() => {
    let controller = new AbortController();
    let isSubscribed = true;
    if (isSubscribed)
      getSessionValidity(router).finally(() => {
        // even if the session validity errors, we will load gapi client and once that is done, render the page to client
        AuthGuardService.loadGAPIClient().then(()=>{
           setLoading(false)
        })
      });
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  async function getSessionValidity(router) {
    if (
      asyncSubscriptions.SESSION_EXPIRY.enabled &&
      AuthService.isUserLoggedIn() &&
      !asyncSubscriptions.SESSION_EXPIRY.subscribed
    ) {
      await AuthGuardService.pollSessionValidity()
        .then(() => {
          window.sessionValidityPoller = setInterval(async () => {
            await setSessionValidityPoller(router);
          }, asyncSubscriptions.SESSION_EXPIRY.pollEvery);
          asyncSubscriptions.SESSION_EXPIRY.subscribed = true;
        })
        .catch(() => {
          //in case of any error returned, means the session is invalid, clear interval, logout & redirect to public dashboard
          // automatic logout
          setVerified(false);
          queryClient.invalidateQueries();
          AuthService.logout();
          router.replace("/");
        });
    }
  }
  async function setSessionValidityPoller(router) {
    // INITIALIZE POLLER TO CHECK USER SESSION EXPIRY EVERY 1 MINUTE ON LOAD OF AN AUTHORIZED ROUTE
    await AuthGuardService.pollSessionValidity()
      .then(() => {
        // we are good. do nothing, session is valid
        console.log("Logged in");
      })
      .catch(() => {
        //in case of any error returned, means the session is invalid, clear interval, logout & redirect to public dashboard
        // automatic logout
        setVerified(false);
        queryClient.invalidateQueries();
        AuthService.logout();
        router.replace("/");
      });
  }

  return loading ? (
    <>
      <Layout options={{ title: process.env.NEXT_PUBLIC_APP_TITLE }}>
        <Splash />
      </Layout>
    </>
  ) : (
    <>
      <QueryClientProvider client={queryClient}>
        <DataLayer initialState={initialState} reducer={reducer}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </DataLayer>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

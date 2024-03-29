/* eslint-disable react-hooks/exhaustive-deps */
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
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "../components/Main/Layout";
import Splash from "../components/shared/Splash";
import { BrowserRouter } from "react-router-dom";
import ClientDeviceProvider from "../components/Device/HOC/ClientDeviceProvider";
import CountryService from "./api/countries/CountryService";
import ThemeProvider, { getMode, initialTheme, themeReducer } from "../theme/ThemeProvider";
import { registerLicense } from '@syncfusion/ej2-base';
import { setInitialTimezone } from "../utils/utility";
function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [verified, setVerified] = useState(true);
  const [loading, setLoading] = useState(true);
  registerLicense(process.env.NEXT_PUBLIC_RTE_COMMUNITY_LICENSE);
  //MANDATORY PWA ENABLER ON TOP OF EVERY COMPONENT
  useEffect(() => {
    let controller = new AbortController();
    // ENABLE PWA ABILITY
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./serviceworker.js")
        .then(() => { })
        .catch(() => { });
    }
    return () => {
      controller?.abort();
    };
  }, []);
  // MANDATORY META DATA COLLECTION ON TOP OF EVERY COMPONENT(SUPER HOC)
  // THIS DATA IS NEEDED THROUGHOUT THE ENTIRE LIFECYCLE OF APPLICATION,
  // SO WE CONDITIONALLY COLLECT THIS AT TOP LEVEL ONLY ONCE.
  useEffect(async () => {
    // GET IPDATA
    if (!getLocalStorageObject("uvsity-ipData")) {
      await IPService.getIPData()
        .then((response) => {
          setLocalStorageObject("uvsity-ipData", response.data);
        })
        .catch(() => {
          const ipDummyData = new IPService().getFakeIPData();
          setLocalStorageObject("uvsity-ipData", ipDummyData);
        });
    }
    // GET COUNTRIES

    if (
      getLocalStorageObject("uvsity-countries") === "null" ||
      !getLocalStorageObject("uvsity-countries")
    ) {
      await CountryService.getCountries()
        .then((response) => {
          setLocalStorageObject("uvsity-countries", response.data);
        })
        .catch(() => {
          setLocalStorageObject("uvsity-countries", null);
        });
    }
    // SET TIMEZONE IF TIMEZONE INFORMATION IS NOT AVAILABLE
    setInitialTimezone()
  }, []);

  // MANDATORY GOOGLE API CLIENT LOAD FOR FACILITATING GOOGLE LOGIN.
  useEffect(() => {
    let controller = new AbortController();
    let isSubscribed = true;
    if (isSubscribed) setLoading(false);
    // we will load gapi client and once that is done, render the page to client
    AuthGuardService.loadGAPIClient()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(true);
      });

    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);
  return loading ? (
    <ThemeProvider initialTheme={initialTheme} reducer={themeReducer}>
      <ClientDeviceProvider>
        <Layout options={{ title: process.env.NEXT_PUBLIC_APP_TITLE }}>
          <Splash />
        </Layout>
      </ClientDeviceProvider>
    </ThemeProvider>
  ) : (
    <>
      <ThemeProvider initialTheme={initialTheme} reducer={themeReducer}>
        <QueryClientProvider client={queryClient}>
          <DataLayer initialState={initialState} reducer={reducer}>
            <Hydrate state={pageProps.dehydratedState}>
              <BrowserRouter
                getUserConfirmation={(message, callback) => {
                  // this is the default behavior
                  const allowTransition = window.confirm(message);
                  callback(allowTransition);
                }}
              >
                <ClientDeviceProvider>
                  <Component {...pageProps} />
                </ClientDeviceProvider>
              </BrowserRouter>
              <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
          </DataLayer>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

/***
 * GLOBAL APP CSS
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/responsive-menu.css";
import 'react-quill/dist/quill.snow.css'
/***
 * GLOBAL APP CSS
 */

import { DataLayer, useDataLayerContextValue } from "../context/DataLayer";
import reducer, { initialState } from "../context/reducer";
import IPService from "./api/ipdata/IPService";
import {
  setLocalStorageObject,
  getLocalStorageObject,
} from "../localStorage/local-storage";
import { useEffect } from "react";
import { RouteGuard } from "../route-guard/authorized/component/RouteGuard";
import { AuthGuardService } from "../auth-guard/service/AuthGuardService";
import { useRouter } from "next/router";
import { DEFAULT_ROUTE } from "../constants/routes";
import SignOutService from "./api/users/auth/SignOutService";
import { asyncSubscriptions, sessionValidityPollDelay } from "../async/subscriptions";
import { AuthService } from "./api/users/auth/AuthService";
function MyApp({ Component, pageProps }) {
  let SESSION_VALIDITY_POLLER;
  const router = useRouter();
  useEffect(() => {
    let controller = new AbortController();
    // ENABLE PWA ABILITY
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./serviceworker.js")
        .then((reg) => {
          console.log("Success:", reg.scope);
        })
        .catch((err) => {
          console.log("Failure:", err.message);
        });
    }
    return () => {
      controller?.abort();
    };
  }, []);
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

  // MANDATORY SESSION CHECK SUBSCRIPTION.
  useEffect(() => {
    let controller = new AbortController();
    let isSubscribed = true;
    if (isSubscribed) getSessionValidity(router);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);
  async function getSessionValidity(router) {
    if (asyncSubscriptions.SESSION_EXPIRY.enabled 
      && AuthService.isUserLoggedIn() && !asyncSubscriptions.SESSION_EXPIRY.subscribed){
      await AuthGuardService.pollSessionValidity()
      .then(() => {
        window.sessionValidityPoller = setInterval(async () => {
          await setSessionValidityPoller(router);
        }, asyncSubscriptions.SESSION_EXPIRY.pollEvery);
        asyncSubscriptions.SESSION_EXPIRY.subscribed=true;
      })
      .catch((err) => {
        //in case of any error returned, means the session is invalid, clear interval, logout & redirect to public dashboard
        // automatic logout
        SignOutService.signout()
          .then(() => {})
          .catch((error) => {})
          .finally(() => {
            AuthGuardService.logout();
            router.push({
              pathname: DEFAULT_ROUTE.DASHBOARD,
            });
          });
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
      .catch((err) => {
        //in case of any error returned, means the session is invalid, clear interval, logout & redirect to public dashboard
        // automatic logout
        SignOutService.signout()
          .then(() => {})
          .catch((error) => {})
          .finally(() => {
            AuthGuardService.logout();
            router.push({
              pathname: DEFAULT_ROUTE.DASHBOARD,
            });
          });
      });
  }
  return (
    <>
      <DataLayer initialState={initialState} reducer={reducer}>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </DataLayer>
    </>
  );
}

export default MyApp;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { asyncSubscriptions } from "../../../async/subscriptions";
import { KEYS } from "../../../async/queries/keys/unique-keys";
import SessionValidityService from "../../../pages/api/users/session/SessionValidityService";
import {
  getLocalStorageObject,
  removeLocalStorageObject,
} from "../../../localStorage/local-storage";
import { SignOffUser } from "../SignOut";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { isUvsityLogicalError } from "../../../utils/utility";

function ServerWrapper(props) {
  const queryClient = useQueryClient();
  const Router = useRouter();
  const [{}, unauthorize] = useDataLayerContextValue();
  const getSessionValidity = async () =>
    (await SessionValidityService.getSessionValidity()).data;
  const SESSION_EXPIRY = useQuery(
    [KEYS.LOGIN.SESSION.VALIDITY],
    getSessionValidity,
    {
      refetchInterval: () =>
        asyncSubscriptions.SESSION_EXPIRY.enabled
          ? asyncSubscriptions.SESSION_EXPIRY.pollEvery
          : false,
      refetchIntervalInBackground:true
    }
  );
  const unauthorizedResponseReceived = () =>
    getLocalStorageObject("uvsity-unauthorized-response");

  const hasInternalServerError = () => {
    return getLocalStorageObject("uvsity-internal-error-response");
  };
  const getDiagnostics = (internalError)=>{
    return internalError?.data?.Uvsity_Errors_Stacktrace ?
        internalError?.data?.Uvsity_Errors_Stacktrace[1] :
        internalError?.data?.Uvsity_Errors? internalError?.data?.Uvsity_Errors[0]:null;
  }
  
  useEffect(async () => {
    if (unauthorizedResponseReceived()) {
      console.log("SERVER: Unauthorized signal received. Logging off session.");
      SignOffUser(queryClient, Router, unauthorize, true);
      return;
    }
    if (SESSION_EXPIRY.isError) {
      console.info("SERVER: Session expired");
      if (props.expiryEmitter) {
        props.expiryEmitter(true);
        return;
      }
    }
    if (SESSION_EXPIRY.isLoading) {
      console.log("SERVER: Checking session expiration");
    }
    if (SESSION_EXPIRY.isSuccess) {
      console.log("SERVER: Logged in");
    }

    // at the end check for any internal server errors, if session has not expired.
    let internalError = hasInternalServerError();
    if (props.serverErrorEmitter && internalError) {
      internalError = JSON.parse(internalError);
      if(isUvsityLogicalError(internalError)) {
        console.info("SERVER: Internal server logic error encountered. System will auto-recover and error(if any) will be handled gracefully.");
        //removeLocalStorageObject("uvsity-internal-error-response"); 
        return;
      }
      else {
        const _error = {
          url: internalError.config.baseURL + internalError.config.url,
          message:internalError?.statusText
          ? internalError?.statusText?.toString()
          :  "There occured an internal server error.",
          code: internalError.status,
          error: true,
          method:internalError?.config.method?.toUpperCase(),
          diagnostics: getDiagnostics(internalError), 
        };
        console.error("SERVER: Internal server error.");
        props.serverErrorEmitter(_error);
        removeLocalStorageObject("uvsity-internal-error-response"); 
        //pop out error state on error emit.
      }

    }
     
  }, [SESSION_EXPIRY]);

  useEffect(() => {
    const cancelRunningQueries = () => {
      queryClient.cancelQueries(
        [
          KEYS.LOGIN.INFO,
          KEYS.SESSION.PUBLIC.TOP,
          KEYS.SESSION.TOP,
          KEYS.PROFILE.SUMMARY,
          KEYS.PROFILE.EDUCATION,
          KEYS.PROFILE.VISITS,
          KEYS.METADATA.STATIC,
          KEYS.METADATA.ROOT,
          KEYS.NETWORK.PEOPLE.INTERESTING,
        ],
        { exact: true, fetching: true }
      );
    };
    Router.events.on("routeChangeStart", cancelRunningQueries);

    return () => {
      Router.events.off("routeChangeStart", cancelRunningQueries);
    };
  }, []);
  return <div>{props.children}</div>;
}

export default ServerWrapper;

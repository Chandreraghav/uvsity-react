/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useQuery } from "react-query";
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
import { useQueryClient } from "react-query";
import { useDataLayerContextValue } from "../../../context/DataLayer";
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
    }
  );
  const unauthorizedResponseReceived = () =>
    getLocalStorageObject("uvsity-unauthorized-response");

  const hasInternalServerError = () => {
    return getLocalStorageObject("uvsity-internal-error-response");
  };
  useEffect(async () => {
    if (unauthorizedResponseReceived()) {
      console.log("SERVER: Unauthorzed signal received. Logging off session.");
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
      const _error = {
        url: internalError.config.baseURL + internalError.config.url,
        message:internalError?.statusText
        ? internalError?.statusText?.toString()
        :  "There occured an internal server error.",
        code: internalError.status,
        error: true,
        method:internalError?.config.method?.toUpperCase(),
        diagnostics: internalError?.data?.Uvsity_Errors_Stacktrace?
        internalError?.data?.Uvsity_Errors_Stacktrace[1]:
        null,
      };
      console.error("SERVER: Internal server error.");
      props.serverErrorEmitter(_error);
      removeLocalStorageObject("uvsity-internal-error-response"); //pop out error state on error emit.
    }
    
  }, [SESSION_EXPIRY]);

  return <div>{props.children}</div>;
}

export default ServerWrapper;
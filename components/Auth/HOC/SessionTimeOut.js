import { useEffect } from "react";
import { useQuery } from "react-query";
import React from "react";
import { asyncSubscriptions } from "../../../async/subscriptions";
import { KEYS } from "../../../async/queries/keys/unique-keys";
import SessionValidityService from "../../../pages/api/users/session/SessionValidityService";

function SessionTimeOut(props) {
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
  useEffect(async () => {
    if (SESSION_EXPIRY.isError) {
      console.log("SERVER: Session expired");
      if (props.expiryEmitter) {
        props.expiryEmitter(true);
      }
    }
    if (SESSION_EXPIRY.isLoading) {
      console.log("SERVER: Checking session expiration");
    }
    if (SESSION_EXPIRY.isSuccess) {
      console.log("SERVER: Logged in");
    }
  }, [SESSION_EXPIRY]);

  return <div>{props.children}</div>;
}

export default SessionTimeOut;

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { KEYS } from "../../../async/queries/keys/unique-keys";
import { standardStaleTime } from "../../../async/subscriptions";
import { AUTH_TOKENS } from "../../../constants/userdata";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { actionTypes } from "../../../context/reducer";
import { removeLocalStorageObject } from "../../../localStorage/local-storage";
import UserDataService from "../../../pages/api/users/data/UserDataService";
import RequestFailedDialog from "../../shared/modals/RequestFailedDialog";
import TimeOutDialog from "../../shared/modals/TimeOutDialog";
import IdleTimeOut from "./IdleTimeOut";
import ServerError from "./ServerError";
import ServerWrapper from "./ServerWrapper";
//HOC
function RootChain(props) {
  const [context, dispatch] = useDataLayerContextValue();
  const [idleTimedOut, setIdleTimedOut] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const initialError = {
    url: null,
    message: null,
    method: null,
    code: null,
    error: false,
    diagnostics: null,
  };
  const [serverError, setServerError] = useState(initialError);

  const handleServerErrorDialogClose = (obj) => {
    setServerError(initialError);
    removeLocalStorageObject("uvsity-internal-error-response");
  };
  const handleIdleTimeOutDialogClose = () => {
    setIdleTimedOut(false);
  };

  const handleSessionTimeOutDialogClose = () => {
    setSessionExpired(false);
  };
  const idleTimeOutEmitter = (idleTimeoutEvent) => {
    setIdleTimedOut(true);
  };

  const sessionExpiryEmitter = (sessionExpiredInd) => {
    setSessionExpired(sessionExpiredInd);
  };
  const serverErrorEmitter = (error) => {
    setServerError(error);
    if (error) removeLocalStorageObject("uvsity-internal-error-response");
  };

  const activeTimeEmitter = (activeTimeEvent) => { };



  const fetchSummary = async () => {
    return (await UserDataService.getSummary()).data
  }
  const fetchLoggedInInfo = async () => {
    return (await UserDataService.getLoggedInInformation()).data
  }

  const USER_SUMMARY = useQuery([KEYS.PROFILE.SUMMARY], fetchSummary, {
    staleTime: standardStaleTime,
  });

  const USER_LOGIN_INFO = useQuery([KEYS.LOGIN.INFO], fetchLoggedInInfo, {
    staleTime: standardStaleTime,
  });
  
  useEffect(() => {
    if (!context.userdata) {
      dispatch({
        type: actionTypes.SET_USERDATA,
        userdata: USER_SUMMARY.data
      });
    }

    if (!context.logged_in_info) {
      dispatch({
        type: actionTypes.SET_USER_LOGIN_INFO,
        logged_in_info: USER_LOGIN_INFO.data
      });
    }
  }, [USER_LOGIN_INFO.data, USER_SUMMARY.data])

  return (
    <ServerWrapper
      serverErrorEmitter={serverErrorEmitter}
      expiryEmitter={sessionExpiryEmitter}
    >
      {!idleTimedOut && (
        <>
          <TimeOutDialog
            dialogCloseRequest={handleSessionTimeOutDialogClose}
            isOpen={sessionExpired}
            title={`Your session has expired!`}
            name="Session Time out-Dialog"
            theme="dark"
            type={AUTH_TOKENS.SESSION_MONITOR}
            graceTime={5}
          />
        </>
      )}
      {!sessionExpired && !idleTimedOut && (
        <>
          <ServerError>
            <RequestFailedDialog
              theme
              url={serverError.url}
              method={serverError.method}
              message={serverError.message}
              code={serverError.code}
              dialogCloseRequest={handleServerErrorDialogClose}
              isOpen={serverError.error}
              diagnostics={serverError.diagnostics}
            />
          </ServerError>
        </>
      )}

      <IdleTimeOut
        idleEmitter={idleTimeOutEmitter}
        activeEmitter={activeTimeEmitter}
      >
        {!sessionExpired && (
          <>
            <TimeOutDialog
              dialogCloseRequest={handleIdleTimeOutDialogClose}
              isOpen={idleTimedOut}
              title={`You have been idle!`}
              name="Idle Time out-Dialog"
              theme="dark"
              type={AUTH_TOKENS.IDLE_MONITOR}
            />
          </>
        )}

        {props.children}
      </IdleTimeOut>
    </ServerWrapper>
  );
}

export default RootChain;

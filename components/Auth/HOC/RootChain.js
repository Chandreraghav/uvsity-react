import React, { useState } from "react";
import { AUTH_TOKENS } from "../../../constants/userdata";
import { removeLocalStorageObject } from "../../../localStorage/local-storage";
import RequestFailedDialog from "../../shared/modals/RequestFailedDialog";
import TimeOutDialog from "../../shared/modals/TimeOutDialog";
import IdleTimeOut from "./IdleTimeOut";
import ServerError from "./ServerError";
import ServerWrapper from "./ServerWrapper";
//HOC
function RootChain(props) {
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

  const activeTimeEmitter = (activeTimeEvent) => {};

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

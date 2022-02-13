import React, { useState } from "react";
import TimeOutDialog from "../../shared/modals/TimeOutDialog";
import IdleTimeOut from "./IdleTimeOut";
import SessionTimeOut from "./SessionTimeOut";
//HOC
function RootChain(props) {
  const [idleTimedOut, setIdleTimedOut] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

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

  const activeTimeEmitter = (activeTimeEvent) => {};

  return (
    <SessionTimeOut expiryEmitter={sessionExpiryEmitter}>
      {!idleTimedOut && (
        <>
          <TimeOutDialog
            dialogCloseRequest={handleSessionTimeOutDialogClose}
            isOpen={sessionExpired}
            title={`Your session has expired!`}
            name="Session Time out-Dialog"
            theme="dark"
            type="SESSION_MONITOR"
            graceTime={5}
          />
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
              type="IDLE_MONITOR"
            />
          </>
        )}

        {props.children}
      </IdleTimeOut>
    </SessionTimeOut>
  );
}

export default RootChain;

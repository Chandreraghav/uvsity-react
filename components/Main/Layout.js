import React, { useEffect, useState } from "react";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import CommonMetaInfo from "../shared/CommonMetaInfo";
import IdleTimeOut from "../../components/Auth/IdleTimeOut";
import IdleTimeOutDialog from "../../components/shared/modals/IdleTimeOutDialog";
const Layout = (props) => {
  const [idleTimedOut, setIdleTimedOut] = useState(false);

  const options = {
    title: props?.options?.title,
    desc: props?.options?.desc,
    poster: props?.options?.poster,
  };
  const [loggedIn, setLoggedIn] = useState(props.lowZoom);
  const handleIdleTimeOutDialogClose = () => {
    setIdleTimedOut(false);
  };
  const idleTimeOutEmitter = (idleTimeoutEvent) => {
    console.log(idleTimeoutEvent);
    setIdleTimedOut(true);
  };
  const activeTimeEmitter = (activeTimeEvent) => {
    console.log(activeTimeEvent);
  };
  useEffect(() => {
    if (!loggedIn) setLoggedIn(AuthService.isUserLoggedIn());
  }, []);

  return props.private ? (
    <>
      <IdleTimeOut
        idleEmitter={idleTimeOutEmitter}
        activeEmitter={activeTimeEmitter}
      >
        <IdleTimeOutDialog
          dialogCloseRequest={handleIdleTimeOutDialogClose}
          isOpen={idleTimedOut}
          title={`You have been idle!`}
          name="Idle Time out-Dialog"
          theme="dark"
        />
        <div className={`${loggedIn ? "app__body" : ""} app`}>
          <CommonMetaInfo options={options} />
          <div>{props.children}</div>
        </div>
      </IdleTimeOut>
    </>
  ) : (
    <>
      <div className={`${loggedIn ? "app__body" : ""} app`}>
        <CommonMetaInfo options={options} />
        <div>{props.children}</div>
      </div>
    </>
  );
};
export default Layout;

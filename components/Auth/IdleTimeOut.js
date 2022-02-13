import React, { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
//HOC
const IdleTimeOut = (props) => {
  const handleOnIdle = (event) => {
    if (props.idleEmitter) {
      const idleObj = {
        message: "user is idle",
        event,
        lastActiveTime: getLastActiveTime(),
      };
      props.idleEmitter(idleObj);
    }
  };

  const handleOnActive = (event) => {};

  const handleOnAction = (event) => {
    if (props.activeEmitter) {
      const activeObj = {
        message: "user is active and doing something",
        event,
        remainingTime: getRemainingTime(),
      };
      props.activeEmitter(activeObj);
    }
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 30, // user will be shown a idle time out dialog with a grace time of 30 seconds after 30 mins of inactivity.
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });
  return <div>{props.children}</div>;
};

/***
 * Default Events
mousemove
keydown
wheel
DOMMouseScroll
mousewheel
mousedown
touchstart
touchmove
MSPointerDown
MSPointerMove
visibilitychange
 */

export default IdleTimeOut;

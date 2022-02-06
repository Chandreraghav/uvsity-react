import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    Fragment,
  } from 'react';

const SessionPoller = () => {
  const [events, setEvents] = useState(['click', 'load', 'scroll']);
  const [second, setSecond] = useState(0);
  return <Fragment />
};

export default SessionPoller;

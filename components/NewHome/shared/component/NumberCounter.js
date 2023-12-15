/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";

export const NumberCounter = ({ number, unit = '', subTitle = '', className="", start = false}) => {
  const intervalRef = useRef();
  const [currentCount, setCurrentCount] = useState(number > 10 ? number - 10 : 0);

  useEffect(() => {
    return () => {
      const intervalCurrentRef = intervalRef?.current;
      if (intervalCurrentRef) {
        clearInterval(intervalCurrentRef);
      }
    }
  }, []);

  useEffect(() => {
    if (Number.isInteger(number) && start) {
      const interval = setInterval(() => {
        setCurrentCount((currentCount) => currentCount + 1);
      }, 50);
      intervalRef.current = interval;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, start]);

  useEffect(() => {
    if (currentCount >= number) {
      clearInterval(intervalRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCount]);

  return number ? (
    <div className={`
      relative
      before:content-[' '] before:absolute before:w-1 before:inline-block before:h-full
      before:bg-gradient-to-b before:from-new-primary before:to-new-secondary
      ${className}`}
    >
      <div className="flex flex-col pl-7">
        <span className="mb-2 text-4xl text-new-primary">{start ? currentCount : number}{unit}</span>
        <span className="text-new-secondary">{subTitle}</span>
      </div>
    </div>
  ) : null;
};

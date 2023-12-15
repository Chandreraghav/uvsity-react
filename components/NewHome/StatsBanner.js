/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { NumberCounter, StatData, useIsVisible } from './shared';

const StatsBanner = () => {
  const [startCounter, setStartCounter] = useState(false);
  const componentParentRef = useRef();
  const isVisible = useIsVisible(componentParentRef);

  useEffect(() => {
    if (isVisible) {
      setStartCounter(true);
    }
  }, [isVisible]);

  return (
    <section className="w-full py-16 bg-new-tertiary" ref={componentParentRef}>
      <div className="container flex flex-col lg:flex-row mx-auto justify-center items-center">
        <div className="w-full flex flex-row justify-around sm:justify-evenly flex-wrap sm:flex-nowrap">
          {
            (StatData || []).map(({ text, count }, index) => {
              return (
                <NumberCounter 
                  key={text} 
                  className="mr-4 mb-16 sm:!mb-0 sm:!mr-0"
                  number={count} 
                  unit="+" 
                  subTitle={text}
                  start={startCounter}
                />
              )
            })
          }
        </div>  
      </div>
    </section>
  );
};



export default StatsBanner;

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
/**
 * There should be one footer
 * If this is approved, we will move to shared and add features to it.
 * @returns 
 */
export const BannerAccordion = ({ bannerItems = [], reverse = false }) => {
  const [active, setActive] = useState(0);

  const { image: activeImage = '', title: activeTitle = '', subTitle: activeSubTitle = '' } = bannerItems[active];

  return (
    <div className={`w-full flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} mx-auto justify-between items-center`}>
      <img alt="" src={activeImage || ''} className="w-auto lg:!w-5/12 h-96 lg:h-auto" />
      <div className="flex-column w-full lg:w-5/12 hidden lg:flex">
        {
          bannerItems.map(({ title, subTitle }, index) => {
            const isActiveStep = active === index;
            return (
              <button key={title} className={`hidden lg:flex flex-column !cursor-pointer border-b-2 ${isActiveStep ? 'border-new-tertiary' : 'border-new-primary'}  py-11 hover:opacity-100 ${isActiveStep ? 'opacity-100' : 'opacity-80'}`} onClick={() => setActive(index)}>
                <h3 className="text-xl lg:text-2xl font-bold text-new-primary mb-4">{title}</h3>
                <p className="text-base text-new-secondary text-left">{subTitle}</p>
              </button>
            )
          })
        }
      </div>
      <div className="text-center lg:!text-left w-full lg:w-5/12 flex lg:hidden justify-between curstor-pointer my-8">
        {
          bannerItems.map(({ title }, index) => {
            const isActiveStep = active === index;
            const isLastStep = index === bannerItems.length - 1;
            return (
              <div key={title} className={`cursor-pointer w-full h-1 ${isActiveStep ? 'bg-new-tertiary' : 'bg-new-primary'} ${!isLastStep && 'mr-4'}`} onClick={() => setActive(index)} />
            )
          })
        }
      </div>
      <button className="flex lg:hidden flex-column">
        <h3 className="text-xl lg:text-2xl font-bold text-new-primary mb-4">{activeTitle}</h3>
        <p className="text-base text-new-secondary text-left">{activeSubTitle}</p>
      </button>
    </div>
  );
};

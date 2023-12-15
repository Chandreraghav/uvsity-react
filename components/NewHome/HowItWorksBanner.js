/* eslint-disable @next/next/no-img-element */
import React from "react";
import { HowItWorksBannerFeatures, BannerAccordion } from './shared';

const HowItWorksBanner = () => {
  return (
    <section className="w-full py-16 bg-new-light-gray" id="how-it-works">
      <div className="container flex flex-col mx-auto items-left">
        <h2 className="text-3xl lg:text-4xl text-new-primary mb-16 font-bold">How it works</h2>
        <BannerAccordion bannerItems={HowItWorksBannerFeatures} reverse/>
      </div>
    </section>
  );
};

export default HowItWorksBanner;

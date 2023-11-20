/* eslint-disable @next/next/no-img-element */
import React from "react";
import { EarnBannerFeatures, BannerAccordion } from './shared';

const EarnBanner = () => {
  return (
    <section className="w-full py-16" id="earn-money">
      <div className="container flex flex-col mx-auto items-left">
        <h2 className="text-3xl lg:text-4xl text-new-primary mb-16 font-bold">Opportunities to Earn on Uvsity</h2>
        <BannerAccordion bannerItems={EarnBannerFeatures} />
      </div>
    </section>
  );
};

export default EarnBanner;

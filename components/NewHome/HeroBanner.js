/* eslint-disable @next/next/no-img-element */
import React from "react";
import { HeroBannerFeatures } from './shared/constants';

const HeroBanner = () => {
  return (
    <section className="w-full py-16 bg-new-secondary">
      <div className="container flex flex-col lg:flex-row  mx-auto justify-center items-center">
        <div className="w-full">
          <img src="/static/images/hero-poster.png" alt="" />
        </div>
        <ul className="w-full lg:w-1/2 text-new-text-secondary mt-4 lg:mt-0">
          {
            (HeroBannerFeatures || []).map(({ title, subTitle}) => {
              return (
                <li className="flex flex-col mb-4 text-center lg:!text-left" key={title}>
                  <h6 className="text-new-primary text-lg font-semibold uppercase leading-normal">{title}</h6>
                  <p className="text-base font-normal leading-normal text-new-text-secondary">{subTitle}</p>
                </li>
              )
            })
          }
        </ul>        
      </div>
    </section>
  );
};

export default HeroBanner;

/* eslint-disable @next/next/no-img-element */
import React from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AppFeatures } from './shared/constants';

const FeaturesBanner = () => {
  return (
    <section className="w-full py-16 bg-new-light-gray" id="features-banner">
      {
        (AppFeatures || []).map(({ image, title, subTitle,learnMoreId }, index) => {
          const isEven = (index+1)%2 === 0;
          return (
            <div key={title} className={`container flex flex-col-reverse ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} mx-auto mb-16 justify-between items-center`}>
              <img alt="" src={image} className="w-full lg:w-5/12" />
              <div className="flex flex-col mb-4 text-center lg:!text-left w-full lg:w-5/12" key={title}>
                <h3 className="text-new-primary text-3xl lg:text-4xl font-semibold uppercase leading-normal">{title}</h3>
                <p className="text-xl lg:text-2xl font-normal leading-normal text-new-secondary">{subTitle}</p>
                <a href={learnMoreId} className="flex text-new-primary hover:opacity-60 mt-8 w-max"><span>Learn More </span><ArrowDownwardIcon /></a>
              </div>
            </div>
          )
        })
      }
    </section>
  );
};

export default FeaturesBanner;

import React from "react";
import { AppButton, AppLink } from './shared';

const Banner = ({ onLoginCTAClick, onSignUpCTAClick }) => {
  return (
    <section className="w-full py-16">
      <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl lg:text-5xl text-new-primary mb-4 font-bold text-center">Where Education Meets Networking</h1>
        <p className="text-xl lg:text-2xl max-w-3xl text-center text-new-secondary">Host and Attend Sessions, Foster Connections with Your Alumni Community, and Earn Income Along the Way</p>
        <div className="flex flex-col">
          <AppButton className="!px-12 !py-3 lg:!px-20 mt-4" onClick={onSignUpCTAClick}>Sign up for free</AppButton>
          <span className="text-center text-new-secondary mt-2">Already have an account? <AppLink className="ml-2" type="secondary"  onClick={onLoginCTAClick}>Log in</AppLink></span>
        </div>
        
      </div>
    </section>
  );
};
export default Banner;

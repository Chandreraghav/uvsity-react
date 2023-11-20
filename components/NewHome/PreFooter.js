import React from "react";
import { AppButton } from './shared';

const PreFooter = ({ openSignUp }) => {
  return (
    <section className="w-full py-16 bg-new-tertiary">
      <div className="container flex flex-col mx-auto items-center py-8">
        <h2 className="text-3xl lg:text-4xl text-new-primary mb-4 font-bold text-center">Join Our Educational Community Today!</h2>
        <p className="text-xl lg:text-2xl max-w-3xl text-center text-new-secondary">Your Comprehensive Solution for Scheduling, Appointments, and Community Engagement.</p>
        <AppButton className="!px-12 !py-3 lg:!px-20 mt-4" onClick={openSignUp}>Sign up for free</AppButton>        
      </div>
    </section>
  );
};
export default PreFooter;

import React, { useState } from "react";
import { Header, Footer, HeaderMenuTypes } from './shared';
import Banner from './Banner';
import VideoSection from './VideoSection';
import StatsBanner from "./StatsBanner";
import FeaturesBanner from './FeaturesBanner';
import PreFooter from './PreFooter';
import EarnBanner from './EarnBanner';
import HowItWorksBanner from './HowItWorksBanner'
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const NewHome = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const handleHeaderNavClick = (type) => {
    if (type === HeaderMenuTypes.ABOUT_US) {
      window.location.hash = '#features-banner';
    } else if (type === HeaderMenuTypes.LOGIN){
      setOpenLoginModal(true);
    }
  };

  const onOpenLogin = () => {
    setOpenSignUpModal(false);
    setOpenLoginModal(true);
  };

  const onOpenSignup = () => {
    setOpenLoginModal(false);
    setOpenSignUpModal(true);
  };


  return (
    <section className="new-font-family">
      <Header handleHeaderNavClick={(type) => handleHeaderNavClick(type)}>New Home Page</Header>
      <main className="w-full pt-20">
        <Banner onLoginCTAClick={() => setOpenLoginModal(true)} onSignUpCTAClick={() => {console.log('coming here'); setOpenSignUpModal(true)}}/>
        <FeaturesBanner />
        <VideoSection />
        <StatsBanner />
        <EarnBanner />
        <HowItWorksBanner />
        <PreFooter openSignUp={() => setOpenSignUpModal(true)} />
        <LoginModal openLoginModal={openLoginModal} handleCloseLoginModal={() => setOpenLoginModal(false)} openSignUp={onOpenSignup} />
        <SignUpModal open={openSignUpModal} handleCloseSignupModal={() => setOpenSignUpModal(false)}  openLogin={onOpenLogin}/>
      </main>
      <Footer />
    </section>
  );
};
export default NewHome;

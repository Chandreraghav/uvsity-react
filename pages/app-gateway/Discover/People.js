import React, { useState } from "react";
import PrivateRoute from "../../../components/Auth/HOC/Routes/PrivateRoute";
import PhoneMenu from "../../../components/Authorized/Shared/FireFighter/PhoneMenu";
import Header from "../../../components/Authorized/Shared/Header";
import Layout from "../../../components/Main/Layout";
import Footer from "../../../components/shared/Footer";
import AreasOfInterestModal from "../../../components/shared/modals/AreasOfInterestModal";
import MatchingProfiles from "../../../components/Authorized/Network/People/Listing/View/Collections/MatchingProfiles";

function People() {
  const [layoutObj, setLayoutObject] = useState({
    title: `${process.env.NEXT_PUBLIC_APP_NAME} | Discover People `,
    desc: "Discover and connect with people based on your interests",

  });
  const [open, setOpen] = useState(true)
  const [profileInterestsForDiscoveringPeople, setProfileInterestsForDiscoveringPeople] = useState([])
  const handleInterestsDialogClose = (obj) => {
    if (obj.skip === false)
      setProfileInterestsForDiscoveringPeople(obj?.selectedAreasOfInterest || [])
    setOpen(false)
  }
  const handleInterestsDialogOpen = () => {
    setOpen(true)
  }


  const handleNavigationError = (obj) => {
    console.log(obj);
  };
  return (
    <Layout private options={layoutObj}>
      <Header
        onHeaderNavigationError={handleNavigationError}
      />

      <div className={`${profileInterestsForDiscoveringPeople.length === 0 ? 'h-screen' : ''}`}>
        {profileInterestsForDiscoveringPeople.length > 0 && <>
          <MatchingProfiles discoverProfilesThroughCommonInterests={handleInterestsDialogOpen} interests={profileInterestsForDiscoveringPeople} />
        </>}

      </div>

      <AreasOfInterestModal dialogCloseRequest={handleInterestsDialogClose} isOpen={open} />

      <PhoneMenu />
      <Footer minimizeOnSmallScreens />
    </Layout>
  );
}

export default PrivateRoute(People);

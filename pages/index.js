import Layout from "../components/Main/Layout";
import Header from "../components/shared/Header";
import Hero from "../components/Landing/Hero";
import Feature from "../components/Landing/Feature";
import Footer from "../components/shared/Footer";
import TrendingSessions from "../components/Landing/TrendingSessions";
import Stats from "../components/Landing/Stats";
import { AuthGuardService } from "../auth-guard/service/AuthGuardService";
import { useEffect, useState } from "react";
import { useDataLayerContextValue } from "../context/DataLayer";
import { actionTypes } from "../context/reducer";

const Home = () => {
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const layoutObj = {
    title: process.env.NEXT_PUBLIC_APP_TITLE,
  };
  const handleSignInDialogOpen = () => {
    setOpenSignInDialog(true);
  };
  const handleSignInDialogClose = () => {
    setOpenSignInDialog(false);
  };
  const [USER,unauthorize] = useDataLayerContextValue();
  const eraseContext = () => {
    console.log('Clearing user data')
    unauthorize({
      type: actionTypes.SET_USER,
      user: null,
    });
  };
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
    if(!loggedIn && USER.user) {
      // this will be invoked only when the user is auto logged out.
      eraseContext()
    }
  }, []);
  // PUBLIC ROUTE
  return (
    <Layout options={layoutObj}>
      <Header isAuthorized={loggedIn}
        setSignInDialogOpen={handleSignInDialogOpen}
      />
      <Hero
        setSignInDialogClose={handleSignInDialogClose}
        signedInDialogOpened={openSignInDialog}
      />
      <Feature/>
      <TrendingSessions />
      {/* Stats will be replaced by About us section in the future */}
      <Stats />
      <Footer />
    </Layout>
  );
};
export default Home;

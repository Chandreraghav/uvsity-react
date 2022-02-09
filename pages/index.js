import Layout from "../components/Main/Layout";
import Header from "../components/shared/Header";
import Hero from "../components/Landing/Hero";
import Feature from "../components/Landing/Feature";
import Footer from "../components/shared/Footer";
import TrendingSessions from "../components/Landing/TrendingSessions";
import Stats from "../components/Landing/Stats";
import { AuthGuardService } from "../auth-guard/service/AuthGuardService";
import { useEffect, useState } from "react";

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
  
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
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

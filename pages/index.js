import { useState, useMemo } from "react";
import Layout from "../components/Main/Layout";
import Header from "../components/shared/Header";
import Hero from "../components/Landing/Hero";
import Feature from "../components/Landing/Feature";
import Footer from "../components/shared/Footer";
import NewHome from "../components/NewHome/NewHome";
import TrendingSessions from "../components/Landing/TrendingSessions";
import Stats from "../components/Landing/Stats";

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

  const newHome = useMemo(() => {
    return process.env.NEXT_PUBLIC_APP_NEW_HOME_PAGE;
  }, []);

  // PUBLIC ROUTE
  return (
    <Layout options={layoutObj}>
      {
        newHome ? <NewHome /> : (
          <>
            <Header setSignInDialogOpen={handleSignInDialogOpen} />
            <div className="main">
              <Hero
                setSignInDialogClose={handleSignInDialogClose}
                signedInDialogOpened={openSignInDialog}
              />
              <Feature />
              <TrendingSessions />
              {/* Stats will be replaced by About us section in the future */}
              <Stats />
            </div>

            <Footer />
          </>
        )
      }
    </Layout>
  );
};
export default Home;

import Layout from "../components/Main/Layout";
import Header from "../components/shared/Header";
import Hero from "../components/Landing/Hero";
import Feature from "../components/Landing/Feature";
import Footer from "../components/shared/Footer";
import TrendingSessions from "../components/Landing/TrendingSessions"
import Stats from "../components/Landing/Stats";
import { AuthGuardService } from "../auth-guard/service/AuthGuardService";
import { useEffect, useState } from "react";
const Home = () => {
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const layoutObj={
    title:process.env.NEXT_PUBLIC_APP_TITLE
  }
  const handleSignInDialogOpen = () => {
    setOpenSignInDialog(true);
  };
  const handleSignInDialogClose = () => {
    setOpenSignInDialog(false);
  };
  const [loggedIn, setLoggedIn]= useState(false)
  useEffect(()=>{
     setLoggedIn(AuthGuardService.isUserLoggedIn());
  },[])
  
  return (
    <Layout options={layoutObj}>
      <Header  setSignInDialogOpen={handleSignInDialogOpen} isAuthorized={loggedIn} isShared={true} />
      <Hero setSignInDialogClose={handleSignInDialogClose} signedInDialogOpened={openSignInDialog}  isAuthorized={loggedIn} isShared={false} />
      <Feature isAuthorized={loggedIn} isShared={false}/>
      <TrendingSessions isAuthorized={loggedIn} isShared={false} />
      {/* Stats will be replaced by About us section in the future */}
      <Stats isAuthorized={loggedIn} isShared={false}/>
      <Footer isAuthorized={loggedIn} isShared={true} />
    </Layout>
  );
};
export default Home;


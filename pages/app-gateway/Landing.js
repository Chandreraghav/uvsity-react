import Layout from "../../components/Main/Layout";
import Header from "../../components/Authorized/Shared/Header";
import Footer from "../../components/shared/Footer";
import PrivateRoute from "../../components/Auth/HOC/Routes/PrivateRoute";
import PhoneMenu from "../../components/Authorized/Shared/FireFighter/PhoneMenu";
import { Box } from "@mui/material";
import Dashboard from "../../components/Authorized/Dashboard"
import { useDataLayerContextValue } from "../../context/DataLayer";
import { useEffect } from "react";
import UserDataService from "../api/users/data/UserDataService";
import { actionTypes } from "../../context/reducer";

function Landing() {
  const layoutObj = {
    title: `${process.env.NEXT_PUBLIC_APP_TITLE}`,
  };
  const handleNavigationError = () => { };

   
  return (
    <Layout private lowZoom={false} options={layoutObj}>
      <Header
        onHeaderNavigationError={handleNavigationError}
      />
      <Box className="main">
        <Dashboard />
      </Box>
      <PhoneMenu />
      <Footer minimizeOnSmallScreens />
    </Layout>
  );
}
export default PrivateRoute(Landing);

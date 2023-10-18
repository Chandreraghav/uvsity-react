import Layout from "../../components/Main/Layout";
import Header from "../../components/Authorized/Shared/Header";
import Footer from "../../components/shared/Footer";
import PrivateRoute from "../../components/Auth/HOC/Routes/PrivateRoute";
import PhoneMenu from "../../components/Authorized/Shared/FireFighter/PhoneMenu";
import { Box } from "@mui/material";
import MessagesCore from "../../components/Authorized/Messages/Messages";

const Messages = () => {
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
        <MessagesCore />
      </Box>
      <PhoneMenu />
      <Footer minimizeOnSmallScreens />
    </Layout>
  );
}
export default PrivateRoute(Messages);

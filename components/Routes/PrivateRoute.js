import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import { useQueryClient } from "react-query";
import Layout from "../Main/Layout";
import Splash from "../shared/Splash";
const PrivateRoute = (WrappedComponent, verifyToken) => {
  return (props) => {
    const Router = useRouter();
    const queryClient = useQueryClient();
    const [verified, setVerified] = useState(false);
    useEffect(async () => {
      const accessToken = AuthService.getAuthToken();
      // if no accessToken was found,then we erase context, invalidate queries and redirect to "/" page.
      if (!accessToken) {
        setVerified(false);
        queryClient.invalidateQueries();
        AuthService.logout();
        eraseContext();
        Router.replace("/");
      } else {
        // we call the api that verifies the token.
        const data = await AuthGuardService.pollSessionValidity();
        // if token was verified we set the state.
        if (data.status === 200) {
          setVerified(true);
        } else {
          // If the token was fraud/session is invalid we remove it from localStorage/erase context, invalidate queries, and then redirect to "/"
          setVerified(false);
          queryClient.invalidateQueries();
          AuthService.logout();
          eraseContext();
          Router.replace("/");
        }
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return (
        <Layout options={{ title: process.env.NEXT_PUBLIC_APP_TITLE }}>
          <Splash />
        </Layout>
      );
    }
  };
};

export default PrivateRoute;

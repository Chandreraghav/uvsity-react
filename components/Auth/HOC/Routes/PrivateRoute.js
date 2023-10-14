import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuardService } from "../../../../auth-guard/service/AuthGuardService";
import { AuthService } from "../../../../pages/api/users/auth/AuthService";
import { useQueryClient } from "@tanstack/react-query";
import Layout from "../../../Main/Layout";
import Splash from "../../../shared/Splash";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import { eraseContext } from "../../SignOut";


// HOC
const PrivateRoute = (WrappedComponent, verifyToken) => {
  return (props) => {
    const Router = useRouter();
    const queryClient = useQueryClient();
    const [{}, unauthorize] = useDataLayerContextValue();
    const [verified, setVerified] = useState(false);
    
    const logoff = () => {
      setVerified(false);
      AuthService.logout();
      eraseContext(unauthorize);
      Router.replace("/");
      queryClient.removeQueries();
    };

    useEffect(async () => {
      const accessToken = AuthService.getAuthToken();
      // if no accessToken was found,then we erase context, invalidate queries and redirect to "/" page.
      if (!accessToken) {
        logoff();
      } else {
        // we call the api that verifies the token.
        await AuthGuardService.pollSessionValidity()
          .then((data) => {
            // if token was verified we set the state.
            if (data.status === 200) {
              
              setVerified(true);
            } else {
              // If the token was fraud/session is invalid we remove it from localStorage/erase context, invalidate queries, and then redirect to "/"
              logoff();
            }
          })
          .catch((err) => {
            logoff();
          });
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

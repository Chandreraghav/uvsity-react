import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import { useQueryClient } from "react-query";
import Layout from "../Main/Layout";
import Splash from "../shared/Splash";
import { actionTypes } from "../../context/reducer";
import { useDataLayerContextValue } from "../../context/DataLayer";
const PrivateRoute = (WrappedComponent, verifyToken) => {
  return (props) => {
    const Router = useRouter();
    const queryClient = useQueryClient();
    const [{}, unauthorize] = useDataLayerContextValue();
    const [verified, setVerified] = useState(false);
    const eraseContext = () => {
      unauthorize({
        type: actionTypes.SET_USER,
        user: null,
      });
    };
    useEffect(async () => {
      const accessToken = AuthService.getAuthToken();
      // if no accessToken was found,then we erase context, invalidate queries and redirect to "/" page.
      if (!accessToken) {
        setVerified(false);
        queryClient.removeQueries();
        AuthService.logout();
        eraseContext();
        Router.replace("/");
      } else {
        // we call the api that verifies the token.
        await AuthGuardService.pollSessionValidity().then((data) => {
          // if token was verified we set the state.
          if (data.status === 200) {
            setVerified(true);
          } else {
            // If the token was fraud/session is invalid we remove it from localStorage/erase context, invalidate queries, and then redirect to "/"
            setVerified(false);
            queryClient.removeQueries();
            AuthService.logout();
            eraseContext();
            Router.replace("/");
          }
        }).catch((err)=>{
          setVerified(false);
          queryClient.removeQueries();
          AuthService.logout();
          eraseContext();
          Router.replace("/");
        })
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

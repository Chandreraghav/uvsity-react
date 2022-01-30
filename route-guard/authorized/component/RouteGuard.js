import { useState, useEffect } from "react";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import { DEFAULT_ROUTE } from "../../../constants/routes";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { actionTypes } from "../../../context/reducer";
import { useRouter } from "next/router";
import SignOutService from "../../../pages/api/users/auth/SignOutService";
export { RouteGuard };

function RouteGuard({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [{}, authorize] = useDataLayerContextValue();
  const router = useRouter();
  useEffect(() => {
    // on initial load - run auth check
    // this check has to be in all page route
    authCheck(router.asPath);
    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);
  const eraseContext = () => {
    authorize({
      type: actionTypes.SET_USER,
      user: null,
    });
    
  };
  function authCheck(url) {
    // redirect to public dashboard if accessing a private page and not logged in
    const publicPaths = [DEFAULT_ROUTE.DASHBOARD];
    const path = url.split("?")[0];
    if (!AuthGuardService.isUserLoggedIn() && !publicPaths.includes(path)) {
      setAuthorized(false);
      // automatic logout
      SignOutService.signout()
        .then(() => {})
        .catch((error) => {})
        .finally(() => {
          AuthGuardService.logout();
          eraseContext();
          router.push({
            pathname: DEFAULT_ROUTE.DASHBOARD,
            query: { returnUrl: router.asPath },
          });
        });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}

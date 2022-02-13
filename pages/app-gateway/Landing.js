import Layout from "../../components/Main/Layout";
import Header from "../../components/Authorized/Shared/Header";
import Footer from "../../components/shared/Footer";
import Dashboard from "../../components/Authorized/Dashboard";
import { useQuery } from "react-query";
import { KEYS } from "../../async/queries/keys/unique-keys";
import UserDataService from "../api/users/data/UserDataService";
import { asyncSubscriptions } from "../../async/subscriptions";
import PrivateRoute from "../../components/Routes/PrivateRoute";
function Landing() {
  const layoutObj = {
    title: `${process.env.NEXT_PUBLIC_APP_TITLE}`,
  };

  
  const getSummary = async () => (await UserDataService.getSummary()).data;
  const getProfilePercentageCompletion = async () =>
    (await UserDataService.getProfilePercentageCompletion()).data;
  const getProfileVisits = async () =>
    (await UserDataService.getProfileVisits()).data;
  const getSuggestedFriends = async () =>
    (await UserDataService.getSuggestedFriends()).data;
  const getTopCourses = async () =>
    (await UserDataService.getTopCourses()).data;
  const getLoggedInInformation = async () =>
    (await UserDataService.getLoggedInInformation()).data;

  const USER_LOGIN_INFO = useQuery([KEYS.LOGIN.INFO], getLoggedInInformation, {
    refetchInterval: () =>
      asyncSubscriptions.LOGGED_IN_USER_INFO.enabled
        ? asyncSubscriptions.LOGGED_IN_USER_INFO.pollEvery
        : false,
  });
  const TOP_SESSIONS = useQuery([KEYS.SESSION.TOP], getTopCourses);
  const USER_PROFILE_SUMMARY = useQuery([KEYS.PROFILE.SUMMARY], getSummary);
  const USER_PROFILE_PERCENTAGE_COMPLETION = useQuery(
    [KEYS.PROFILE.COMPLETION],
    getProfilePercentageCompletion
  );
  const PROFILE_VISITS = useQuery([KEYS.PROFILE.VISITS], getProfileVisits, {
    refetchInterval: () =>
      asyncSubscriptions.PROFILE_VISITS.enabled
        ? asyncSubscriptions.PROFILE_VISITS.pollEvery
        : false,
  });
  const SUGGESTED_FRIENDS = useQuery(
    [KEYS.NETWORK.PEOPLE.INTERESTING],
    getSuggestedFriends,
    {
      refetchInterval: () =>
        asyncSubscriptions.INTERESTING_CONNECTIONS.enabled
          ? asyncSubscriptions.INTERESTING_CONNECTIONS.pollEvery
          : false,
    }
  );

  const getData = {
    USER_LOGIN_INFO,
    USER_PROFILE_SUMMARY,
    USER_PROFILE_PERCENTAGE_COMPLETION,
    PROFILE_VISITS,
    TOP_SESSIONS,
    SUGGESTED_FRIENDS,
  };
   
  return (
    <Layout lowZoom={true}  options={layoutObj}>
      <Header data={getData.USER_PROFILE_SUMMARY}  />
      <Dashboard data={getData} />
      <Footer />
    </Layout>
  );
}
export default PrivateRoute(Landing);

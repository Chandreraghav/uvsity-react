import Layout from "../../components/Main/Layout";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import Dashboard from "../../components/Authorized/Dashboard";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { useState, useEffect } from "react";
import UserDataService from "../api/users/data/UserDataService";
import { useDataLayerContextValue } from "../../context/DataLayer";
import { actionTypes } from "../../context/reducer";
function Landing() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [{}, dispatch] = useDataLayerContextValue();
  const [moduleError, setModuleError] = useState([]);
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);

  useEffect(async () => {
    let controller = new AbortController();
    await UserDataService.getLoggedInInformation()
      .then((loggedInInformation) => {
        dispatch({
          type: actionTypes.USER.LOGGED_IN_INFO,
          LOGGED_IN_INFO: loggedInInformation,
        });
      })
      .catch((err) => {
        moduleError.push({
          key: actionTypes.USER.LOGGED_IN_INFO,
          err: err.message,
        });
      });

    await UserDataService.getSummary()
      .then((summary) => {
        dispatch({
          type: actionTypes.USER.SUMMARY,
          SUMMARY: summary,
        });
      })
      .catch((err) => {
        moduleError.push({ key: actionTypes.USER.SUMMARY, err: err.message });
      });

    await UserDataService.getProfilePercentageCompletion()
      .then((profilePerecentageCompletion) => {
        dispatch({
          type: actionTypes.USER.PROFILE_PERCENTAGE_COMPLETION,
          PROFILE_PERCENTAGE_COMPLETION: profilePerecentageCompletion,
        });
      })
      .catch((err) => {
        moduleError.push({
          key: actionTypes.USER.PROFILE_PERCENTAGE_COMPLETION,
          err: err.message,
        });
      });

    await UserDataService.getProfileVisits()
      .then((profileVisits) => {
        dispatch({
          type: actionTypes.USER.PROFILE_VISITS,
          PROFILE_VISITS: profileVisits,
        });
      })
      .catch((err) => {
        moduleError.push({
          key: actionTypes.USER.PROFILE_VISITS,
          err: err.message,
        });
      });

    await UserDataService.getTopCourses()
      .then((topCourses) => {
        dispatch({
          type: actionTypes.USER.TOP_COURSES,
          TOP_COURSES: topCourses,
        });
      })
      .catch((err) => {
        moduleError.push({
          key: actionTypes.USER.TOP_COURSES,
          err: err.message,
        });
      });

    await UserDataService.getSuggestedFriends()
      .then((suggestedFriends) => {
        dispatch({
          type: actionTypes.USER.SUGGESTED_FRIENDS,
          SUGGESTED_FRIENDS: suggestedFriends,
        });
      })
      .catch((err) => {
        moduleError.push({
          key: actionTypes.USER.SUGGESTED_FRIENDS,
          err: err.message,
        });
      });

    await UserDataService.getNetworkUpdates()
      .then((networkUpdates) => {
        dispatch({
          type: actionTypes.USER.NETWORK_UPDATES,
          NETWORK_UPDATES: networkUpdates,
        });
      })
      .catch((err) => {
        moduleError.push({
          key: actionTypes.USER.NETWORK_UPDATES,
          err: err.message,
        });
      });
    await UserDataService.getHotTopics()
      .then((hotTopics) => {
        dispatch({
          type: actionTypes.USER.HOT_TOPICS,
          HOT_TOPICS: hotTopics,
        });
      })
      .catch((err) => {
        moduleError.push({
          key: actionTypes.USER.HOT_TOPICS,
          err: err.message,
        });
      });

    return () => {
      controller?.abort();
    };
  }, []);

  if (!loggedIn) {
    return "";
  }
  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_TITLE}`}>
      <Header isAuthorized={loggedIn} isShared={true} />
      <Dashboard isAuthorized={loggedIn} isShared={false} />
      <Footer isAuthorized={loggedIn} />
    </Layout>
  );
}
export default Landing;

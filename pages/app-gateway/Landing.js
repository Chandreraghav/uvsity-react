import Layout from "../../components/Main/Layout";
import Header from "../../components/Authorized/Shared/Header";
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
    let isSubscribed = true;
    let controller = new AbortController();
    await UserDataService.getProfileVisits()
      .then((profileVisits) =>
        isSubscribed
          ? dispatch({
              type: actionTypes.USER.PROFILE_VISITS,
              PROFILE_VISITS: profileVisits,
            })
          : null
      )
      .catch((err) => {
        if (isSubscribed) {
          moduleError.push({
            key: actionTypes.USER.PROFILE_VISITS,
            err: err.message,
          });
        }
      });
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await UserDataService.getProfilePercentageCompletion()
      .then((profilePerecentageCompletion) =>
        isSubscribed
          ? dispatch({
              type: actionTypes.USER.PROFILE_PERCENTAGE_COMPLETION,
              PROFILE_PERCENTAGE_COMPLETION: profilePerecentageCompletion,
            })
          : null
      )
      .catch((err) => {
        if (isSubscribed) {
          moduleError.push({
            key: actionTypes.USER.PROFILE_PERCENTAGE_COMPLETION,
            err: err.message,
          });
        }
      });
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);
  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await UserDataService.getSummary()
      .then((summary) =>
        isSubscribed
          ? dispatch({
              type: actionTypes.USER.SUMMARY,
              SUMMARY: summary,
            })
          : null
      )
      .catch((err) => {
        if (isSubscribed)
          moduleError.push({ key: actionTypes.USER.SUMMARY, err: err.message });
      });

    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await UserDataService.getTopCourses()
      .then((topCourses) =>
        isSubscribed
          ? dispatch({
              type: actionTypes.USER.TOP_COURSES,
              TOP_COURSES: topCourses,
            })
          : null
      )
      .catch((err) => {
        if (isSubscribed) {
          moduleError.push({
            key: actionTypes.USER.TOP_COURSES,
            err: err.message,
          });
        }
      });
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await UserDataService.getSuggestedFriends()
      .then((suggestedFriends) =>
        isSubscribed
          ? dispatch({
              type: actionTypes.USER.SUGGESTED_FRIENDS,
              SUGGESTED_FRIENDS: suggestedFriends,
            })
          : null
      )
      .catch((err) => {
        if (isSubscribed) {
          moduleError.push({
            key: actionTypes.USER.SUGGESTED_FRIENDS,
            err: err.message,
          });
        }
      });
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await UserDataService.getNetworkUpdates()
      .then((networkUpdates) =>
        isSubscribed
          ? dispatch({
              type: actionTypes.USER.NETWORK_UPDATES,
              NETWORK_UPDATES: networkUpdates,
            })
          : null
      )
      .catch((err) => {
        if (isSubscribed) {
          moduleError.push({
            key: actionTypes.USER.NETWORK_UPDATES,
            err: err.message,
          });
        }
      });
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await UserDataService.getHotTopics()
      .then((hotTopics) =>
        isSubscribed
          ? dispatch({
              type: actionTypes.USER.HOT_TOPICS,
              HOT_TOPICS: hotTopics,
            })
          : null
      )
      .catch((err) => {
        if (isSubscribed) {
          moduleError.push({
            key: actionTypes.USER.HOT_TOPICS,
            err: err.message,
          });
        }
      });

    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);
  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await UserDataService.getLoggedInInformation()
      .then((loggedInInformation) =>
        isSubscribed
          ? dispatch({
              type: actionTypes.USER.LOGGED_IN_INFO,
              LOGGED_IN_INFO: loggedInInformation,
            })
          : null
      )
      .catch((err) => {
        if (isSubscribed) {
          moduleError.push({
            key: actionTypes.USER.LOGGED_IN_INFO,
            err: err.message,
          });
        }
      });

    return () => {
      controller?.abort();
      isSubscribed = false;
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

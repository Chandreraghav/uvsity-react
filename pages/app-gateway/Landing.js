import Layout from "../../components/Main/Layout";
import Header from "../../components/Authorized/Shared/Header";
import Footer from "../../components/shared/Footer";
import Dashboard from "../../components/Authorized/Dashboard";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { useState, useEffect } from "react";
import UserDataService from "../api/users/data/UserDataService";
import { useDataLayerContextValue } from "../../context/DataLayer";
import { actionTypes } from "../../context/reducer";
import Splash from "../../components/shared/Splash";
import {
  asyncSubscriptions,
} from "../../async/subscriptions";
function Landing() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [USER, dispatch] = useDataLayerContextValue();
  const [moduleError, setModuleError] = useState([]);
  const layoutObj={
    title:`${process.env.NEXT_PUBLIC_APP_TITLE}`
  }
  useEffect(() => {
    setTimeout(() => {
      setLoggedIn(AuthGuardService.isUserLoggedIn());
    }, 3000);
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await profileVisits(isSubscribed, dispatch, moduleError);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await profileCompletion(isSubscribed, dispatch, moduleError);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);
  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await profileSummary(isSubscribed, dispatch, moduleError);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await topCourses(isSubscribed, dispatch, moduleError);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await interestingConnections(isSubscribed, dispatch, moduleError);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await networkUpdates(isSubscribed, dispatch, moduleError);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await hotTopics(isSubscribed, dispatch, moduleError);

    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);
  useEffect(async () => {
    let isSubscribed = true;
    let controller = new AbortController();
    await loggedInInformation(isSubscribed, dispatch, moduleError);
    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, []);

  // ON DEMAND TIMED SUBSCRIPTIONS - PAGE SPECIFIC
  useEffect(() => {
    // cancel all subs prior to registering them again
    AuthGuardService.cancelAllSubscriptions(false);
    if (
      asyncSubscriptions.PROFILE_VISITS.enabled &&
      !asyncSubscriptions.PROFILE_VISITS.subscribed
    ) {
      AuthGuardService.pollSessionValidity()
        .then(() => {
          window.profileVisitPoll = setInterval(() => {
            profileVisits(true, dispatch, moduleError);
          }, asyncSubscriptions.PROFILE_VISITS.pollEvery);
          asyncSubscriptions.PROFILE_VISITS.subscribed = true;
        })
        .catch(() => {
          window.clearInterval(window.profileVisitPoll);
        });
    }

    if (
      asyncSubscriptions.INTERESTING_CONNECTIONS.enabled &&
      !asyncSubscriptions.INTERESTING_CONNECTIONS.subscribed
    ) {
      AuthGuardService.pollSessionValidity()
        .then(() => {
          window.interestingConnectionsPoll = setInterval(() => {
            interestingConnections(true, dispatch, moduleError);
          }, asyncSubscriptions.INTERESTING_CONNECTIONS.pollEvery);
          asyncSubscriptions.INTERESTING_CONNECTIONS.subscribed = true;
        })
        .catch(() => {
          window.clearInterval(window.interestingConnectionsPoll);
        });
    }

    if (asyncSubscriptions.LOGGED_IN_USER_INFO.enabled && !asyncSubscriptions.LOGGED_IN_USER_INFO.subscribed) {
      AuthGuardService.pollSessionValidity()
        .then(() => {
          window.loggedinUserPoll = setInterval(() => {
            loggedInInformation(true, dispatch, moduleError);
          }, asyncSubscriptions.LOGGED_IN_USER_INFO.pollEvery);
          asyncSubscriptions.LOGGED_IN_USER_INFO.subscribed=true
        })
        .catch(() => {
          window.clearInterval(window.interestingConnectionsPoll);
        });
    }

    if (moduleError.length > 0) {
      console.log("Internal errors handled gracefully. But System not OK");
    } else {
      console.log("System OK");
    }
  }, []);

  const loggedInInformation = async (isSubscribed, dispatch, moduleError) => {
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
  };

  const hotTopics = async (isSubscribed, dispatch, moduleError) => {
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
  };

  const networkUpdates = async (isSubscribed, dispatch, moduleError) => {
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
  };

  const interestingConnections = async (
    isSubscribed,
    dispatch,
    moduleError
  ) => {
    await AuthGuardService.pollSessionValidity()
      .then(() => {
        UserDataService.getSuggestedFriends()
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
      })
      .catch(() => {
        window.clearInterval(window.interestingConnectionsPoll);
      });
  };

  const topCourses = async (isSubscribed, dispatch, moduleError) => {
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
  };

  const getAttendees = (isSubscribed, moduleError) => {
    let attendees_per_course = [];
    let attendeePromise = [];
    USER.TOP_COURSES?.data.map(async (course) => {
      attendeePromise.push(
        await UserDataService.getAttendeesPerCourse(course.courseId)
          .then((response) => {
            attendees_per_course.push(response);
          })
          .catch((err) => {
            if (isSubscribed) {
              moduleError.push({
                key: actionTypes.USER.COURSE_ATTENDEES,
                err: err.message,
              });
            }
          })
      );
    });
  };

  const profileSummary = async (isSubscribed, dispatch, moduleError) => {
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
  };

  const profileCompletion = async (isSubscribed, dispatch, moduleError) => {
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
  };

  const profileVisits = async (isSubscribed, dispatch, moduleError) => {
    await AuthGuardService.pollSessionValidity()
      .then(() => {
        UserDataService.getProfileVisits()
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
      })
      .catch(() => {
        window.clearInterval(window.profileVisitPoll);
      });
  };
  return loggedIn ? (
    <Layout options={layoutObj}>
      <Header isAuthorized={loggedIn} isShared={true} />
      <Dashboard isAuthorized={loggedIn} isShared={false} />
      <Footer isAuthorized={loggedIn} isShared={true} />
    </Layout>
  ) : (
    <Layout options={{title:process.env.NEXT_PUBLIC_APP_TITLE}}>
      <Splash />
    </Layout>
  );
}
export default Landing;

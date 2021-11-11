export const initialState = {
  user: null,
  LOGGED_IN_INFO: null,
  SUMMARY: null,
  PROFILE_PERCENTAGE_COMPLETION: null,
  PROFILE_VISITS: null,
  TOP_COURSES: null,
  SUGGESTED_FRIENDS: null,
  NETWORK_UPDATES: null,
  HOT_TOPICS: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
  USER: {
    LOGGED_IN_INFO: "LOGGED_IN_INFO",
    SUMMARY: "SUMMARY",
    PROFILE_PERCENTAGE_COMPLETION: "PROFILE_PERCENTAGE_COMPLETION",
    PROFILE_VISITS: "PROFILE_VISITS",
    TOP_COURSES: "TOP_COURSES",
    SUGGESTED_FRIENDS: "SUGGESTED_FRIENDS",
    NETWORK_UPDATES: "NETWORK_UPDATES",
    HOT_TOPICS: "HOT_TOPICS",
  },
};
const reducer = (state, action) => {
  console.log(
    "Reducer: Setting the incoming api data into the data layer context"
  );
  console.log(action);
  //action has 2 types-> type, [payload]
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "LOGGED_IN_INFO":
      return {
        ...state,
        LOGGED_IN_INFO: action.LOGGED_IN_INFO,
      };

    case "SUMMARY":
      return {
        ...state,
        SUMMARY: action.SUMMARY,
      };

    case "PROFILE_PERCENTAGE_COMPLETION":
      return {
        ...state,
        PROFILE_PERCENTAGE_COMPLETION: action.PROFILE_PERCENTAGE_COMPLETION,
      };

    case "PROFILE_VISITS":
      return {
        ...state,
        PROFILE_VISITS: action.PROFILE_VISITS,
      };

    case "TOP_COURSES":
      return {
        ...state,
        TOP_COURSES: action.TOP_COURSES,
      };

    case "SUGGESTED_FRIENDS":
      return {
        ...state,
        SUGGESTED_FRIENDS: action.SUGGESTED_FRIENDS,
      };

    case "NETWORK_UPDATES":
      return {
        ...state,
        NETWORK_UPDATES: action.NETWORK_UPDATES,
      };

    case "HOT_TOPICS":
      return {
        ...state,
        HOT_TOPICS: action.HOT_TOPICS,
      };

    default:
      return state;
  }
};
export default reducer;

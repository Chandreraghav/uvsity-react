export const initialState = {
  user: null,
  selected_past_session: null,
  basic: null,
  schedule: null,
  participant: null,
  fees: null,
  sponsor: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
  CREATE_SESSION_WORKFLOW: {
    SELECTED_PAST_SESSION: "SELECTED_PAST_SESSION",
    BASIC: "BASIC",
    SCHEDULE: "SCHEDULE",
    PARTICIPANT: "PARTICIPANT",
    FEES: "FEES",
    SPONSOR: "SPONSOR",
  },
};
const reducer = (state, action) => {
  console.log(action);

  //action has 2 types-> type, [payload]
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "BASIC":
      return {
        ...state,
        basic: action.basic,
      };

    case "SCHEDULE":
      return {
        ...state,
        schedule: action.schedule,
      };

    case "PARTICIPANT":
      return {
        ...state,
        participant: action.participant,
      };
    case "FEES":
      return {
        ...state,
        fees: action.fees,
      };
    case "SPONSOR":
      return {
        ...state,
        sponsor: action.sponsor,
      };

    case "SELECTED_PAST_SESSION":
      return {
        ...state,
        selected_past_session: action.selected_past_session,
      };
    default:
      return state;
  }
};
export default reducer;

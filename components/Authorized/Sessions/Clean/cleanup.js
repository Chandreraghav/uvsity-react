import { actionTypes } from "../../../../context/reducer";

export const eraseFormContext = (clean) => {
  cleanFormData(clean);
};

const cleanFormData = (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
    basic: null,
  });
  dispatch({
    type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
    selected_past_session: null,
  });
  dispatch({
    type: actionTypes.CREATE_SESSION_WORKFLOW.FEES,
    fees: null,
  });
  dispatch({
    type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
    participant: null,
  });
  dispatch({
    type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
    schedule: null,
  });
  dispatch({
    type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
    sponsor: null,
  });
};

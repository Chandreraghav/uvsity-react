import { actionTypes } from "../../../../context/reducer";

export const eraseFormContext = (data, clean) => {
  return new Promise((res, rej) => {
    cleanFormData(data, clean).then((r) => {
      res(true);
    });
  });
};

const cleanFormData = (data, dispatch) => {
  return new Promise((res, rej) => {
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

    res(true);
  });
};

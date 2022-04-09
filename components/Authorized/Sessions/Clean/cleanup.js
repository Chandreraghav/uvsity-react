import { actionTypes } from "../../../../context/reducer";

export const eraseFormContext = (data, clean) => {
  if (
    !data?.basic &&
    !data?.selected_past_session &&
    !data?.fees &&
    !data?.participant &&
    !data?.sponsor &&
    !data?.schedule
  ) {
    return;
  }
  cleanFormData(data, clean);
};

const cleanFormData = (data, dispatch) => {
  if (data?.basic) {
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
      basic: null,
    });
  }
  if (data?.selected_past_session) {
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
      selected_past_session: null,
    });
  }
  if (data?.fees) {
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.FEES,
      fees: null,
    });
  }
  if (data?.participant) {
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
      participant: null,
    });
  }
  if (data?.schedule) {
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
      schedule: null,
    });
  }
  if (data?.sponsor) {
    dispatch({
      type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
      sponsor: null,
    });
  }
};

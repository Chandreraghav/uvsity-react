import {
  APP,
  SESSION_DOCUMENT,
  SESSION_POSTER,
} from "../../../../constants/userdata";
import { actionTypes } from "../../../../context/reducer";

export const eraseFormContext = (data, clean) => {
  return new Promise((res, rej) => {
    SESSION_POSTER.imageURL = null;
    SESSION_POSTER.binary = null;
    SESSION_DOCUMENT.binary = null;
    SESSION_DOCUMENT.consent.hasConsent = false;
    APP.SESSION.DTO.BASIC.binary.documents = {
      consent: false,
      document: "",
      data: null,
      error: false,
    };
    APP.SESSION.DTO.BASIC.binary.images = {
      poster: "",
      data: null,
      error: false,
    };
    APP.SESSION.DTO.PARTICIPANTS.choiceOfInvitation = null;
    APP.SESSION.DTO.PARTICIPANTS.visibility = null;
    APP.SESSION.DTO.PARTICIPANTS.numberOfParticipants = null;
    APP.SESSION.DTO.PARTICIPANTS.questions = null;
    APP.SESSION.DTO.PARTICIPANTS.questionairre = null;
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

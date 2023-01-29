import { toast } from "react-toastify";
import { RESPONSE_TYPES } from "../../constants/constants";
import { LOGOUT } from "../../constants/error-messages";
import { actionTypes } from "../../context/reducer";
import { getWorkflowError } from "../../error-handler/handler";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import SignOutService from "../../pages/api/users/auth/SignOutService";
import { handleResponse } from "../../toastr-response-handler/handler";
import { loadInitialTimezone } from "../../utils/utility";
toast.configure();

export const eraseContext = (unauthorize) => {
  unauthorize({
    type: actionTypes.SET_USER,
    user: null,
  });
  unauthorize({
    type: actionTypes.SET_USERDATA,
    userdata: null,
  });

  unauthorize({
    type: actionTypes.SET_USER_LOGIN_INFO,
    logged_in_info: null,
  });

  unauthorize({
    type: actionTypes.CREATE_SESSION_WORKFLOW.BASIC,
    basic: null,
  });

  unauthorize({
    type: actionTypes.CREATE_SESSION_WORKFLOW.FEES,
    fees: null,
  });

  unauthorize({
    type: actionTypes.CREATE_SESSION_WORKFLOW.PARTICIPANT,
    participant: null,
  });

  unauthorize({
    type: actionTypes.CREATE_SESSION_WORKFLOW.SCHEDULE,
    schedule: null,
  });

  unauthorize({
    type: actionTypes.CREATE_SESSION_WORKFLOW.SELECTED_PAST_SESSION,
    selected_past_session: null,
  });

  unauthorize({
    type: actionTypes.CREATE_SESSION_WORKFLOW.SPONSOR,
    sponsor: null,
  });

  unauthorize({
    type: actionTypes.TIMEZONE,
    timezone: loadInitialTimezone(),
  });
};
export const SignOffUser = (
  queryClient,
  router,
  unauthorize,
  silentSignOff
) => {
  if (!silentSignOff) {
    handleResponse(
      LOGOUT.INFO.IN_PROGRESS,
      RESPONSE_TYPES.INFO,
      toast.POSITION.TOP_CENTER
    );
  }
  if (silentSignOff) {
    AuthService.logout();
    eraseContext(unauthorize);
    router.replace("/");
    queryClient.removeQueries();
    return;
  }

  SignOutService.signout()
    .then(() => {
      AuthService.logout();
      eraseContext(unauthorize);
      router.replace("/");
      queryClient.removeQueries();
    })
    .catch((error) => {
      handleResponse(
        getWorkflowError(LOGOUT.ERRORS.LOGOUT_FAILED),
        RESPONSE_TYPES.ERROR,
        toast.POSITION.TOP_CENTER
      );
    });
};

import { toast } from "react-toastify";
import { RESPONSE_TYPES } from "../../constants/constants";
import { LOGOUT } from "../../constants/error-messages";
import { actionTypes } from "../../context/reducer";
import { getWorkflowError } from "../../error-handler/handler";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import SignOutService from "../../pages/api/users/auth/SignOutService";
import { handleResponse } from "../../toastr-response-handler/handler";
toast.configure();

export const eraseContext = (unauthorize) => {
  unauthorize({
    type: actionTypes.SET_USER,
    user: null,
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

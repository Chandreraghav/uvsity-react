import { GENERIC_INTERNAL_ERROR } from "../constants/error-messages";
export const getWorkflowError = (err) => {
  
  if (err?.response?.data?.Uvsity_Errors) {
    return err?.response?.data?.Uvsity_Errors[0];
  }
  if (err?.response?.data?.Uvsity_Errors_Stacktrace) {
    return err?.response?.data?.Uvsity_Errors_Stacktrace[0];
  }
  return !err ? GENERIC_INTERNAL_ERROR : err;
  // unhandled exception
};

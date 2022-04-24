export const REGISTRATION_ERRORS = {
  REQUIRED_FIELD: "This is a required field.",
  REQUIRED_FIELDS: {
    FIRSTNAME: "First name is required.",
    LASTNAME: "Last name is required.",
    EMAIL: "Email address is required.",
    PASSWORD: "Password is required.",
    CONFIRM_PASSWORD: "Confirm password is required.",
  },
  GENERIC_ERROR:
    "Please correctly fill all the required fields outlined in red.",
  EMAIL_ERROR: "Provide a valid Email ID.",
  PASSWORD_ERROR: {
    MISMATCH: "Passwords do not match.",
    POLICY: "Password is not acceptable.",
    POLICY_TEXT:
      "Password must contain atleast one uppercase, one lowercase, one number and a special character.",
    MINIMUM_LENGTH_ERROR: "Must be atleast 8 characters.",
  },
  TERMS_ACCEPTATION_ERROR: "To sign up, you ,must check terms and conditions.",
  RECAPTCHA_ERROR: "Please validate the captcha to continue.",
};

export const LOGIN_ERRORS = {
  UVSITY: {
    LOGIN_FAILED: "There was a problem logging you in. Please try again after sometime.",
  },
  SOCIAL: {
    GOOGLE: {
      LOGIN_FAILED: "There was a problem logging you in with Google. Please check your internet connection and try again",
    },
  },
};
export const LOGOUT={
  ERRORS:{
    LOGOUT_FAILED: 'There was a problem logging you out, please try again after sometime.'
  },
  INFO:{
    IN_PROGRESS:'Signing you out....'
  }
  
}

export const GENERIC_INTERNAL_ERROR =
  "An unexpected internal error has occured. Please try again.";

export const PEOPLE={
  NETWORK:{
     CONNECTION_REQUEST_ERROR: "There occured a problem sending the connection request to",
     CONNECTION_ACCEPT_ERROR: "There occured a problem accepting the connection request from"
  }
}

export const SESSION_ERROR={
  QUESTIONAIRRE:{
     CREATE: "There occured a problem creating the questionairre. Please try again.",
     UPDATE: "There occured a problem updating the questionairre. Please try again.",
     DELETE: "There occured a problem deleting the questionairre."
  },
  SESSION:{
    CREATE: "We are sorry <user>!! Something happened at our end for which your session could not be created. Please try again in a while.",
    UPDATE: "There occured a problem updating the session. Please try again.",
    DELETE: "There occured a problem deleting the session."
  }

}
export const REQUEST_FAILED_MESSAGE='The request could not be completed due to an internal error. Please try again in a while.'
export const PROFILE_UNAVAILABLE='The requested profile is not available.'
export const PROFILE_PHOTO_UPDATE_FAILED='Your profile photo was not updated due to an internal error. Please try again in a while.'
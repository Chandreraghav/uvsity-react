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

export const GENERIC_NO_DATA_ERROR="No data available"
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
export const PAST_EDUCATION_FORM_ERRORS={
  PERIOD:{
    FROM:{
      REQUIRED:"Please specify the year and month you started this course",
      RANGE_ERROR:"Start period of course can't be after end period"
    },
    TO:{
      REQUIRED:"Please specify the year and month you completed this course",
      RANGE_ERROR:"End period of course can't be before start period"
    },

  },
  INSTITUTE:{
    REQUIRED:"Please enter name of an educational institution e.g University/College/School",
  },
  DEGREE:{
    REQUIRED:"Please enter a educational qualification, degree or diploma, e.g MSc, PH.d, BS, MS, High School, Middle School etc",
  },
  CAMPUS:{
    REQUIRED: "Please enter the campus location from where you obtained this qualification, e.g Boston, New York, Delhi etc",
  }
}
export const WORK_EXPERIENCE_FORM_ERRORS={
  PERIOD:{
    FROM:{
      REQUIRED:"Please specify the year and month you joined this organization",
      RANGE_ERROR:"Start period of experience can't be after end period"
    },
    TO:{
      REQUIRED:"Please specify the year and month you exit this organization",
      RANGE_ERROR:"End period of experience can't be before start period"
    },

  },
 
}
export const VALIDATION_ERROR_MESSAGE="This action could not be completed due to the following validation errors:"
export const CUSTOM_ERRORS={
  SOMETHING_WENT_WRONG:'Uh! Oh, Something went wrong on our side. Please try again later.',
  NOTHING_TO_SHOW:'We do not have anything to show right now. Come back later.'
}
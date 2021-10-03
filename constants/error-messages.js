export const REGISTRATION_ERRORS = {
  REQUIRED_FIELD: "This is a required field.",
  REQUIRED_FIELDS: {
    FIRSTNAME: "First name is required",
    LASTNAME: "Last name is required",
    EMAIL: "Email address is required",
    PASSWORD: "Password is required",
    CONFIRM_PASSWORD: "Confirm password is required",
  },
  GENERIC_ERROR:
    "Please correctly fill all the required fields outlined in red.",
  EMAIL_ERROR: "Provide a valid Email ID.",
  PASSWORD_ERROR: {
    MISMATCH: "Passwords do not match.",
    POLICY:
      "Password is not acceptable.",
    MINIMUM_LENGTH_ERROR: "Must be atleast 8 characters",
  },
  TERMS_ACCEPTATION_ERROR: "To sign up, you ,must check terms and conditions.",
  RECAPTCHA_ERROR: "Please validate the captcha to continue.",
};

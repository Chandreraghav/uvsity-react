import React from "react";
import SignUpStyle from "../../../styles/SignUp.module.css";
import { ErrorHandler } from "../../shared/ErrorHandler";
import {
  REGISTER_POLICY_ACCEPTANCE,
  REGISTRATION_ACCEPTANCE_OATH,
} from "../../../constants/constants";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { REGISTRATION_ERRORS } from "../../../constants/error-messages";
import { User } from "../../models/user";
import {
  isValidPassword,
  isValidEmail,
  areStringsEqual,
  isStringEmpty,
} from "../../../utils/utility";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function SignUp({ stayInRegistrationForm }) {
  const firstNameRef = React.useRef(null);
  const [firstName, setFirstName] = React.useState("");
  const lastNameRef = React.useRef(null);
  const [lastName, setLastName] = React.useState("");
  const emailRef = React.useRef(null);
  const [email, setEmail] = React.useState("");
  const passwordRef = React.useRef(null);
  const [password, setPassword] = React.useState("");
  const cpasswordRef = React.useRef(null);
  const [cpassword, setCPassword] = React.useState("");
  const agreementCheckBoxRef = React.useRef(null);
  const [agreementCheckBox, setagreementCheckBox] = React.useState(false);
  const [reCaptcha, setReCaptcha] = React.useState(null);
  let errorHandlerObject;
  let modelHandlerObject;
  const populateRegistrationModel = (
    modelHandlerObject,
    firstName,
    lastName,
    password,
    cpassword,
    email,
    reCaptcha
  ) => {
    modelHandlerObject = new User();
    modelHandlerObject.firstName = firstName;
    modelHandlerObject.lastName = lastName;
    modelHandlerObject.password = password;
    modelHandlerObject.confirmPassword = cpassword;
    modelHandlerObject.emailId = email;
    modelHandlerObject.recaptchaToken = reCaptcha;
    return modelHandlerObject;
  };
  const handleError = (
    errorCode,
    errorTypeCode,
    errorMessage,
    isError,
    errorStack,
    errorAdditionalDetails,
    errorWorkflow
  ) => {
    errorHandlerObject = new ErrorHandler();
    errorHandlerObject.errorObj = {
      errorCode,
      errorTypeCode,
      errorMessage,
      errorStack,
      errorAdditionalDetails,
      errorWorkflow,
      isError,
    };
  };
  const errorifyFormControls = () => {
    if (isFirstNameEmpty) {
      firstNameRef.current.className = `red__border__input`;
    }
    if (isLastNameEmpty) {
      lastNameRef.current.className = `red__border__input`;
    }
    if (isEmailEmpty) {
      emailRef.current.className = `red__border__input`;
    }
    if (errorHandlerObject?.errorObj.errorTypeCode == 2) {
      emailRef.current.className = `red__border__input`;
    }
    if (isPasswordEmpty) {
      passwordRef.current.className = `red__border__input`;
    }
    if (errorHandlerObject?.errorObj.errorTypeCode == 3) {
      passwordRef.current.className = `red__border__input`;
    }
    if (isConfirmPasswordEmpty) {
      cpasswordRef.current.className = `red__border__input`;
    }
    if (errorHandlerObject?.errorObj.errorTypeCode == 4) {
      cpasswordRef.current.className = `red__border__input`;
    }
  };
  const signUp = (e) => {
    e.preventDefault();
    if (!isRegistrationFormValid()) {
      errorifyFormControls();
      toast.error(errorHandlerObject?.errorObj.errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
      return;
    }
    modelHandlerObject = populateRegistrationModel(
      modelHandlerObject,
      firstName,
      lastName,
      password,
      cpassword,
      email,
      reCaptcha
    );
    console.log(modelHandlerObject);
    // call the registration service.
  };
  const IsformFieldsEmpty =
    firstName == null ||
    firstName.trim() === "" ||
    lastName == null ||
    lastName.trim() === "" ||
    email == null ||
    email.trim() === "" ||
    password == null ||
    password === "" ||
    cpassword == null ||
    cpassword === "";

  const isFirstNameEmpty = firstName == null || firstName.trim() === "";

  const isLastNameEmpty = lastName == null || lastName.trim() === "";

  const isEmailEmpty = email == null || email.trim() === "";

  const isPasswordEmpty = password == null || password === "";

  const isConfirmPasswordEmpty = cpassword == null || cpassword === "";

  const isRegistrationFormValid = () => {
    if (IsformFieldsEmpty) {
      handleError(500, 1, REGISTRATION_ERRORS.GENERIC_ERROR, true);
      return false;
    }

    if (!isValidEmail(email.trim())) {
      handleError(500, 2, REGISTRATION_ERRORS.EMAIL_ERROR, true);
      return false;
    }

    if (!isValidPassword(password)) {
      handleError(500, 3, REGISTRATION_ERRORS.PASSWORD_ERROR.POLICY, true);
      return false;
    }
    if (!areStringsEqual(password, cpassword)) {
      handleError(500, 4, REGISTRATION_ERRORS.PASSWORD_ERROR.MISMATCH, true);
      return false;
    }
    if (!agreementCheckBox) {
      handleError(500, 5, REGISTRATION_ERRORS.TERMS_ACCEPTATION_ERROR, true);
      return false;
    }
    if (reCaptcha == "" || reCaptcha == null) {
      handleError(500, 6, REGISTRATION_ERRORS.RECAPTCHA_ERROR, true);
      return false;
    }
    return true;
  };
  const captureCaptchaValue = (value) => {
    setReCaptcha(value);
  };
  const backToLogin = () => {
    if (stayInRegistrationForm) stayInRegistrationForm(false);
    resetSignUpForm();
  };
  const resetSignUpForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setCPassword("");
    setReCaptcha("");
    setagreementCheckBox(false);
    firstNameRef.current.value = null;
    lastNameRef.current.value = null;
    emailRef.current.value = null;
    passwordRef.current.value = null;
    cpasswordRef.current.value = null;
  };
  const handleAgreementCheck = (e) => {
    setagreementCheckBox(!agreementCheckBox);
  };
  const validateInput = (e) => {
    if (isStringEmpty(e.target.value)) {
      e.target.className = "red__border__input";
    } else {
      e.target.className = "";
    }
  };
  const validateConfirmPassword = (e) => {
    if (
      !isStringEmpty(e.target.value) &&
      !areStringsEqual(passwordRef.current.value, e.target.value)
    ) {
      e.target.className = "red__border__input";
    } else {
      e.target.className = "";
    }
  };
  const validatePassword = (e) => {
    if (!isStringEmpty(e.target.value) && !isValidPassword(e.target.value)) {
      e.target.className = "red__border__input";
    } else {
      e.target.className = "";
    }
  };
  const validateEmail = (e) => {
    if (!isStringEmpty(e.target.value) && !isValidEmail(e.target.value)) {
      e.target.className = "red__border__input";
    } else {
      e.target.className = "";
    }
  };
  return (
    <div
      className={`${SignUpStyle.signup__Dialog} ${SignUpStyle.signup__Dialog__blue__variant}`}
    >
      <form className="form" onSubmit={(e) => signUp(e)}>
        <div className="flex">
          <div
            className={`${SignUpStyle.signup__Dialog__brand__logo__wrapper} flex`}
          >
            <img
              src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
              className={`${SignUpStyle.signup__Dialog__brand__logo}`}
            />
          </div>
        </div>
        <div className="flex space-x-4 space-y-2">
          <div>
            <h2
              className={`${SignUpStyle.signup__Dialog__signin__explicit__header}`}
            >
              Sign Up now - It's free!
            </h2>
          </div>
          <div className={`${SignUpStyle.signup__Dialog__alternative__or}`}>
            or
          </div>
          <div
            className={`${SignUpStyle.signup__Dialog__signin__with__google__option}`}
          >
            <img src="/static/images/sign_in_with_google.png" />
          </div>
        </div>
        <div className="flex flex-col">
          <input
            title="First name"
            maxlength={50}
            autocomplete
            id="first-name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={(e) => validateInput(e)}
            onKeyUp={(e) => validateInput(e)}
            value={firstName}
            ref={firstNameRef}
            placeholder="First name"
          />
          <input
            title="Last name"
            maxlength={50}
            autocomplete
            id="last-name"
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) => validateInput(e)}
            onKeyUp={(e) => validateInput(e)}
            value={lastName}
            type="text"
            ref={lastNameRef}
            placeholder="Last name"
          />
          <input
            title="Email"
            maxlength={255}
            autocomplete
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateEmail(e)}
            onKeyUp={(e) => validateEmail(e)}
            value={email}
            type="text"
            ref={emailRef}
            placeholder="Email"
          />
          <input
            title="Password"
            maxlength={32}
            autocomplete
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => validatePassword(e)}
            onKeyUp={(e) => validatePassword(e)}
            value={password}
            type="password"
            ref={passwordRef}
            placeholder="Password"
          />

          <input
            title="Confirm password"
            maxlength={32}
            autocomplete
            id="cpassword"
            onChange={(e) => setCPassword(e.target.value)}
            onBlur={(e) => validateConfirmPassword(e)}
            onKeyUp={(e) => validateConfirmPassword(e)}
            value={cpassword}
            type="password"
            ref={cpasswordRef}
            placeholder="Confirm Password"
          />
          <label
            className={SignUpStyle.signup__Dialog__agreeButton}
            for="agreement"
          >
            <input
              ref={agreementCheckBoxRef}
              defaultChecked={agreementCheckBox}
              onChange={handleAgreementCheck}
              id="agreement"
              type="checkbox"
            />
            <span>{parse(REGISTRATION_ACCEPTANCE_OATH)}</span>
          </label>
          <ReCAPTCHA
            onChange={captureCaptchaValue}
            className={SignUpStyle.signup__Dialog__recaptcha__wrapper}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            required
          />
        </div>

        <div className="flex flex-row space-x-2 py-2">
          <button
            className={`${SignUpStyle.signup__Dialog__submit__btn}`}
            type="submit"
          >
            <LockOpenIcon /> Sign Up
          </button>

          <button
            className={`${SignUpStyle.signup__Dialog__cancel__btn}`}
            type="reset"
          >
            Reset
          </button>
          <button
            onClick={(e) => backToLogin()}
            className={`${SignUpStyle.signup__Dialog__back__btn}`}
            type="button"
          >
            <ArrowBackIcon
              className={`${SignUpStyle.signup__Dialog__back__icon}`}
            />
            Back to Login
          </button>
        </div>
      </form>
      <hr className="mt-2 text-gray-500" />
      <div className={SignUpStyle.signup__Dialog__acceptance__disclosure}>
        {parse(REGISTER_POLICY_ACCEPTANCE)}
      </div>
    </div>
  );
}

export default SignUp;

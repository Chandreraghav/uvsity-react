import React from "react";
import SignUpStyle from "../../../styles/SignUp.module.css";
import {
  REGISTER_POLICY_ACCEPTANCE,
  REGISTRATION_ACCEPTANCE_OATH,
} from "../../../constants/constants";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function SignUp({ stayInRegistrationForm }) {
  const firstName = React.useRef(null);
  const lastName = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const cpasswordRef = React.useRef(null);
  const signUp = (e) => {
    e.preventDefault();
  };
  const captureCaptchaValue = (value) => {
    console.log(value);
  };
  const backToLogin = () => {
    if (stayInRegistrationForm) stayInRegistrationForm(false);
    resetSignUpForm();
  };
  const resetSignUpForm = () => {
    firstName.current.value = null;
    lastName.current.value = null;
    emailRef.current.value = null;
    passwordRef.current.value = null;
    cpasswordRef.current.value = null;
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
            required
            maxlength={50}
            autocomplete
            id="first-name"
            ref={firstName}
            type="text"
            placeholder="First name"
          />
          <input
            title="Last name"
            maxlength={50}
            autocomplete
            required
            id="last-name"
            ref={lastName}
            type="text"
            placeholder="Last name"
          />
          <input
            title="Email"
            required
            maxlength={255}
            autocomplete
            id="email"
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            ref={emailRef}
            type="email"
            placeholder="Email"
          />
          <input
            title="Password"
            required
            maxlength={32}
            autocomplete
            id="password"
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />

          <input
            title="Confirm password"
            required
            maxlength={32}
            autocomplete
            id="cpassword"
            ref={cpasswordRef}
            type="password"
            placeholder="Confirm Password"
          />
          <label
            className={SignUpStyle.signup__Dialog__agreeButton}
            for="agreement"
          >
            <input id="agreement" type="checkbox" />
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
           <ArrowBackIcon className={`${SignUpStyle.signup__Dialog__back__icon}`} />Back to Login
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

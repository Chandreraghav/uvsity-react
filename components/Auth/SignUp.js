/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useForm } from "react-hook-form";
import RegistrationService from "../../pages/api/users/auth/RegistrationService";
import SignUpStyle from "../../styles/SignUp.module.css";
import {
  REGISTER_POLICY_ACCEPTANCE,
  REGISTRATION_ACCEPTANCE_OATH,
  LOGIN_SOURCE,
} from "../../constants/constants";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  REGISTRATION_ERRORS,
  LOGIN_ERRORS,
} from "../../constants/error-messages";
import { RESPONSE_TYPES } from "../../constants/constants";
import { User, UserCredential } from "../../models/user";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "@mui/material/Tooltip";
import { isStringEmpty } from "../../utils/utility";
import HelpIcon from "@mui/icons-material/Help";
import { getWorkflowError } from "../../error-handler/handler";
import { handleResponse } from "../../toastr-response-handler/handler";
import Loader from "../shared/Loader";
import { registrationValidationSchema } from "../../validation/services/auth/ValidationSchema";
import GoogleAuth from "../../social_auth/services/google/GoogleAuth";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { useRouter } from "next/router";
import { useDataLayerContextValue } from "../../context/DataLayer";
import { actionTypes } from "../../context/reducer";
import { AUTHORIZED_ROUTES } from "../../constants/routes";
import { getLocalStorageObject } from "../../localStorage/local-storage";
import UserDataService from "../../pages/api/users/data/UserDataService";
toast.configure();

function SignUp({ stayInRegistrationForm }) {
  const router = useRouter();
  const [{ }, authorize] = useDataLayerContextValue();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [agreementCheckBox, setagreementCheckBox] = React.useState(false);
  const [reCaptcha, setReCaptcha] = React.useState(null);
  const [ipData, setIpData] = React.useState(
    JSON.parse(getLocalStorageObject("uvsity-ipData"))
  );
  const [_signUpButtonPressed, _setSignUpButtonPressed] = React.useState(false);

  const formOptions = {
    resolver: yupResolver(registrationValidationSchema),
    mode: "all",
  };

  const { register, handleSubmit, reset, formState, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;
  const { dirtyFields } = formState;

  const signUp = async (formData) => {
    formData.isValid = true;
    formData.reCaptcha = reCaptcha;
    if (!reCaptcha) {
      formData.isValid = false;
    }
    if (formData.isValid) {
      if (!_signUpButtonPressed) _setSignUpButtonPressed(true);
      let model = new User();
      let credentials = new UserCredential();

      model.prepareRegistrationData(model, credentials, formData, ipData);
      await new RegistrationService()
        .register(model.getStagedRegistrationData(model, credentials))
        .then(async (res) => {
          authorize({
            type: actionTypes.SET_USER,
            user: res, //bearer token response
          });
          AuthService.setAuthorization(LOGIN_SOURCE.UVSITY, res);
          const userdata = await UserDataService.getSummary();
          authorize({
            type: actionTypes.SET_USERDATA,
            userdata:userdata.data
          });
          const logged_in_info = await UserDataService.getLoggedInInformation();
          authorize({
            type: actionTypes.SET_USER_LOGIN_INFO,
            logged_in_info:logged_in_info.data
          });

          AuthGuardService.isVerifiedLogin()
            ? router.push(AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD)
            : handleResponse(
              getWorkflowError(LOGIN_ERRORS.UVSITY.LOGIN_FAILED),
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
        })
        .catch((err) => {
          handleResponse(
            getWorkflowError(err),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .finally(() => {
          _setSignUpButtonPressed(false);
        });
    }
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
    _setSignUpButtonPressed(false);
    clearErrorsOnReset();
  };
  const clearErrorsOnReset = () => {
    window.grecaptcha?.reset();
    clearErrors("firstname");
    clearErrors("lastname");
    clearErrors("email");
    clearErrors("password");
    clearErrors("cpassword");
    clearErrors("agreement");
    reset("firstname");
    reset("lastname");
    reset("email");
    reset("password");
    reset("cpassword");
    reset("agreement");
  };
  const handleAgreementCheck = (e) => {
    setagreementCheckBox(!agreementCheckBox);
  };

  return (
    <div
      className={`${SignUpStyle.signup__Dialog} bg-gradient-to-r dark:from-gray-900  dark:to-gray-900 `}
    >
      <form
        className={`form ${_signUpButtonPressed ? "control__disabled" : ""}`}
        onSubmit={handleSubmit(signUp)}
      >
        <div className="flex ">
          <div
            className={`${SignUpStyle.signup__Dialog__brand__logo__wrapper} flex  justify-between`}
          >
            <img
              src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
              className={`${SignUpStyle.signup__Dialog__brand__logo}`}
            />
            <div>
              <Tooltip
                title="Back to login"
                disableTouchListener
                placement="bottom"
              >
                <ArrowBackIcon
                  onClick={(e) => backToLogin()}
                  className={`${SignUpStyle.signup__Dialog__back__icon} mt-2 cursor-pointer dark:text-gray-400  text-gray-600`}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 space-y-2">
          <div>
            <h2
              className={` ${SignUpStyle.signup__Dialog__signin__explicit__header} dark:text-gray-400  text-gray-600`}
            >
              Sign Up now - It&apos;s free!
            </h2>
          </div>
          <div className={`${SignUpStyle.signup__Dialog__alternative__or} dark:text-gray-400 text-gray-500`}>
            or
          </div>

          <div
            className={`${SignUpStyle.signup__Dialog__signin__with__google__option}`}
          >
            <GoogleAuth />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-500 cursor-pointer`}
                htmlFor="firstname"
              >
                First Name<span className={`text-red-100 text-xs`}>*</span>
              </label>

              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-100 float-right`}
              >
                {errors.firstname?.message}
              </label>
            </div>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              {...register("firstname")}
              name="firstname"
              type="text"
              id="firstname"
              placeholder="First name"
              maxLength="50"
              autoComplete="true"
              title="First name"
              className={`${SignUpStyle.signup__registration__input} ${errors.firstname?.message
                  ? SignUpStyle.signupDialog__input__error
                  : dirtyFields.firstname &&
                    (!firstName || isStringEmpty(firstName))
                    ? SignUpStyle.signupDialog__input__validated
                    : ""
                }`}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-500 cursor-pointer`}
                htmlFor="lastname"
              >
                Last Name<span className={` text-red-100 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-100 float-right`}
              >
                {errors.lastname?.message}
              </label>
            </div>

            <input
              onChange={(e) => setLastName(e.target.value)}
              {...register("lastname")}
              name="lastname"
              type="text"
              id="lastname"
              maxLength="50"
              placeholder="Last name"
              autoComplete="true"
              title="Last name"
              className={`${SignUpStyle.signup__registration__input} ${errors.lastname?.message
                  ? SignUpStyle.signupDialog__input__error
                  : dirtyFields.lastname &&
                    (!lastName || isStringEmpty(lastName))
                    ? SignUpStyle.signupDialog__input__validated
                    : ""
                }`}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-500 cursor-pointer`}
                htmlFor="email"
              >
                Email<span className={`text-red-100 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-100 float-right`}
              >
                {errors.email?.message}
              </label>
            </div>

            <input
              title="Email"
              autoComplete="true"
              id="email"
              type="text"
              name="email"
              maxLength="255"
              onChange={(e) => setEmail(e.target.value)}
              {...register("email")}
              placeholder="Email"
              className={`${SignUpStyle.signup__registration__input} ${errors.email?.message
                  ? SignUpStyle.signupDialog__input__error
                  : dirtyFields.email && (!email || isStringEmpty(email))
                    ? SignUpStyle.signupDialog__input__validated
                    : ""
                }`}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-500 cursor-pointer`}
                htmlFor="password"
              >
                Password<span className={`text-red-100 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-100 float-right`}
              >
                {errors.password?.message}
                {errors.password?.message && (
                  <Tooltip
                    title={REGISTRATION_ERRORS.PASSWORD_ERROR.POLICY_TEXT}
                    disableTouchListener
                    placement="bottom"
                  >
                    <span className={`text-white-500 text-xs cursor-pointer`}>
                      &nbsp;
                      <HelpIcon
                        className={
                          SignUpStyle.signupDialog__password__help__icon
                        }
                      />
                    </span>
                  </Tooltip>
                )}
              </label>
            </div>

            <input
              title="Password"
              autoComplete="true"
              id="password"
              type="password"
              name="password"
              maxLength="32"
              onChange={(e) => setPassword(e.target.value)}
              {...register("password")}
              placeholder="Password"
              className={`${SignUpStyle.signup__registration__input} ${errors.password?.message
                  ? SignUpStyle.signupDialog__input__error
                  : dirtyFields.password &&
                    (!password || isStringEmpty(password))
                    ? SignUpStyle.signupDialog__input__validated
                    : ""
                }`}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-500 cursor-pointer`}
                htmlFor="cpassword"
              >
                Re-enter password
                <span className={`text-red-100 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-100 float-right`}
              >
                {errors.cpassword?.message}
              </label>
            </div>
            <input
              title="Re-enter password"
              autoComplete="true"
              id="cpassword"
              type="password"
              name="cpassword"
              maxLength="32"
              onChange={(e) => setCPassword(e.target.value)}
              {...register("cpassword")}
              placeholder="Re-enter Password"
              className={`${SignUpStyle.signup__registration__input} ${errors.cpassword?.message
                  ? SignUpStyle.signupDialog__input__error
                  : dirtyFields.cpassword &&
                    (!cpassword || isStringEmpty(cpassword))
                    ? SignUpStyle.signupDialog__input__validated
                    : ""
                }`}
            />
          </div>
          <div>
            <label
              className={SignUpStyle.signup__Dialog__agreeButton}
              htmlFor="agreement"
            >
              <input
                defaultChecked={agreementCheckBox}
                onChange={handleAgreementCheck}
                id="agreement"
                className="cursor-pointer"
                name="agreement"
                {...register("agreement")}
                type="checkbox"
              />

              <span className={` text-gray-600 dark:text-gray-200`}>{parse(REGISTRATION_ACCEPTANCE_OATH)}</span>
              <span className={`text-red-100 text-xs`}>*</span>

              <label className={` text-xs text-red-100 block`}>
                {!agreementCheckBox && errors.agreement?.message}
              </label>
            </label>
          </div>
          <ReCAPTCHA
            onChange={captureCaptchaValue}
            className={`${SignUpStyle.signup__Dialog__recaptcha__wrapper} 
            `}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            required
          />
          {!reCaptcha && (
            <label className={` text-xs text-red-100 block`}>
              {REGISTRATION_ERRORS.RECAPTCHA_ERROR}
            </label>
          )}
        </div>

        <div className="flex flex-row space-x-2 py-2">
          <button
            className={`${SignUpStyle.signup__Dialog__submit__btn}`}
            type="submit"
          >
            <Loader
              classes={`app__workflow__loader app__workflow__loader__sm`}
              custom={true}
              visible={_signUpButtonPressed}
            />
            {!_signUpButtonPressed && <LockOpenIcon />} Sign Up
          </button>
        </div>
      </form>
      <hr className="mt-2 text-gray-500" />
      <div className={`${SignUpStyle.signup__Dialog__acceptance__disclosure} text-gray-600 dark:text-gray-200`}>
        {parse(REGISTER_POLICY_ACCEPTANCE)}
      </div>
    </div>
  );
}

export default SignUp;

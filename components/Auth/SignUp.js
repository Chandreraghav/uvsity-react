import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import IPService from "../../pages/api/ipdata/IPService";
import RegistrationService from "../../pages/api/users/auth/RegistrationService";
import SignUpStyle from "../../styles/SignUp.module.css";
import {
  REGISTER_POLICY_ACCEPTANCE,
  REGISTRATION_ACCEPTANCE_OATH,
} from "../../constants/constants";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { REGISTRATION_ERRORS } from "../../constants/error-messages";
import { RESPONSE_TYPES } from "../../constants/constants";
import { User, UserCredential } from "../../models/user";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "@mui/material/Tooltip";
import { isStringEmpty } from "../../utils/utility";
import HelpIcon from "@mui/icons-material/Help";
import { getWorkflowError } from "../../error-handler/handler";
import { handleResponse } from "../../toastr-response-handler/handler";
import {
  setLocalStorageObject,
  getLocalStorageObject,
} from "../../localStorage/local-storage";
import Loader from "../shared/Loader";
import {registrationValidationSchema} from './ValidationSchema'
import GoogleAuth from "../../social_auth/services/google/GoogleAuth";

toast.configure();

function SignUp({ stayInRegistrationForm }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [agreementCheckBox, setagreementCheckBox] = React.useState(false);
  const [reCaptcha, setReCaptcha] = React.useState(null);
  const [ipData, setIpData] = React.useState({});
  const [_signUpButtonPressed, _setSignUpButtonPressed] = React.useState(false)
  useEffect(async () => {
    if (!getLocalStorageObject("ipData")) {
      await new IPService().getIPData().then((response) => {
        setIpData(response.data);
        setLocalStorageObject("ipData", response.data);
      }).catch(()=>{
        const ipDummyData = new IPService().getFakeIPData()
        setIpData(ipDummyData);
        setLocalStorageObject("ipData", ipDummyData);
      })
      return;
    }
    setIpData(getLocalStorageObject("ipData"));
  }, []);
  
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
      if(!_signUpButtonPressed)
    _setSignUpButtonPressed(true)
      let model = new User();
      let credentials = new UserCredential();
      model.prepareRegistrationData(model, credentials, formData, ipData);
      await new RegistrationService()
        .register(model.getStagedRegistrationData(model, credentials))
        .then((res) => {
          console.log(res);
          // will navigate later after login is done.
        })
        .catch((err) => {
          handleResponse(
            getWorkflowError(err),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        }).finally(()=>{
          _setSignUpButtonPressed(false)
        })
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
    _setSignUpButtonPressed(false)
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
      className={`${SignUpStyle.signup__Dialog} ${SignUpStyle.signup__Dialog__blue__variant} `}
    >
      <form className={`form ${_signUpButtonPressed?'control__disabled':''}`} onSubmit={handleSubmit(signUp)}>
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
                  className={`${SignUpStyle.signup__Dialog__back__icon} mt-2 cursor-pointer`}
                />
              </Tooltip>
            </div>
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
            <GoogleAuth/>
              </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-400 cursor-pointer`}
                htmlFor="firstname"
              >
                First Name<span className={`text-red-500 text-xs`}>*</span>
              </label>

              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-500 float-right`}
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
              autocomplete='true'
              title="First name"
              className={`${SignUpStyle.signup__registration__input} ${
                errors.firstname?.message
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
                className={`text-xs text-primary-400 cursor-pointer`}
                htmlFor="lastname"
              >
                Last Name<span className={`text-red-500 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-500 float-right`}
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
              autocomplete='true'
              title="Last name"
              className={`${SignUpStyle.signup__registration__input} ${
                errors.lastname?.message
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
                className={`text-xs text-primary-400 cursor-pointer`}
                htmlFor="email"
              >
                Email<span className={`text-red-500 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-500 float-right`}
              >
                {errors.email?.message}
              </label>
            </div>

            <input
              title="Email"
              autocomplete='true'
              id="email"
              type="text"
              name="email"
              maxLength="255"
              onChange={(e) => setEmail(e.target.value)}
              {...register("email")}
              placeholder="Email"
              className={`${SignUpStyle.signup__registration__input} ${
                errors.email?.message
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
                className={`text-xs text-primary-400 cursor-pointer`}
                htmlFor="password"
              >
                Password<span className={`text-red-500 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-500 float-right`}
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
              autocomplete='true'
              id="password"
              type="password"
              name="password"
              maxLength="32"
              onChange={(e) => setPassword(e.target.value)}
              {...register("password")}
              placeholder="Password"
              className={`${SignUpStyle.signup__registration__input} ${
                errors.password?.message
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
                className={`text-xs text-primary-400 cursor-pointer`}
                htmlFor="cpassword"
              >
                Re-enter password
                <span className={`text-red-500 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-500 float-right`}
              >
                {errors.cpassword?.message}
              </label>
            </div>
            <input
              title="Re-enter password"
              autocomplete='true'
              id="cpassword"
              type="password"
              name="cpassword"
              maxLength="32"
              onChange={(e) => setCPassword(e.target.value)}
              {...register("cpassword")}
              placeholder="Re-enter Password"
              className={`${SignUpStyle.signup__registration__input} ${
                errors.cpassword?.message
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

              <span>{parse(REGISTRATION_ACCEPTANCE_OATH)}</span>
              <span className={`text-red-500 text-xs`}>*</span>

              <label className={` text-xs text-red-500 block`}>
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
            <label className={` text-xs text-red-500 block`}>
              {REGISTRATION_ERRORS.RECAPTCHA_ERROR}
            </label>
          )}
        </div>

        <div className="flex flex-row space-x-2 py-2">
          <button
            className={`${SignUpStyle.signup__Dialog__submit__btn}`}
            type="submit"
          >
                 <Loader classes={`app__workflow__loader app__workflow__loader__sm`}
                 custom={true} visible={_signUpButtonPressed} />
            {!_signUpButtonPressed && (<LockOpenIcon />)} Sign Up
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

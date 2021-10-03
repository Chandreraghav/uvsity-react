import React from "react";
import { useForm } from "react-hook-form";
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
import { PASSWORD } from "../../constants/regex";
import{MIN_LENGTH_PASSWORD} from "../../constants/constants";
import { User } from "../../models/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import Tooltip from "@mui/material/Tooltip";
import * as Yup from "yup";

toast.configure();

function SignUp({ stayInRegistrationForm }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [agreementCheckBox, setagreementCheckBox] = React.useState(false);
  const [reCaptcha, setReCaptcha] = React.useState(null);
  const [reCaptchaError, setReCaptchaError] = React.useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(
      REGISTRATION_ERRORS.REQUIRED_FIELDS.FIRSTNAME
    ),
    lastname: Yup.string().required(
      REGISTRATION_ERRORS.REQUIRED_FIELDS.LASTNAME
    ),
    email: Yup.string()
      .required(REGISTRATION_ERRORS.REQUIRED_FIELDS.EMAIL)
      .email(REGISTRATION_ERRORS.EMAIL_ERROR),
    password: Yup.string()
      .min(MIN_LENGTH_PASSWORD, REGISTRATION_ERRORS.PASSWORD_ERROR.MINIMUM_LENGTH_ERROR)
      .matches(PASSWORD, REGISTRATION_ERRORS.PASSWORD_ERROR.POLICY)
      .required(REGISTRATION_ERRORS.REQUIRED_FIELDS.PASSWORD),
    cpassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        REGISTRATION_ERRORS.PASSWORD_ERROR.MISMATCH
      )
      .required(REGISTRATION_ERRORS.REQUIRED_FIELDS.CONFIRM_PASSWORD),
    agreement: Yup.bool().oneOf(
      [true],
      REGISTRATION_ERRORS.TERMS_ACCEPTATION_ERROR
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState,clearErrors  } = useForm(formOptions);
  const { errors } = formState;

  const signUp = (formData) => {
    
    formData.reCaptcha = reCaptcha;
    formData.isValid= true;
    if (formData.reCaptcha == null) {
      setReCaptchaError(true);
      formData.isValid= false;
      return;
    }
    if(formData.isValid)
    console.log(JSON.stringify(formData));
  };

  const captureCaptchaValue = (value) => {
    setReCaptcha(value);
    if(value!=='' || value!==null) {
      setReCaptchaError(false)
    }
    else {
      setReCaptchaError(true)
    }
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
    
    };
  const clearErrorsOnReset = () => {
    window.grecaptcha.reset();
    clearErrors("firstname")
    clearErrors("lastname")
    clearErrors("email")
    clearErrors("password")
    clearErrors("cpassword")
    clearErrors("agreement")
    setReCaptchaError(false);
    
    resetSignUpForm()
  }
  const handleAgreementCheck = (e) => {
    setagreementCheckBox(!agreementCheckBox);
  };

  return (
    <div
      className={`${SignUpStyle.signup__Dialog} ${SignUpStyle.signup__Dialog__blue__variant}`}
    >
     
      
      <form className="form" onSubmit={handleSubmit(signUp)}>
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
            <img src={process.env.NEXT_PUBLIC_APP_CONTINUE_WITH_GOOGLE_IMAGE} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-400 cursor-pointer`}
                for="firstname"
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
              maxlength="50"
              autocomplete
              title="First name"
              className={SignUpStyle.signup__registration__input}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-400 cursor-pointer`}
                for="lastname"
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
              maxlength="50"
              placeholder="Last name"
              autocomplete
              title="Last name"
              className={SignUpStyle.signup__registration__input}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-400 cursor-pointer`}
                for="email"
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
              autocomplete
              id="email"
              type="text"
              name="email"
              maxlength="255"
              onChange={(e) => setEmail(e.target.value)}
              {...register("email")}
              placeholder="Email"
              className={SignUpStyle.signup__registration__input}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-400 cursor-pointer`}
                for="password"
              >
                Password<span className={`text-red-500 text-xs`}>*</span>
              </label>
              <label
                className={`${SignUpStyle.signupDialog__error__message} text-xs text-red-500 float-right`}
              >
                {errors.password?.message}
              </label>
            </div>

            <input
              title="Password | Must contain atleast 1 uppercase, lowercase, number and a special character."
              autocomplete
              id="password"
              type="password"
              name="password"
              maxlength="32"
              onChange={(e) => setPassword(e.target.value)}
              {...register("password")}
              placeholder="Password"
              className={SignUpStyle.signup__registration__input}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <label
                className={`text-xs text-primary-400 cursor-pointer`}
                for="cpassword"
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
              title="Confirm password"
              autocomplete
              id="cpassword"
              type="password"
              name="cpassword"
              maxlength="32"
              onChange={(e) => setCPassword(e.target.value)}
              {...register("cpassword")}
              placeholder="Re-enter Password"
              className={SignUpStyle.signup__registration__input}
            />
          </div>
          <div>
            <label
              className={SignUpStyle.signup__Dialog__agreeButton}
              for="agreement"
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

              <label
                className={` text-xs text-red-500 block`}
              >
                {!agreementCheckBox && errors.agreement?.message}
              </label>
            </label>
          </div>
          <ReCAPTCHA
            onChange={captureCaptchaValue}
            className={SignUpStyle.signup__Dialog__recaptcha__wrapper}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            required
          />
          {reCaptchaError && (
            <label
              className={`text-xs text-red-500 block`}
            >
              {REGISTRATION_ERRORS.RECAPTCHA_ERROR}
            </label>
          )}
        </div>

        <div className="flex flex-row space-x-2 py-2">
          <button
            className={`${SignUpStyle.signup__Dialog__submit__btn}`}
            type="submit"
          >
            <LockOpenIcon /> Sign Up
          </button>

          <button
            className={`${SignUpStyle.signup__Dialog__cancel__btn} hidden`}
            type="reset" onClick={ clearErrorsOnReset}
          >
            Reset
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

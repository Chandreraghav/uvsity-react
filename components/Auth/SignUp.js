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
import { User } from "../../models/user";
import {
  areStringsEqual, isStringEmpty
} from "../../utils/utility";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function SignUp({ stayInRegistrationForm }) {
  
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [agreementCheckBox, setagreementCheckBox] = React.useState(false);
  const [reCaptcha, setReCaptcha] = React.useState(null);
  // useForm()
  // 1. register -> register input
  // 2. handleSubmit -> extract data from the form
  // 3. errors -> object containing errors
  const { register, handleSubmit, errors } = useForm();

  const signUp = (formData) => {
    if(isStringEmpty(reCaptcha)){
       formData.isValid= false;
      console.log(errors)
     //  errors.recaptcha.type='recaptcha-required'
    }
    if(!areStringsEqual(password,cpassword)){
      formData.isValid= false;
      console.log('here')
      // errors.passwordMismatch.type='passwords-mismatch'
    }
    formData.reCaptcha=reCaptcha;
    console.log(JSON.stringify(formData))
    if(!formData.isValid){
      console.log('Error in form data')
      return
    }

    
   // call the registration service.
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
  };
  const handleAgreementCheck = (e) => {
    setagreementCheckBox(!agreementCheckBox);
  };


  
  return (
    <div
      className={`${SignUpStyle.signup__Dialog} ${SignUpStyle.signup__Dialog__blue__variant}`}
    >
      <form className="form" onSubmit={handleSubmit(signUp)}>
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
          onChange={(e) => setFirstName(e.target.value)}
            {...register('firstname', { required: true ,maxLength: 50 })}
            name='firstname'
            type="text"
            id="firstname"
            placeholder="First name"
            autocomplete
            title="First name"
          />
          <input
          onChange={(e) => setLastName(e.target.value)}
          {...register('lastname', { required: true ,maxLength: 50 })}
          name='lastname'
          type="text"
          id="lastname"
          placeholder="Last name"
          autocomplete
          title="Last name"
          />
          <input
            title="Email"
            autocomplete
            id="email"
            type="text"
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            {...register('email', { required: true ,maxLength: 255 , pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i })}
            placeholder="Email"
          />
          <input
            title="Password"
            autocomplete
            id="password"
            type="password" 
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            {...register('password', { required: true ,maxLength: 32 , pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/  })}
            placeholder="Password"
          />

          <input
            title="Confirm password"
            autocomplete
            id="cpassword"
            type="password"
            name='cpassword'
            onChange={(e) => setCPassword(e.target.value)}
            {...register('cpassword', { required: true ,maxLength: 32 })}
            placeholder="Confirm Password"
          />
          <label
            className={SignUpStyle.signup__Dialog__agreeButton}
            for="agreement"
          >
            <input
              defaultChecked={agreementCheckBox}
              onChange={handleAgreementCheck}
              id="agreement"
              name='agreement'
              {...register('agreement', { required: true})}
              type="checkbox"
            />
            <span>{parse(REGISTRATION_ACCEPTANCE_OATH)}</span>
          </label>
          <ReCAPTCHA
            onChange={captureCaptchaValue}
            className={SignUpStyle.signup__Dialog__recaptcha__wrapper}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            required
            name='recaptcha'
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

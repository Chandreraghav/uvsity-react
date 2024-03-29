/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { useState } from "react"
import { useForm } from "react-hook-form";
import LoginService from "../../pages/api/users/auth/LoginService";
import Dialog from "@mui/material/Dialog";
import LoginIcon from "@mui/icons-material/Login";
import { useTheme } from "@mui/material/styles";
import SignInStyle from "../../styles/SignIn.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import { LOGIN_POLICY_ACCEPTANCE, LOGIN_SOURCE } from "../../constants/constants";
import parse from "html-react-parser";
import SignUp from "./SignUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { isStringEmpty } from "../../utils/utility";
import { REGISTRATION_ERRORS, LOGIN_ERRORS } from "../../constants/error-messages";
import HelpIcon from "@mui/icons-material/Help";
import { loginValidationSchema } from '../../validation/services/auth/ValidationSchema'
import { getWorkflowError } from "../../error-handler/handler";
import { RESPONSE_TYPES } from "../../constants/constants";
import { handleResponse } from "../../toastr-response-handler/handler";
import { toast } from "react-toastify";
import GoogleAuth from "../../social_auth/services/google/GoogleAuth";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import { AuthGuardService } from '../../auth-guard/service/AuthGuardService'
import { useRouter } from "next/router";
import { useDataLayerContextValue } from '../../context/DataLayer'
import { actionTypes } from "../../context/reducer";
import { AUTHORIZED_ROUTES } from "../../constants/routes";
import Overlay from "../shared/Overlay";
import UserDataService from "../../pages/api/users/data/UserDataService";

toast.configure();

function SignIn({ dialogCloseRequest, isOpen }) {
  const router = useRouter();
  const [{ }, authorize] = useDataLayerContextValue();
  const theme = useTheme();
  const [isBackDropClicked, setBackDropClicked] = useState(true);
  const [signInButtonPressed, setSignInButtonPressed] = useState(false);
  const [signUpButtonPressed, setSignUpButtonPressed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formOptions = {
    resolver: yupResolver(loginValidationSchema),
    mode: "all",
  };

  const { register, handleSubmit, reset, formState } =
    useForm(formOptions);
  const { errors } = formState;
  const { dirtyFields } = formState;
  const handleIsolatedComponentInvocation = () => {
    if (dialogCloseRequest && !isBackDropClicked) dialogCloseRequest();
  };
  const handleBackdropClick = () => {
    if (!isBackDropClicked) setBackDropClicked(true);
  };
  const handleDirectClose = () => {
    if (dialogCloseRequest) dialogCloseRequest();
    setBackDropClicked(true);
    setSignUpButtonPressed(false);
    setSignInButtonPressed(false);
    reset(email, password, { keepErrors: false });
  };
  const signIn = async (formData) => {
    setSignInButtonPressed(true);
    await new LoginService()
      .login(
        encodeURIComponent(formData.email),
        encodeURIComponent(formData.password)
      )
      .then(async (res) => {
        authorize({
          type: actionTypes.SET_USER,
          user: res, //bearer token response
        });
        AuthService.setAuthorization(LOGIN_SOURCE.UVSITY, res)
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
        if(AuthGuardService.isVerifiedLogin(true)){
          router.push(AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD)
          setSignInButtonPressed(false)
          return
        }
          handleResponse(
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
        setSignInButtonPressed(false)
      })
  };
  const switchToSignUp = () => {
    setSignUpButtonPressed(true);
    setSignInButtonPressed(false);
  };

  return (
    <div className={`${SignInStyle.signin__root} `}>
      <Dialog

        open={isOpen}
        onClose={handleIsolatedComponentInvocation}
        disableEscapeKeyDown
        onBackdropClick={handleBackdropClick}
        aria-labelledby="responsive-dialog-title"
      >

        <div className={` bg-gradient-to-r dark:from-gray-900  dark:to-gray-900`}>
          <Tooltip
            className={`${SignInStyle.signin__Dialog__cancelButtonRoot} `}
            title="Close"
            disableTouchListener
            placement="bottom"
          >
            <div
              className={`flex flex-2 float-right m-2 cursor-pointer ${signInButtonPressed ? "control__disabled" : ""
                }`}
            >
              <CancelIcon
                onClick={handleDirectClose}
                className={`${SignInStyle.signin__Dialog__cancel} dark:text-gray-400  text-gray-600`}
              />
            </div>
          </Tooltip>
        </div>
        {signUpButtonPressed ? (
          <SignUp stayInRegistrationForm={setSignUpButtonPressed} />
        ) : (
          <div
            className={`${SignInStyle.signin__Dialog} bg-gradient-to-r dark:from-gray-900  dark:to-gray-900`}
          >
            <form
              className={`form ${signInButtonPressed ? "control__disabled" : ""
                }`}
              onSubmit={handleSubmit(signIn)}
            >
              <div className="flex">
                <div
                  className={`${SignInStyle.signin__Dialog__brand__logo__wrapper} flex`}
                >
                  <img
                    src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
                    className={`${SignInStyle.signin__Dialog__brand__logo}`}
                  />
                </div>
              </div>
              <div className="flex space-x-4 space-y-2">
                <div>
                  <h2
                    className={`${SignInStyle.signin__Dialog__signin__explicit__header} dark:text-gray-400  text-gray-600`}
                  >
                    Sign In
                  </h2>
                </div>
                <div
                  className={`${SignInStyle.signin__Dialog__alternative__or} dark:text-gray-400 text-gray-500`}
                >
                  or
                </div>
                <div
                  className={`${SignInStyle.signin__Dialog__signin__with__google__option}`}
                >

                  <GoogleAuth />


                </div>
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
                    className={`${SignInStyle.signinDialog__error__message} text-xs text-red-500 float-right`}
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
                  className={`${SignInStyle.signin__registration__input} ${errors.email?.message
                      ? SignInStyle.signinDialog__input__error
                      : dirtyFields.email && (!email || isStringEmpty(email))
                        ? SignInStyle.signinDialog__input__validated
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
                    className={`${SignInStyle.signinDialog__error__message} text-xs text-red-500 float-right`}
                  >
                    {errors.password?.message}
                    {errors.password?.message && (
                      <Tooltip
                        title={REGISTRATION_ERRORS.PASSWORD_ERROR.POLICY_TEXT}
                        disableTouchListener
                        placement="bottom"
                      >
                        <span
                          className={`text-white-500 text-xs cursor-pointer`}
                        >
                          &nbsp;
                          <HelpIcon
                            className={
                              SignInStyle.signinDialog__password__help__icon
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
                  className={`${SignInStyle.signin__registration__input} ${errors.password?.message
                      ? SignInStyle.signinDialog__input__error
                      : dirtyFields.password &&
                        (!password || isStringEmpty(password))
                        ? SignInStyle.signinDialog__input__validated
                        : ""
                    }`}
                />
              </div>
              <button
                className={`${SignInStyle.signin__Dialog__submit__btn}`}
                type="submit"
              >

                <Overlay message='Authenticating...' open={signInButtonPressed} />
                {!signInButtonPressed && <LoginIcon />} Sign In
              </button>
              <div className="flex flex-col">
                <div
                  className={`
                    ${SignInStyle.signin__Dialog__footer__forgotpassword__option} dark:text-gray-400  text-gray-600`
                  }
                >
                  Forgot Password
                </div>
                <div
                  className={SignInStyle.signin__Dialog__footer__signup__option}
                >
                  <h4>
                    <span className={SignInStyle.signin__Dialog__gray}>
                      New to {process.env.NEXT_PUBLIC_APP_NAME}?
                    </span>
                    &nbsp;{" "}
                    <span
                      onClick={switchToSignUp}
                      className={`${SignInStyle.signin__Dialog__link} ${signInButtonPressed && SignInStyle.disabled
                        } dark:text-gray-400  text-gray-900`}
                    >
                      Sign Up now.
                    </span>
                  </h4>
                </div>
              </div>
            </form>
            <hr className="mt-2   text-gray-500 " />
            <div className={`${SignInStyle.signin__Dialog__acceptance__disclosure} dark:text-gray-400  text-gray-600`}>
              {parse(LOGIN_POLICY_ACCEPTANCE)}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default SignIn;

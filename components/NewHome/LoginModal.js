/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import GoogleAuth from "../../social_auth/services/google/GoogleAuth";
import { useDataLayerContextValue } from '../../context/DataLayer';
import { RESPONSE_TYPES, LOGIN_POLICY_ACCEPTANCE, LOGIN_SOURCE } from "../../constants/constants";
import { AUTHORIZED_ROUTES } from "../../constants/routes";
import { handleResponse } from "../../toastr-response-handler/handler";
import { getWorkflowError } from "../../error-handler/handler";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import { AuthGuardService } from '../../auth-guard/service/AuthGuardService';
import { actionTypes } from "../../context/reducer";
import LoginService from "../../pages/api/users/auth/LoginService";
import UserDataService from "../../pages/api/users/data/UserDataService";

import { AppButton, AppLink } from './shared';

const LoginModal = ({ openLoginModal, handleCloseLoginModal, openSignUp }) => {
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [{ }, authorize] = useDataLayerContextValue();
  

  const [emailField, setEmailField] = useState({ value: '', isDirty: false});
  const [passwordField, setPasswordlField] = useState({ value: '', isDirty: false});
  const [signInButtonPressed, setSignInButtonPressed] = useState(false);

  const updateField = (value, fieldName) => {
    if (fieldName === 'email') {
      setEmailField({isDirty: true, value});
    } else {
      setPasswordlField({isDirty: true, value});
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    setEmailField({ ...emailField, isDirty: true});
    setPasswordlField({ ...passwordField, isDirty: true});
    const emailValue = emailField?.value || '';
    const passwordValue = passwordField?.value || '';
    if (emailValue && passwordValue && !signInButtonPressed) {
      setSignInButtonPressed(true);

      // Need To revisit this
      await new LoginService()
      .login(
        encodeURIComponent(emailValue),
        encodeURIComponent(passwordValue)
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
          setSignInButtonPressed(false);
          return
        }
          handleResponse(
            getWorkflowError(LOGIN_ERRORS.UVSITY.LOGIN_FAILED),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
      })
      .catch((err) => {
        setSignInButtonPressed(false);
        handleResponse(
          getWorkflowError(err),
          RESPONSE_TYPES.ERROR,
          toast.POSITION.BOTTOM_CENTER
        );
      });
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openLoginModal}
      onClose={handleCloseLoginModal}
    >

      <div className="flex flex-column p-10 min-w-[456px] relative">
        <CloseIcon className="absolute right-[10px] top-[10px] cursor-pointer" onClick={handleCloseLoginModal} />
        <h1 className="text-2xl">Login</h1>
        <span className="mb-8 mt-2">Continue to Uvsity</span>
        <GoogleAuth className="w-full" />
        <span className="
            text-center my-8 relative w-full
            after:content-[''] after:bg-new-primary after:absolute after:h-px after:top-1/2 after:left-0 after:w-5/12
            before:content-[''] before:bg-new-primary before:absolute before:h-px before:top-1/2 before:left-[58%] before:w-5/12"
        >or</span>
        <form onSubmit={(event) => signIn(event)}>
          <div className="flex flex-column w-full">
            <TextField
              label="Email"
              className="mb-4"
              onChange={(e) => updateField(e.target.value, 'email')}
              error={emailField?.isDirty && !emailField?.value}
              helperText={emailField?.isDirty && !emailField?.value ? 'Please enter an email address' : ''}
            />
            <TextField
              label="Password"
              className="mb-4"
              type="password"
              onChange={(e) => updateField(e.target.value)}
              error={passwordField?.isDirty && !passwordField?.value}
              helperText={passwordField?.isDirty && !passwordField?.value ? 'Please enter a password' : ''}
            />
            <AppButton type="submit">Log In</AppButton>
            <span className="text-center text-new-secondary mt-2">New to Uvsity? <AppLink className="ml-2" type="secondary" onClick={openSignUp}>Get Started</AppLink></span>
            <span className="text-xs text-center text-new-secondary mt-2" dangerouslySetInnerHTML={{ __html: LOGIN_POLICY_ACCEPTANCE }} />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default LoginModal;

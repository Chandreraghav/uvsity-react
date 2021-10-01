import * as React from "react";
import Dialog from "@mui/material/Dialog";
import LoginIcon from "@mui/icons-material/Login";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SignInStyle from "../../../styles/SignIn.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import { LOGIN_POLICY_ACCEPTANCE } from "../../../constants/constants";
import parse from "html-react-parser";
import SignUp from "./SignUp";
import Slide from '@mui/material/Slide';

function SignIn({ dialogCloseRequest, isOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isBackDropClicked, setBackDropClicked] = React.useState(true);
  const [signInButtonPressed, setSignInButtonPressed] = React.useState(false);
  const [signUpButtonPressed, setSignUpButtonPressed] = React.useState(false);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleIsolatedComponentInvocation = () => {
    if (dialogCloseRequest && !isBackDropClicked) dialogCloseRequest();
   
  };
  const handleBackdropClick = () => {
    if (!isBackDropClicked) setBackDropClicked(true);
  };
  const handleDirectClose = () => {
    if (dialogCloseRequest) dialogCloseRequest();
    setBackDropClicked(true);
    setSignUpButtonPressed(false)
  };
  const signIn = (e) => {
    e.preventDefault();
    console.log(passwordRef.current.value);
  };
  const switchToSignUp=()=>{
    setSignUpButtonPressed(true)
  }
  return (
    <div className={SignInStyle.signin__root}>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleIsolatedComponentInvocation}
        disableEscapeKeyDown
        onBackdropClick={handleBackdropClick}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={SignInStyle.signin__Dialog__blue__variant}>
          <Tooltip
            className={SignInStyle.signin__Dialog__cancelButtonRoot}
            title="Close"
            disableTouchListener
            placement="bottom"
          >
            <div className="flex flex-2 float-right m-2 cursor-pointer">
              <CancelIcon
                onClick={handleDirectClose}
                className={SignInStyle.signin__Dialog__cancel}
              />
            </div>
          </Tooltip>
        </div>
        {signUpButtonPressed ?(<SignUp stayInRegistrationForm={setSignUpButtonPressed}/>) :
     (   <div
          className={`${SignInStyle.signin__Dialog} ${SignInStyle.signin__Dialog__blue__variant}`}
        >
          <form onSubmit={(e) => signIn(e)}>
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
                  className={`${SignInStyle.signin__Dialog__signin__explicit__header}`}
                >
                  Sign In
                </h2>
              </div>
              <div className={`${SignInStyle.signin__Dialog__alternative__or}`}>
                or
              </div>
              <div
                className={`${SignInStyle.signin__Dialog__signin__with__google__option}`}
              >
                <img src="/static/images/sign_in_with_google.png" />
              </div>
            </div>

            <input
              autocomplete
              id="email"
              ref={emailRef}
              type="email"
              placeholder="Email"
            />
            <input
              autocomplete
              id="current-password"
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />

            <button
              className={`${signInButtonPressed && SignInStyle.disabled}`}
              type="submit"
            >
              <LoginIcon /> Sign In
            </button>
            <div className="flex flex-col">
              <div
                className={
                  SignInStyle.signin__Dialog__footer__forgotpassword__option
                }
              >
                Forgot Password
              </div>
              <div
                className={SignInStyle.signin__Dialog__footer__signup__option}
              >
                <h4>
                  <span className={SignInStyle.signin__Dialog__gray}>
                    New to {process.env.NEXT_PUBLIC_APP_NAME_V2}?
                  </span>
                  &nbsp;{" "}
                  <span onClick={switchToSignUp}
                    className={`${SignInStyle.signin__Dialog__link} ${
                      signInButtonPressed && SignInStyle.disabled
                    }`}
                  >
                    Sign Up now.
                  </span>
                </h4>
              </div>
            </div>
          </form>
          <hr className="mt-2 text-gray-500" />
          <div className={SignInStyle.signin__Dialog__acceptance__disclosure}>
            {parse(LOGIN_POLICY_ACCEPTANCE)}
          </div>
        </div>
     )}
      </Dialog>
    </div>
  );
}

export default SignIn;

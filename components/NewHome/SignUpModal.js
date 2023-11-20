/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import GoogleAuth from "../../social_auth/services/google/GoogleAuth";
import { REGISTER_POLICY_ACCEPTANCE, REGISTRATION_ACCEPTANCE_OATH } from "../../constants/constants";
import { AppButton, AppLink } from './shared';

const SignupModal = ({ open, handleCloseSignupModal, openLogin }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [agreementCheckBox, setagreementCheckBox] = useState(false);

  const signUp = async (event) => {
    event.preventDefault();
    console.log('In Progress');
  };

  const handleAgreementCheck = () => {
    setagreementCheckBox(!agreementCheckBox);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleCloseSignupModal}
    >

      <div className="flex flex-column p-10 min-w-[456px] relative">
        <CloseIcon className="absolute right-[10px] top-[10px] cursor-pointer" onClick={handleCloseSignupModal} />
        <h1 className="text-2xl">Create a Uvsity account</h1>
        <span className="mb-8 mt-2">Setup the account for free!</span>
        <GoogleAuth className="w-full" />
        <span className="
            text-center my-8 relative w-full
            after:content-[''] after:bg-new-primary after:absolute after:h-px after:top-1/2 after:left-0 after:w-5/12
            before:content-[''] before:bg-new-primary before:absolute before:h-px before:top-1/2 before:left-[58%] before:w-5/12"
        >or</span>
        <form onSubmit={(event) => signUp(event)}>
          <div className="flex flex-column w-full">
            <TextField
              label="First Name"
              className="mb-4"
            />
             <TextField
              label="Last Name"
              className="mb-4"
            />
            <TextField
              label="Email"
              className="mb-4"
            />
            <TextField
              label="Password"
              className="mb-4"
              type="password"
            />
            <TextField
              label="Re-enter Password"
              className="mb-4"
              type="password"
            />
            <div className="flex">
              <input
                defaultChecked={agreementCheckBox}
                onChange={handleAgreementCheck}
                className="cursor-pointer"
                name="agreement"
                type="checkbox"
              />
              <span className="text-xs ml-2 mb-4" dangerouslySetInnerHTML={{ __html: REGISTRATION_ACCEPTANCE_OATH}} />
            </div>
            <AppButton type="submit">Sign Up</AppButton>
            <span className="text-center text-new-secondary mt-2">Already have an account? <AppLink className="ml-2" type="secondary" onClick={openLogin}>Log In</AppLink></span>
            <span className="text-xs text-center text-new-secondary mt-2" dangerouslySetInnerHTML={{ __html: REGISTER_POLICY_ACCEPTANCE }} />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default SignupModal;

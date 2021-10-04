import React from "react";
import { GoogleLogin } from "react-google-login";
import { JWT } from "../../../jwt/auth/JWT";
const clientId = process.env.GOOGLE_ID;

function GoogleAuth() {
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res);
    JWT.refreshGoogleJWT(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img
              alt="google-login"
              src={process.env.NEXT_PUBLIC_APP_CONTINUE_WITH_GOOGLE_IMAGE}
            />
          </button>
        )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleAuth;

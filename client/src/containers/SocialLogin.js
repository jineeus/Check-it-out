import React from 'react';
import GoogleLogin from "react-google-login";
import { GOOGLE_API_ID } from "../API_KEY";

const SocialLogin = () => {

  const responseGoogle = (a) => {
    console.log(a);
  };

  return (
    <React.Fragment>
      <GoogleLogin
        clientId={GOOGLE_API_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </React.Fragment>
  );
};

export default SocialLogin;
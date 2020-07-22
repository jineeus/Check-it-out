import React from 'react';
import GoogleLogin from "react-google-login";
import { GOOGLE_API_ID, KAKAO_API_KEY } from "../API_KEY";
import './SocialLogin.css';
import { useDispatch } from "react-redux";
import { loginAction } from "../modules/login";
import KaKaoLogin from "react-kakao-login";
import { useSelector } from "react-redux";

const SocialLogin = () => {

  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login, []);

  const responseGoogle = (res) => {
    dispatch(loginAction({
      id: res.googleId,
      name: res.profileObj.name,
      provider: 'google'
    }));
    doSignUpDataInSessionStorage();
  };

  const doSignUpDataInSessionStorage = () => {
    if(loginUser.signUpData !== null){
      window.sessionStorage.setItem("id", loginUser.signUpData.id);
      window.sessionStorage.setItem("name", loginUser.signUpData.name);
      window.sessionStorage.setItem("provider", loginUser.signUpData.provider); 
    }
  };

  // const responseKaKao = (res) => {
  //   dispatch(
  //     loginAction({
  //       id: res.response.access_token,
  //       name: res.profile.properties.nickname,
  //       provider: "kakao",
  //     })
  //   );
  // };

  return (
    <div className="socialLogin" id="componentWrapper">
      <section className="loginTemp">
        <img
          className="bookIcon"
          src="https://img.icons8.com/plasticine/100/000000/book-and-pencil.png"
        />
        <span className="loginTitle">Login With</span>
        <GoogleLogin
          clientId={GOOGLE_API_ID}
          buttonText="Google Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          render={(renderProps) => (
            <button
              className="googleLoginBtn"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Google Login
            </button>
          )}
        />
        {/* <KaKaoLogin
          className="kakaoLoginBtn"
          jsKey={KAKAO_API_KEY}
          buttonText="Kakao Login"
          onSuccess={responseKaKao}
          getProfile={true}
        /> */}
      </section>
    </div>
  );
};

export default SocialLogin;
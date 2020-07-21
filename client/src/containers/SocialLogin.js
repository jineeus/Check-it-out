import React from 'react';
import GoogleLogin from "react-google-login";
import { GOOGLE_API_ID, KAKAO_API_KEY } from "../API_KEY";
import './SocialLogin.css';
import { useDispatch } from "react-redux";
import { loginAction } from "../modules/login";
import KaKaoLogin from "react-kakao-login";

const SocialLogin = () => {

  const dispatch = useDispatch();

  const responseGoogle = (data) => {
    // 로그인 성공 시 state에 값 넣기
    dispatch(loginAction({
      id: data.googleId,
      name: data.profileObj.name,
      provider: 'google'
    }));
  };

  const responseKaKao = (res) => {
    dispatch(
      loginAction({
        id: res.response.access_token,
        name: res.profile.properties.nickname,
        provider: "kakao",
      })
    );
  };

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
        <KaKaoLogin
          className="kakaoLoginBtn"
          jsKey={KAKAO_API_KEY}
          buttonText="Kakao Login"
          onSuccess={responseKaKao}
          getProfile={true}
        />
      </section>
    </div>
  );
};

export default SocialLogin;
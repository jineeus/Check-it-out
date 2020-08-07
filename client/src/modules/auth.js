import { createAction, handleActions } from "redux-actions";
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALLIZE_FORM';

const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('auth/SIGNUP');
const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,  // signup, signin
    key,  // username, useremail, password, passwordConfirm
    value  // 각각의 value
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);  // signup , signin

export const signup = createAction(SIGNUP, ({userName, userEmail, passWord }) => ({
  userName,
  userEmail,
  passWord,
}));

export const signin = createAction(SIGNIN, ({userEmail, passWord }) => ({
  userEmail,
  passWord,
}));

// saga 생성
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const signinSaga = createRequestSaga(SIGNIN, authAPI.signin);
export function* authSaga(){
  // takeLatest : 가장 마지막으로 디스패치 된 액션만을 처리
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(SIGNIN, signinSaga);
}

const initialState = {
  signup: {
    userName: "",
    userEmail: "",
    passWord: "",
    passWordConfirm: "",
  },
  signin: {
    userEmail: "",
    passWord: "",
  },
  auth: null,
  authError: null,
};


const auth = handleActions(
  // payload: ... 은 payload로 받아오는 값이 무엇인지 명확하게 작성
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        // state.signUp.username을 바꾼다던지 하는 경우를 아래와 같이 작성해준다.
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      // form 전환 시 회원 인증 에러 초기화
      authError: null,
    }),
    // 회원가입 성공
    [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default auth;

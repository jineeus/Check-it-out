const dummyUser = {
  userName: "hyojin",
};

export const LOG_IN = "login/LOG_IN";

const initialState = {
  isLoggedIn: false,
  signUpData: null,
};

// 회원가입을 하면 아래에서 data: action.data를 해야하기 때문에 action에 넣을 데이터가 동적인 경우라 action을 함수로 만들어 주었다. 
export const loginAction = (data) => {
  return {
    type: LOG_IN,
    data: data,
  };
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        signUpData: action.data,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default login;

import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import bookSave, { saveSaga } from "./bookSave";
import currentBookList from './currentBookList';
import modalLoading from './modalBG';
import getAllBooks from './getAllBooks';

const rootReducer = combineReducers({
  auth,
  bookSave,
  currentBookList,
  modalLoading,
  getAllBooks
});

export function* rootSaga(){
  // all은 배열안에 있는 여러 사가를 동시에 실행시켜 준다.
  // yield all([authSaga(), userSaga()]);
  yield all([authSaga(), saveSaga()]);
}

export default rootReducer;
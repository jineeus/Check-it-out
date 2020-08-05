import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CURRENT_BOOKLIST = "bookSave/CURRENT_BOOKLIST";

export const currentBookList = createAction(
  CURRENT_BOOKLIST, 
  ({ uuid, bookTitle, bookAuthor, bookImage, bookRate }) => ({ 
    uuid, 
    bookTitle, 
    bookAuthor, 
    bookImage, 
    bookRate,
  }),
);

// const bookLoadSaga = createRequestSaga(CURRENT_BOOKLIST, authAPI.bookListLoad);

// export function* bookListSaga(){
//   yield takeLatest(CURRENT_BOOKLIST, bookLoadSaga);
// }

const initialState = {
  uuid: "",
  bookTitle: "",
  bookAuthor: "",
  bookImage: "",
  bookRate: ""
};

export const currentBookListAction = handleActions(
  {
    [CURRENT_BOOKLIST]: (state, { payload }) => ({
      ...state,
      uuid: payload.uuid,
      bookTitle: payload.bookTitle,
      bookAuthor: payload.bookAuthor,
      bookImage: payload.bookImage,
      bookRate: payload.bookRate
    }),
  },
  initialState
);

export default currentBookListAction;
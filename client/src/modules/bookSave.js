import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const [BOOK_SAVE] = createRequestActionTypes("bookSave/BOOK_SAVE");

export const bookSave = createAction(
  BOOK_SAVE,
  ({ uuid, bookTitle, bookAuthor, bookImage, bookRate, report }) => ({
    uuid,
    bookTitle,
    bookAuthor,
    bookImage,
    bookRate,
    report
  }),
);

const bookSaveSaga = createRequestSaga(BOOK_SAVE, authAPI.bookSave);
export function* saveSaga(){
  yield takeLatest(BOOK_SAVE, bookSaveSaga);
}

const initialState = {
  uuid: "",
  bookTitle: "",
  bookAuthor: "",
  bookImage: "",
  bookRate: "",
  report: ""
};

const bookSaveAction = handleActions(
  {
    [BOOK_SAVE]: (state, { payload }) => ({
      ...state,
      uuid: payload.uuid,
      bookTitle: payload.bookTitle,
      bookAuthor: payload.bookAuthor,
      bookImage: payload.bookImage,
      bookRate: payload.bookRate,
      report: payload.report,
    }),
  },
  initialState
);

export default bookSaveAction;
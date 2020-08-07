import { createAction, handleActions } from "redux-actions";

const [GET_ALL_BOOKS] = 'getAllBooks/GET_ALL_BOOKS';

export const getAllBooks = createAction(GET_ALL_BOOKS);

const initialState = {
  getAllBooks: []
}

export const getAllBooksAction = handleActions(
  {
    [GET_ALL_BOOKS]: (state, { payload }) => ({
      ...state,
      getAllBooks: payload.map()
    })
  }
)
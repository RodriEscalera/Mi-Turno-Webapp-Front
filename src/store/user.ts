import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  id: null,
  fullName: null,
  email: null,
  userType: null,
  branch: null,
};

const reducer = createReducer(initialState, {
  [setUser.type]: (state, action) => action.payload,
});

export default reducer;


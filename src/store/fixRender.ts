import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFixRender = createAction<boolean>("FIX_RENDER");

const initialState = false
;

const reducer = createReducer(initialState, {
  [setFixRender.type]: (state, action) => action.payload,
});

export default reducer;

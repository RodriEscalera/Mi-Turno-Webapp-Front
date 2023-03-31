import { createAction, createReducer } from "@reduxjs/toolkit";

export const setOperatorData = createAction<IdataOperator>("SET_OPERATOR_DATA");
export const updateOperator = createAction<IdataOperator>("UPDATE_OPERATOR");
export const setBringOperatorData = createAction<any>("BRING_BOOKING_DATA");

export const initialStateOperatorData = {
  id: null,
  fullName: null,
  email: null,
  dni: null,
  password: null,
  branch: null,
};

interface IdataOperator {
  field: string;
  data: any;
}

const reducer = createReducer(initialStateOperatorData, {
  [setOperatorData.type]: (state, action) => {
    const { field, data } = action.payload;

    return {
      ...state,
      [field]: data,
    };
  },
  [updateOperator.type]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
  [setBringOperatorData.type]: (state, action) => {
    return action.payload;
  },
});

export default reducer;

import { createAction, createReducer } from "@reduxjs/toolkit";

export const setBranchData = createAction<IdataOperator>("SET_BRANCH_DATA");
export const setUpdateBranch = createAction<IdataOperator>("UPDATE_BRANCH");
export const setBringBranchData = createAction<any>("BRING_BRANCH_DATA");

export const initialStateBranchData = {
  fullName: null,
  email: null,
  phone: null,
  startingTime: null,
  closingTime: null
};

interface IdataOperator {
  field: string;
  data: any;
}

const reducer = createReducer(initialStateBranchData, {
  [setBranchData.type]: (state, action) => {
    const { field, data } = action.payload;

    return {
      ...state,
      [field]: data,
    };
  },
  [setUpdateBranch.type]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
  [setBringBranchData.type]: (state, action) => {
    return action.payload;
  },
});

export default reducer;

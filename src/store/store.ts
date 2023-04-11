import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import bookingDataReducer from "./bookingData";
import stepsReducer from "./steps";
import updateOperatorReducer from "./updateOperator";
import updateBranchReducer from "./updateBranch";

const store = configureStore({
  reducer: {
    user: userReducer,
    bookingInGeneral: bookingDataReducer,
    steps: stepsReducer,
    updateOp: updateOperatorReducer,
    updateBranch: updateBranchReducer,
  },
});

export default store;

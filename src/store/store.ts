import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import bookingDataReducer from "./bookingData";
import stepsReducer from "./steps";
import fixReducer from "./fixRender"

const store = configureStore({
  reducer: {
    user: userReducer,
    bookingInGeneral: bookingDataReducer,
    steps: stepsReducer,
    fixRender: fixReducer
  },
});

export default store;

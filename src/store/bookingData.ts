import { createAction, createReducer } from "@reduxjs/toolkit";

export const setBookingData = createAction<IdataBooking>("SET_BOOKING_DATA");

const initialState = {
  branch: null,
  date: null,
  time: null,
  fullName: null,
  phone: null,
  email: null,
  available: null,
};

interface IdataBooking {
  field: string;
  data: any;
}

const reducer = createReducer(initialState, {
  [setBookingData.type]: (state, action) => {
    const { field, data } = action.payload;

    return {
      ...state,
      [field]: data,
    };
  },
});

export default reducer;

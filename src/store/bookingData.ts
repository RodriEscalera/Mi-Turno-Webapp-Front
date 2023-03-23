import { createAction, createReducer } from "@reduxjs/toolkit";

export const setBookingData = createAction<IdataBooking>("SET_BOOKING_DATA");
export const updateBookingData = createAction<IdataBooking>("UPDATE_BOOKING_DATA");

const initialState = {
  id: null,
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
  [updateBookingData.type]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
});

export default reducer;
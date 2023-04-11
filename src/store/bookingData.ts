import { createAction, createReducer } from "@reduxjs/toolkit";

export const setBookingData = createAction<IdataBooking>("SET_BOOKING_DATA");
export const setUpdateBookingData = createAction<IdataBooking>("UPDATE_BOOKING_DATA");
export const setBringBookingData = createAction<any>("BRING_BOOKING_DATA");

export const initialStateBookingData = {
  
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


const reducer = createReducer(initialStateBookingData, {
  [setBookingData.type]: (state, action) => {
    const { field, data } = action.payload;
    
    return {
      ...state,
      [field]: data,
    };
  },
  [setUpdateBookingData.type]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
  [setBringBookingData.type]: (state, action) => {
    return action.payload
  }
});

export default reducer;
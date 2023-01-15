import { glocersTypes } from "../types/glocersTypes";

const initialState = {
  glocers: [],  
};

export const glocersReducer = (state = initialState, action) => {
  switch (action.type) {
    case glocersTypes.GET_GLOCERS:
      return {
        ...state,
        glocers: action.payload.glocers,
      };
    default:
      return state;
  }
};
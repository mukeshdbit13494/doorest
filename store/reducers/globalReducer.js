import { GET_STATE_CITY } from "../actions/types";

const initialState = {
  getStateCityRes: null,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATE_CITY:
      return { ...state, getStateCityRes: action.payload };

    default:
      return state;
  }
};

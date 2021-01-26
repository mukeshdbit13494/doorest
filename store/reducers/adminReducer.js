import { PARTNER_RECORD } from "../actions/types";

const initialState = {
  partnerDetailsRes: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARTNER_RECORD:
      return { ...state, partnerDetailsRes: action.payload };

    default:
      return state;
  }
};

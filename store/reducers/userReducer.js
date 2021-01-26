import { GET_USER_PARTNER_DETAILS, USER_COMPLAINT } from "../actions/types";

const initailState = { getUserPartnerDetailsRes: null, userComplaintRes: null };
export const userReducer = (state = initailState, action) => {
  switch (action.type) {
    case GET_USER_PARTNER_DETAILS:
      return { ...state, getUserPartnerDetailsRes: action.payload };
    case USER_COMPLAINT:
      return { ...state, userComplaintRes: action.payload };

    default:
      return state;
  }
};

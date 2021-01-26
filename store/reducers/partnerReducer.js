import {
  PARTNER_COMPLAINT,
  PARTNER_LEAD,
  PARTNER_COMMENT,
} from "../actions/types";

const initialState = {
  partnerComplaintRes: null,
  partnerLeadRes: null,
  partnerCommentRes: null,
};

export const partnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARTNER_COMPLAINT:
      return { ...state, partnerComplaintRes: action.payload };
    case PARTNER_LEAD:
      return { ...state, partnerLeadRes: action.payload };
    case PARTNER_COMMENT:
      return { ...state, partnerCommentRes: action.payload };
    default:
      return state;
  }
};

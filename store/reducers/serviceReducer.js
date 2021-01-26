import { GET_SERVICES, PARTNER_LIST_BY_CITY } from '../actions/types';

const initialState = {
	serviceRes: null,
	partnerListByCity: null
};

export const serviceReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SERVICES:
			return { ...state, serviceRes: action.payload };
		case PARTNER_LIST_BY_CITY:
			return { ...state, partnerListByCity: action.payload };

		default:
			return state;
	}
};

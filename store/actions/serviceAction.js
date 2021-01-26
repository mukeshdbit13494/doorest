import Axios from 'axios';
import { GET_SERVICES, PARTNER_LIST_BY_CITY } from './types';
export const getServices = () => {
	return async (dispatch) => {
		try {
			const res = await Axios.get('/api/services');
			if (res != null) {
				dispatch({ type: GET_SERVICES, payload: res.data });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getPartnerlistByCity = (id, city) => {
	return async (dispatch) => {
		try {
			const res = await Axios.get(`/api/services/${id}/${city}`);
			if (res != null) {
				dispatch({ type: PARTNER_LIST_BY_CITY, payload: res.data });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

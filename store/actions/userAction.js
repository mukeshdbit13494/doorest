import Axios from "axios";
import { GET_USER_PARTNER_DETAILS, USER_COMPLAINT } from "./types";
import Cookies from "js-cookie";

export const getUserPartnerDetails = (partnerId) => {
  return async (dispatch) => {
    try {
      const token = Cookies.getJSON("_dUserToken").token;
      const res = await Axios.get(
        `/api/user/get/partner/details/${partnerId}`,
        { headers: { Authorization: token } }
      );
      if (res != null) {
        dispatch({ type: GET_USER_PARTNER_DETAILS, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserComplaints = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.getJSON("_dUserToken").token;
      const res = await Axios.get(`/api/user/complaints`, {
        headers: { Authorization: token },
      });
      if (res != null) {
        dispatch({ type: USER_COMPLAINT, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

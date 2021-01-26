import Axios from "axios";
import { PARTNER_RECORD } from "./types";
import Cookies from "js-cookie";

export const getPartnerDetails = () => {
  return async (dispatch) => {
    try {
      const res = await Axios.get(`/api/admin/partner/details`);
      if (res != null) {
        dispatch({ type: PARTNER_RECORD, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

import Axios from "axios";
import { PARTNER_COMPLAINT, PARTNER_LEAD, PARTNER_COMMENT } from "./types";
import Cookies from "js-cookie";

export const getPartnerComplaints = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.getJSON("_dPartnerToken").token;
      const res = await Axios.get(`/api/partner/complaints`, {
        headers: { Authorization: token },
      });
      if (res != null) {
        dispatch({ type: PARTNER_COMPLAINT, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPartnerLead = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.getJSON("_dPartnerToken").token;
      const res = await Axios.get(`/api/partner/leads`, {
        headers: { Authorization: token },
      });
      if (res != null) {
        dispatch({ type: PARTNER_LEAD, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPartnerComments = (partnerId) => {
  return async (dispatch) => {
    try {
      const res = await Axios.get(`/api/partner/comments/${partnerId}`);
      if (res != null) {
        dispatch({ type: PARTNER_COMMENT, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//normal arrow function for delete complaints
export const deletePartnerComplaint = async (complaintId, token) => {
  try {
    const res = await Axios.delete(
      `/api/partner/delete/complaint/${complaintId}`,
      {
        headers: { Authorization: token },
      }
    );
    if (res != null) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

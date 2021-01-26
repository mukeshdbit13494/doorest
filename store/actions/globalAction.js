import Axios from "axios";
import { GET_STATE_CITY } from "./types";

export const getAllStateCity = () => {
  return async (dispatch) => {
    try {
      const res = await Axios.get("/api/all/states/cities");
      if (res != null) {
        dispatch({ type: GET_STATE_CITY, payload: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

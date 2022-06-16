import axios from "axios";
import API_URL from "../../helpers/apiurl";
import Cookies from "js-cookie";

export const registerAction = ({ ...values }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });

      let res1 = await axios.post(`${API_URL}/auth/register`, {
        ...values,
      });

      dispatch({ type: "LOGIN", payload: res1.data });

      Cookies.set("token", res1.headers["x-token-access"]);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      console.log(error);
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const loginAction = ({ ...values }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/login`, {
        ...values,
        email: values.name,
      });
      dispatch({ type: "LOGIN", payload: { ...res.data } });

      Cookies.set("token", res.headers["x-token-access"]);
      // Cookies.set("role", encryptrole);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

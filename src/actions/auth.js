import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";

import axios from "axios";

const loginFunction = (username, password, twoFactor) => {
  return axios
    .post(`/api/auth/signin`, {
      username,
      password,
      twoFactorSecret: twoFactor,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logoutFunction = () => {
  localStorage.removeItem("user");
};

export const login = (username, password, twoFactor) => (dispatch) => {
  return loginFunction(username, password, twoFactor).then(
    (data) => {
      console.log("Login success!", data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const logout = () => (dispatch) => {
  logoutFunction();

  dispatch({
    type: LOGOUT,
  });
};
export default {
  login,
  logout,
};

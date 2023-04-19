import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "./types";

import axios from "axios";

const loginFunction = (username, password, twoFactorCode) => {
  return axios
    .post(`/api/auth/signin`, {
      username,
      password,
      twoFactorSecret: twoFactorCode,
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
const updateFunction = (user) => {
  return axios
    .put(`http://localhost:5001/modifyProfile/${user.id}`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("response de modif " + response);
      if (response.data.accessToken) {
        console.log(response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const googleLoginFunction = async (accessToken) => {
  return await  axios
    .post(`/api/auth/googleSignin`, {
      accessToken,
    })
    .then(async (response) => {
      if (response.data.accessToken) {
        await localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(
        "google login data returned in loginfunction  : ",
        response.data
      );

      return response.data;
    });
};

const googleSignupFunction = (accessToken) => {
  return axios
    .post(`/api/auth/googleSignup`, {
      accessToken,
    })
    .then((response) => {
      console.log( "google Signup data returned in Signupfunction  : ",response.data );
      return response.data;
    });
};


const facebookLoginFunction = (accessToken) => {
  console.log("access Token in function : ",accessToken)
  return axios
    .post(`/api/auth/facebookSignin`, {
      accessToken,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(
        "google login data returned in loginfunction  : ",
        response.data
      );

      return response.data;
    });
};

const facebookSignupFunction = (accessToken) => {
  console.log("access Token in function : ",accessToken)
  return axios
    .post(`/api/auth/facebookSignup`, {
      accessToken,
    })
    .then((response) => {
      console.log( "google Signup data returned in Signupfunction  : ",response.data );
      return response.data;
    });
};



export const login = (username, password, twoFactorCode) => (dispatch) => {
  return loginFunction(username, password, twoFactorCode).then(
    (data) => {
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
export const modifyUser = (user) => (dispatch, getState) => {
  const currentUser = getState().auth.user;

  return updateFunction(user).then(
    (data) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
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
        type: UPDATE_USER_FAIL,
        payload: { user: currentUser },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const loginGoogle = async (accessToken) => async (dispatch) => {
  return await googleLoginFunction(accessToken).then(
    async (data) => {
      console.log("Google Login success ! : ", data);

      await dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
        payload: { user: data },
      });
      return await Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GOOGLE_LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.log(error);

      return Promise.reject(message);
    }
  );
};

export const signupGoogle = (accessToken) => (dispatch) => {
  return googleSignupFunction(accessToken).then(
    (data) => {
      console.log("Google Signup success !", data);

      dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
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
        type: GOOGLE_LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.log(error);

      return Promise.reject(message);
    }
  );
};


export const loginFacebook = (accessToken) => (dispatch) => {
  console.log("accessToken : ",accessToken)
  return facebookLoginFunction(accessToken).then(
    (data) => {
      console.log("Google Login success ! : ", data);

      dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
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
        type: GOOGLE_LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.log(error);

      return Promise.reject(message);
    }
  );
};

export const signupFacebook = (accessToken) => (dispatch) => {
  console.log("accessToken : ",accessToken)
  return facebookSignupFunction(accessToken).then(
    (data) => {
      console.log("Google Login success ! : ", data);

      dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
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
        type: GOOGLE_LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.log(error);

      return Promise.reject(message);
    }
  );
};


export default {
  login,
  logout,
  loginGoogle,
  signupGoogle,
  modifyUser,
  loginFacebook,
  signupFacebook,
};

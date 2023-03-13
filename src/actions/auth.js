import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
import axios from "axios";




  const loginFunction= (username, password) => {
    return axios.post(`/api/auth/signin`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log("login data returned in loginfunction : ",response.data)
        return response.data;
      });
  };


  const googleLoginFunction= (accessToken) => {
    return axios.post(`/api/auth/googleSignin`, {
        accessToken
      })
      .then((response) => {
        if (response.data.accessToken) {
          console.log("google login",response.data.accessToken)
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log("google login data returned in loginfunction  : ",response.data)
  
        return response.data;
      });
  };

  
  const logoutFunction = () => {
    localStorage.removeItem("user");
  };
  



  export const login = (username, password) => (dispatch) => {
    return loginFunction(username, password).then(
      (data) => {
        console.log('Login success!', data);

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


  export const loginGoogle = (accessToken) => (dispatch) => {
    console.log("token in loginGoogle : ",accessToken)
    return googleLoginFunction(accessToken).then(
      (data) => {
        console.log('Login success !', data);

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

        console.log("accessToken error",accessToken)
        console.log(error)
  
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
    loginGoogle,
  };
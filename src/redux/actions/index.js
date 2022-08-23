import * as types from '../types'
import admin from "./../../const/api";
import history from "./../../const/history";
import axios from "axios"
import {routes} from "../../services/api-routes"

export const getUserData = (exp) => async (dispatch) => {
  dispatch({ type: types.LOADING_ON });
  let token = localStorage.getItem("access_token")
  console.log(token)
  if (token !== null){
     axios
        .get(`https://reqres.in/api/${routes.profile.user}`)
        .then((res) => {
          dispatch({
            type: types.SET_USER_LOGGED_IN,
            payload: {...res.data.data},
          });
        })
        .catch((err) => {
          dispatch({
            type: types.LOG_OUT,
          });
        })
        .finally(() => {
          dispatch({ type: types.LOADING_OFF });
        });
  }
  else{
    dispatch({
      type: types.LOG_OUT,
    });
    dispatch({ type: types.LOADING_OFF });
  }
};

export const logInUser = (e, p) => async (dispatch) => {
  if (e.trim().length === 0 ||   p.trim().length === 0) {
    dispatch({
      type: types.SET_USER_ERROR,
      payload: { message: "İstifadəçi adı və şifrə daxil edilməlidir" },
    });
  } else {
    dispatch({ type: types.LOADING_ON });
    await axios
      .post(`https://reqres.in/api/${routes.profile.login}` , {
        username:e , password:p
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.token);
        dispatch(getUserData());
        history.push("/");
      })
      .catch((error) => {
        dispatch({
          type: types.SET_USER_ERROR,
          payload: { message: "İstifadəçi adı və ya şifrə yanlışdır" },
        });
      })
      .finally(() => {
        dispatch({ type: types.LOADING_OFF });
      });
  }
};

export const toggleLoading = (payload) => ({
  type: payload ? types.LOADING_ON : types.LOADING_OFF,
});

export const logOut = () => ({
  type: types.LOG_OUT,
});

export const notify = (description, isHappy) => {
  return {
    type: types.SET_NOTIFICATION,
    payload: { description, isHappy },
  };
};



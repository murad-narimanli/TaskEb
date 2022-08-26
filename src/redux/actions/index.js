import * as types from '../types'
import admin from "./../../const/api";
import history from "./../../const/history";
import {routes} from "../../services/api-routes"
let url =  routes.profile.users

export const getUserData = (data) => async (dispatch) => {
  dispatch({ type: types.LOADING_ON });
  let token = localStorage.getItem("access_token")
  if (token){
      history.push("/");
      if(data?.id){
        dispatch({
          type: types.SET_USER_LOGGED_IN,
          payload: {...data, token},
        });
        dispatch({ type: types.LOADING_OFF });
      }
      else{
       await admin.get(`${url}/${token}`).then((res) => {
            dispatch({
              type: types.SET_USER_LOGGED_IN,
              payload: {...res.data , token},
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
  }
  else{
    dispatch({
      type: types.LOG_OUT,
    });
    dispatch({ type: types.LOADING_OFF });
  }
};

export const logInUser = (email, password) => async (dispatch) => {
  if (email.trim().length === 0 ||   email.trim().length === 0) {
    dispatch({
      type: types.SET_USER_ERROR,
      payload: { message: "Username and password are required" },
    });
  } else {
    dispatch({ type: types.LOADING_ON });
    await admin
      .get(url, {
        params: {
          email,
          password
        }
      })
      .then((res) => {
        console.log(res)
        let user = res.data[0]
        localStorage.setItem("access_token", user.id);
          dispatch(getUserData(user));
      })
      .catch((error) => {
        dispatch({
          type: types.SET_USER_ERROR,
          payload: { message: "Username or password incorrect" },
        });
      })
      .finally(() => {
        dispatch({ type: types.LOADING_OFF });
      });
  }
};


export const registerUser  = (data) => async (dispatch) => {
  await admin.get(url).then((users) => {
    let allUsers = users.data
    let isBad = allUsers.some((user) => {
        if (user.username.toLowerCase() === data.username.toLowerCase()) {
          console.log("Username is already registered")
          dispatch({
            type: types.SET_USER_ERROR,
            payload: { message: "User name is already registered" },
          });
          return true;
        }
        if (user.email.toLowerCase() === data.email.toLowerCase()) {
          dispatch({
            type: types.SET_USER_ERROR,
            payload: { message: "Mail is already registered" },
          });
          console.log("Email is already registered")
          return true;
        }
        if (String(user.phone).slice(-4) === String(data.phone).slice(-4)) {
          dispatch({
            type: types.SET_USER_ERROR,
            payload: { message: "Phone is already registered" },
          });
          console.log("phone is already registered")
          return true;
        }
        else{
          return false;
        }
    })

    if (!isBad) {
      admin.post(url, data).then(r => {
        localStorage.setItem("access_token", data.id);
        dispatch(getUserData(data.id))
      }).catch(()=>{
        dispatch({
          type: types.SET_USER_ERROR,
          payload: { message: "Unknown error occurred" },
        });
      })
    }

  })
};

export const toggleLoading = (payload) => ({
  type: payload ? types.LOADING_ON : types.LOADING_OFF,
});




export const getTasks = (params) => async (dispatch) => {
  dispatch({
    type: types.GET_TASKS_LOADING,
  });
  await admin
      .get(`tasks` , {params})
      .then((res) => {
        dispatch({
          type: types.GET_TASKS,
          payload: {
            data: res.data,
            loading:false
          }
        });
      }).catch(() => {
          dispatch({
            type: types.GET_TASKS,
            payload: {
              data: [],
              loading:false
            }
         });
     })
};



export const setVisibleAddModal = (modalOpen, editing=null , editingData = {}) => async (dispatch) => {
    console.log('setVisibleAddModal')
    if (modalOpen){
        await  dispatch({
        type: types.SET_MODAL_ADD,
        payload: {
          modalOpen,
          editing,
          editingData
        }
      });
    }
    else{
      dispatch({
        type: types.CLEAR_MODAL_ADD,
          payload: {
              modalOpen,
              editing:null,
              editingData:{}
        }
      });
    }
};




export const logOut = () => ({
  type: types.LOG_OUT,
});


export const notify = (description, isHappy) => {
  return {
    type: types.SET_NOTIFICATION,
    payload: { description, isHappy },
  };
};



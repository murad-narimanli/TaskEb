import * as types from '../types'
import {GET_USERS} from "../types";

const initialUser = {
  isLoggedIn: false,
  data: {},
  message: "",
  notify: true,
};

const modalData = {
    modalOpen: false,
    editing:1,
    editingData:{}
}

const taskState = {
  loading: false,
  data:[]
}

const userState = {
  loading: false,
  data:[]
}


export function modalReducer(modal= modalData, action) {
  switch (action.type) {
    case types.SET_MODAL_ADD:
      return action.payload
    case types.CLEAR_MODAL_ADD:
      return action.payload
    default:
      return modalData;
  }
}


export function usersReducer (users= userState, action) {
  switch (action.type){
    case types.GET_USERS_LOADING:
      return {
        loading: true,
        data:[]
      };
    case types.GET_USERS:
      console.log('get is ok')
      return {
        loading: false,
        data:action.payload
      };
    default:
      console.log('bad')
      return userState;
  }
}


export function tasksReducer (tasks= taskState, action) {
  switch (action.type) {
    case types.GET_TASKS_LOADING:
      return {
        loading: true,
        data:[]
      };
    case types.GET_TASKS:
      return {
        loading: false,
        data:action.payload
      };
    default:
      return taskState;
  }
}



export function userReducer(userData = initialUser, action) {
  switch (action.type) {
    case types.GET_USER:
      return userData;
    case types.SET_USER_LOGGED_IN:
      let data = {...action.payload}
      return {
        data,
        isLoggedIn: data.token !== null ?  true : false,
        message: "",
        notify: !userData.notify,
      };
    case types.SET_USER:
      return {
        data: action.payload,
        isLoggedIn: action.payload.token !== null ?  true : false,
        message: "Successfully logged in",
        notify: !userData.notify,
      };
    case types.SET_USER_ERROR:
      return {
        ...userData,
        message: action.payload.message,
        notify: !userData.notify,
      };
    case types.LOG_OUT:
      localStorage.removeItem('access_token')
      return {
        notify: userData.notify,
        message: "",
        data: {},
        isLoggedIn: false,
      };
    default:
      return userData;
  }
}

export function loaderReducer(isLoading = 0, action) {
  switch (action.type) {
    case types.LOADING_ON:
      return ++isLoading;
    case types.LOADING_OFF:
      return isLoading === 0 ? 0 : --isLoading;
    default:
      return isLoading;
  }
}

export function notificationReducer(
  data = { description: "", isHappy: true, notify: false },
  action
) {
  switch (action.type) {
    case types.SET_NOTIFICATION:
      let newData = { ...action.payload, notify: !data.notify };
      return newData;
    default:
      return data;
  }
}


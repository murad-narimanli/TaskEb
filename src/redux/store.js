import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  userReducer,
  loaderReducer,
  notificationReducer, tasksReducer, usersReducer, modalReducer,
} from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  notification: notificationReducer,
  tasks:tasksReducer,
  users: usersReducer,
  modalData: modalReducer,
});


const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

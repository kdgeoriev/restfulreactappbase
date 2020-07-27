import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authStateReducer from "./authStateReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  googleAuth: authStateReducer,
  form: formReducer,
  streams: streamReducer,
});

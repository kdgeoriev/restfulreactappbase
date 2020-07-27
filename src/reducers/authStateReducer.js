import {
  GET_AUTH_STATE,
  GOOGLE_AUTH_LOGIN,
  GOOGLE_AUTH_LOGOUT,
} from "../actions/types";
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_AUTH_STATE: {
      return {
        ...state,
        isSignedIn: action.payload.isSignedIn,
        userId: action.payload.userId,
      };
    }
    case GOOGLE_AUTH_LOGIN: {
      return { ...state, isSignedIn: true, userId: action.payload };
    }
    case GOOGLE_AUTH_LOGOUT: {
      return { ...state, isSignedIn: false, userId: null };
    }
    default:
      return state;
  }
};

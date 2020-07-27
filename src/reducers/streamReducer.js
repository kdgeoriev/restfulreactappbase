import _ from "lodash";
import {
  CREATE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_STREAM:
    case EDIT_STREAM:
    case FETCH_STREAM: {
      /* same as below
        const newState = {...state};
       return  newState[action.payload.streamId] = action.payload;
       */
      return { ...state, [action.payload.id]: action.payload };
    }
    case DELETE_STREAM: {
      return _.omit(state, action.payload);
    }
    case FETCH_STREAMS: {
      //check if {...[action.payload]} conversion works
      return { ...state, ..._.mapKeys(action.payload, "id") };
    }
    default:
      return state;
  }
};

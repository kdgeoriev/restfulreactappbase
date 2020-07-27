import GoogleAuth from "../api/GoogleAuth";
import {
  GOOGLE_AUTH_LOGIN,
  GOOGLE_AUTH_LOGOUT,
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
} from "./types";
import streams from "../api/streams";
import history from "../history";

export const fetchAuthState = () => async (dispatch) => {
  const googleAuth = await GoogleAuth();

  //setting data
  const isSignedIn = googleAuth.isSignedIn.get();
  const userId = googleAuth.currentUser.get().getId();
  await dispatch({
    type: "GET_AUTH_STATE",
    payload: { isSignedIn, userId },
  });
};
export const logIn = () => async (dispatch) => {
  const googleAuth = await GoogleAuth();
  googleAuth.signIn();
  const userId = googleAuth.currentUser.get().getId();
  await dispatch({
    type: GOOGLE_AUTH_LOGIN,
    payload: userId,
  });
};

export const logOut = () => async (dispatch) => {
  const googleAuth = await GoogleAuth();
  googleAuth.signOut();
  await dispatch({
    type: GOOGLE_AUTH_LOGOUT,
  });
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().googleAuth;
  const responce = await streams.post("/streams/", { ...formValues, userId });
  dispatch({
    type: CREATE_STREAM,
    payload: responce.data,
  });
  history.push("/");
};

export const editStream = (streamId, formValues) => async (dispatch) => {
  const responce = await streams.patch(`/streams/${streamId}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: responce.data,
  });
  history.push("/");
};

export const fetchStream = (streamId) => async (dispatch) => {
  const responce = await streams.get(`/streams/${streamId}`);
  dispatch({
    type: FETCH_STREAM,
    payload: responce.data,
  });
};

export const fetchStreams = () => async (dispatch) => {
  const responce = await streams.get("/streams/");
  dispatch({
    type: FETCH_STREAMS,
    payload: responce.data,
  });
};

export const deleteStream = (streamId) => async (dispatch) => {
  console.log("deleting");
  await streams.delete(`/streams/${streamId}`);
  dispatch({
    type: DELETE_STREAM,
    payload: streamId,
  });
  history.push("/");
};

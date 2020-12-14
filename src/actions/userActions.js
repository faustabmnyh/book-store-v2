import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGOUT,
} from "../constants/userConstants";
import { auth } from "../utils/firebase";

export const register = ({ email, password, username }) => (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  auth.createUserWithEmailAndPassword(email, password).catch((err) => {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.message,
    });
  });

  auth.onAuthStateChanged((authUser) => {
    try {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: {
          id: authUser.uid,
          username,
          email: authUser.email,
        },
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: {
          id: authUser.uid,
          username,
          email: authUser.email,
        },
      });
      const user = auth.currentUser;
      user
        ?.updateProfile({
          displayName: username,
        })
        .catch((err) => console.error(err));
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          email,
          username,
          id: authUser.uid,
        })
      );
    } catch (err) {
      return err;
    }
  });
};

export const signin = (email, password) => (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  auth.signInWithEmailAndPassword(email, password).catch((err) => {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: err.message,
    });
  });
  auth.onAuthStateChanged((authUser) => {
    try {
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: {
          id: authUser.uid,
          username: authUser.displayName,
          email: authUser.email,
        },
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          email,
          username: authUser.displayName,
          id: authUser.uid,
        })
      );
    } catch (err) {
      return err;
    }
  });
};

export const signout = () => (dispatch) => {
  auth.signOut();
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  dispatch({
    type: USER_SIGOUT,
  });
  document.location.href = "/signin";
};

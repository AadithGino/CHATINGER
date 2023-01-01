import axios from "axios";

import {
  FIND_USER_FAIL,
  FIND_USER_REQUEST,
  FIND_USER_SUCCESS,
  USER_HOME_FAIL,
  USER_HOME_REQUEST,
  USER_HOME_SUCCESS,
} from "../../Constants/userConstants";
const baseUrl = "http://localhost:5000";

export const userHome = () => async (dispatch) => {
  try {
    let userinfo = JSON.parse(localStorage.getItem("chatingerUserInfo"));
    dispatch({ type: USER_HOME_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/chat/get-chats?id=" + userinfo._id
    );
    console.log(data);
    console.log(userinfo._id);

    dispatch({ type: USER_HOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_HOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const findUserDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: FIND_USER_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/find-user?id=" + id
    );

    dispatch({ type: FIND_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

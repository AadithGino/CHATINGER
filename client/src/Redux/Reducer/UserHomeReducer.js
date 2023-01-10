import {
  CURRENT_CHAT_FAIL,
  CURRENT_CHAT_REQUEST,
  CURRENT_CHAT_SUCCESS,
  FIND_USER_FAIL,
  FIND_USER_REQUEST,
  FIND_USER_SUCCESS,
  SET_CURRENT_CHAT,
  SET_NOTIFICATION,
  UPDATE_CURRENT_CHAT,
  UPDATE_NOTIFICATION,
  USER_HOME_FAIL,
  USER_HOME_REQUEST,
  USER_HOME_SUCCESS,
} from "../Constants/userConstants";

export const userHomeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_HOME_REQUEST:
      return { loading: true };
    case USER_HOME_SUCCESS:
      return { loading: false, homedata: action.payload };
    case USER_HOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const findUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case FIND_USER_REQUEST:
      return { loading: true };
    case FIND_USER_SUCCESS:
      return { loading: false, userdata: action.payload };
    case FIND_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const curentChatReducer = (state = 'hiiii', action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return { currentChat: action.payload };

    case UPDATE_CURRENT_CHAT:
      return { currentChat: action.payload };

    default:
      return state;
  }
};


export const notificationReducer = (state =[],action)=>{
  switch (action.type) {
    case SET_NOTIFICATION:
      return({notifications:action.payload})
  
    default:
      return state;
  }
  
}
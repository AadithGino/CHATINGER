import { CURRENT_CHAT_FAIL, CURRENT_CHAT_REQUEST, CURRENT_CHAT_SUCCESS, FIND_USER_FAIL, FIND_USER_REQUEST, FIND_USER_SUCCESS, USER_HOME_FAIL, USER_HOME_REQUEST, USER_HOME_SUCCESS } from "../Constants/userConstants";

export const userHomeReducer = (state = {}, action)=>{
  
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
}

export const findUserDetailsReducer = (state={},action)=>{
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
}

export const currentChatReducer = (state={},action)=>{
  switch (action.type) {
    case CURRENT_CHAT_REQUEST:
      return({chatloading:true})

    case CURRENT_CHAT_SUCCESS:
    return({chatloading:false,chatdata:action.payload})

    case CURRENT_CHAT_FAIL:
      return({chatloading:false,chaterror:action.payload})
    default:
      return state;
  }
}
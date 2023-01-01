import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { currentChatReducer, findUserDetailsReducer, userHomeReducer } from "./Reducer/UserHomeReducer";
import { userLoginReducer, userSignupReducer, verifyOTPReducer } from "./Reducer/UserLoginSignupReducer";
const middleware = [thunk];

const reducer = combineReducers({
  userHome: userHomeReducer,
  findUser : findUserDetailsReducer,
  loginReducer:userLoginReducer,
  signUpReducer:userSignupReducer,
  currentChatReducer:currentChatReducer,
  otpReducer:verifyOTPReducer
});

let userinfo = JSON.parse(localStorage.getItem("chatingerUserInfo"));

const initialstate = {
  loginReducer: { userdata: userinfo },
};

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

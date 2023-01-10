import axios from "axios";
import { useSelector } from "react-redux";
import {
  CURRENT_CHAT_FAIL,
  CURRENT_CHAT_REQUEST,
  CURRENT_CHAT_SUCCESS,
  SET_NOTIFICATION,
  USER_SEND_MESSAGE_REQUEST,
  USER_SEND_MESSAGE_SUCCESS,
} from "../../Constants/userConstants";
const userdata = JSON.parse(localStorage.getItem("chatingerUserInfo"));

// export const currentChatAction = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: CURRENT_CHAT_REQUEST });

//     const { data } = await axios.get(
//       "http://localhost:5000/chat/get-messages?id=" + id
//     );
//     dispatch({ type: CURRENT_CHAT_SUCCESS, payload: data });
//     console.log(data);
//   } catch (error) {
//     dispatch({
//       type: CURRENT_CHAT_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.response.data,
//     });
//   }
// };

export const notificationAction = (data) => async (dispatch) => {
  dispatch({ type: SET_NOTIFICATION, payload: data });
};

// export const sendMessageAction = (chatid,content) =>async(dispatch)=>{
//   console.log(chatid+"THIS IS THE CHAR ID");
//   try {
//     let message = content;
//     let id = userdata._id;
//       dispatch({type:USER_SEND_MESSAGE_REQUEST})
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       const {data} = await axios.post("http://localhost:5000/chat/send-message",{id,chatid,message},config)
//       dispatch({type:USER_SEND_MESSAGE_SUCCESS,payload:data})
//       console.log(data);
//   } catch (error) {
//       dispatch({
//           type: CURRENT_CHAT_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.response.data,
//         });
//   }
//   }

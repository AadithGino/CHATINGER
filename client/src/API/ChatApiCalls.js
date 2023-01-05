import axios from "axios";

const API = axios.create({baseURL:'http://localhost:5000'})
const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

export const findUserDetails = (id) => API.get(`/find-user?id=`+id)
export const fetchUserMessages = (id) => API.get(`/chat/get-messages?id=`+id)
export const sendMessage = ( id, chatid, message ) => API.post('/chat/send-message',{ id, chatid, message },config)
export const sendImage = ( id, chatid, image ) => API.post('/chat/send-message',{ id, chatid, image },config)
export const userSearch = (id,search) => API.post('/search',{id,search},config)
export const userSearchforGroup = (id,search) => API.post('/search',{id,search},config)
export const userCreateChat = (id,user) => API.post('/chat',{id,user},config)
export const createGroup = (id,members,chatName)=>API.post('/chat/group-chat',{id,members,chatName},config)
export const findGroupMembers =(id)=> API.get(`/chat/group-members?id=`+id)
export const changeGroupName = (name,chatid) => API.post('/chat/group-change-name',{chatid,name},config)
export const chanegUserName = (id,firstname,lastname) =>API.post("/change-name",{firstname,lastname,id})
export const changeProfileImage = (id,image) => API.post("/change-photo",{id,image})
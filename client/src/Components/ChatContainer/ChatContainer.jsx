import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import ChatLoading from "../../ToolComponents/Loading/Loading";
import Chatbox from "../ChatBox/Chatbox";
import "./ChatContainer.css";
import {
  fetchUserMessages,
  findGroupMembers,
  findUserDetails,
  sendImage,
  sendMessage,
} from "../../API/ChatApiCalls";
import GroupInfo from "../GroupInfo/GroupInfo";
import { userHome } from "../../Redux/Actions/UserActions/UserHomeAction";

function ChatContainer({ chat, receiveMessage }) {
  const dispatch = useDispatch();
  const socket = useRef();
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const recieverid = chat.members.find((id) => id !== userdata._id);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [messageloading, setmessageloading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(false);
  const [socketsendMessage, setsocketsendMessage] = useState(null);
  const [imageuploadloading, setimageuploadloading] = useState(false);
  const [members, setMembers] = useState();
  // const [groupInfo,setGroupInfo] = useState(false)
  const scrollRef = useRef();
  const imageinputref = useRef(null);
  // FOR SENDING MESSAGE TO SOCKET.IO

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    if (socketsendMessage) {
      socket.current.emit("send-message", socketsendMessage);
    }
  }, [socketsendMessage]);

  // TO RECIEVE MESSAGE FROM SOCKET IO WHICH IS PASSED FROM HOME COMPONENT

  useEffect(() => {
    console.log(receiveMessage);
    if (
      messages.length != 0 &&
      chat._id === receiveMessage.data[0].chatid &&
      userdata._id != receiveMessage.data[0].sender
    ) {
      setMessages([...messages, receiveMessage.data]);
      dispatch(userHome());

      scrollRef.current.scrollIntoView();
    }
  }, [receiveMessage]);

  // FUNCTION FOR SENDING MESSAGE

  const handleSendMessage = async () => {
    if (file) {
      console.log("HEEEEEEEEEEEEEEEEEEEEEE");
      setimageuploadloading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "noteapp");
      data.append("cloud_name", "dhajqatgt");
      console.log(data);
      fetch("https://api.cloudinary.com/v1_1/dhajqatgt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then(async (result) => {
          console.log(result.url);
          let image = result.url;
          const { data } = await sendImage(userdata._id, chat._id, image);
          console.log(data);
          setMessages([...messages, data]);
          setsocketsendMessage({ data, recieverid });
          setFile("");
          dispatch(userHome());
          setimageuploadloading(false);
          setMessage("");
        });
    } else {
      const { data } = await sendMessage(userdata._id, chat._id, message);
      setMessages([...messages, data]);
      setsocketsendMessage({ data, recieverid });
      dispatch(userHome());
      setMessage("");
    }
  };

  // TO FETCH MESSAGES AND SELECTED USER DETAILS

  useEffect(() => {
    setmessageloading(true);
    const fetchmessages = async () => {
      setmessageloading(false);

      setMessages(chat.messages);
    };
    fetchmessages();
    const fetchuserDetails = async () => {
      if (chat.isGroupChat) {
        const { data } = await findGroupMembers(chat._id);
        setMembers(data);
      } else {
        const userDetails = await findUserDetails(recieverid);
        setUserData(userDetails.data);
      }
    };
    fetchuserDetails();
  }, [chat]);

  // TO SEND MESSAGE WHILE ENTER

  const handleEnterKey = (key) => {
    if (key === "Enter") {
      if (message != " " && message != "") {
        handleSendMessage();
      }
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, [messages]);
  console.log(file);

  // handle image input

  const handleimageinput = () => {
    console.log("IMAGE INPUT SELECTED");
    imageinputref.current.click();
    setMessage("");
  };
  return (
    <div>
      <div className="ChatBox-container">
        <div className="chat-header">
          <img
            className="profile-image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvXOdUM5rLXW_aLA2ZRQ_Y79n899uSS3Em5zSiyLBPcA&s"
            alt=""
          />
          <h3 className="user-name">
            {chat.isGroupChat
              ? chat.chatName
              : userData
              ? userData.fullname
              : ""}
          </h3>
          <br />

          {/* {chat.isGroupChat
            ? members
              ? members.map((m) => {
                  console.log(m.user[0]);
                  return <p>{m.user[0].Firstname}, </p>;
                })
              : ""
            : ""} */}
          {chat.isGroupChat ? (
            <div className="groupchat-info">
              {" "}
              <GroupInfo
                members={members}
                chat={chat}
                currentuser={userdata._id}
              />{" "}
            </div>
          ) : (
            ""
          )}
        </div>

        <hr />
        <div className="chat-body">
          {messageloading ? (
            <ChatLoading />
          ) : messages ? (
            messages.map((m) => {
              let own;
              if (m[0].sender == userdata._id) {
                own = "own";
              }
              return (
                <>
                  <div ref={scrollRef}>
                    <Chatbox own={own} message={m[0]} />
                  </div>
                </>
              );
            })
          ) : (
            ""
          )}
        </div>

        <div className="chatBoxBottom">
          <input
            ref={imageinputref}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
            className="image-upload"
          />

          <i
            id="file-icon"
            onClick={() => handleimageinput()}
            class="fa-solid fa-paperclip"
          ></i>
          <textarea
            onKeyPress={(e) => {
              handleEnterKey(e.key);
            }}
            value={message}
            className="chatMessageInput"
            placeholder="write something..."
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {message.length == 0 && !file ? (
            <button className="chatSubmitButton">Send</button>
          ) : imageuploadloading ? (
            <button className="chatSubmitButton">Image is uploading</button>
          ) : (
            <button
              onClick={(e) => {
                handleSendMessage(e);
              }}
              className="chatSubmitButton"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;

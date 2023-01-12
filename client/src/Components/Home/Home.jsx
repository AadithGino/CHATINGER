import React, { useRef } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setCurrentChat,
  userHome,
} from "../../Redux/Actions/UserActions/UserHomeAction";
import UserList from "../User-List/UserList";
import { useState } from "react";
import { io } from "socket.io-client";
import ChatContainer from "../ChatContainer/ChatContainer";
import UserSearch from "../UserSearch/UserSearch";
import CreateGroup from "../CreateGroup/CreateGroup";
import Profile from "../Profile/Profile";
import { notificationReducer } from "../../Redux/Reducer/UserHomeReducer";
import TopBar from "../TopBar/TopBar";

function Home() {
  const socket = useRef();
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const { loading, error, homedata } = useSelector((state) => state.userHome);
  const chatData = useSelector((state) => state.currentChatReducer.currentChat);
  console.log(chatData);
  const [curentchat, setcurentchat] = useState("");
  const [receiveMessage, setRecieveMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loadsearch, setloadsearch] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("add-new-user", userdata._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userdata]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setRecieveMessage(data);

      console.log("..................................");
      console.log(data.data[0].chatid + "THIS IS THE RECIEVE CHAT ID");
      console.log(chatData + ">>>>>>>>>>>>");
      console.log("THIS IS THE CURRENT CHAT ID");
      console.log("---------------------------------------------------");
    });
  }, []);

  useEffect(() => {
    dispatch(userHome());
  }, []);

  return (
    <div className="main-div">
      <div className="messenger">
        <div className="chatMenu">
          <TopBar />
          <hr />
          <div className="chatMenuWrapper">
            {loadsearch ? (
              ""
            ) : (
              <button
                style={{ color: "black" }}
                className="search-button"
                onClick={() => setloadsearch(!loadsearch)}
              >
                Search Users{" "}
                <i
                  style={{ color: "black", marginLeft: "3px" }}
                  class="fa-solid fa-magnifying-glass"
                ></i>
              </button>
            )}
            {loadsearch ? (
              <UserSearch
                setcurentchat={setcurentchat}
                setloadsearch={setloadsearch}
              />
            ) : (
              ""
            )}
            {loadsearch == false
              ? homedata
                ? homedata.map((m) => {
                    return (
                      <div
                        onClick={() => {
                          dispatch(setCurrentChat(m));
                        }}
                      >
                        <UserList details={m} />
                      </div>
                    );
                  })
                : ""
              : ""}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWraper">
            {chatData ? (
              <ChatContainer chat={chatData} receiveMessage={receiveMessage} />
            ) : (
              <div
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ marginLeft: "15%" }}
                  src="https://res.cloudinary.com/dhajqatgt/image/upload/v1672202300/finalchatinerglgoo_jdhu4x.png"
                  alt=""
                />
                <p>
                  Chat Online With Your Friends,Group Chat And All Other
                  Features....
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

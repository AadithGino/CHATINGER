import React from "react";
import "./Chatbox.css";
import { format } from "timeago.js";
function Chatbox({ own, message }) {
  console.log(message);
  let msgboxstyle = "message";
  let msgtxtstyle = "message-Txt";
  let userimgstyle = "chatbox-user-img";
  let timetxtstyle = "chatbox-bottom-time";
  if (own == "own") {
    msgboxstyle = "messageown";
    msgtxtstyle = "message-Txt-own";
    userimgstyle = "chatbox-user-img-own";
    timetxtstyle = "chatbox-bottom-time-own";
  }

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        {message.isFile ? (
          <img className="chat-img" src={message.content} alt="" />
        ) : (
          <div className="messageText">
            <p>{message.content}</p>{" "}
            <p className="message-time">{format(message.time)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbox;

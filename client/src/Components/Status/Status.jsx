import { m } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getStatus } from "../../API/ChatApiCalls";
import Profile from "../Profile/Profile";
import StatusUserList from "../StatusUserList/StatusUserList";
import "./Status.css";

function Status() {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const [selectedStatus, setSelectedStatus] = useState();
  console.log(userdata);

  const [status, setStatus] = useState();
  useEffect(() => {
    getStatus().then((data) => {
      console.log(data.data[0]);
      setStatus(data.data);
    });
  }, []);

  return (
    <div className="status-main-div">
      <div className="status-list-css">
        <div className="status-menu">
          <div className="topbar">
            <Profile />
            <h2 className="top-bar-name">
              {userdata ? userdata.firstname : ""}
            </h2>
          </div>
          <hr />

          <div className="my-status">
            <div className="user-list-search">
              {
                status?status.map((m)=>{
                  if(m.userid===userdata._id){
                 return (
                  <h1>STATUS IS THERE</h1>
                 )
                  }
                }):''
              }
              <div class="avatar">
                <img
                  className="user-img"
                  src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt=""
                />
              </div>
              <span className="user-name">My status</span>
            </div>
          </div>
          {status ? (
            status.map((m) => {
              console.log(m);
              if (m.userid !== userdata._id) {
                return (
                  <span onClick={() => setSelectedStatus(m)}>
                    <StatusUserList user={m} />
                  </span>
                );
              }
            })
          ) : (
            <h2>No status</h2>
          )}
        </div>
      </div>
      <div className="status-view">
        {selectedStatus ? <h1>{selectedStatus.content}</h1> : ""}
      </div>
    </div>
  );
}

export default Status;

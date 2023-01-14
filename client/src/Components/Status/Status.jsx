import { m } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getMyStatus, getStatus } from "../../API/ChatApiCalls";
import StatusUserList from "../StatusUserList/StatusUserList";
import TopBar from "../TopBar/TopBar";
import UploadStatus from "../UploadStatus/UploadStatus";
import "./Status.css";

function Status() {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const [selectedStatus, setSelectedStatus] = useState();
  const [myStatus, setMyStatus] = useState(false);
  console.log(userdata);

  const [status, setStatus] = useState();
  useEffect(() => {
    getStatus().then((data) => {
      setStatus(data.data);
    });

    getMyStatus(userdata._id).then((data) => {
      if (data.data != null) {
        setMyStatus(data.data);
      }
    });
  }, []);

  return (
    <div className="status-main-div">
      <div className="status-list-css">
        <div className="status-menu">
          <TopBar />
          <hr />

          {myStatus ? (
            <div className="my-status">
              <div className="user-list-search">
                <div class="avatar">
                  <img
                    className="user-img"
                    src={myStatus ? myStatus.content : ""}
                    alt=""
                  />
                </div>
                <span>MY STATUS</span>
              </div>
            </div>
          ) : (
            <UploadStatus setStatus={setStatus} />
          )}

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
        {selectedStatus ? (
          <img
            className="status-image-view"
            src={selectedStatus.content}
            alt=""
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Status;

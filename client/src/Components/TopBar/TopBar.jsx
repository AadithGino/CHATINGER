import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateGroup from "../CreateGroup/CreateGroup";
import Profile from "../Profile/Profile";
import "./TopBar.css";


function TopBar({ setcurentchat, setgroupMembers, groupMembers }) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const navigate = useNavigate()
  return (
    <div className="topbar">
      <Profile />
      <CreateGroup
        currentuser={userdata._id}
        setcurentchat={setcurentchat}
        setgroupMembers={setgroupMembers}
        groupMembers={groupMembers}
      />
      <i style={{color:"black"}}  class="fa-light fa-message-heart"></i>
      <h3 onClick={()=>navigate("/status")}>STAUS</h3>
      
    </div>
  );
}

export default TopBar;

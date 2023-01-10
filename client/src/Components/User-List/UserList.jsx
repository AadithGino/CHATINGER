import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUserDetails } from "../../API/ChatApiCalls";
import { findUserDetailsAction } from "../../Redux/Actions/UserActions/UserHomeAction";
import TopBar from "../TopBar/TopBar";
import { WrapItem, Avatar } from "@chakra-ui/react";
import "./UserList.css";
function UserList(props) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const dispatch = useDispatch();
  const [userDetails, setuserdetails] = useState("");
  const userdetails = useSelector((state) => state.findUser);
  const id = props.details.members.find((m) => m !== userdata._id);
  console.log(id + "THIS IS THE ID IN USERLIST");
  const fetchuserdata = async () => {
    const { data } = await findUserDetails(id);
    setuserdetails(data);
    console.log(data);
  };
  useEffect(() => {
    fetchuserdata();
  }, []);

  return (
    <>
      {/* <TopBar /> */}
      <div className="home-page">
        <div>
          <div>
            <div className="user-list">
              <WrapItem style={{marginRight:"10px"}}>
                <Avatar
                  name={
                    props.details.isGroupChat
                      ? props.details.chatName
                      : userDetails
                      ? userDetails.fullname
                      : ""
                  }
                  src={
                    props.details.isGroupChat
                      ? props.details.chatName
                      : userDetails
                      ? userDetails.photo
                      : ""
                  }
                />
              </WrapItem>
              <span className="user-name">
                {props.details.isGroupChat
                  ? props.details.chatName
                  : userDetails
                  ? userDetails.fullname
                  : ""}
              </span>
            </div>

            {/* <p>Latest Message : {props.details.latestMessage}</p> */}
            {/* <p>5:58 pm</p> */}
            {/* <hr /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;

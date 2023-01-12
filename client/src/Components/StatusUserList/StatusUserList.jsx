import React, { useEffect, useState } from "react";
import { findUserDetails } from "../../API/ChatApiCalls";
import { WrapItem, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function StatusUserList({ user }) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const [userDetails, setuserdetails] = useState("");

  const fetchuserdata = async () => {
    const { data } = await findUserDetails(user.userid);
    setuserdetails(data);
    console.log(data);
  };
  useEffect(() => {
    fetchuserdata();
  }, []);
  return (
    <div>
      <>
        <div className="home-page">
          <div>
            <div className="user-list-main">
              <div className="user-list">
                <WrapItem style={{ marginRight: "10px" }}>
                  <Avatar
                    name={user.isFile?'':user.content}
                    src={user.isFile?user.content:''}
                  />
                </WrapItem>
                <span className="user-name">
                  {userDetails ? userDetails.fullname : ""}
                </span>
              </div>

              <hr className="separating-line" />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default StatusUserList;
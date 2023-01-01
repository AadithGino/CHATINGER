import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUserDetails } from "../../API/ChatApiCalls";
import { findUserDetailsAction } from "../../Redux/Actions/UserActions/UserHomeAction";
import TopBar from "../TopBar/TopBar";
import "./UserList.css";
function UserList(props) {
  const userdata = useSelector((state)=>state.loginReducer.userdata)
  const dispatch = useDispatch()
  const [userDetails,setuserdetails] = useState('')
  const userdetails = useSelector(state=>state.findUser);
  const id = props.details.members.find((m)=>m !== userdata._id);
  console.log(id+"THIS IS THE ID IN USERLIST");
  const fetchuserdata =async()=>{
    const {data} = await findUserDetails(id)
  setuserdetails(data)
  console.log(data);
  }
  useEffect(()=>{
    fetchuserdata()
  },[])
  
  return (
    <>
      {/* <TopBar /> */}
      <div className="home-page">
        <div>
          <div>
          <div className="user-list">
            <img className="user-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAACTCAMAAAC9O9snAAAAMFBMVEXk5ueutLepsLPZ3N3n6eq/xMa5vsHd4OHIzM68wcSxt7rh4+TM0NLW2dvT1tjEycv0+YafAAADTElEQVR4nO2b25arIAxAuURRQPz/vz3Y2nacaYVEgz1rZb/MzNPsFQIEiEoJgiAIgiAIgiAIgiBwAVcLbAAA5ay1Liy/fQGgbBy1WfFdcldHDMLca6N/YHQfr7QC2298HlpmdhdZQejeCN2t/HCJFMR3MXoN4XSBVbentNA8VM6XlLQZWyuVjJpL2QqjRapvpxRqotQ4UrVKWaprk+hQnHE/pVILKZgQShnXwKk6mVZ6/kDBjAuTNvwLukMq5UAFZiX4uO9+DlRidnJoJa097+DBgB66HCjLKgUEJa1ZF06wJCfPmeUwU5TycsDopHqa08w4eJRZt8A582jplOFT2j8W7GAsnxN2r3vCV7HASFTSkc+JNu0057kKkKXTC77FQJz+Y6dvzHF8kbnCuD5RKrobjOeERHViLKDIezBjXRCIST5yFr+0JDd8291SrNDixHtnQEoo3pMwadU0zLetlNXAsBqRZh77XR2lJOcrxh9SaCXOw90KNqO4s2kBOfVY18sXKKU2N+SQMFLcF4cPKcTcY59zT6naW/s2N/arVN0hvaWSqnhRbK9UkVPGN399hWn/sGf6C97OQe0klWG8Sdm3sh+X9C5c1vYAU2f+BMvoy1oe7lIQovf6IZZ/+jFd3bBy05ri0I39OHZDtOFLWns2fIONc1OKcViIMU3WqavM8n8NNs63zqdthue/+y5aF1RTsxyc1PX+t87GLIsNtpFVTuk0+882W7OxQdsYwDRWCq1anrdtDJSdMT7PaPVcSxZA+tU6h9BiCRaoSBVagzWcveFAKvdglaz8cObGfILRzUrH04wC+Tnqj5U/51mfejf3wao7nuzgTgvSKnW4TIfp0Gx7b3WsLD533J5SR1r/6O+/BSlPX6vedhifA1Vq5FPSxEgxRmmBIAWcUbqBvplCNWHSwHYgkbtAMOBeq4i9V0iQbx7kB3IciG2mQTLd8fVRwveFEkGMHrmNAE/lvTDu/vsglW9W9A4QAqZqkQJyEwGJqkDRm1JI+Jr366rPRM6jqupssav8pKJ3s2mGL1RkOa3z+YhT8QUE+1XGCRRnHgytlcpdGvS2UDLF2o7aTXTEqbRCuecnrO0odrxPtjVTo2dsQRAEQRAK/AMk5ChxwTG5FAAAAABJRU5ErkJggg==" alt="" />
            <span className="user-name">{props.details.isGroupChat ? props.details.chatName   : userDetails?   userDetails.fullname : ''}</span>
           
          </div>
          
          {/* <p>Latest Message : {props.details.latestMessage}</p> */}
          {/* <hr /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;

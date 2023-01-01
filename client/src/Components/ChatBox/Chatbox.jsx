import React from 'react'
import './Chatbox.css'
import {format} from 'timeago.js'
function Chatbox({own,message}) {
  console.log(message);
  let msgboxstyle='message'
  let msgtxtstyle='message-Txt'
  let userimgstyle = 'chatbox-user-img';
  let timetxtstyle = 'chatbox-bottom-time'
  if(own=='own'){
    msgboxstyle='messageown';
    msgtxtstyle='message-Txt-own';
    userimgstyle='chatbox-user-img-own'
    timetxtstyle='chatbox-bottom-time-own'
  }



  return (
    <div className={msgboxstyle}>
     {own ?  <div className="messageTop">
       
        {message.isFile ? <img className='chat-img' src={message.content} alt="" /> : <p className={msgtxtstyle}>{message.content}</p>}
        <img className={userimgstyle} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAACTCAMAAAC9O9snAAAAMFBMVEXk5ueutLepsLPZ3N3n6eq/xMa5vsHd4OHIzM68wcSxt7rh4+TM0NLW2dvT1tjEycv0+YafAAADTElEQVR4nO2b25arIAxAuURRQPz/vz3Y2nacaYVEgz1rZb/MzNPsFQIEiEoJgiAIgiAIgiAIgiBwAVcLbAAA5ay1Liy/fQGgbBy1WfFdcldHDMLca6N/YHQfr7QC2298HlpmdhdZQejeCN2t/HCJFMR3MXoN4XSBVbentNA8VM6XlLQZWyuVjJpL2QqjRapvpxRqotQ4UrVKWaprk+hQnHE/pVILKZgQShnXwKk6mVZ6/kDBjAuTNvwLukMq5UAFZiX4uO9+DlRidnJoJa097+DBgB66HCjLKgUEJa1ZF06wJCfPmeUwU5TycsDopHqa08w4eJRZt8A582jplOFT2j8W7GAsnxN2r3vCV7HASFTSkc+JNu0057kKkKXTC77FQJz+Y6dvzHF8kbnCuD5RKrobjOeERHViLKDIezBjXRCIST5yFr+0JDd8291SrNDixHtnQEoo3pMwadU0zLetlNXAsBqRZh77XR2lJOcrxh9SaCXOw90KNqO4s2kBOfVY18sXKKU2N+SQMFLcF4cPKcTcY59zT6naW/s2N/arVN0hvaWSqnhRbK9UkVPGN399hWn/sGf6C97OQe0klWG8Sdm3sh+X9C5c1vYAU2f+BMvoy1oe7lIQovf6IZZ/+jFd3bBy05ri0I39OHZDtOFLWns2fIONc1OKcViIMU3WqavM8n8NNs63zqdthue/+y5aF1RTsxyc1PX+t87GLIsNtpFVTuk0+882W7OxQdsYwDRWCq1anrdtDJSdMT7PaPVcSxZA+tU6h9BiCRaoSBVagzWcveFAKvdglaz8cObGfILRzUrH04wC+Tnqj5U/51mfejf3wao7nuzgTgvSKnW4TIfp0Gx7b3WsLD533J5SR1r/6O+/BSlPX6vedhifA1Vq5FPSxEgxRmmBIAWcUbqBvplCNWHSwHYgkbtAMOBeq4i9V0iQbx7kB3IciG2mQTLd8fVRwveFEkGMHrmNAE/lvTDu/vsglW9W9A4QAqZqkQJyEwGJqkDRm1JI+Jr366rPRM6jqupssav8pKJ3s2mGL1RkOa3z+YhT8QUE+1XGCRRnHgytlcpdGvS2UDLF2o7aTXTEqbRCuecnrO0odrxPtjVTo2dsQRAEQRAK/AMk5ChxwTG5FAAAAABJRU5ErkJggg==" alt="" srcset="" />
      </div> :  <div className="messageTop">
        <img className='chatbox-user-img' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAACTCAMAAAC9O9snAAAAMFBMVEXk5ueutLepsLPZ3N3n6eq/xMa5vsHd4OHIzM68wcSxt7rh4+TM0NLW2dvT1tjEycv0+YafAAADTElEQVR4nO2b25arIAxAuURRQPz/vz3Y2nacaYVEgz1rZb/MzNPsFQIEiEoJgiAIgiAIgiAIgiBwAVcLbAAA5ay1Liy/fQGgbBy1WfFdcldHDMLca6N/YHQfr7QC2298HlpmdhdZQejeCN2t/HCJFMR3MXoN4XSBVbentNA8VM6XlLQZWyuVjJpL2QqjRapvpxRqotQ4UrVKWaprk+hQnHE/pVILKZgQShnXwKk6mVZ6/kDBjAuTNvwLukMq5UAFZiX4uO9+DlRidnJoJa097+DBgB66HCjLKgUEJa1ZF06wJCfPmeUwU5TycsDopHqa08w4eJRZt8A582jplOFT2j8W7GAsnxN2r3vCV7HASFTSkc+JNu0057kKkKXTC77FQJz+Y6dvzHF8kbnCuD5RKrobjOeERHViLKDIezBjXRCIST5yFr+0JDd8291SrNDixHtnQEoo3pMwadU0zLetlNXAsBqRZh77XR2lJOcrxh9SaCXOw90KNqO4s2kBOfVY18sXKKU2N+SQMFLcF4cPKcTcY59zT6naW/s2N/arVN0hvaWSqnhRbK9UkVPGN399hWn/sGf6C97OQe0klWG8Sdm3sh+X9C5c1vYAU2f+BMvoy1oe7lIQovf6IZZ/+jFd3bBy05ri0I39OHZDtOFLWns2fIONc1OKcViIMU3WqavM8n8NNs63zqdthue/+y5aF1RTsxyc1PX+t87GLIsNtpFVTuk0+882W7OxQdsYwDRWCq1anrdtDJSdMT7PaPVcSxZA+tU6h9BiCRaoSBVagzWcveFAKvdglaz8cObGfILRzUrH04wC+Tnqj5U/51mfejf3wao7nuzgTgvSKnW4TIfp0Gx7b3WsLD533J5SR1r/6O+/BSlPX6vedhifA1Vq5FPSxEgxRmmBIAWcUbqBvplCNWHSwHYgkbtAMOBeq4i9V0iQbx7kB3IciG2mQTLd8fVRwveFEkGMHrmNAE/lvTDu/vsglW9W9A4QAqZqkQJyEwGJqkDRm1JI+Jr366rPRM6jqupssav8pKJ3s2mGL1RkOa3z+YhT8QUE+1XGCRRnHgytlcpdGvS2UDLF2o7aTXTEqbRCuecnrO0odrxPtjVTo2dsQRAEQRAK/AMk5ChxwTG5FAAAAABJRU5ErkJggg==" alt="" srcset="" />
        {message.isFile ? <img className='chat-img' src={message.content} alt="" /> : <p className={msgtxtstyle}>{message.content}</p>}
      </div>}
      <div className={timetxtstyle}>
        <p>{format(message.createdAt)}</p>
      </div>
    </div>
  )
}

export default Chatbox

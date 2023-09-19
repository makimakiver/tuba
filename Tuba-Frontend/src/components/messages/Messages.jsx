import React from 'react'
import "./Messages.css"

function Messages() {
  return (
    <div className='message owner'>
        <div className="messageInfo">
            <img src="assets/person/1.jpeg" alt="" className="accountImg" />
            <span>just now</span>
        </div>
        <div className="messageContent">
            <p className='messageContentText'>hello</p>
            <img src="assets/person/3.jpeg" alt="" className='messageContentImg'/>
        </div>
    </div>
  )
}

export default Messages
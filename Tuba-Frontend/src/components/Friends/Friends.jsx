import React, { useState } from 'react'
import "./Friends.css"
import axios from 'axios'

function Friends(robot) {
  const name = robot['robot'].AIname
  return (
    <div className="chat">
        <img src="assets/person/1.jpeg" alt="" className="friendAccountImg" />
        <div className="chatCurrentMessage">
            <div className="friendInfo">
                <div className="friendName">{name}</div>
                <div className="chatDate">2023/07/22</div>
            </div>
        </div>
    </div>
  )
}

export default Friends
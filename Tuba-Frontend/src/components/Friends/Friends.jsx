import React, { useContext, useEffect, useState } from 'react'
import "./Friends.css"
import axios from 'axios'
import { getDataFromChild } from "../../pages/chat/chat"
import { AuthContext } from '../../state/AuthContext'
function Friends({robot, getDataFromChild}) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const name = robot.AIname
  const {user} = useContext(AuthContext)

  const handleClick = async (e) => {
    e.preventDefault();

    // Assuming this is the data you want to send up
    const data = [robot, user];
    // at index 0 the robot data will be displayed 

    // Update data using the callback function
    getDataFromChild(data)
  }
  const data = [robot._id, user._id]

  return (
    <div className="chat" onClick={handleClick}>
        <img src={robot.ProfilePicture? PUBLIC_FOLDER+robot.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="friendAccountImg" />
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
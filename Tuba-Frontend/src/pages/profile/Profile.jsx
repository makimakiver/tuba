import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import React, { useContext, useEffect, useState } from 'react'
import "./Profile.css"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext'
// can take parameter from its path

function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

  const [users, setUsers] = useState({}) 
  const username = useParams().username;
  const { user } = useContext(AuthContext)
  const [isOuvrir, setIsOuvrir] = useState(false);
  const toggle = () => setIsOuvrir(!isOuvrir);
 
  useEffect(() => {
    console.log("user.username; "+user.username)
    console.log("username; "+username)
    if (user.username === username){
      const fetchUsers = async () => {
        const response = await axios.get(`/users?username=${username}`)
        setUsers(response.data)
        // set user will add response data to Posts constant
      };
      fetchUsers()
    }
    else{
      const fetchUsers = async () => {
        const response = await axios.get(`/users?username=${username}`)
        setUsers(response.data)
        // set user will add response data to Posts constant
      };
      fetchUsers()  
    }
    }, [username]);
    console.log(username)
   
    return (
    <>
    <Topbar toggle={toggle}/>
    <div className="profile">
      <Sidebar isOuvrir={isOuvrir}/>
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img src={PUBLIC_FOLDER+"/post/3.jpeg"} alt="" className="profileCoverImg" />
            <img src={users.ProfilePicture? PUBLIC_FOLDER+users.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="profileUserImg" />
          </div>
          <div className="profileInfo">
            <h4 className='profileInfoName'>{username}</h4>
            <span className="profileInfoDesc">{users.Desc}</span>
          </div>
        </div>
        <div className="profileRigtBottom">
          <Timeline username={username}/>
          <Rightbar /> 
        </div>
      </div>
    </div> 
    </>
  )
}
// Put created AI
export default Profile
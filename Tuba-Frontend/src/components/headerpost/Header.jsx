import { MoreVert } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import "./Header.css"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
function Header({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    
    const [user, setUser] = useState({}) 
    console.log(post)

    useEffect(() => {
        try{
            const fetchUser = async () => {
            const response = await axios.get(`/users/${post.userId}`)
            setUser(response.data)
            // set user will add response data to Posts constant
            };
            fetchUser()
        }
        catch(err){
            console.log(err)
        }
      }, []);
      console.log(user)
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={user.ProfilePicture? PUBLIC_FOLDER+user.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="postProfileImg" />
                    <span className="postUsername">{post.username}</span>
                    <span className="postData">{format(post.createdAt)}</span>
                </div>
                <div className="postRight">
                    <MoreVert />
                </div>                
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img src={PUBLIC_FOLDER+post.img} alt="" className="postImg" />
            </div>
        </div>
    </div>
  )
}

export default Header
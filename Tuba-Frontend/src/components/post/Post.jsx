import { MoreVert } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import "./Post.css"
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({}) 

    useEffect(() => {
        const fetchUser = async () => {
          const response = await axios.get(`/users?userId=${post.userId}`)
          setUser(response.data)
          // set user will add response data to Posts constant
        };
        fetchUser()
      }, []);
    

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.ProfilePicture? PUBLIC_FOLDER+user.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="postProfileImg" />
                    </Link>
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
            <div className="postBottom">
                <div className="postBottomLeft">
                    
                </div>
            </div>
            <div className="postBottomRight">
                <Link to={`/comment/${post._id}`} style={{textDecoration: "none", color: "black"}} >
                    <span className="postCommentText">Comments</span>

                </Link>
            </div>
        </div>
    </div>
  )
}

export default Post
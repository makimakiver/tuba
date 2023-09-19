import React, { useState, useEffect, useContext } from 'react'
import "./TimeLine.css"
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';
// import { Posts } from '../../dummyData'

function Timeline({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = username ? await axios.get(`/posts/profile/timeline/${username}`) 
      :await axios.get(`/posts/timeline/${user._id}`)
      setPosts(response.data)
      // set post will add response data to Posts constant
    };
    fetchPosts()
  }, [username, user._id]);
  if(user.username === username || typeof(username)==="undefined"){
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  )}else{
    return (
      <div className="timeline">
        <div className="timelineWrapper">
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      </div>
    )
  }
}

export default Timeline
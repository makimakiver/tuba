import React, { useEffect, useState } from 'react'
import Comments from '../comments/oneComment'
import Post from '../post/Post'
import Share from '../share/Share'
import axios from 'axios';
import OnePost from '../onepost/onePost';
import "./Reaction.css"
import { useParams } from 'react-router-dom';
import Header from '../headerpost/Header';

function Reactions() {
  const postid = useParams().postId;
  const [post, setPost] = useState({})
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/posts/${postid}`)
      setPost(response.data)
      // set Comment will add response data to Posts constant
    };
    fetchPost()
  }, []);
  const [comment, setComment] = useState([]) 

    useEffect(() => {
        const fetchComment = async () => {
          const response = await axios.get(`/posts/${postid}/comment/all`)
          setComment(response.data)
          // set Comment will add response data to Posts constant
        };
        fetchComment()
      }, []);
  if(comment.length == 0){
    console.log("nullllllllll!")
    return (
      <>
      <div className="reactionComponents">
          <Header post={post} />
          <Share />
      </div>
      </>
    )
  }
  else{
    return (
      <>
      <div className="reactionComponents">
          <Header post={post}/>
          <Share />
          <Comments/>
      </div>
      </>
    )
  }
    
}

export default Reactions
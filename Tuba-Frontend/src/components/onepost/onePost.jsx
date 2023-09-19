import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Post from '../post/Post';
import Header from '../headerpost/Header';

function OnePost({ postId }) {
    const[onepost, setOnepost] = useState({});
    useEffect(() => {
        const fetchOnepost = async () => {
            const response = await axios.get(`/posts/${postId}`)
            setOnepost(response.data);
        }
        fetchOnepost();
    }, [])

  return (
    <>
     <Header post={onepost} />
    </>
  )
}

export default OnePost
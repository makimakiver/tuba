import React, { useEffect, useState } from 'react'
import "./oneComment.css"
import { Face, Gif, Image, MoreVert, Send } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { format } from 'timeago.js'
import Header from '../headerpost/Header'
import Comment from '../comment/Comment'

function Comments() {
    const postid = useParams().postId;
    const[comments, setComments] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`/posts/${postid}/comment/all`)
            setComments(response.data);
        }
        fetchComments();
    }, [])
    return(
        <>
        {comments.map((post) => (
          <Comment post={post} key={post.id} />
        ))}
        </>
    )
}

export default Comments
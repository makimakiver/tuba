import React, { useEffect, useState } from 'react'
import "./Artefacts.css"
import Post from '../post/Post'
import { Posts } from '../../dummyData'
import AI from '../chatbot/AI'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Artefacts() {
  const [chatbot, setChatbot] = useState([]);
  useEffect(() => {
    const fetchChatbot = async () => {
      const response = await axios.get(`/AI/all`) 
      setChatbot(response.data)
      // set post will add response data to Posts constant
    };
    fetchChatbot()
  }, []);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        {chatbot.map((bot) => (
          <AI bot={bot} />
        ))}
      </div>
    </div>
  )
}

export default Artefacts
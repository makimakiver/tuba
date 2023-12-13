import React, { createContext, useContext, useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./chat.css"
import Friends from '../../components/Friends/Friends'
import { AttachFile, InsertPhotoOutlined, Search, Send } from '@mui/icons-material'
import Messages from '../../components/messages/Messages'
import ChatRight from '../../components/chatRight/chatRight'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import axios from 'axios'
import { AuthContext } from '../../state/AuthContext'

const ChatContext = createContext();
function Chat() {
  const {user} = useContext(AuthContext)
  const MY_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const [typing, setTyping] = useState(false);
  const [isOuvrir, setIsOuvrir] = useState(false);
  const toggle = () => setIsOuvrir(!isOuvrir);
  const [chatbot, setChatbot] = useState([]);
  useEffect(() => {
    const fetchChatbot = async () => {
      const response = await axios.get(`/AI/all`) 
      setChatbot(response.data)
      // set post will add response data to Posts constant
    };
    fetchChatbot()
  }, []);

  const [data, setData] = useState("");
  // This function will be used to update the data state in Chat component
  const updateData = (newData) => {
    setData(newData);
    console.log(data)
  }
  const handleClick = async (e) => {
    console.log("data from chat component: ", data)
  }
  // useEffect(() => {
  //   console.log(data, "from chat")
  // }, [data])
  var hello = null
  function getDataFromChild(data) {
    var hello = data
    setVariable(data)
    console.log("data from chat component: ", data)
    console.log("HELLO = ", hello)
  }
  const [variable, setVariable] = useState([]);
  // here is the breaking point
  return (
    <>
    <Topbar toggle={toggle}/>
    <div className="chatWrapper">
      <Sidebar isOuvrir={isOuvrir}/>
      <div className="chatRoom">
      <div className="chatLeft">
          <div className="space"></div>
          <div className="chatSearchbar">
            <Search className='chatSearchIcon' />
            <input type="text" className="chatSearchInput" placeholder='search messages'/>
          </div>
          <div className="friendList" >
            {chatbot.map((bot) => (
              <Friends robot={bot} updateData={updateData} getDataFromChild={getDataFromChild} onClick={(e) =>handleClick(e)}/>  
            ))}
          </div>
        </div>
        <ChatRight selectedChatbot={variable}/>
      </div>
    </div>
    </>
  )
}

export default Chat
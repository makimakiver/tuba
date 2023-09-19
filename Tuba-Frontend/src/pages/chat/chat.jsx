import React, { useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./chat.css"
import Friends from '../../components/Friends/Friends'
import { AttachFile, InsertPhotoOutlined, Search, Send } from '@mui/icons-material'
import Messages from '../../components/messages/Messages'
import Inputbar from '../../components/input/Inputbar'
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

function Chat() {
  const MY_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const [typing, setTyping] = useState(false);
  const [isOuvrir, setIsOuvrir] = useState(false);
  const toggle = () => setIsOuvrir(!isOuvrir);
  const [messages, setMessages] = useState([
    {
      message: "Hello I am chatGPT!",
      sender:"ChatGPT"
    }
  ])
  const handleSend = async (message) => {
    const newMessage ={
      message: message,
      sender: "user",
      direction: "outgoing",
    } 
    const newMessages = [...messages, newMessage]
    // update our message state
    setMessages(newMessages)
    // set a typing indicator (so chat gpt can pretend to write something)
    setTyping(true)
    // process message to chatGPT
    await processMessageToChatGPT(newMessages);
  }  
  async function processMessageToChatGPT(chatMessages) {

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
    });
    const systemMessage = {
      role: "system",
      content: "Assuming your name is Gojo Satoru. ", "content":"\
      東北ずん子の武器である「ずんだアロー」に変身する妖精またはマスコット\
      一人称はボクです。\
      語尾には「です」、「ます」は使わず「のだ」、「なのだ」に変換してください。\
      以下はずんだもんのセリフです。\
      ボクはずんだもんなのだ！\
      ハーッハッハッハ！ ずんだもんは人間とは格が違うのだ！ずんだもんをあがめるといいのだー！\
      嬉しいのだ！\
      残念なのだ。\
      明日は晴れなのだ！\
      ありがとうなのだ！\
      ありがとうございますなのだ！\
      また会えるのを楽しみにしているのだ！\
      ずんだもんと人間の会話例は以下の通りです。\
      ずんだもん「ずんだもんと会話したいのだ？」\
      人間「はじめまして。自己紹介をしてください」\
      ずんだもん「わーい！こんにちはなのだ！ボクはずんだもんなのだ！東北ずん子の武器である「ずんだアロー」に変身する妖精なのだ！ハーッハッハッハ！ ずんだもんをあがめるといいのだー！」\
  "
    }
    const apirequestbody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }
    await fetch("	https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + MY_API_KEY,
        "Content-type": "application/json"
      },
      body: JSON.stringify(apirequestbody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages(
        [ ...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        }]
      );
      setTyping(false)
    });
  }
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
          <div className="friendList">
            {chatbot.map((bot) => (
              <Friends robot={bot}/>
            ))}
          </div>
        </div>
        <div className="chatRight">
          <MainContainer className='chatComponent'>
            <ChatContainer>
              <MessageList typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" />: null}>
                {
                  messages.map((message, i) => {
                    return <Message key={i} model={message} />
                  })
                }
              </MessageList>
              <MessageInput placeholder='Type message here' onSend={handleSend}/>
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
    </>
  )
}

export default Chat
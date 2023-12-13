import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./chatRight.css"
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

function ChatRight({selectedChatbot}) {
  const {user} = useContext(AuthContext)
  const [messages, setMessages] = useState([])
  useEffect(() => {
    console.log("changed from now: ", selectedChatbot)
    if (!(selectedChatbot.length === 0)) {
      try {
        const fetchHistory = async () => {

          const userId = selectedChatbot[1]._id
          const AIID = selectedChatbot[0]._id  
          const response = await axios.get(`/chat?userId=${userId}&AIID=${AIID}`);
          
          var conta = []
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].userId === response.data[i].sender){
              const newMessage = {
                message: response.data[i].message,
                sender: "user",
                direction: "outgoing"
              }
              conta.push(newMessage)
              console.log("hello, ", newMessage)
              // setMessages(prevState => [prevState].push(newMessage))
              console.log("from fetchHis: ", messages)
          }else if (!(response.data[i].userId === response.data[i].sender)){
            console.log("else condition is called")
            const newMessage = {
              message: response.data[i].message,
              sender: "ChatGPT"
            }
            conta.push(newMessage)
            // setMessages(prevState => [prevState, newMessage])
          }
        }
        console.log("conta value: ", conta)
        setMessages(conta)
          
        };
  
        fetchHistory();
      } catch (err) {
        console.log("Error fetching chat history: ", err);
      }
    }
  }, [selectedChatbot]);
    
    const MY_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const [typing, setTyping] = useState(false);
    const handleSend = async (message) => {
        
        const pos = "user"
        const userId = user._id
        const sender = user._id
        const AIID = selectedChatbot[0]._id        
        const response = await axios.post(`/chat?userId=${userId}&AIID=${AIID}&sender=${sender}&pos=${pos}&message=${message}`);
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
          content: "Assuming your name is Gojo Satoru. ", "content": selectedChatbot[0].systemPrompt
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
          const message = data.choices[0].message.content
          console.log("from message: ",message)
          const pos = "machine"
          const userId = user._id
          const AIID = selectedChatbot[0]._id        
          const sender = AIID
          const response = axios.post(`/chat?userId=${userId}&AIID=${AIID}&sender=${sender}&pos=${pos}&message=${message}`);
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
          console.log("hello activated now")
          const response = await axios.get(`/AI/all`) 
          setChatbot(response.data)
          // set post will add response data to Posts constant
        };
        fetchChatbot()
      }, [selectedChatbot]);
  return (
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
  )
}

export default ChatRight
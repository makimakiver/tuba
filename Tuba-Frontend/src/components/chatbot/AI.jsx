import React, { useEffect, useState } from 'react'
import "./AI.css"
import { BsChevronDown, } from 'react-icons/bs';
import { MoreVert } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function AI({bot}) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const [parent, setParent] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        try{
            const fetchParent = async () => {
            const response = await axios.get(`/AI/${bot._id}/parent`)
            setParent(response.data)
            // set Parent will add response data to Posts constant
            };
            fetchParent()
        }
        catch(err){
            console.log(err)
        }
      }, [bot._id]);
      useEffect(() => {
        if(Object.keys(parent).length > 0){
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`/users/${parent[0].users[0]}`);
                    setUser(response.data);
                } catch(err) {
                    console.log(err);
                }
            };
            fetchUser();
        }
        }, [parent]);

  return (
    <div className="chatbot">
        <div className="chatbotWrapper">
            <div className="chatbotCard">
                <div className="chatbotTop">
                    <Link to={`/aiaccount/${(bot.AIname)}`}  style={{textDecoration: "none", color: "black", textAlign: "center"}}>
                        <div className="chatbotName">
                            {bot.AIname}
                        </div>
                    </Link>
                    <MoreVert className='chatbotDetail'/>
                </div>  
                <img src={bot.ProfilePicture? PUBLIC_FOLDER+bot.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"}  alt="" className='chatbotImg' />
                <div className="chatbotMiddle">        
                    <div className="chatbotDescIntro">
                        <div className='In'>Description</div>
                        <div className="chatbotDesc">{bot.Desc}</div>
                        <BsChevronDown className='chatbotDescIcon'/>
                    </div>
                </div>    
            </div>
            <div className="chatbotBottom">
                <div className="chatbotProducer">
                    <div className="chatbotUsername">Parent:  </div>
                    <img src={user.ProfilePicture? PUBLIC_FOLDER+user.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="chatbotProfileImg"/>
                    <div className="chatbotCreator">{user.username}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AI
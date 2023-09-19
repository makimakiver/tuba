import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import React, { useEffect, useState } from 'react'
import "./AIaccount.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function AIaccount() {
  const [isOuvrir, setIsOuvrir] = useState(false);
  const toggle = () => setIsOuvrir(!isOuvrir);
  console.log(isOuvrir);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const ainame = useParams().ainame;
  console.log(ainame)
  const [chatbot, setChatbot] = useState([]);
  useEffect(() => {
    const fetchChatbot = async () => {
      const response = await axios.get(`/AI?AIname=${ainame}`) 
      setChatbot(response.data)
      // set post will add response data to Posts constant
    };
    fetchChatbot()
  }, []);
  const [parent, setParent] = useState([]);
  const [user, setUser] = useState({});
    useEffect(() => {
        try{
            const fetchParent = async () => {
            const response = await axios.get(`/AI/${chatbot._id}/parent`)
            setParent(response.data)
            // set Parent will add response data to Posts constant
            };
            fetchParent()
        }
        catch(err){
            console.log(err)
        }
      }, [chatbot._id]);
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
    <>
    <Topbar toggle={toggle}/>
    <div className="aiprofile">
      <Sidebar isOuvrir={isOuvrir}/>
      <div className="aiprofileRight">
        <div className="aiprofileRightTop">
          <div className="aiprofileCover">
            <img src={PUBLIC_FOLDER+"/post/3.jpeg"} alt="" className="aiprofileCoverImg" />
            <img src={chatbot.ProfilePicture? PUBLIC_FOLDER+chatbot.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="aiprofileUserImg" />
          </div>
          <div className="aiprofileInfo">
            <span className='aiprofileInfoName'>{chatbot.AIname}</span>
            <span className="aiprofileInfoDesc">Description: {chatbot.Desc}</span>
            <hr />
            <div className="aiParentInfo">
              <div className="aiParentAccountIntro">created by </div>
                <img src={PUBLIC_FOLDER+"/person/1.jpeg"} alt="" className="aiParentAccountImg" />
              <Link  to={`/profile/${user.username}`}  style={{textDecoration: "none", color: "black"}}> 
                <div className="aiParentAccountUsername">{user.username}</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="aiprofileRigtBottom">
          <Timeline />
          <Rightbar /> 
        </div>
      </div>
    </div> 
    </>
  )
}
// Put parents
export default AIaccount
import React, { useContext, useRef, useState } from 'react'
import './Edition.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext'
function Edition() {
    const { user } = useContext(AuthContext)
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const username = useRef();
    const desc = useRef();
    const navigate = useNavigate();
    const this_user = useParams().username;
    const identified = JSON.parse(localStorage.getItem("user"))
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(desc.current.value)
        try{
            const currentUser = {
            userId: user._id,
            username: username.current.value,
            Desc: desc.current.value
            };
            
            localStorage.setItem("user", currentUser)
            await axios.put(`/users/${user._id}`, currentUser);
            navigate("/");
        }catch(err){
            console.log(err);
        }

      }
    const [isOuvrir, setIsOuvrir] = useState(false);
    const toggle = () => setIsOuvrir(!isOuvrir);
    console.log(isOuvrir);
    
  return (
    <>
    <Topbar toggle={toggle}/>
        <div className="editionRight">
            <Sidebar isOuvrir={isOuvrir}/>
            <div className="editionRiRight">
                <div className="editionRightTop">
                    <div className="explanation">
                        you can change these pictures by clicking these pictures
                    </div>
                    <form className="editionInfo" onSubmit={(e) => handleSubmit(e)}>
                        <div className="edit">
                            <div className="editOrder">Cover picture: </div>
                            <img src="assets/post/3.jpeg" alt="" className="editionCoverImg" />
                        </div>
                        <div className="edit">
                            <div className="editOrder">Icon image: </div>
                            <img src={this_user.ProfilePicture? PUBLIC_FOLDER+this_user.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"}  alt="" className="editionImg" />
                        </div>
                        <div className="edit">
                            <div className="editOrder">Username: </div>
                            <input type="text" placeholder="shincode" className="editUsername" ref={username}/>
                        </div>
                        <div className="edit">
                            <div className="editOrder">Description: </div>
                            <textarea rows="10" placeholder="shincode" className="editdesc" name="text" ref={desc}/>
                        </div>
                        <div className="edit">
                            <div className="editOrder">Private: </div>
                            <input type="checkbox" className="editprivate" />
                        </div>
                        <button className='editExecute' type='submit'>Sign up</button>
                    </form>
                </div>
                <Rightbar /> 
            </div>
        </div>
    </>
  )
}


export default Edition;
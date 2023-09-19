import React, { useContext, useEffect, useRef, useState } from 'react'
import './Creationism.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext'
function Creationism() {
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const username = useRef();
  const desc = useRef();
  const sysprompt = useRef();
  const [isOuvrir, setIsOuvrir] = useState(false);
  const toggle = () => setIsOuvrir(!isOuvrir);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(image)
      console.log(AI)
      const data = new FormData();
      const imageName = Date.now() + image.name;
      data.append("name", imageName)
      data.append("image", image);
      console.log(imageName)
      const AI = {
        ProfilePicture: image,
        userId: user._id,
        AIname: username.current.value,
        Desc: desc.current.value,
        systemPrompt: sysprompt.current.value,
        ProfilePicture: imageName,
      };
      try{
          await axios.post("/upload", data)
      }catch(err){
          console.log(err)
      }
      try {
        await axios.post("/AI/creation", AI);
        window.location.reload();
        navigate("/museums");
      }catch(err){
        console.log(err);
      }}catch(err){
        console.log(err)
      }}
    const inputRef = useRef("null");
    const [image, setImage] = useState(null)
    const handleImgClick = () => {
      inputRef.current.click();
    };
    const handleImgchange = (event) => {
      const file = event.target.files[0];
      console.log(file);
      setImage(file)
    }    
  return (
    <>
    <Topbar toggle={toggle}/>
        <div className="creationismRight">
            <Sidebar isOuvrir={isOuvrir}/>
            <div className="creationismRiRight">
                <div className="creationismRightTop">
                    <div className="explanation">
                        you can change these pictures by clicking these pictures
                    </div>
                    <form className="creationismInfo" onSubmit={(e) => handleSubmit(e)}>
                        <div className="creation">
                            <div className="creationOrder">Cover picture: </div>
                            <img src="assets/post/3.jpeg" alt="" className="creationismCoverImg" />
                        </div>
                        <div className="creation" onClick={handleImgClick}>
                            <div className="creationOrder">Icon image: </div>
                            {image ? (<img src={URL.createObjectURL(image)}  alt="" className="creationismImg" />):(<img src={PUBLIC_FOLDER+"/person/noAvatar.png"}  alt="" className="creationismImg" />)} 
                            <input type="file" ref={inputRef} style={{display:"none"}} onChange={handleImgchange}/>
                        </div>
                        <div className="creation">
                            <div className="creationOrder">AI name: </div>
                            <input type="text" placeholder="put your AI name" className="creationUsername" ref={username}/>
                        </div>
                        <div className="creation">
                            <div className="creationOrder">Description: </div>
                            <textarea rows="10" placeholder="description of your AI" className="creationdesc" name="text" ref={desc}/>
                        </div>
                        <div className="creation">
                            <div className="creationOrder">System Prompt: </div>
                            <textarea rows="20" placeholder="system prompt" className="creationdesc" name="text" ref={sysprompt}/>
                        </div>
                        <div className="creation">
                            <div className="creationOrder">Private: </div>
                            <input type="checkbox" className="creationprivate" />
                        </div>
                        <button className='creationExecute' type='submit'>Sign up</button>
                    </form>
                </div>
                <Rightbar /> 
            </div>
        </div>
    </>
  )
}
export default Creationism;
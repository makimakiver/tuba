import React, { useContext, useRef, useState } from 'react'
import "./Share.css"
import { Face, Gif, Image, Send } from '@mui/icons-material'
import { AuthContext } from '../../state/AuthContext'
import axios from 'axios'

function Share() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useContext(AuthContext)
    const desc = useRef();
    const [file, setFile] = useState(null);
    console.log(file)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            userId: user._id,
            desc: desc.current.value,
        };   
        console.log(newPost)     
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName)
            data.append("file", file);
            newPost.img = fileName;
            try{
                await axios.post("/upload", data)
            }catch(err){
                console.log(err)
            }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    }
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.ProfilePicture? PUBLIC_FOLDER+user.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="shareProfileImg" />
                <input type="text" className='shareInput' placeholder='say something' ref={desc}/>
            </div>
            <hr className="shareHr" />
            <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
                <div className="shareOptions">
                    <label className="shareOption" htmlFor='file'>
                        <Image className='shareIcons'/>
                        <span className="shareOptionText">photos</span>
                        <input type="file" id='file' accept='.png, .jpeg, .jpg' style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Gif className='shareIcons'/>
                        <span className="shareOptionText">photos</span>
                    </div>
                    <div className="shareOption">
                        <Face className='shareIcons'/>
                        <span className="shareOptionText">impressions</span>
                    </div>            
                </div>
                <button className='shareButton' type='submit'>
                    <Send className="sharepostIcon"/>
                    <span className="shareButtonText">post</span>
                </button>
            </form>
        </div>
    </div>
  )
}
// AutoRename tag

export default Share
import React from 'react'
import "./Inputbar.css"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Send } from '@mui/icons-material';
function Inputbar() {
  return (
    <div className='inputbar'>
        <input type="text" placeholder='Type something...' className="inputbarText" />
        <div className="chatSend">
            <InsertPhotoIcon className='chatIcons'/>
            <AttachFileIcon className='chatIcons'/>
        </div>
        <button className='chatSendButton'>
            <Send className="chatSentIcon"/>
            <span className="chatSentButtonText">send</span>
        </button>
    </div>

  )
}

export default Inputbar


























































import React, { useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/TimeLine'
import Rightbar from '../../components/rightbar/Rightbar'
import Comments from '../../components/comments/oneComment'
import Reactions from '../../components/reactions/Reactions'

function Comment() {
  const [isOuvrir, setIsOuvrir] = useState(false);
  const toggle = () => setIsOuvrir(!isOuvrir);
  console.log(isOuvrir);
  return (
    <>
    <Topbar toggle={toggle}/>
    <div className="homeContainer">
      <Sidebar isOuvrir={isOuvrir}/>
      <Reactions />
      <Rightbar /> 
    </div> 
    </>
  )
}

export default Comment
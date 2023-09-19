import React, { useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/TimeLine'
import Trendbar from "../../components/trendbar/Trend"
import Artefacts from '../../components/museums/Artefacts'
import { Link } from 'react-router-dom'
import "./aicreative.css"

function AIcreative() {
  const [isOuvrir, setIsOuvrir] = useState(false);
  const toggle = () => setIsOuvrir(!isOuvrir);
  return (
    <>
    <Topbar toggle={toggle}/>
    <div className="homeContainer">
      <Sidebar isOuvrir={isOuvrir}/>
      <Artefacts />
      <div className="creativeRight">
        <Trendbar/> 
        <Link to="/aicreationism">
          <button className='aibox'>generate your original AI?</button>
        </Link>
      </div>
    </div> 
    </>
  )
}

export default AIcreative
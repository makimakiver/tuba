import React from 'react'
import "./ranker.css"
import { Tag } from '@mui/icons-material'

function Ranker({ranker}) {
  console.log("from ranker.jsx: ", ranker)
  if (ranker){
  return (
        <div className="rankerWrapper">
            <div className="rankerRanking">1 :</div>
            <div className="rankerName">
                <Tag className='hashtag'></Tag>
                <p1 className="rankerTitle">{ranker.AIname}</p1>
            </div>
        </div>
  )} else {
    return (
      <div className="rankerWrapper">
          <div className="rankerRanking">1 :</div>
          <div className="rankerName">
              <Tag className='hashtag'></Tag>
              <div className="rankerTitle">son</div>
          </div>
      </div>
)    
  }
}

export default Ranker
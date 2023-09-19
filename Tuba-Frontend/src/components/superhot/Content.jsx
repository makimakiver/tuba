import React from 'react'
import "./Content.css"
import { Tag } from '@mui/icons-material'

function Content() {
  return (
    <div className='content'>
        <div className="contentWrapper">
            <div className="contentRanking">1 :</div>
            <div className="contentName">
                <Tag className='hashtag'></Tag>
                <p1 className="contentTitle">something</p1>
            </div>
        </div>
    </div>
  )
}

export default Content
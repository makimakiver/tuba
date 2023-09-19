import React from 'react'
import "./Trend.css"
import { Tag, Whatshot } from '@mui/icons-material'
import Content from '../superhot/Content'

function Trendbar() {
  return (
    <div className='trendbar'>
      <div className="trendIntroduction">
        <div className='trendTop'>
          <div className='trendTitle'>Hottest Content</div>
          <Whatshot className='trendIcon'/>
        </div>
        <div className='trendComponents'>
          <div className='trendComponent'>
            <Content />
            <Content />
            <Content />
          </div>
        </div>
       </div>
    </div>
  )
}

export default Trendbar
import { Search } from '@mui/icons-material'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './trending.css'
import React, { useEffect, useState } from 'react'
import Content from '../../components/superhot/Content'
import Ranker from '../../components/RankingComponent/ranker'
import axios from 'axios'

function Trending() {
    const [isOuvrir, setIsOuvrir] = useState(false);
    const [ranking, setRanking] = useState([])
    const [daily, setDaily] = useState([])
    const [weekly, setWeekly] = useState([])
    // sorting objects by the number of the count in over all
    useEffect (()=> {
      const operation = async () => {
        const response = await axios.get("/AI/all")
        const list = response.data.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
        console.log(list)
        setRanking(list)
      }
      operation()
    }, [])
    async function secondly () {
      const response = await axios.get("/AI/all")
      const list = response.data.sort((a, b) => parseFloat(b.count-b.prevCount) - parseFloat(a.count-a.prevCount));
      console.log("from list: ", list)
      setDaily(list)
    }
    const interval = 30000
    setInterval(secondly, interval);
    // sorting the number by difference
    const toggle = () => setIsOuvrir(!isOuvrir);
    
  return (
    <>
    <Topbar toggle={toggle}/>
    <div className="trendWrapper">
      <Sidebar isOuvrir={isOuvrir}/>
      {/* listing all of the AI chat bots from the a chat bot with greatest value*/}
      <div className="trendRight">
        <div className="trendList">
            <div className="trendTitle"> overall ranker </div>
            {ranking.map((post) => (
              <Ranker ranker={post} />
            ))}
        </div>
        <div className="trendList">
            <div className="trendTitle"> weekly ranker </div>
            <Ranker/>
            <Ranker/>
            <Ranker/>
            <Ranker/>
            <Ranker/>
            <Ranker/>
        </div>
        <div className="trendList">
            <div className="trendTitle"> daily ranker </div>
            {daily.map((post) => (
              <Ranker ranker={post} />
            ))}            
        </div>
      </div>
    </div>
    </>
  )
}

export default Trending
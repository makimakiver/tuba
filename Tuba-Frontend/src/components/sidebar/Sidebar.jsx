import { AccountBox, ChatBubbleRounded, GroupRounded, Home, Settings, SmartToy, TrendingUp } from '@mui/icons-material'
// import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav'
// import "@trendmicro/react-sidenav.css"
import "./Sidebar.css"
import 'remixicon/fonts/remixicon.css'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext'
import {isOpen} from "/Users/yutak/EPQ-Project-Tuba/Tuba-Frontend/src/pages/home/home"



function Sidebar({isOuvrir}) {
  console.log(isOuvrir)
  const [isOpen, setIsOpen] = useState(false);  
  const toggle = () => setIsOpen (!isOuvrir);
  const {user} = useContext(AuthContext);
  
  const menuItem = [
    {
        title: "AIconversation",
        icon: <SmartToy />,
        link: "/museums"
    },
    {
        title: "Chat",
        icon: <ChatBubbleRounded />,
        link: "/chat"
    },
    {
        title: "Home",
        icon: <Home />,
        link: "/"
    },
    {
        title: "Settings",
        icon: <Settings />,
        link: "/setting"
    },
    {
        title: "Profile",
        icon: <AccountBox />,
        link: `/profile/${user.username}`
    },
    {
        title: "Teams",
        icon: <GroupRounded />,
        link: "/"
    },
    {
        title: "Trends",
        icon: <TrendingUp />,
        link: "/"
    },
  ]

  return (
    <div style={{width: isOuvrir ? "100%": "50px"}} className={`Sidebar ${isOuvrir ? 'open': ''}`}>
      <div className="sidebarWrapper">
          {
            menuItem.map((item, index) =>(
              <Link to={item.link} key={index} className="sidebar" activeclassname="active"  style={{ textDecoration: "none", outline: "none"}}>
                <div className="icon">{item.icon}</div>
                <div className="title" >{item.title}</div>
              </Link>
            ))
          }
        </div>  
      </div>  
  )
}

export default Sidebar;
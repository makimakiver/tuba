import { Search, Notifications, Chat } from '@mui/icons-material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Topbar.css"
import { Link, useParams } from 'react-router-dom'
import {AuthContext} from "../../state/AuthContext"
import 'remixicon/fonts/remixicon.css'
import { CiMenuBurger, IconName } from "react-icons/ci";
import  {toggle} from "../sidebar/Sidebar"
import axios from 'axios'

function Topbar({toggle}) {
    const path = window.location.pathname
    const SearchTerm = useRef();
    const [users, setUsers] = useState([])
    const [value, setValue] = useState('');
    console.log(value)
    useEffect(() => {
        console.log("test1, path identification: ", path);      
        const fetchUser = async () => {
          let response;
          if (path === "/museums") {
            response = await axios.get(`/AI/all`);
        } else {
              response = await axios.get(`/users/all/all`);
          }
          setUsers(response.data);
        };
      
        fetchUser();
      }, [value, path]);  // Dependency array
      
         // in order to add functionality where user can search the name of the user and IA
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const {user} = useContext(AuthContext)
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
            <div className="toolbar" onClick={toggle}>
                <div class="topbarBurger">
                    <CiMenuBurger className='topbarLove'/>                    
                </div>
            </div>
            <div className='logo'>Tuba</div>
        </div>
        <div className="topbarCenter">
            <div className="searchBar">
                <div classname="searchInner">
                    <Search className='searchIcon' />
                    <input type="text" className="searchInput" placeholder='search on tuba' value={value} onChange={onChange} ref={SearchTerm}>
                    </input>
                    {/* <button onClick={()=>onSearch(value)} className='searchButton'>search</button> */}
                </div>
                <div className="dropdown">
                    {users.filter(item => {
                        if(path === "/museums"){
                            const sTerm = value.toLowerCase();
                            const fullName = item.AIname.toLowerCase();
                            return sTerm && fullName.startsWith(sTerm);
                        } else {
                        const sTerm = value.toLowerCase();
                        const fullName = item.username.toLowerCase();
                        return sTerm && fullName.startsWith(sTerm);
                    }})
                    .map((item) => (
                        <Link  to={path === "/museums" ? `/AIaccount/${item.AIname}`: `/profile/${item.username}`}  style={{textDecoration: "none", color: "black"}}>
                            <div className="dropdown-row" key={item.username}>
                                <img src={item.ProfilePicture? PUBLIC_FOLDER+item.ProfilePicture :PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="searchedUserImg" />
                                <span>{path === "/museums" ? item.AIname : item.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarItemIcons">
                <div className="topbarIconItem">
                    < Notifications className='iconItem'/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat className='iconItem'/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <Link to={`/profile/${user.username}`}>
                <img src={user.ProfilePicture ? PUBLIC_FOLDER+user.ProfilePicture: PUBLIC_FOLDER+"/person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Topbar
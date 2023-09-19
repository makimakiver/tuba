import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./setting.css"
import Rightbar from '../../components/rightbar/Rightbar'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios'
import { AuthContext } from '../../state/AuthContext'


function Setting() {
  const { user } = useContext(AuthContext);
  const username = user.username;
  const navigate = useNavigate();
  console.log(user._id)
  const [isOuvrir, setIsOuvrir] = useState(false);
  const toggle = () => setIsOuvrir(!isOuvrir);
  console.log(isOuvrir);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (password.current.value !== confirmation.current.value) {
    //   confirmation.current.setCustomValidity("password is wrong")
    // }else{
      try{
        await axios.delete(`/users/${user._id}`);
        localStorage.removeItem("user")
        navigate("/register");
        window.location.reload();
      }catch(err){
        console.log(err);
      }
    // }
  }
  return (
    <>
    <Topbar toggle={toggle}/>
    <div className="settingWrapper">
      <Sidebar isOuvrir={isOuvrir}/>
      <div className="settingRight">
        <div className="settingOptions">
          <div className="settingTop">
            <Link to={`/edit/${user.username}`}  style={{textDecoration: "none", color: "black"}}>
              <div className="settingOption">
                <div className="settingAccountText"> Edit your account</div>
              </div>
            </Link>
              <button className="settingOption" onClick={(e) => handleSubmit(e)}>
                <div className="settingAccountText"> Delete your account</div>
                <AiFillDelete className='settingAccountImg'/>
              </button>
          </div>
          <div className="settingBottom">
            <Link to="/register"  style={{textDecoration: "none", color: "black"}}>
              <div className="settingOption">
                <div className="settingAccountText"> Add another account</div>
              </div>
            </Link>
            <Link to="/login"  style={{textDecoration: "none", color: "black"}}>
              <div className="settingOption">
                <div className="settingAccountText"> Log out from your account</div>
                <IoIosLogOut className='settingAccountImg'/>
              </div>
            </Link>
          </div>
        </div>
      </div>      
      <Rightbar />
    </div>
    </>
  )
}

export default Setting
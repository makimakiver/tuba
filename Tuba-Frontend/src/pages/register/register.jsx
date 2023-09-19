import React, { useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import "./register.css"
import { signInWithPopup } from 'firebase/auth';
import { provider, auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const confirmation = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmation.current.value) {
      confirmation.current.setCustomValidity("password is wrong")
    }else{
      try{
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        await axios.post("/auth/register", user);
        navigate(`/verification/${email.current.value}`);
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <div className='register'>
      <div className="registerWrapper">
        <div className="registerLeft">
          <div className='registerLogo'>
            Tuba
          </div>
          <form className="registerBox" onSubmit={(e) => handleSubmit(e)}>
            <div className="registerMsg">create your account</div>
            <input type="email" className='registerInput' placeholder='Email' required ref={email}/>
            <input type="username" className='registerInput' placeholder='Username' required ref={username}/>
            <input type="password" className='registerInput' placeholder='Password' required minLength={6} ref={password}/>
            <input type="password" className='registerInput' placeholder='Confirmation' required ref={confirmation}/>
            <button className='registerButton' type='submit'>Sign up</button>
            <hr class="hr-text" data-content="If you do not have an account"/>
            <Link to="/login"  style={{textDecoration: "none", color: "black"}}>
              <button className="registerRegisterButton" >Login to your Account</button>
            </Link>
            {/* {user ? (
              <>
              <UserInfo />
              <SignOutButton />
              </>
            ):(
              <SignInButton />
            )} */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

function SignInButton() {
  const signInWithGoogle = () => {
      signInWithPopup(auth, provider)
  };
  return (
      <button onClick={ signInWithGoogle }>Login with Google</button>
  )
}

function SignOutButton() {
  
  return (
      <button onClick={() => auth.signOut()}>
        signOut
      </button>
  )
}

function UserInfo(){
  return (
      <div className='userInfo'>
        <img src={auth.currentUser.photoURL} alt="" />
        <p>{auth.currentUser.displayName}</p>
      
      </div>
  )
}
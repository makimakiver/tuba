import React, { useContext, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import "./login.css"
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { provider, auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';
function Login() {
  const navigate = useNavigate();
  const password = useRef();
  const email = useRef();
  const { user, isFetchng, error, dispatch } = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({
      email: email.current.value,
      password: password.current.value,
    },
    dispatch
    );
  }
  navigate(`/verification/${email.current.value}`);


  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginleft">
          <h1 className='loginTitle'>Tuba</h1>
          <p className="to-connect"> to connect</p>
        </div>
        <div className="loginRight" onSubmit={(e) => handleSubmit(e)}>
          <form className="loginBox">
            <p className="loginMsg">login from here</p>
            <input type="email" className='loginInput' placeholder='Email' required ref={email}/>
            <input type="password" className='loginInput' placeholder='password' required minLength={8} ref={password}/>
            <button className='loginButton' >login</button>
            <span className="loginEorgot">did you forget your password?</span>
            <Link to="/register"  style={{textDecoration: "none", color: "black"}}> 
              <button className="loginRegisterButton">create an Account</button>
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

export default Login

// function SignInButton() {
//   const signInWithGoogle = () => {
//       signInWithPopup(auth, provider)
//   };
//   return (
//       <button onClick={ signInWithGoogle }>Login with Google</button>
//   )
// }

// function SignOutButton() {
  
//   return (
//       <button onClick={() => auth.signOut()}>
//         signOut
//       </button>
//   )
// }

// function UserInfo(){
//   return (
//       <div className='userInfo'>
//         <img src={auth.currentUser.photoURL} alt="" />
//         <p>{auth.currentUser.displayName}</p>
      
//       </div>
//   )
// }
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import AIcreative from "./pages/aicreative/aicreative"
import Profile from "./pages/profile/Profile";
import AIaccount from "./pages/aiaccount/AIaccount";
import { BrowserRouter,  Navigate,  Route,  Routes } from "react-router-dom";
import Chat from "./pages/chat/chat";
import Setting from "./pages/setting/setting";
import Edition from "./pages/accountchange/Edition";
import Comment from "./pages/commments/Comment";
import { AuthContext } from "./state/AuthContext";
import { useContext, useEffect, useState, CSSProperties} from "react";
import PuffLoader from "react-spinners/ClipLoader";
import "./App.css"
import Creationism from "./pages/createAI/Creationism";
import OneTimePad from "./pages/one-time-pad-key/otp";
import Trending from "./pages/Trending/trending"

function App() {
  const override: CSSProperties = {
    borderColor: "red",

  };
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 30)
  }, [])
  return (
    <div className="App">
    {
      loading ?
      <div className="loader">
        <PuffLoader
        cssOverride={override}
        color="black"
        speedMultiplier={1.2}
        size={200}
        />
        <div className="loading">Now, It is loading ...</div>
      </div>
    : 
     <BrowserRouter>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={user ? <Home/>: <Register />} />
              <Route path="/museums" element={<AIcreative />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/aiaccount/:ainame" element={<AIaccount />} />
              <Route path="/setting" element={user ? <Setting/> : <Navigate to="/register" />}/>
              <Route path="/chat" element={<Chat/>}/>
              <Route path="/aicreationism" element={<Creationism/>}/>
              <Route path="/edit/:username" element={<Edition/>}/>
              <Route path="/comment/:postId" element={<Comment/>}/>
              <Route path="/trending" element={<Trending/>}/>
              <Route path="/verification/:email" element={user ? <Home/> : <OneTimePad/>} />
            </Routes>
      </BrowserRouter>
      
    } 
    </div>
    
    
  );
  
}

export default App;
  


// put them in one folder name pages.
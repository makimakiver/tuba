import React, { useContext, useEffect, useState } from 'react';
import "./otp.css"
import SecurityIcon from '@mui/icons-material/Security';
import axios from 'axios'
import { Security } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { verifyCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';

function OneTimePad() {
  const { user, isFetchng, error, dispatch } = useContext(AuthContext)
  const [showAlert, setShowAlert] = useState(false)
  const useremail = useParams().email;
  const [id, setId] = useState("");
  useEffect(() => {
    const sendPost = async () => {      
      const user = {
        email: useremail
      };      
      setId(await axios.post(`/otp/send`, user))
    }; sendPost()
    }, [useremail]);
  const [input, setInput] = useState(['', '', '', '', '', '']);
  const handleInputChange = (e, index) => {
    let value = e.target.value;
    if (/[^0-9]/.test(value)) {
      return;
    }
    input[index] = value;
    if (index < input.length - 1 && value !== '') {
      document.getElementById(`box${index + 2}`).focus();
    }
    setInput([...input]);
  }
  const [verified, setVerified] = useState();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(id.data)
    const inputValue = input.join('');
    console.log("input value: ", inputValue)
    if(inputValue.length === 6) {
      const key = {
        otp: inputValue,
      }
      console.log("the email data", useremail)
      verifyCall(
        id.data,
        {
          otp: inputValue,
        },
        useremail,
        dispatch
      );
      console.log(user);
      // }else{
      //   setTimeout(() => {
      //     setShowAlert(true)
      //   }, 2000);
      
    } else {
    }
  };
  return (
    <div className="box-container">
      {showAlert &&      
        <Alert severity="error">This is an error alert — check it out!</Alert>}
      <div className='boxotpcontainer'>
      <div className="otpTitle"> Tuba </div>
      <div className="otpTitle"> Enter OTP: </div>
      <div className="Icon">
        <Security className="otpIcon"/>
      </div>
      <div className="boxcontainer">
        <div className="box">
          {input.map((_, index) => (
            <input
              type="text"
              maxLength="1"
              className="input-box"
              key={index}
              id={`box${index + 1}`}
              value={input[index]}
              onChange={(e) => handleInputChange(e, index)}
            />
          ))}
        </div>
      </div>
      <div className='verifiedButton'>
        <button onClick={handleSubmit} className="ButtonTo">Submit</button>
      </div>
      </div>
    </div>
  );
};

export default OneTimePad
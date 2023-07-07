import React from 'react'
import "./Auth.css";
import { useState } from 'react';
import icon from "../../assets/icon.png";
// import Button from '../../components/Button/Button';
import AboutAuth from './AboutAuth';
import { signup, login } from "../../actions/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignup,setisSignup]=useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSwitch= ()=>{
    setisSignup(!isSignup);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();  //  need not to  be pass any new thing in the url
    if(!email && !password){
      alert("Enter email and password")
    }
    if(isSignup){
      if(!name){
        alert("Enter a name to continue");
      }
      dispatch(signup({name,email,password},navigate))
    }
    else{
      dispatch(login({email,password},navigate))
    }
    console.log({name,email,password});
    }
  return (
    <div>
      <section className='auth-section'>
        {isSignup && <AboutAuth/>}
        <div className="auth-container-2">
         {!isSignup && <img src={icon} alt="stack-overflow" className='login-logo' />}
         
         <form onSubmit={handleSubmit}>
          {isSignup && 
                <label htmlFor="name">
                <h4>Display Name</h4>
                <input type="text" name="name" id="name" onChange={(e)=>{setName(e.target.value)}}/>

                  </label>
          }
          <label htmlFor="email">
                <h4>Email</h4>
                <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>

          </label>

          <label htmlFor="password">
            <div style={{display:"flex", justifyContent:"space-between"}}>
                 <h4>Password</h4>
                {!isSignup && <p style={{color:"#007ac6",fontSize:"13px"}}>forget password?</p>}
            </div>
               
                <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                {isSignup && <p style={{color:"#666767", fontSize:"13px"}}>passwords must contain at least eight<br>
                      </br> characters including at least 1 letter and 1 <br/>
                          number
                 </p>}

          </label>
          {
            isSignup && (
              <label htmlFor='check'>
                  <input type="checkbox" id='check'/>
                  <div style={{ fontSize:"13px"}}> 
                       Opt-in to receive occasional<br/>
                      product updates, user research invitations,<br/>
                        company announcements, and digests.
                   </div>
              </label>
            )
          }

          <button type="submit" className='auth-btn'>{isSignup ? "signup" : 'Login'}</button>

              {
                isSignup && (
                  <p style={{color:"#666767", fontSize:"13px"}}>By clicking "Sign up", you agree to our
                      <span style={{color:"#007ac6"}}> terms of <br/> service</span>, 
                      <span style={{color:"#007ac6"}}> privacy policy</span> and 
                      <span style={{color:"#007ac6"}}> cookie policy</span> 
                  </p>
                )
              }
         </form>
         <p>
          {isSignup ? "Already have an account?":"Don't have an account "}
          <button type="button" className='handle-switch-btn' onClick={handleSwitch}>{isSignup ?"Log in": "Sign up"}</button>
          {/* handleswitch is for the function been called above  */}
         </p>
        </div>
      </section>
      
    </div>
  )
}

export default Auth

import React from 'react'
import { useState } from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { useNavigate } from 'react-router-dom';
import './Auth.css'
import {signin,signup} from '../../actions/auth'
import { useDispatch } from 'react-redux';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const handleChange = (e) => {
    // console.log('hiiii i m in');
    // console.log(e.target.name,e.target.value);
    // console.log(form)
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  }
  const switchMode = () => {
    setForm(initialState);
    setIsSignup(!isSignup);
  }
  const backtohome=()=>{
    navigate("/")
  }
  const googleSuccess=async (res)=>{
    console.log(res)
    const token=res?.access_token;
    const givenName=res?.given_name;
    const lastName=res?.family_name;
    const sub=res?.sub;
    console.log(givenName,lastName,token);
    try{
      dispatch({type:'AUTH',data:{token,givenName,lastName,sub}});
      backtohome();
    }catch(err){
      console.log(err);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if(isSignup){
      dispatch(signup(form,navigate));
    }else{
      dispatch(signin(form,navigate));
    }
  }
  return (
    <div>
      <form className='myForm' action="" autoComplete='off' onSubmit={handleSubmit}>
        {
          isSignup && (
            <>
              <h6>First Name</h6>
              <input placeholder='Enter First Name' className='input' type="text" label='First Name' name='firstName' onChange={handleChange} />
              <h6>Last Name</h6>
              <input placeholder='Enter Last Name' className='input' type="text" label='Last Name' name='lastName' onChange={handleChange} />
            </>
          )
        }
        <h6>Email</h6>
        <input placeholder='Enter Email Address' className='input' type="email" label='Email Address' name='email' onChange={handleChange} />
        <h6>Password</h6>
        <input placeholder='Enter Password' className='input' type="password" label='Password' name='password' onChange={handleChange} />
        {
          isSignup && (
            <>
              <h6>Confirm Password</h6>
              <input placeholder='Confirm Password' className='input' type="password" label='Repeat Password' name='confirmPassword' onChange={handleChange} />
            </>
          )
        }
        <div className='google'>
          <div id='signInDiv'>
          <LoginSocialGoogle
        client_id={"728290629235-uvcqov2jceq8hdr28ah13tb866hnhnab.apps.googleusercontent.com"}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
          googleSuccess(data)
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
          </div>
        </div>

        <div className='submitbutton'>
          <button type='submit'>
            {isSignup ? 'SignUp' : 'SignIn'}
          </button>
        </div>
      </form>

      <button onClick={switchMode} className='lower'>
        {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
      </button>

    </div>
  )
}

export default Auth

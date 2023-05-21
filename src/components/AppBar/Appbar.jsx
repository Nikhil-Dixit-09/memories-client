import React from 'react'
import './Appbar.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import memories from '../../Assets/icons8-friends-32.png'
const Appbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  console.log('fetching after change')
  console.log(user)
  const gotohome = () => {
    navigate("/");
  }
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    setUser(null)
    gotohome();
  }
  console.log('hiii')
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
    console.log(user)
  }, [location])
  console.log('asdf')
  const navigate = useNavigate();
  return (
    <>
      <div className='appbar'>
        <div className='memories'>
          Memories
        </div>
        <div>
          <img src={memories} alt="memories" />
        </div>
      </div>
      <div>
        {user != null &&
          <div className='right'>
            <div className='user'>
              {user.givenName} {user.lastName} {user?.result?.name}

            </div>
            <div>
              {user != null &&
                <button className='logout' onClick={logout}>
                  LogOut
                </button>
              }
            </div>
          </div>

        }
      </div>
      <div>
        <div className='auth'>
          {
            user == null &&
            <div>
              {/* <button onClick={()=>navigate("/")}>Back</button> */}
              <button onClick={() => navigate("/Auth")}>SignIn</button>
            </div>
          }

        </div>
      </div>
    </>

  )
}

export default Appbar

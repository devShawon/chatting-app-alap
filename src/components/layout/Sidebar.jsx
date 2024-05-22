import React from 'react'
import './sidebar.css'

import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import Button from '../utilities/Button';
import { getAuth, signOut } from "firebase/auth";
import Heading from '../utilities/Heading';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { userValue } from '../../slices/authSlice';

const Sidebar = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.loginUser.value);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('loginUser')
      dispatch(userValue(null))
      navigate('/')
    }).catch((error) => {
      console.log(error);
    });                                                                             
  }

  return (
    <section className='sidebarmain'>
      <div className='sidebarinner'>
        <div>
          <div style={{display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar 
              style={{height: '100px', width: '100px', fontSize: '40px',}}
              src="/static/images/avatar/2.jpg" 
              alt="Shawon" 
            />
            {
              userdata ?
                <Heading 
                  Heading={'h3'}
                  classname= 'displayname'
                  text={userdata.displayName}
                />
              :
              ''
            }
          </div>
          <div style={{marginTop: '78px'}}>
              <ul className='sidebarItem'>
                <li>
                  <NavLink to='/home'>
                    <IoHomeOutline />
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/message'>
                    <AiOutlineMessage />
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/notification'>
                    <IoMdNotificationsOutline />
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/settings'>
                    <IoSettingsOutline   />
                  </NavLink>
                </li>
              </ul>
          </div>
        </div>
        <div>
          <Button onClick={handleSignOut} style={{background: 'transparent', border: 'none', padding: '8px 50px', cursor: 'pointer'}}>
            <LuLogOut className='logout'/>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Sidebar
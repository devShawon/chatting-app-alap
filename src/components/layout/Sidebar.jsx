import React from 'react'
import './sidebar.css'

import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";


const Sidebar = () => {
  return (
    <section className='sidebarmain'>
      <div className='sidebarinner'>
        <div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Avatar alt="Shawon" src="/static/images/avatar/2.jpg" style={{height: '100px', width: '100px', fontSize: '40px',}} />
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
          <button style={{background: 'transparent', border: 'none', padding: '8px 50px', cursor: 'pointer'}}>
            <LuLogOut className='logout'/>
            </button>
        </div>
      </div>
    </section>
  )
}

export default Sidebar
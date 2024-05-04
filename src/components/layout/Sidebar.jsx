import React from 'react'
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <section style={{background: '#5F35F5', marginTop: '50px', marginLeft: '35px', marginBottom: '20px', padding: '24px', borderRadius: '20px'}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{height: '100px', width: '100px', overflow: 'hidden'}}>
            <Avatar alt="Shawon" src="/static/images/avatar/2.jpg" style={{height: '100%', width: '100%', objectFit: 'cover', fontSize: '40px'}} />
          </div>
          <div style={{marginTop: '78px'}}>
              <ul>
                <li><NavLink></NavLink></li>
              </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sidebar
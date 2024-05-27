import React from 'react'
import UserList from '../../components/home/userlist/UserList'
import FriendReq from '../../components/home/friendreq/FriendReq'

const Home = () => {
  return (
    <div style={{marginTop:'30px', display: 'flex', gap: '30px'}}>
      <UserList />
      <FriendReq />
    </div>
  )
}

export default Home
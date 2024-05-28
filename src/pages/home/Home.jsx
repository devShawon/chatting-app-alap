import React from 'react'
import UserList from '../../components/home/userlist/UserList'
import FriendReq from '../../components/home/friendreq/FriendReq'
import Friends from '../../components/home/friends/Friends'

const Home = () => {
  return (
    <div style={{marginTop:'30px', display: 'flex', gap: '30px'}}>
      <UserList />
      <FriendReq />
      <Friends />
    </div>
  )
}

export default Home
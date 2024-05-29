import React from 'react'
import UserList from '../../components/home/userlist/UserList'
import FriendReq from '../../components/home/friendreq/FriendReq'
import Friends from '../../components/home/friends/Friends'
import BlockList from '../../components/home/blocklist/BlockList'

const Home = () => {
  return (
    <div style={{marginTop:'30px', display: 'flex', flexWrap: 'wrap', gap: '30px'}}>
      <UserList />
      <FriendReq />
      <Friends />
      <BlockList />
    </div>
  )
}

export default Home
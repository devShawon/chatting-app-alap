import React from 'react'
import MessageBox from '../../components/message/MessageBox'
import MessageFrnd from '../../components/message/MessageFrnd'

const Message = () => {
  return (
    <div style={{display: 'flex', alignItems: 'start', gap: '30px', marginTop:'30px'}}>
        <MessageFrnd />
        <MessageBox />
    </div>
  )
}

export default Message
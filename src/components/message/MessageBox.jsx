import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from 'react-redux';
import Heading from '../utilities/Heading';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import moment from 'moment/moment';
import EmojiPicker from 'emoji-picker-react';
import { css } from '@emotion/css';
import ScrollToBottom from 'react-scroll-to-bottom';

const ROOT_CSS = css({
  width: '100%',
  height: 'auto'
});

const MessageBox = () => {

  const db = getDatabase();
  const userdata = useSelector((state) => state.loginUser.value); // who login ...
  const frndsdata = useSelector((state) => state.chatUser.value);
  const emojiRef = useRef(null);
  const [msgTxt, setMsgTxt] = useState('');
  const [allMessage, setAllMessage] = useState([]);
  const [emojiShow, setEmojiShow] = useState(false);

  // message write ...
  const handleSendMsg = () => {
    if(msgTxt != '') {
      set(push(ref(db, 'messages')), {
        senderId: userdata?.uid,
        senderEmail: userdata?.email,
        senderName: userdata?.displayName,
        receiverId: frndsdata?.senderId == userdata.uid ? frndsdata?.receiverId : frndsdata?.senderId,
        receiverEmail: frndsdata?.senderId == userdata.uid ? frndsdata?.receiverEmail : frndsdata?.senderEmail,
        receiverName: frndsdata?.senderId == userdata.uid ? frndsdata?.receiverName : frndsdata?.senderName,
        message: msgTxt,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      })
      setMsgTxt('')
      setEmojiShow(false)
    }
  }

  // messages read operation ...
  useEffect(()=>{ 
    const messageRef = ref(db, 'messages');
    onValue( messageRef, (snapshot) => {
      let arr = []
      let activeId = frndsdata?.senderId == userdata.uid ? frndsdata?.receiverId : frndsdata?.senderId
      snapshot.forEach((item)=>{
        if((item.val().senderId == userdata.uid && item.val().receiverId == activeId) || (item.val().senderId == activeId && item.val().receiverId == userdata.uid)){
          arr.push({...item.val(), id: item.key})
        }
      })
      setAllMessage(arr)
    });
  },[frndsdata])

  // Enter Btn press and submit form ...
  const handleEnterSubmit = (e) => {
    if(e.key == 'Enter'){
      if(msgTxt != '') {
        set(push(ref(db, 'messages')), {
          senderId: userdata?.uid,
          senderEmail: userdata?.email,
          senderName: userdata?.displayName,
          receiverId: frndsdata?.senderId == userdata.uid ? frndsdata?.receiverId : frndsdata?.senderId,
          receiverEmail: frndsdata?.senderId == userdata.uid ? frndsdata?.receiverEmail : frndsdata?.senderEmail,
          receiverName: frndsdata?.senderId == userdata.uid ? frndsdata?.receiverName : frndsdata?.senderName,
          message: msgTxt,
          date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        })
        setMsgTxt('')
        setEmojiShow(false)
      }
    }
  }

// outside click and hide emojibox ...
  // useEffect((event) => {
  //     if (emojiRef.current && !emojiRef.current.contains(event.target)) {
  //       setEmojiShow(false);
  //   }

  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [emojiRef]);


  const handleEmojiSubmit = (e) => {
    setMsgTxt(msgTxt + e.emoji)
  }

  return (
    <>
    {
      frndsdata ?
        <section className='msgmain'>
            <div className='msgheadingbox'>
              <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                <div className='imgbox'></div>
                <div>
                    <h3 className='msgusername'>{
                      userdata.uid == frndsdata.senderId ?
                        frndsdata.receiverName
                          :
                        frndsdata.senderName
                    }
                    </h3>
                    <p className='msgsubheading'>active now</p>
                </div>
              </div>
              <HiOutlineDotsVertical style={{color: 'white', fontSize: '30px'}} />
            </div>
            <div className='msgarea'>
              <ScrollToBottom className={ROOT_CSS} >
              { allMessage.map((item, index) => (
                item.senderId == userdata.uid ?
                  <div key={index} className='sendermsg'>
                    <p>{item.message}</p>
                    <span>
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </span>
                  </div>
                    :
                  <div key={index} className='receivermsg'>
                    <div>
                      <p>{item.message}</p>
                    </div>
                    <span>
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </span>
                  </div>
                ))
              }
              </ScrollToBottom>
            </div>
            <div className='bottombox'>
                <div style={{position: 'relative'}}>
                  <button className='emojiBtn' onClick={()=>setEmojiShow(!emojiShow)}>emoji</button>
                  <div ref={emojiRef} style={{position: 'absolute', bottom: '40px', left: '-50px'}}>
                    <EmojiPicker onEmojiClick={handleEmojiSubmit} open={emojiShow} />
                  </div>
                </div>
                <input onChange={(e)=>setMsgTxt(e.target.value)} onKeyUp={handleEnterSubmit} type="text" className='msginput' placeholder='Enter your text' value={msgTxt} />
                <button onClick={handleSendMsg} className='sendbtn'>send</button>
            </div>
        </section>
          :
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '100vh'}}>
          <Heading 
            Heading={'h2'}
            text= 'please select a user'
            style={{fontSize: '50px'}}
          />
        </div>
    }
    </>
  )
}

export default MessageBox
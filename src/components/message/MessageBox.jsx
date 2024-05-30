import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';

const MessageBox = () => {

  const db = getDatabase();
  const userdata = useSelector((state) => state.loginUser.value); // who login ...
  const [chatuser, setChatuser] = useState([])

  // friend list ..
  useEffect(()=>{   // friends database theke data uthaye neuya hoyche ..
    const friendsRef = ref(db, 'friends');
    onValue(friendsRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(userdata.uid == item.val().receiverId || userdata.uid == item.val().senderId){
          arr.push({...item.val(), id: item.key})
        }
      })
      setChatuser(arr)
    });
  },[])

  console.log(chatuser);

  return (
    <section className='msgmain'>
        <div className='msgheadingbox'>
          <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
            <div className='imgbox'></div>
            <div>
                <h3 className='msgusername'>Shawon</h3>
                <p className='msgsubheading'>8:30 pm</p>
            </div>
          </div>
          <HiOutlineDotsVertical style={{color: 'white', fontSize: '30px'}} />
        </div>
        <div className='msgarea'>

        </div>
        <div className='bottombox'>
            <input type="text" className='msginput' placeholder='Enter your text' />
            <button className='sendbtn'>send</button>
        </div>
    </section>
  )
}

export default MessageBox
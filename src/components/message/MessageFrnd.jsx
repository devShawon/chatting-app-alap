import React, { useEffect, useState } from 'react'
import './message.css'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import Paragraph from '../utilities/Paragraph';
import { Alert } from '@mui/material';
import Heading from '../utilities/Heading';
import { msgUserValue } from '../../slices/activeUserSlice';

const MessageFrnd = () => {

    const db = getDatabase();
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.loginUser.value) // who login ...
    const [friendlist, setFriendlist] = useState([])

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
          setFriendlist(arr)
        });
      },[])

      console.log(friendlist);

      const handlemsgFrnds = (frndinfo) => {
        dispatch(msgUserValue(frndinfo)) 
    }


  return (
    <section className='reqList frndlistmain'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Heading 
                Heading={'h3'}
                classname= 'reqlistHeading'
                text= 'Friends list'
            />
            <HiOutlineDotsVertical className='reqicon' />
        </div>
        <div className='reqItemBox frndlistitembox'>   
        {  friendlist.length > 0 ?
            friendlist.map((item, index)=> (
                <div onClick={()=>handlemsgFrnds(item)} key={index} className='frndarea'>
                    <div style={{display: 'flex', alignItems: 'center', columnGap: '30px',}}>
                        <div className='reqImgbox'></div>
                        <div>
                            <Heading 
                                Heading={'h4'}
                                classname= 'usernameheading'
                                text= {
                                    userdata.uid == item.senderId ?
                                    item.receiverName
                                        :
                                    item.senderName
                                }
                            />
                            <Paragraph classname='userlistSubheading' text= 'Today, 8:56pm'/>
                        </div>
                    </div>
                </div>
            ))
            :
            <Alert severity="info">No friends found.</Alert>
        }
        </div>
    </section>
  )
}

export default MessageFrnd
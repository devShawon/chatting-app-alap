import React, { useEffect, useState } from 'react'
import './userlist.css'

import { HiOutlineDotsVertical } from "react-icons/hi";
import Heading from '../../utilities/Heading';
import Paragraph from '../../utilities/Paragraph'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../utilities/Button';
import { Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

const UserList = () => {

    const db = getDatabase();
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.loginUser.value); // who login ...
    const [userList, setUserList] = useState([])
    const [frndReqList, setFrndReqList] = useState([])
    const [friends, setFriends] = useState([])
    const [cancelReq, setCancelReq] = useState({})

    // All userlist operation ...
    useEffect(()=>{ // users database theke data uthaye neuya hoyche ..
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(item.key != userdata.uid){
              arr.push({...item.val(), id: item.key})
            }
          })
          setUserList(arr)
        });
      },[])

       // Friend Request sent operation ...
       const handleRequest = (reqinfo) => {
        set(push(ref(db, 'Requestlist')), {
            reqsentId: userdata.uid,
            reqsentEmail: userdata.email,
            reqsentName: userdata.displayName,
            reqreceiveId: reqinfo.id,
            reqreceiveEmail: reqinfo.email,
            reqreceiveName: reqinfo.displayName,
        })
      }

    // All FriendReq List ...
    useEffect(()=>{       // Requestlist database theke data uthaye neuya hoyche ..
        const frndReqsRef = ref(db, 'Requestlist');
        onValue(frndReqsRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().reqreceiveId || userdata.uid == item.val().reqsentId){ 
              arr.push(item.val().reqreceiveId + item.val().reqsentId)
            }
          })
          setFrndReqList(arr)
        });
      },[])
    
      // All friends List ...
    useEffect(()=>{  // friends database theke data uthaye neuya hoyche ..
        const friendsRef = ref(db, 'friends');
        onValue(friendsRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().receiverId || userdata.uid == item.val().senderId){ 
              arr.push(item.val().receiverId + item.val().senderId)
            }
          })
          setFriends(arr)
        });
      },[])

       // All FriendReq List  ...
      useEffect(()=>{       // Requestlist database theke data uthaye neuya hoyche ..
        const frndReqsRef = ref(db, 'Requestlist');
        onValue(frndReqsRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().reqreceiveId || userdata.uid == item.val().reqsentId){ 
              arr.push({...item.val(), id: item.key})
            }
          })
          setCancelReq(arr)
        });
      },[])
      
      // Friend Request cancel operation
      const handleReqCancel = () => {
        remove(ref(db, 'Requestlist/' + cancelReq[0].id))
      }

  return (
    <section className='userlist'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Heading 
            Heading={'h3'}
            classname= 'userlistHeading'
            text= 'user list'
          />
          <HiOutlineDotsVertical className='userlistdotIcon' />
        </div>
        <div className='userItemBox'>    
          { userList.map((item, index) => (
            <div key={index} className='userlistItem'>
                <div style={{display: 'flex', alignItems: 'center', columnGap: '30px',}}>
                    {
                      userdata ?
                      <div className='userImgbox'></div>
                        :
                      <Skeleton variant="circular" width={50} height={50} />
                    }
                    <div>
                      {
                        !userdata ?
                        <Skeleton variant="rounded" width={210} height={60} />
                          :
                        <div>
                          <Link to={`/profile/${item.displayName}`}>
                            <Heading 
                                Heading={'h4'}
                                classname= 'usernameheading'
                                text= {item.displayName}
                            />
                          </Link>
                          <Paragraph classname='userlistSubheading' text= 'Today, 8:56pm'/>
                        </div>
                      }
                        {
                          frndReqList.includes(userdata.uid + item.id)  || frndReqList.includes(item.id + userdata.uid) 
                          ?
                            !userdata ?
                              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                              :
                            <Button onClick={handleReqCancel} className= 'cancelBtn' text= 'cancel'/>
                          :
                            friends.includes(userdata.uid + item.id) || friends.includes(item.id + userdata.uid)
                            ?
                              !userdata ?
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                :
                              <Button disabled={'disabled'} className= 'friendBtn' text= 'Friend'/>
                            :
                            !userdata ?
                              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                              :
                              <Button className= 'userlistBtn' onClick={()=>handleRequest(item)} text= 'Add friend'/>
                        }
                    </div>
                </div>
            </div>
          ))
          }
        </div>
    </section>
  )
}

export default UserList
import React, { useEffect, useState } from 'react'
import './userlist.css'

import { HiOutlineDotsVertical } from "react-icons/hi";
import Heading from '../../utilities/Heading';
import Paragraph from '../../utilities/Paragraph'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../utilities/Button';

const UserList = () => {

    const db = getDatabase();
    const userdata = useSelector((state) => state.loginUser.value); // who login ...
    const cancelreqinfo = useSelector((state) => state.reqCancel.value); 
    const [userList, setUserList] = useState([])
    const [frndReqList, setFrndReqList] = useState([])
    const [friends, setFriends] = useState([])

    // All userlist operation ...
    useEffect(()=>{
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

    // All FriendReq List operation ...
    useEffect(()=>{
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
    useEffect(()=>{
        const friendsRef = ref(db, 'friends');
        onValue(friendsRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().reqreceiveId || userdata.uid == item.val().reqsentId){ 
              arr.push(item.val().reqreceiveId + item.val().reqsentId)
            }
          })
          setFriends(arr)
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

      // Friend Request cancel operation
      const handleReqCancel = () => {
        console.log('cancel');
        remove(ref(db, 'Requestlist/' + cancelreqinfo))
      }

      console.log(cancelreqinfo);


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
                        <div className='userImgbox'></div>
                        <div>
                            <Heading 
                                Heading={'h4'}
                                classname= 'usernameheading'
                                text= {item.displayName}
                            />
                            <Paragraph classname='userlistSubheading' text= 'Today, 8:56pm'/>
                            {
                              frndReqList.includes(userdata.uid + item.id)  || frndReqList.includes(item.id + userdata.uid) 
                              ?
                              <Button onClick={handleReqCancel} className= 'cancelBtn' text= 'cancel'/>
                              :
                                friends.includes(userdata.uid + item.id) || friends.includes(item.id + userdata.uid)
                                ?
                                <Button disabled={'disabled'} className= 'friendBtn' text= 'Friend'/>
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
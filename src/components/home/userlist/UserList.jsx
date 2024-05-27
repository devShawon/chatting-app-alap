import React, { useEffect, useState } from 'react'
import './userlist.css'

import { HiOutlineDotsVertical } from "react-icons/hi";
import Heading from '../../utilities/Heading';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import Button from '../../utilities/Button';

const UserList = () => {

    const db = getDatabase();
    const userdata = useSelector((state) => state.loginUser.value) // who login ...
    const [userList, setUserList] = useState([])
    const [frndReqList, setFrndReqList] = useState([])

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
            arr.push({...item.val(), id: item.key})
            // if(item.key != userdata.uid){
            // }
          })
          setFrndReqList(arr)
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
                            <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                <Button className= 'userlistBtn' onClick={()=>handleRequest(item)} text= 'Add friend'/>
                                <Button className= 'userlistBtn' text= 'Remove'/>
                            </div>
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
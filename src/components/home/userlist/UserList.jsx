import React, { useEffect, useState } from 'react'
import './userlist.css'

import { HiOutlineDotsVertical } from "react-icons/hi";
import Heading from '../../utilities/Heading';
import Paragraph from '../../utilities/Paragraph'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
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
            if(item.val().reqsentId == item.val().reqsentId){
              arr.push(item.val().reqreceiveId + item.val().reqsentId)
            }
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

      // Friend Request cancel operation
      // const handleReqCancel = (item) => {
      //   console.log('askf')
      //   if(item.reqreceiveId == item.reqsentId){
      //     remove(ref(db, 'Requestlist' + item.id))
      //   }
      // }


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
                              <Button className= 'userlistBtn' style={{width: '250px', marginTop: '10px'}} text= 'cancel'/>
                              :
                              <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                  <Button className= 'userlistBtn' onClick={()=>handleRequest(item)} text= 'Add friend'/>
                                  <Button className= 'userlistBtn' text= 'Remove'/>
                              </div>
                            }
                            {
                              console.log(item)
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
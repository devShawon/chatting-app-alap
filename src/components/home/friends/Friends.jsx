import React, { useEffect, useState } from 'react'
import Heading from '../../utilities/Heading'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import Button from '../../utilities/Button'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Paragraph from '../../utilities/Paragraph';
import { Alert } from '@mui/material';

const Friends = () => {
    const db = getDatabase();
    const userdata = useSelector((state) => state.loginUser.value) // who login ...
    const [friendlist, setFriendlist] = useState([])

    // friend list ..
    useEffect(()=>{
        const friendsRef = ref(db, 'friends');
        onValue(friendsRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().reqreceiveId || userdata.uid == item.val().reqsentId){
              arr.push({...item.val(), id: item.key})
            }
          })
          setFriendlist(arr)
        });
      },[])

  return (
    <section className='reqList'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Heading 
                Heading={'h3'}
                classname= 'reqlistHeading'
                text= 'Friends list'
            />
            <HiOutlineDotsVertical className='reqicon' />
        </div>
        <div className='reqItemBox'>   
        {  friendlist.length > 0 ?
            friendlist.map((item, index)=> (
                <div key={index} className='reqlistItem'>
                    <div style={{display: 'flex', alignItems: 'center', columnGap: '30px',}}>
                        <div className='reqImgbox'></div>
                        <div>
                            <Heading 
                                Heading={'h4'}
                                classname= 'usernameheading'
                                text= {
                                    userdata.uid == item.reqsentId ?
                                        item.reqreceiveName
                                            :
                                        item.reqsentName
                                }
                            />
                            <Paragraph classname='userlistSubheading' text= 'Today, 8:56pm'/>
                            <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                <Button className= 'reqlistBtn' text= 'unfriend'/>
                                <Button className= 'reqlistBtn' text= 'block'/>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            :
            <Alert severity="info">This is an info Alert.</Alert>
        }
            
        </div>
    </section>
  )
}

export default Friends
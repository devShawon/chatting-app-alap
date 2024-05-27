import React, { useEffect, useState } from 'react'
import '../userlist/userlist.css'
import './friendreq.css'
import Heading from '../../utilities/Heading'
import Paragraph from '../../utilities/Paragraph'
import Button from '../../utilities/Button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendReq = () => {
    const db = getDatabase()
    const userdata = useSelector((state) => state.loginUser.value) // who login ...
    const [reqlist, setReqlist] = useState([])

    // friend request operation
    useEffect(()=>{
        const requestRef = ref(db, 'Requestlist');
        onValue(requestRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().reqreceiveId){
                arr.push({...item.val(), id: item.key})
            }
          })
          setReqlist(arr)
        });
      },[])

     

  return (
    <section className='reqList'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Heading 
                Heading={'h3'}
                classname= 'reqlistHeading'
                text= 'Friend Request list'
            />
            <HiOutlineDotsVertical className='reqicon' />
        </div>
        <div className='reqItemBox'>    
        {reqlist.map((item, index) => (
            <div key={index} className='reqlistItem'>
                <div style={{display: 'flex', alignItems: 'center', columnGap: '30px',}}>
                    <div className='reqImgbox'></div>
                    <div>
                        <Heading 
                            Heading={'h4'}
                            classname= 'usernameheading'
                            text= {item.reqsentName}
                        />
                        <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                            <Button className= 'reqlistBtn' text= 'confirm'/>
                            <Button className= 'reqlistBtn' text= 'cancel'/>
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

export default FriendReq
import React, { useEffect, useState } from 'react'
import Heading from '../../utilities/Heading'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import Button from '../../utilities/Button'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import Paragraph from '../../utilities/Paragraph';
import { Alert } from '@mui/material';

const Friends = () => {
    const db = getDatabase();
    const userdata = useSelector((state) => state.loginUser.value) // who login ...    const requestData = useSelector((state) => state.requestData.value) 
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

      // unfriend operation here ..
      const handleUnfriend = (frndinfo) => {
        if(userdata.uid == frndinfo.senderId || userdata.uid == frndinfo.receiverId){
            remove(ref(db, 'friends/' + frndinfo.id))
        }
      }

      // friend block operation here ..
      const handleBlock = (blocklist) => {
        remove(ref(db, 'friends/' + blocklist.id)).then(()=>{
            if(userdata.uid == blocklist.senderId){
                set(push(ref(db, 'blocklist')), {
                    givenBlockId: blocklist.senderId,
                    givenBlockEmail: blocklist.senderEmail,
                    givenBlockName: blocklist.senderName,
                    takenBlockId: blocklist.receiverId,
                    takenBlockEmail: blocklist.receiverEmail,
                    takenBlockName: blocklist.receiverName
                })
            }else {
                set(push(ref(db, 'blocklist')), {
                    givenBlockId: blocklist.receiverId,
                    givenBlockEmail: blocklist.receiverEmail,
                    givenBlockName: blocklist.receiverName,
                    takenBlockId: blocklist.senderId,
                    takenBlockEmail: blocklist.senderEmail,
                    takenBlockName: blocklist.senderName
                })
            }
        })
      }

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
                                    userdata.uid == item.senderId ?
                                        item.receiverName
                                            :
                                        item.senderName
                                }
                            />
                            <Paragraph classname='userlistSubheading' text= 'Today, 8:56pm'/>
                            <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                <Button onClick={()=>handleUnfriend(item)} className= 'reqlistBtn' text= 'unfriend'/>
                                <Button onClick={()=>handleBlock(item)} className= 'reqlistBtn' text= 'block'/>
                            </div>
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

export default Friends
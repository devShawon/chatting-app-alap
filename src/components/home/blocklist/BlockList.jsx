import React, { useEffect, useState } from 'react'
import './blocklist.css'
import Heading from '../../utilities/Heading'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import Button from '../../utilities/Button'
import { getDatabase, ref, onValue, remove, set, push, } from "firebase/database";
import { useSelector } from 'react-redux';
import Paragraph from '../../utilities/Paragraph';
import { Alert } from '@mui/material';

const BlockList = () => {

    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const userdata = useSelector((state) => state.loginUser.value) // who login ...
    const [blockfrnd, setBlockfrnd] = useState([])

    // block list here ...
    useEffect(()=> {   // blocklist theke data uthaye neuya hoyeche ...
        const blockRef = ref(db, 'blocklist');
        onValue(blockRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().givenBlockId || userdata.uid == item.val().takenBlockId){ 
              arr.push({...item.val(), id: item.key})
            }
          })
          setBlockfrnd(arr)
        });
    }, [])

    // unblock here ..
    const handleUnblock = (blocklist) => {
        remove(ref(db, 'blocklist/' + blocklist.id)).then(()=> {
            set(push(ref(db, 'friends')), {
                senderId: blocklist.givenBlockId,
                senderEmail: blocklist.givenBlockEmail,
                senderName: blocklist.givenBlockName,
                receiverId: blocklist.takenBlockId,
                receiverEmail: blocklist.takenBlockEmail,
                receiverName: blocklist.takenBlockName,
            })
        })
    }

  return (
    <section className='reqList'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Heading 
                Heading={'h3'}
                classname= 'reqlistHeading'
                text= 'Block list'
            />
            <HiOutlineDotsVertical className='reqicon' />
        </div>
        <div className='reqItemBox'>   
        { blockfrnd.length > 0 ?
            blockfrnd.map((item, index)=> (
                <div key={index} className='reqlistItem'>
                    <div style={{display: 'flex', alignItems: 'center', columnGap: '30px',}}>
                        <div className='reqImgbox'></div>
                        <div>
                            <Heading 
                                Heading={'h4'}
                                classname= 'usernameheading'
                                text= {
                                    userdata.uid == item.givenBlockId ?
                                    item.takenBlockName
                                    :
                                    item.givenBlockName
                                }
                            />
                            <Paragraph classname='userlistSubheading' text= 'Today, 8:56pm'/>
                            <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                <Button onClick={()=>handleUnblock(item)} className= 'blockBtn' text= 'unblock'/>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            :
            <Alert severity="info">Block friends empty.</Alert>
        }
        </div>
    </section>
  )
}

export default BlockList
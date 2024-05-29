import React, { useEffect, useState } from 'react'
import '../userlist/userlist.css'
import './friendreq.css'
import Heading from '../../utilities/Heading'
import Paragraph from '../../utilities/Paragraph'
import Button from '../../utilities/Button'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@mui/material'
import { cancelReqData } from '../../../slices/cancelReqSlice'

const FriendReq = () => {
    const db = getDatabase()
    const userdata = useSelector((state) => state.loginUser.value); // who login ...
    const dispatch = useDispatch();
    const [reqlist, setReqlist] = useState([])
    const [cancelReq, setCancelReq] = useState([])

    // friend request operation
    useEffect(()=>{
        const requestRef = ref(db, 'Requestlist');
        onValue(requestRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().reqreceiveId){  // req receive korlei shudu reqlist a dekhano hoi tai item.val().reqreceiveId deuya hoice ...
                arr.push({...item.val(), id: item.key})
            }
          })
          setReqlist(arr)
        });
      },[])
   
      // friend request cancel from userlist ....
    useEffect(()=>{
        const requestRef = ref(db, 'Requestlist');
        onValue(requestRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(userdata.uid == item.val().reqreceiveId || userdata.uid == item.val().reqsentId){
                arr.push({...item.val(), id: item.key})
            }
          })
          setCancelReq(arr)
        });
    },[])
    dispatch(cancelReqData(cancelReq))

    console.log(cancelReq);


      // Friend Request confirm operation ...
       const handleReqConfirm = (confirminfo) => {
            remove(ref(db, 'Requestlist/' + confirminfo.id)).then(()=> {
                set(push(ref(db, 'friends')), {
                    reqsentId: confirminfo.reqsentId,
                    reqsentEmail: confirminfo.reqsentEmail,
                    reqsentName: confirminfo.reqsentName,
                    reqreceiveId: confirminfo.reqreceiveId,
                    reqreceiveEmail: confirminfo.reqreceiveEmail,
                    reqreceiveName: confirminfo.reqreceiveName,
                })
            })
       }

       // Friend Request delete operation ..
       const handleReqCancel = (deleteinfo) => {
            remove(ref(db, 'Requestlist/' + deleteinfo.id))
       }

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
        {reqlist.length > 0 ?
            reqlist.map((item, index) => (
                <div key={index} className='reqlistItem'>
                    <div style={{display: 'flex', alignItems: 'center', columnGap: '30px',}}>
                        <div className='reqImgbox'></div>
                        <div>
                            <Heading 
                                Heading={'h4'}
                                classname= 'usernameheading'
                                text= {item.reqsentName}
                            />
                            <Paragraph classname='userlistSubheading' text= 'Today, 8:56pm'/>
                            <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                <Button onClick={()=>handleReqConfirm(item)} className= 'reqlistBtn' text= 'confirm'/>
                                <Button onClick={()=>handleReqCancel(item)} className= 'reqlistBtn' text= 'cancel'/>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            :
            <Alert severity="info">No Request Found.</Alert>
        }
        </div>
    </section>
  )
}

export default FriendReq
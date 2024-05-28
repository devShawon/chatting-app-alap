import React, { useEffect, useState } from 'react'
import Heading from '../../utilities/Heading'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import Button from '../../utilities/Button'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

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
            if(item.val().reqsentId == item.val().reqsentId){
              arr.push(item.val().reqsentId + item.val().reqreceiveId)
            }
          })
          setFriendlist(arr)
        });
      },[])

      console.log(friendlist);

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
            {friendlist.map((item, index)=> {    
                <div key={index} className='reqlistItem'>
                    <div style={{display: 'flex', alignItems: 'center', columnGap: '30px',}}>
                        <div className='reqImgbox'></div>
                        <div>
                            <Heading 
                                Heading={'h4'}
                                classname= 'usernameheading'
                                text= 'asdf'
                            />
                            <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', columnGap: '10px'}}>
                                <Button className= 'reqlistBtn' text= 'unfriend'/>
                                <Button className= 'reqlistBtn' text= 'block'/>
                            </div>
                        </div>
                    </div>
                </div>
            })
            } 
        </div>
    </section>
  )
}

export default Friends
import React, { useEffect, useState } from 'react'
import './userlist.css'

import { HiOutlineDotsVertical } from "react-icons/hi";
import Heading from '../../utilities/Heading';
import { FaSquarePlus } from "react-icons/fa6";
import Paragraph from '../../utilities/Paragraph';
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {

    const db = getDatabase();
    const [userList, setUserList] = useState([])

    useEffect(()=>{
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
            snapshot.forEach((item) => {
                let arr = []
                arr.push({...item.val(), id: item.key})
                setUserList(arr)
            })
        });
    },[])

    console.log(userList);

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
                    <div style={{display: 'flex', alignItems: 'center', columnGap: '10px',}}>
                        <div className='userImgbox'></div>
                        <div>
                            <Heading 
                                Heading={'h4'}
                                classname= 'usernameheading'
                                text= {item.userName}
                            />
                            <Paragraph 
                                classname='usersubheading'
                                text= 'Today, 8:56pm'
                            />
                        </div>
                    </div>
                    <div>
                        <FaSquarePlus className='useraddIcon' />
                    </div>
                </div>
            ))
            }
        </div>
    </section>
  )
}

export default UserList
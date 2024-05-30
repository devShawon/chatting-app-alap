import React, { useEffect, useState } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'

import Heading from '../../components/utilities/Heading'
import Paragraph from '../../components/utilities/Paragraph'
import Input from '../../components/utilities/Input'
import { Box, Modal } from '@mui/material'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'rgb(100, 100, 100)',
    boxShadow: 24,
    p: 2,
  };


const Profile = () => {

    const db = getDatabase();
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userdata = useSelector((state) => state.loginUser.value); 
    const [profileuser, setProfileuser] = useState([])

  return (
    <section >
        <div className='coverphoto'></div>
        <div style={{display: 'flex', gap: '50px', alignItems: 'start'}}>
            <div>    
                <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                    <div className='profilephoto'></div>
                    <div>
                        <Heading 
                            Heading={'h3'}
                            classname= 'profilename'
                            text= {id}
                        />
                        <Paragraph classname= 'profilesubname' text= 'developer'/>
                    </div>
                </div>
                <div className='inputbox'>
                    <input onClick={handleOpen} type="text" className='profileinput' placeholder= "what's on your mind?" />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className='modalbox'>
                                <h2 className='modalheading'>Create Post</h2>
                                <textarea className='modalinput' placeholder= "what's on your mind?"></textarea>
                                <div className='postbox'>
                                    <h2>add photos & videos</h2>
                                    <input type="file" className='inputfile' />
                                </div>
                                <div className='btnbox'>
                                    <button className='postBtn'>post</button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
            <div className='postarea'>
                <div className='postitem'>
                    <div style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
                        <div style={{width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'black'}}></div>
                        <div>
                            <h2 style={{color: 'black'}}>{id}</h2>
                            <p>11:52 pm</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Profile
import React, { useState } from 'react'
import Input from '../utilities/Input';
import Button from '../utilities/Button';
import { Box, Modal } from '@mui/material';
import HyperLink from '../utilities/HyperLink';
import '../../pages/auth/auth.css'
import Heading from '../utilities/Heading';
import Paragraph from '../utilities/Paragraph';
import { RxCross2 } from 'react-icons/rx';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };  

const ForgetModal = () => {
  const auth = getAuth();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [forgetemail, setforgetemail] = useState('')
    const [forgetemailerror, setforgetemailerror] = useState('')
    
    const handleresetpass = () => {
        if(!forgetemail){
          setforgetemailerror('*please enter your email')
        }else{
          sendPasswordResetEmail(auth, forgetemail)
          .then(() => {
            toast.info('please verify your email..')
            setforgetemailerror('')
            setOpen(false)
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }

  return (
    <>
         <HyperLink onClick={handleOpen} className='forgetpass' text='forgotten password' />
         <div style={{position: 'relative',}}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <div style={{marginTop: '20px'}}>
                    <Heading 
                        Heading={'h2'}
                        classname='forgetemailheading'
                        text='forget your email'
                    />
                    <Input 
                        style={{width:'100%'}} 
                        type='email'
                        name='forgotemail' 
                        id= 'forgotemail' 
                        placeholder='Enter your email' 
                        label='Forget Email Address' 
                        variant='outlined' 
                        onChange={(e)=>setforgetemail(e.target.value)}
                    /> 
                    <Paragraph style={{color: 'red'}} text={forgetemailerror} />
                </div>
                <Button className='updatepass' onClick={handleresetpass} text='Reset password' />
                <RxCross2 onClick={()=>setOpen(false)} style={{position: 'absolute', top: '10px', right: '10px', fontSize: '20px', cursor: 'pointer'}} />
            </Box>
            </Modal>
        </div>
    </>
  )
}

export default ForgetModal
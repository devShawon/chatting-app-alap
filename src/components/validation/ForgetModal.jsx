import React, { useState } from 'react'
import { useFormik } from 'formik';
import Input from '../utilities/Input';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa6';
import Button from '../utilities/Button';
import * as Yup from 'yup';
import { Box, Modal } from '@mui/material';
import HyperLink from '../utilities/HyperLink';


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

    let [show, setShow] = useState(true)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let handlePassShow = () => {
        if(show){
          setShow(false)
        }else{
          setShow(true)
        }
    }

    const formik = useFormik({
        initialValues: {
        old_password: '',
        new_password: ''
        },
        onSubmit: (values, actions) => {
        console.log(values);
        actions.resetForm()
        },
        validationSchema: Yup.object({
            old_password: Yup.string()
                .required('*old password must be Required'),
            new_password: Yup.string()
                .max(20, 'Must be 15 characters or less')
                .min(5, 'Must be 5 characters or more')
                .required('Required'),
        }),
    });
  return (
    <>
         <HyperLink onClick={handleOpen} className='forgetpass' text='forgotten password' />
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div style={{position: 'relative'}}>
                        <Input 
                            style={{width:'100%'}} 
                            name='old_password' 
                            id= 'old_password' 
                            type={ show ? 'password' : 'text'}
                            placeholder='Enter old password' 
                            label='Old Password' 
                            variant='outlined' 
                            value={formik.values.old_password} 
                            onChange={formik.handleChange} 
                        /> 
                    {formik.touched.old_password && formik.errors.old_password ? (
                        <p style={{color: 'red', fontSize: '12px', fontFamily: '"Nunito", sans-serif'}}>{formik.errors.old_password}</p>
                    ) : null}
                    {
                        show
                        ?
                        <IoEyeOutline style={{position: 'absolute', right: '10px', top: '30%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                        :
                        <FaRegEyeSlash style={{position: 'absolute', right: '10px', top: '30%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                    }
                    </div>
                    <div style={{position: 'relative', marginTop: '20px'}}>
                        <Input 
                            style={{width:'100%'}} 
                            name='new_password' 
                            id= 'new_password' 
                            type={ show ? 'password' : 'text'}
                            placeholder='Enter new password' 
                            label='New Password' 
                            variant='outlined' 
                            value={formik.values.new_password} 
                            onChange={formik.handleChange} 
                        /> 
                    {formik.touched.new_password && formik.errors.new_password ? (
                        <p style={{color: 'red', fontSize: '12px', fontFamily: '"Nunito", sans-serif'}}>{formik.errors.new_password}</p>
                    ) : null}
                    {
                        show
                        ?
                        <IoEyeOutline style={{position: 'absolute', right: '10px', top: '30%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                        :
                        <FaRegEyeSlash style={{position: 'absolute', right: '10px', top: '30%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                    }
                    </div>
                    <Button className='updatepass' type='submit' text='update password' />
                </form>
            </Box>
        </Modal>
    </>
  )
}

export default ForgetModal
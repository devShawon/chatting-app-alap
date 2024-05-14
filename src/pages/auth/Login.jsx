import React, { useState } from 'react'
import './auth.css'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Heading from '../../components/utilities/Heading';
import Input from '../../components/utilities/Input';
import Image from '../../components/utilities/Image';
import google from '../../assets/images/login/google.png'
import loginImg from '../../assets/images/login/login-img.png'
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HyperLink from '../../components/utilities/HyperLink';
import Modal from '@mui/material/Modal';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useFormik } from 'formik';
import LoginValidation from '../../components/validation/LoginValidation';
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import Button from '../../components/utilities/Button';
// import ForgetModal from '../../components/validation/ForgetModal';

const ColorButton = styled(MuiButton)(() => ({
  backgroundColor: '#5F35F5',
  paddingTop: '26px',
  paddingBottom: '26px',
  marginTop: '55px',
  fontFamily: '"Open Sans", sans-serif',
  textTransform: 'none',
  color: '#FFF',
  fontSize: '20px',
  fontWeight: '600',
}));

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

const Login = () => {
  const auth = getAuth();
  const user = auth.currentUser;


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
      email: '',
      password: '',
      old_password: '',
      new_password: ''
    },
    validationSchema: LoginValidation,
    onSubmit: (values, actions) => {
      // console.log(values);
      actions.resetForm()
      if(values.password === values.old_password){
        updatePassword(user).then(() => {
          console.log('update success');
        }).catch((error) => {
          console.log(error);
        });
      }else{
        console.log('password match hoi nai');
      }
      signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log('sign in');
      })
      .catch((error) => {
        console.log(error);
      });
    },
  });

  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
              <Grid item xs={6} style={{display: 'flex', alignItems:'center', justifyContent: 'center',}}>
                <div>
                    <Heading 
                        Heading={'h4'}
                        classname= 'loginheading'
                        text= 'Login to your account!'
                    />
                    <div className='logingooglebox'>
                      <div style={{width: '20px', height: '20px', overflow: 'hidden'}}>
                        <Image src={google} alt= 'google' classname='img' />
                      </div>
                      <Heading
                          Heading={'h6'}
                          classname= 'logingoogle'
                          text= 'Login with Google'
                      />
                    </div>
                      <form action='' onSubmit={formik.handleSubmit}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <div>
                            <Input 
                              style={{width: '372px', marginTop: '32px',}} 
                              name='email' 
                              id= 'email' 
                              type='email'
                              placeholder='Youraddres@email.com' 
                              label='Email Address' 
                              variant='standard' 
                              value={formik.values.email} 
                              onChange={formik.handleChange} 
                            />
                            {formik.touched.email && formik.errors.email ? (
                              <p style={{color: 'red', fontSize: '12px', fontFamily: '"Nunito", sans-serif'}}>{formik.errors.email}</p>
                            ) : null}
                          </div>
                          <div style={{position: 'relative',}}>
                            <Input 
                              style={{width: '372px', marginTop: '60px',}} 
                              name='password' 
                              id= 'password' 
                              type={ show ? 'password' : 'text'}
                              placeholder='Enter your password' 
                              label='Password' 
                              variant='standard' 
                              value={formik.values.password} 
                              onChange={formik.handleChange} 
                            />                 
                            {formik.touched.password && formik.errors.password ? (
                              <p style={{color: 'red', fontSize: '12px', fontFamily: '"Nunito", sans-serif'}}>{formik.errors.password}</p>
                            ) : null}
                            {
                              show
                              ?
                              <IoEyeOutline style={{position: 'absolute', right: '0', top: '70%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                              :
                              <FaRegEyeSlash style={{position: 'absolute', right: '0', top: '70%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                            }
                          </div>
                          <div style={{textAlign: 'right', marginTop: '5px', }}>
                            <HyperLink onClick={handleOpen} classN  ame='forgetpass' text='forgotten password' />
                            
                            {/* <ForgetModal /> */}
                          </div>
                        </div>
                        <Stack >
                          <ColorButton type='submit' variant="contained">Login to continue</ColorButton>
                        </Stack>
                      </form>
                      <div style={{marginTop:'44px', marginLeft: '18px'}}>
                        <p style={{fontSize: '13px', fontFamily: '"Open Sans", sans-serif', fontWeight: '400', color: '#03014C', display: 'flex', alignItems: 'center', columnGap:'2px'}}>Don't have an accouont? <HyperLink path= '/registration' style= {{fontWeight: '700', color: '#EA6C00'}} text= 'Sign up' /> </p>
                      </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                  <div style={{width: '100%', height: '100vh', overflow: 'hidden'}}>
                    <Image src={loginImg} alt= 'image' classname= 'img' />
                  </div>
              </Grid>
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
          </Grid>
      </Box>
    </>
  )
}

export default Login
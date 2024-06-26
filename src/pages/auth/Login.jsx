import React, { useEffect, useState } from 'react'
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
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useFormik } from 'formik';
import LoginValidation from '../../components/validation/LoginValidation';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from 'react-toastify';
import Toastify from '../../components/utilities/Toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { userValue } from '../../slices/authSlice';
import { Modal } from '@mui/material';
import Paragraph from '../../components/utilities/Paragraph';
import Button from '../../components/utilities/Button';
import { RxCross2 } from 'react-icons/rx';

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
  const db = getDatabase();
  const userdata = useSelector((state) => state.loginUser.value); // who login ...
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [forgetemail, setforgetemail] = useState('')
  const [forgetemailerror, setforgetemailerror] = useState('')

  let handlePassShow = () => {
    if(show){
      setShow(false)
    }else{
      setShow(true)
    }
  }

  //login validation here....
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidation,
    onSubmit: (values, actions) => {
      actions.resetForm()
      signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user
        if(user.emailVerified == true){
          toast.success('Successfully Sign In...')
          setTimeout(() => {
            navigate("/home");
          },1000)
        }else{
          toast.error('email not verify...')
        }
      })
      .catch((error) => {
        toast.error('Credential error...')
      });
    },
  });

  // Login kora thakle direct homepage show hbe ...
  useEffect(()=> {
    if(userdata){
      navigate('/home')
    }else{
      navigate('/')
    }
  }, [])


  //sign with google function here..
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
      if(user.emailVerified){
        set(ref(db, 'users/' + user.uid), {
          displayName: user.displayName,
          email: user.email,
          profile_picture : user.photoURL
        }).then(() => {
          localStorage.setItem("loginUser", JSON.stringify(user))
          dispatch(userValue(user))
          toast.success('Successfully Sign In ...')
          setTimeout(() => {
            navigate('/home')
          },1500)
        })
      }else{
        toast("Please Verify your Email..")
          signOut(auth).then(() => {
        }).catch((error) => {
          console.log(error);
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  // Reset pass function here..
  const handleresetpass = () => {
    if(forgetemail == ''){
      setforgetemailerror('*please enter your email')
    }
    else {
      sendPasswordResetEmail(auth, forgetemail)
      .then(() => {
        toast.success('cheak email & reset password...')
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
      <Box sx={{ flexGrow: 1 }}>
        <Toastify />
        <Grid container >
            <Grid item xs={6} style={{display: 'flex', alignItems:'center', justifyContent: 'center',}}>
              <div>
                <Heading 
                    Heading={'h4'}
                    classname= 'loginheading'
                    text= 'Login to your account!'
                />
                <div className='logingooglebox' onClick={handleGoogle}>
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
                        {/* <ForgetModal /> */}
                      </div>
                    </div>
                    <Stack >
                      <ColorButton type='submit' variant="contained">Login to continue</ColorButton>
                      {/* <button type="submit">Submit</button> */}
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
        </Grid>
      </Box>
    </>
  )
}

export default Login
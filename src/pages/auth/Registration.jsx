import React, { useState } from 'react'
import './auth.css'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Heading from '../../components/utilities/Heading';
import Image from '../../components/utilities/Image';
import Paragraph from '../../components/utilities/Paragraph';
import registrationImg from '../../assets/images/registration/registration.png'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa6';
import Stack from '@mui/material/Stack';
import HyperLink from '../../components/utilities/HyperLink';
import { useFormik } from 'formik';
import Input from '../../components/utilities/Input';
import RegistrationValidation from '../../components/validation/RegistrationValidation';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from 'react-toastify';
import Toastify from '../../components/utilities/Toastify';
import { useNavigate } from "react-router-dom";
import { Puff } from 'react-loader-spinner';

const ColorButton = styled(Button)(() => ({
  backgroundColor: '#5F35F5',
  padding: '20px 0',
  marginTop: '55px',
  fontFamily: '"Open Sans", sans-serif',
  textTransform: 'none',
  color: '#FFF',
  fontSize: '20px',
  fontWeight: '600',
  width: '372px',
  borderRadius: '86px'
}));

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase()
  const navigate = useNavigate();

  const [show, setShow] = useState(true)
  const [loading, setLoading] = useState(false)


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
      fullname: '',
      password: ''
    },
    onSubmit: (values, actions) => {
      // console.log(values);
     
      setLoading(true)
      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log('create user');
        sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('email sent');
          updateProfile(auth.currentUser, {
            displayName: values.fullname, 
            photoURL: 'https://example.com/jane-q-user/profile.jpg'
          }).then(() => {
            // console.log(userCredential);
            set(ref(db, 'users/' + userCredential.user.uid), {
              username: userCredential.user.displayName,
              email: userCredential.user.email,
              profile_picture : userCredential.user.photoURL
            }).then(()=>{
              toast.success('Registration Successful...')
              actions.resetForm()
              setLoading(false)
              setTimeout(() => {
                navigate("/");
              },1000)
            })
          }).catch((error) => {
            console.log(error);
            setLoading(false)
          });
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
    },
    validationSchema: RegistrationValidation
    
  });


  return (
    <>
      {
        loading &&
          <div className='loading-wrapper'>
            <Puff
              visible={true}
              height="120"
              width="120"
              color="#fff"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
      }
      <Box sx={{ flexGrow: 1 }}>
        <Toastify />
        <Grid container >
            <Grid item xs={6} style={{display: 'flex', alignItems:'center', justifyContent: 'center',}}>
              <div>
                  <Heading 
                      Heading={'h4'}
                      classname= 'loginheading'
                      text= 'Get started with easily register'
                  />
                  <Paragraph style={{fontSize: '20px', color: '#11175D', fontFamily: '"Nunito", sans-serif', opacity: '0.5', marginTop: '13px'}} text= 'Free register and you can enjoy it' />
                    <form action="" method='' onSubmit={formik.handleSubmit}>
                      <div style={{display: 'flex', flexDirection: 'column', rowGap: '56px', width: '372px'}}>
                        <div>
                          <Input 
                            style={{width: '372px', marginTop: '32px'}}
                            name= 'email'
                            id= 'email'
                            type= 'email'
                            placeholder= 'youraddress@gmail.com'
                            label='Email Address'
                            variant= 'outlined'
                            value= {formik.values.email}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <p style={{color: 'red', fontSize: '12px', fontFamily: '"Nunito", sans-serif'}}>{formik.errors.email}</p>
                          ) : null}
                        </div>
                        <div>
                          <Input 
                            style={{width: '100%'}}
                            name= 'fullname'
                            id= 'fullname'
                            type= 'text'
                            placeholder= 'Your name'
                            label='Full Name'
                            variant= 'outlined'
                            value= {formik.values.fullname}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.fullname && formik.errors.fullname ? (
                            <p style={{color: 'red', fontSize: '12px', fontFamily: '"Nunito", sans-serif'}}>{formik.errors.fullname}</p>
                          ) : null}
                        </div>
                        <div style={{position: 'relative'}}>
                          <Input 
                            style={{width: '100%'}}
                            name= 'password'
                            id= 'password'
                            type= {show ? 'password' : 'text'}
                            placeholder= 'Enter your password'
                            label='Password'
                            variant= 'outlined'
                            value= {formik.values.password}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <p style={{color: 'red', fontSize: '12px', fontFamily: '"Nunito", sans-serif'}}>{formik.errors.password}</p>
                          ) : null}
                          {
                            show
                            ?
                            <IoEyeOutline style={{position: 'absolute', right: '10px', top: '30%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                            :
                            <FaRegEyeSlash style={{position: 'absolute', right: '10px', top: '30%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                          }
                        </div>
                      </div>
                      <Stack >
                        <ColorButton type='submit' variant="contained">Sign Up</ColorButton>
                      </Stack>
                    </form>
                    <div style={{marginTop:'40px', marginLeft: '75px'}}>
                      <p style={{fontSize: '13px', fontFamily: '"Open Sans", sans-serif', fontWeight: '400', color: '#03014C', display: 'flex', alignItems: 'center', columnGap:'2px'}}>Don't have an accouont?<HyperLink path= '/' style= {{fontWeight: '700', color: '#EA6C00'}} text= 'Sign in' /></p>
                    </div>
              </div>
            </Grid>
            <Grid item xs={6}>
                <div style={{width: '100%', height: '100vh', overflow: 'hidden'}}>
                  <Image src={registrationImg} alt= 'image' classname= 'img' />
                </div>
            </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Registration
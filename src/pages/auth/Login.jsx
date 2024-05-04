import React, { useState } from 'react'
import './auth.css'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Heading from '../../components/utilities/Heading';
import Image from '../../components/utilities/Image';

import google from '../../assets/images/login/google.png'
import loginImg from '../../assets/images/login/login-img.png'

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HyperLink from '../../components/utilities/HyperLink';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

const ColorButton = styled(Button)(() => ({
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

const Login = () => {

  let [show, setShow] = useState(true)

  let handlePassShow = () => {
    if(show){
      setShow(false)
    }else{
      setShow(true)
    }
  }

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
                      <form action="" method=''>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <TextField id="standard-basic" placeholder='Youraddres@email.com' label="Email Address" variant="standard" style={{width: '372px', marginTop: '32px',}} />
                          <div style={{position: 'relative',}}>
                            <TextField id="standard-basic" type={show ? 'password' : 'text'} placeholder='Enter your password' label="password" variant="standard" style= {{marginTop: '60px', width: '100%',}}/>
                            {
                              show
                              ?
                              <IoEyeOutline style={{position: 'absolute', right: '0', top: '70%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                              :
                              <FaRegEyeSlash style={{position: 'absolute', right: '0', top: '70%', fontSize: '24px', color: '#b3b3c9', cursor: 'pointer'}} onClick={handlePassShow} />
                            }
                          </div>
                        </div>
                      </form>
                      <Stack >
                        <ColorButton variant="contained">Login to continue</ColorButton>
                      </Stack>
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
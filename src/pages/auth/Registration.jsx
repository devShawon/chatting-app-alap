import React from 'react'
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
  width: '372px',
  borderRadius: '86px'
}));

const Registration = () => {
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container >
              <Grid item xs={6} style={{display: 'flex', alignItems:'center', justifyContent: 'center',}}>
                <div>
                    <Heading 
                        Heading={'h4'}
                        classname= 'loginheading'
                        text= 'Get started with easily register'
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
                        <div style={{display: 'flex', flexDirection: 'column', width: '372px'}}>
                          <TextField id="standard-basic" placeholder='Youraddres@email.com' label="Email Address" variant="standard" style={{width: '372px', marginTop: '32px'}} />
                          <TextField id="standard-basic" placeholder='Enter your password' label="password" variant="standard" style={{marginTop: '60px', placeholderTextColor: 'red'}}/>
                        </div>
                      </form>
                      <Stack >
                        <ColorButton variant="contained">Login to continue</ColorButton>
                      </Stack>
                      <div style={{marginTop:'44px', marginLeft: '18px'}}>
                        <p style={{fontSize: '13px', fontFamily: '"Open Sans", sans-serif', fontWeight: '400', color: '#03014C', display: 'flex', alignItems: 'center', columnGap:'2px'}}>Don't have an accouont?<HyperLink path= '/' style= {{fontWeight: '700', color: '#EA6C00'}} text= 'Sign in' /></p>
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

export default Registration
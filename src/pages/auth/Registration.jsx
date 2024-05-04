import React from 'react'
import './auth.css'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Heading from '../../components/utilities/Heading';
import Image from '../../components/utilities/Image';
import Paragraph from '../../components/utilities/Paragraph';

import registrationImg from '../../assets/images/registration/registration.png'

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import HyperLink from '../../components/utilities/HyperLink';

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
                    <Paragraph style={{fontSize: '20px', color: '#11175D', fontFamily: '"Nunito", sans-serif', opacity: '0.5', marginTop: '13px'}} text= 'Free register and you can enjoy it' />
                      <form action="" method=''>
                        <div style={{display: 'flex', flexDirection: 'column', rowGap: '56px', width: '372px'}}>
                          <TextField id="standard-basic" placeholder='Youraddres@email.com' label="Email Address" variant="outlined" style={{width: '372px', marginTop: '32px'}} />
                          <TextField id="standard-basic" placeholder='Enter your password' label="Full Name" variant="outlined" style={{}}/>
                          <TextField id="standard-basic" placeholder='Enter your password' label="password" variant="outlined" style={{}}/>
                        </div>
                      </form>
                      <Stack >
                        <ColorButton variant="contained">Sign Up</ColorButton>
                      </Stack>
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
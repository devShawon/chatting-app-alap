import React from 'react'
import './auth.css'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Heading from '../../components/utilities/Heading';

const Login = () => {
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
                    <Heading
                        Heading={'h6'}
                        classname= 'logingoogle'
                        text= 'Login with Google'
                    />
                </div>
              </Grid>
              <Grid item xs={6}>
                  <div style={{width: '100%', height: '100vh', backgroundColor: 'red'}}></div>
              </Grid>
          </Grid>
      </Box>  
    </>
  )
}

export default Login
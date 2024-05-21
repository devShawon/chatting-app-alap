import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../../pages/auth/Login';
import RootLayout from './RootLayout';

const PrivateRoute = () => {

    const userdata = useSelector((state) => state.loginUser.value);

  return userdata ? <RootLayout /> : <Login /> 
}

export default PrivateRoute
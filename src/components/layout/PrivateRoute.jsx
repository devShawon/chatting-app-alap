import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {

    const userdata = useSelector((state) => state.loginUser.value);

  return  userdata ? <Outlet /> : <Navigate to="/" replace={true} />
}

export default PrivateRoute
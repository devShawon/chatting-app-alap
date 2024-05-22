import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import Home from './pages/home/Home';
import RootLayout from './components/layout/RootLayout';
import Error from './pages/error/Error';
import Message from './pages/message/Message';
import Notification from './pages/notification/Notification';
import Settings from './pages/settings/Settings';
import PrivateRoute from './components/layout/PrivateRoute';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<PrivateRoute />}>
          <Route element={<RootLayout />}>
              <Route path='/home' element={<Home />} />
              <Route path='/message' element={<Message />} />
              <Route path='/notification' element={<Notification />} />
              <Route path='/settings' element={<Settings />} />
          </Route>
        </Route>
          <Route path='*' element={<Error />} />
          <Route path='/' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}/>
  )
}

export default App
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

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route element={<RootLayout />}>
              <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='*' element={<Error />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router}/>
  )
}

export default App
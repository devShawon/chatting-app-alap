import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Toastify = ({text}) => {

    toast({text})
  return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </>
  )
}

export default Toastify
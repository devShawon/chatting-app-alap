import React from 'react'
import Image from '../../components/utilities/Image'
import errorImg from '../../assets/images/error/error.svg'
import Heading from '../../components/utilities/Heading'
import './error.css'
import Paragraph from '../../components/utilities/Paragraph'
import Button from '../../components/utilities/Button'
import { useNavigate } from 'react-router-dom'

const Error = () => {

  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/')
  }

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Image 
        src={errorImg}
        alt='404'
        style={{height: '250px', width: '350px'}}
      />
      <Heading 
        Heading={'h2'}
        classname= 'errorHeading'
        text= 'Page is not available right now'
      />
      <Paragraph 
        classname= 'errorparagraph'
        text='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.'
      />
      <Button onClick={handleBackHome} className= 'errorbtn' text= 'Go to home' />
    </div>
    </>
  )
}

export default Error
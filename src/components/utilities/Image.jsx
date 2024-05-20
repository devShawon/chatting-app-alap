import React from 'react'

const Image = ({src, alt, classname, onClick}) => {
  return (
    <img src={src} onClick={onClick} className={classname} alt={alt} />
  )
}

export default Image
import React from 'react'

const Image = ({src, alt, classname}) => {
  return (
    <img src={src} className={classname} alt={alt} />
  )
}

export default Image
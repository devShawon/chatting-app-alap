import React from 'react'

const Image = ({src, alt, classname, style,  onClick}) => {
  return (
    <img src={src} onClick={onClick} style={style} className={classname} alt={alt} />
  )
}

export default Image
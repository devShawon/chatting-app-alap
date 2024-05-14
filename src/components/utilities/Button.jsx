import React from 'react'

const Button = ({text, style, className, onClick, type}) => {
  return (
    <>
        <button type={type} onClick={onClick} style={style} className={className}>{text}</button>
    </>
  )
}

export default Button
import React from 'react'

const Button = ({text, style, className, onClick, type, children}) => {
  return (
    <>
        <button type={type} onClick={onClick} style={style} className={className}>{text}{children}</button>
    </>
  )
}

export default Button
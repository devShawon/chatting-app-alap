import React from 'react'

const Button = ({text, style, className, onClick, type, disabled, children}) => {
  return (
    <>
        <button type={type} onClick={onClick} style={style} className={className} disabled={disabled}>{text}{children}</button>
    </>
  )
}

export default Button
import React from 'react'
import TextField from '@mui/material/TextField';

const Input = ({name, id, type, placeholder, label, variant, style, className, value, onChange}) => {
  return (
    <TextField name={name} id={id} type={type} placeholder={placeholder} label={label} variant={variant} style={style} className={className} value={value} onChange={onChange} />
  )
}

export default Input
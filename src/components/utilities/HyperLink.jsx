import React from 'react'
import { Link } from 'react-router-dom'

const HyperLink = ({path, className, style, text, onClick}) => {
  return (
    <Link to={path} onClick={onClick} className= {className} style={style}>{text}</Link>
  )
}

export default HyperLink
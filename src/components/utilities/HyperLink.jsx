import React from 'react'
import { Link } from 'react-router-dom'

const HyperLink = ({path, className, style, text}) => {
  return (
    <Link to={path} className= {className} style={style}>{text}</Link>
  )
}

export default HyperLink
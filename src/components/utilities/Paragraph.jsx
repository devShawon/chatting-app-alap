import React from 'react'

const Paragraph = ({classname,style, text}) => {
  return (
    <p className={classname} style={style}>{text}</p>
  )
}

export default Paragraph
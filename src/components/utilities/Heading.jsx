import React from 'react'

const Heading = ({Heading, style, classname, text}) => {
  return (
    <Heading className={classname} style={style}>{text}</Heading>
  )
}

export default Heading
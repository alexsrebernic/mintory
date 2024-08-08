import React from 'react'
import { ButtonProps } from './type'

const GenericButton = ({text, className, onClick}:ButtonProps) => {
  return (
      <button className={`rounded-full ${className} p-4 px-10 `} onClick={onClick}>{text}</button>
  )
}

export default GenericButton
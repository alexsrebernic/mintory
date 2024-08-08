import Image from 'next/image'
import React from 'react'
import { type RaretyProps } from './types'

const Rarety = ({rarety, className} : RaretyProps) => {
  return (
      <div className={`bg-[#CFCFCF] backdrop-filter backdrop-blur-lg w-fit h-fit px-4 py-2 rounded-full flex items-center justify-center gap-2 text-[#00183A] ${className}`}>
          <Image width={15} height={15} src="/vercel.svg" alt="Rare" />
          <p>Rare!</p>
      </div>

  )
}

export default Rarety
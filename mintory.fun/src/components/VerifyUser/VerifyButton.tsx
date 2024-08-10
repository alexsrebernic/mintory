import Image from 'next/image'
import React from 'react'

const VerifyButton = ({onClick, text}:any) => {
  return (
    <button onClick={onClick} className='flex gap-2 items-center bg-white py-2 px-4 rounded-xl font-bold'>
        <Image src={"/icons/worldcoinLogo.png"} width={25} height={25} alt='Verify with WorldID'/>
        <span>{text}</span>
    </button>
  )
}

export default VerifyButton
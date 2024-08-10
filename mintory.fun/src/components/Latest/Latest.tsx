import Image from 'next/image'
import React from 'react'
import { DisplayCard } from '../DisplayCard/DisplayCard'

const Latest = () => {
  return (
    <div className='relative px-20 top-[-55px] bg-[#7452EE] min-h-[100vh] rounded-t-3xl flex w-full gap-40 items-center justify-between'>
      {/* left  */}
      <div className='h-fit flex flex-col'>
        {/* top */}
        <div className='self-start'>
          <Image src={"/goodLuck.png"} width={100} height={100} alt='Good Luck' />
        </div>
        {/* bottom */}
        <div className='text-[#DAF936] ml-28'>
          <span className='text-[120px] font-bold'>Latest</span> <span className='text-2xl'>NFT</span>
        </div>
      </div>
      {/* right  */}
      <div className='mr-56'> 
        <DisplayCard href="/sample.jpeg" chain="base" name="Test NFT" price="2ETH" creator="Nakamoto" collection="Limited Edition"/>
      </div>
    </div>
  )
}

export default Latest
import Image from 'next/image'
import React from 'react'

const SearchButton = () => {
  return (
          <button className='rounded-full bg-[#E5DDFF] p-2'>
            <Image src={"/icons/search.png"} width={20} height={20} alt='search'/>
        </button>
  )
}

export default SearchButton
import Image from 'next/image'
import React from 'react'

const FilterTab = ({iconUrl, text, className, isSelected}: FilterButtonProps) => {
  return (
    <div>
      <button className={`${isSelected ? "bg-[#7452EE] text-white" : "bg-[#FDFDFD]/75"}  w-fit h-fit px-4 py-2 rounded-full flex items-center justify-center gap-2 text-[#00183A] ${className}`}>
        {iconUrl && text && <Image width={15} height={15} src={iconUrl} alt={text} />}
        <p>{text}</p>
      </button>
    </div>
  )
}

export default FilterTab
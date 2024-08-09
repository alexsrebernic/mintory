import React from 'react'
import FilterTab from './FilterTab'

const ChainFilters = () => {
    return (
        <div className='bg-[#E5DDFF] rounded-full flex gap-4'>
            <FilterTab text='Network: Base' />
            <FilterTab text='Network: Optimism' />
        </div>
    )
}

export default ChainFilters
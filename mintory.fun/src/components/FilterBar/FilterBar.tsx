import React from 'react'
import FilterTab from './FilterTab'
import ChainFilters from './ChainFilters'
import FilterSelect from './FilterSelect'
import SearchButton from './SearchButton'

const FilterBar = () => {
    return (
        <div className='w-full px-20 pb-10 pt-8 flex gap-2 justify-center items-center'>
            <div className='bg-[#E5DDFF] w-fit rounded-full flex gap-4 p-2 items-center'>
                {/* top art  */}
                <FilterTab iconUrl='/icons/topArtIcon.png' text='Top Art' isSelected={true} />
                {/* trending  */}
                <FilterTab iconUrl='/icons/trendingIcon.png' text='Trending' isSelected={false} />
                {/* recent   */}
                <FilterTab iconUrl='/icons/recentIcon.png' text='Recent' isSelected={false} />
                {/* networks  */}
                <ChainFilters />
            </div>
            <div>
                {/* filters  */}
                <FilterSelect />
            </div>
            <div>
                {/* search  */}
                <SearchButton />
            </div>

        </div>
    )
}

export default FilterBar
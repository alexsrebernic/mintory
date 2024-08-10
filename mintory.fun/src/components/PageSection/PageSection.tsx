"use client"
import React, { useEffect, useState } from 'react';
import { PageSectionProps } from './types';
import { DisplayCard } from '../DisplayCard/DisplayCard';

const PageSection: React.FC<PageSectionProps> = ({ bgColor, className, getData, title, }) => {
    const [data, setData] = useState([1, 2, 3, 4, 5, 6])

    useEffect(() => {
        // const sampleData = [1,2,3,4,5,6,7,8,9]
        // setData(sampleData)
    }, [])

    return (
        <div className={`${bgColor ? `bg-[${bgColor}]` : 'white'} ${className} px-8 md:px-20 py-8`}>
            <div className='flex justify-between pb-4 text-[#7452EE]'>
                <p className='text-5xl font-bold '>{title}</p>
                <button className='bg-transparent'>see all</button>
            </div>
            <div className='flex flex-wrap w-full items-center justify-center md:justify-between gap-8 py-6'>
            {data.map((nft, index) => {
                return (
                    <DisplayCard href="/sample.jpeg" chain="base" name="Test NFT" price="2ETH" creator="Nakamoto" collection="Limited Edition" key={index} />
                )
            })}
            </div>

        </div>
    );
}

export default PageSection;

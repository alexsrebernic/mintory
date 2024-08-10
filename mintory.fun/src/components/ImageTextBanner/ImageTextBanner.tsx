import Image from 'next/image'
import React from 'react'
import { ImageTextBannerProps } from './props'
import GenericButton from '../Buttons/GenericButton'

const ImageTextBanner = ({ bgColor, title, subtitle, imageurl, buttonText, onClick, className }: ImageTextBannerProps) => {
    return (
        <div className={`bg-[${bgColor}] flex w-full ${className} my-8`}>
            <div className={`flex flex-col gap-8 w-full items-center justify-center bg-[${bgColor}] `}>
                {/* content  */}
                <p className='text-4xl font-semibold'>{title}</p>
                {subtitle && <p>{subtitle}</p>}
                <GenericButton text='Create NFT' className='text-black bg-[#FCFE53] font-extrabold' />

            </div>
            {imageurl && <Image src={imageurl} width={600} height={400} alt='' />}
        </div>
    )
}

export default ImageTextBanner
import React from 'react'
import GenericButton from '../Buttons/GenericButton'

const Hero = () => {
    return (
        <div className='bg-[#A7EF5A] px-16 h-[100vh] w-full items-center justify-center flex flex-col gap-10 '>
            <div className='w-full flex'>
                <div className='flex flex-col justify-start gap-6 items-center'>
                    <h1 className='text-6xl font-extrabold self-start'>Fun & Easy!</h1>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-4xl '>NFTs for everyone. Create, collect, trade</h2>
                        <h3 className='text-2xl '>Create & Trade NFTs on Your New Playground</h3>
                    </div>
                </div>

                <div>
                    {/* mintory image  */}
                </div>
            </div>
            <div className='w-full flex flex-col justify-start gap-4'>
                <p>I want to </p>
                <div className='flex gap-4'>
                    <GenericButton text='Create NFT' className='text-black bg-[#FCFE53] font-extrabold' />
                    <GenericButton text='Create NFT' className='text-white bg-[#FF5B5B] font-extrabold' />
                </div>
            </div>
        </div>
    )
}

export default Hero
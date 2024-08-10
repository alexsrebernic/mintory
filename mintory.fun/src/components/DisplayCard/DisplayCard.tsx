import Image from 'next/image'
import { type DisplayCardProps } from './types'
import { ChainLogo } from './ChainLogo'
import Rarety from './Rarety'

export const DisplayCard = ({ href, chain, name, price, creator, collection }: DisplayCardProps) => {
    return (
        <div className='flex flex-col'>
            <div className="relative w-[400px] h-[400px] group rounded-t-3xl overflow-hidden self-start">
                <Image src={href} fill alt={name} className="w-full h-full " />
                <div className="absolute top-0 left-0 w-full h-full bg-transparent hidden group-hover:block">
                    <div className="w-full h-full flex items-center justify-center text-white">
                        <ChainLogo chain={chain} className="absolute top-2 left-2" />
                        <Rarety rarety="Rare" className="absolute top-2 right-2" />
                    </div>
                </div>
            </div>
            <div className='bg-[#DED4FFB2]/70 flex flex-col py-4 px-6 gap-2 rounded-b-3xl overflow-hidden'>
                {/* footer  */}
                <div className='flex justify-between items-center font-semibold'>
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
                <div className='flex flex-col '>
                    <div className='flex gap-2 items-center'>
                        <Image src={"/icons/creatorIcon.png"} height={10} width={20} alt='Creator'/>
                        <span>{creator}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Image src={"/icons/collectionIcon.png"} height={10} width={20} alt='Collection'/>
                        <span>{collection}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


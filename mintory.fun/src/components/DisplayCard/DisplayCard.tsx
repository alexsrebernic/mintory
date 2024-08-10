import Image from 'next/image'
import { type DisplayCardProps } from './types'
import { ChainLogo } from './ChainLogo'
import Rarety from './Rarety'

export const DisplayCard = ({ href, chain, name, price, creator, collection }: DisplayCardProps) => {
    return (
        <div>
            <div className="relative min-w-[300px] h-[400px] group rounded-3xl overflow-hidden">
                <Image src={href} fill alt={name} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-transparent hidden group-hover:block">
                    <div className="w-full h-full flex items-center justify-center text-white">
                        <ChainLogo chain={chain} className="absolute top-2 left-2" />
                        <Rarety rarety="Rare" className="absolute top-2 right-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}


import Image from "next/image";
import { type ChainLogoProps } from "./types";

export const ChainLogo = ({ chain, className }: ChainLogoProps) => {
    return (
        <div className={`rounded-full p-1 bg-[#CFCFCF]/75 backdrop-blur-lg ${className}`}>{
                chain === "base" ? <Image src="/base.png" alt="Base" width={40} height={40}  /> :
                    chain === "optimism" ? <Image src="/optimism.png" alt="Optimism" width={40} height={40} /> :
                        <Image src="/vercel.svg" alt="Others" width={40} height={40}  />
            }
        </div>
    );
}

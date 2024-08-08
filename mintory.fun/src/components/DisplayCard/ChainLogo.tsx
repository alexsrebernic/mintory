import Image from "next/image";
import { type ChainLogoProps } from "./types";

export const ChainLogo = ({ chain, className }: ChainLogoProps) => {
    return (
        chain === "base" ? <Image src="/base.png" alt="Base" width={50} height={50} className={className} /> :
            chain === "optimism" ? <Image src="/optimism.png" alt="Optimism" width={50} height={50} className={className} /> :
                <Image src="/vercel.svg" alt="Others" width={50} height={50} className={className} />
    );
}

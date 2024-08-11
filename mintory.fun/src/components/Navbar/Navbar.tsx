"use client"
import { SheetComponent } from './SheetComponent';
import NavLinks from './NavLinks';
import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import VerifyUser from '../VerifyUser/VerifyUser';
import { useUserVerification } from '@/Providers/VerifiedStatus/VerifiedStatusProvider';


const Navbar = () => {
    const navlinks = [
        {
            name: "Create",
            path : "/create"
        },
        {
            name: "Collect",
            path : "/collect"
        },
        {
            name: "Trade",
            path : "/trade"
        },
        {
            name: "How does it work?",
            path : "/about"
        },
    ]

    const {isConnected} = useAccount()
    const { isVerified } = useUserVerification()

    return (
        <div className='fixed top-0 left-0 right-0 z-[5]'>
        <nav className="flex bg-[#00E692] items-center rounded-b-3xl justify-between p-2">
            <div className='flex justify-center items-center gap-6'>
                <div className='flex justify-center items-center pb-2'>
                    <Link href="/">
                        <Image src="/logo.png" width={100} height={20} alt='Mintory Logo'/>
                    </Link>
                </div>
                <NavLinks orientation='horizontal' links={navlinks} className="hidden sm:flex gap-6"/>
            </div>
            <div className='flex items-center gap-3'>
                    {isConnected && (isVerified ? 
                    <Image src={"/icons/verifiedIcon.png"} height={40} width={40} alt='Verified User' className='hover:rotate-12 hover:scale-105'/>
                    : <VerifyUser />) }
                <ConnectButton />
                {/* <WalletConnectButton /> */}
                <SheetComponent orientation='vertical' links={navlinks} className="hidden sm:block" sheetTitle='Welcome to Mintory' sheetDescription='Create & Trade NFTs on Your New Playground'/>
            </div>
        </nav>
        </div>
    )

}

export default Navbar
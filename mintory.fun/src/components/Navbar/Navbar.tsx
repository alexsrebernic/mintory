"use client"
import { SheetComponent } from './SheetComponent';
import NavLinks from './NavLinks';
import Image from 'next/image';
import Link from 'next/link';
import GenericButton from '../Buttons/GenericButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import WalletConnectButton from './WalletConnectButton';
import { useAccount } from 'wagmi';
import VerifyUser from '../VerifyUser/VerifyUser';


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

    const {address} = useAccount()

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
                {address && <VerifyUser />}
                <ConnectButton />
                {/* <WalletConnectButton /> */}
                <SheetComponent orientation='vertical' links={navlinks} className="hidden sm:block" sheetTitle='Welcome to Mintory' sheetDescription='Create & Trade NFTs on Your New Playground'/>
            </div>
        </nav>
        </div>
    )

}

export default Navbar
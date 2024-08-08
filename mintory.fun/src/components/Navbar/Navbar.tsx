import { SheetComponent } from './SheetComponent';
import NavLinks from './NavLinks';
import Image from 'next/image';
import Link from 'next/link';


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
    return (
        <nav className="flex bg-[#00E692] items-center rounded-b-3xl justify-between p-2 md:p-4">
            <div className='flex justify-center items-center gap-6'>
                <div className='flex justify-center items-center pb-2'>
                    <Link href="/">
                        <Image src="/logo.png" width={100} height={20} alt='Mintory Logo'/>
                    </Link>
                </div>
                <NavLinks orientation='horizontal' links={navlinks} className="hidden sm:flex gap-6"/>
            </div>
            <div className='flex'>
                <SheetComponent orientation='vertical' links={navlinks} className="hidden sm:block" sheetTitle='Welcome to Mintory' sheetDescription='Create & Trade NFTs on Your New Playground'/>
            </div>


        </nav>
    )

}

export default Navbar
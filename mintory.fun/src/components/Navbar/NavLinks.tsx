import Link from 'next/link'
import React from 'react'
import type { NavLinksProps } from './types';

const NavLinks: React.FC<NavLinksProps> = ({ orientation, links, className }) => {
    return (
        <nav className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} justify-center items-center ${className}`}>
            {links.map((link, index) => (
                <Link key={index} href={link.path}>{link.name}</Link>
            ))}
        </nav>
    )
}

export default NavLinks

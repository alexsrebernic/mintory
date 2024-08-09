import React from 'react';
import { PageSectionProps } from './types';

const PageSection: React.FC<PageSectionProps> = ({ bgColor, className, children }) => {
    return (
        <div className={`${bgColor ? `bg-[${bgColor}]` : 'white'} ${className}`}>
            {children}
        </div>
    );
}

export default PageSection;

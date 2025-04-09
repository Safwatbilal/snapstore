import { 
    Breadcrumb as BreadcrumbContainer, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import React from 'react';
import { ICONS } from '@/layout/nav/config';  
import { useTranslation } from 'react-i18next';

type BreadcrumbProps = {
    data: { name: string; path: string; icon?: JSX.Element }[],
};

const Breadcrumb = ({ data }: BreadcrumbProps) => {
    const {t}=useTranslation()
    return (
        <BreadcrumbContainer className='ml-4 py-3'>
            <BreadcrumbList>
                <BreadcrumbItem className='font-bold flex items-center'>
                    <span className="mr-2">{ICONS.home}</span> 
                    <BreadcrumbLink href="/" className='hover:text-blue-400'>
                        {t('sidebar.Home')}
                    </BreadcrumbLink>
                    {data.length>=1&& <BreadcrumbSeparator className='text-blue-400 text-6xl' />}
                </BreadcrumbItem>
                
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem className='font-bold flex items-center'>
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            <BreadcrumbLink
                                href={item.path}
                                className={index === data.length - 1 ? 'text-blue-500 hover:text-blue-400' : 'hover:text-blue-400'}
                            >
                                {t('sidebar.'+item.name)}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < data.length - 1 && <BreadcrumbSeparator className='text-blue-400 text-6xl' />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;

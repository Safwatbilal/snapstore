import React from 'react'
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/rootReducers';
import { Card } from '../ui/card';
import { Skeleton } from '@mui/material';
const OverViewSkeleton = () => {
    const { theme } = useSelector((state: IRootState) => state.control);
    const bgColor = theme === 'light' ? '#e0e0e0' : '#2c2c2c';
    
    return (
        <Card className='w-full max-w-[320px] rounded-2xl flex flex-col gap-2 mx-auto p-4'>
            <Skeleton variant='text' width='70%' height={24} sx={{ backgroundColor: bgColor }} />
            <Skeleton variant='text' width='50%' height={20} sx={{ backgroundColor: bgColor }} />
            <div className="flex justify-between mt-4">
            <Skeleton variant='text' width='30%' height={24} sx={{ backgroundColor: bgColor }} />
            <Skeleton variant='text' width='30%' height={24} sx={{ backgroundColor: bgColor }} />
            </div>
        </Card>
    );
}

export default OverViewSkeleton
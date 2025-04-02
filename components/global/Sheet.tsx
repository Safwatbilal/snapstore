import React, { ReactNode } from 'react'
import {
    Sheet,
    SheetContent
} from "../ui/sheet"
import TitleSheet from './TitleSheet'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store/rootReducers'
import { dispatch } from '@/store/store'
import { updateControlState } from '@/store/slice/control'
interface SheetTypeProps {
    title: string
    description: string
    children?: ReactNode 
}

const Sheets: React.FC<SheetTypeProps> = ({  title, description, children }) => {
    const { lang } = useSelector((state: IRootState) => state.control);
    const {openSheet}=useSelector((state:IRootState)=>state.control)
    const handleCloseSheet=()=>{
        dispatch(updateControlState({key:'openSheet',payload:false}))
    }
    return (
        <Sheet open={openSheet} onOpenChange={handleCloseSheet}>
            <SheetContent side={`${lang==='en'?'left':'right'}`} >
                <TitleSheet title={title} description={description} />
                <div className="mt-4">{children}</div> 
            </SheetContent>
        </Sheet>
    )
}

export default Sheets

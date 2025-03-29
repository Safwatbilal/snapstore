import React, { ReactNode } from 'react'
import {
    Sheet,
    SheetContent
} from "../ui/sheet"
import TitleSheet from './TitleSheet'
import { useSelector } from 'react-redux'

interface SheetTypeProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    title: string
    description: string
    children?: ReactNode 
}

const Sheets: React.FC<SheetTypeProps> = ({ setIsOpen, isOpen, title, description, children }) => {
     const { lang } = useSelector((state: IRootState) => state.control);
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent side={`${lang==='en'?'left':'right'}`} >
                <TitleSheet title={title} description={description} />
                <div className="mt-4">{children}</div> 
            </SheetContent>
        </Sheet>
    )
}

export default Sheets

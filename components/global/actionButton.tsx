import React from 'react'
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TooltipButton from './tooltipButton'
import { IconButton } from '@mui/material'
import { Edit, ShoppingCart } from 'lucide-react';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Input } from '../ui/input'
import { useTranslation } from 'react-i18next'
import { Badge } from '../ui/badge'
import { toast } from 'sonner'
interface prposActions{
    addToCart:(id:string)=>void,
    link:string
}
const  ActionButton:React.FC<prposActions> = ({addToCart,link}) => {
    const {t}=useTranslation()
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            toast.info('afad')
        } catch (error) {
           console.log('aa')
        }
    };
    return (
        <>
        <TooltipButton
                icon={<Badge variant='secondary' className='cursor-pointer py-1'><FavoriteIcon className="!w-5 !h-5 text-blue-300"  /></Badge>}
                title={t('global.add_to_favorites')}
                />
        <Dialog >
        <DialogTrigger asChild>
                <TooltipButton
                icon={<Badge variant='secondary' className='cursor-pointer py-1' >
                    <ShareIcon className="!w-5 !h-5 text-blue-300"  />
                </Badge>}
                title={t('global.share_product')}
                />
            
        </DialogTrigger>
        <DialogContent className="sm:max-w-md !h-[200px]">
            <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
                Anyone who has this link will be able to view this.
            </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                Link
                </Label>
                <Input
                id="link"
                defaultValue={link}
                readOnly
                />
            </div>
            <Button type="submit" size="sm" className="px-3 cursor-pointer" onClick={handleCopy}>
                <span className="sr-only">Copy</span>
                <Copy />
            </Button>
            </div>
            <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                Close
                </Button>
            </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>
                <TooltipButton
                icon={
                    <Badge onClick={addToCart} variant='secondary' className='cursor-pointer py-1' >
                    <ShoppingCart className="!w-5 !h-5 text-blue-300"  />
                    </Badge>
                }
                title={t('global.add_to_cart')}
                />
        </>
    )
    }
export default ActionButton

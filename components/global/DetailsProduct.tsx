import React from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import queries from '@/api/product/qyery'
import Image from 'next/image'
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { DialogHeader,DialogTitle,DialogDescription, DialogFooter } from '../ui/dialog'
import Typography from '../ui/typpgraphy'
import {  TextField } from '@mui/material';
import {  ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { defaultCommentAction, ICommentAction } from '../validation/comments';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form'
import comments from '@/api/comment/query';
import RHFTextField from '../hook-form/RHFTextFiled';
import CommentsList from './comments';
import { Separator } from '../ui/separator';
import { useTranslation } from 'react-i18next';
import auth from '@/api/auth/query';
import { ShoppingCart } from "lucide-react";
import TooltipButton from './tooltipButton';
const DetailsProduct:React.FC<{id:string}> = ({id}) => {
    const {data}=queries.getProduct(id)
    const queryClient=useQueryClient()
    const {mutate}=comments.addComment()
    const userId=localStorage.getItem('token')
    const {data:comment}=comments.getAllcomments(id)
    const {
            handleSubmit,
            watch,
            formState: { errors },
            control,
            reset
        } = useForm<ICommentAction>({
            defaultValues:defaultCommentAction
        })
    
    const onSubmit=(data:ICommentAction)=>{
        const dateID={
            ...data,
            userId,
            productId:id,
        }
        console.log('aaa')
        mutate(dateID,{
                onSuccess:(data)=>{
                toast.success('ss')
                reset(defaultCommentAction)
                queryClient.invalidateQueries({ queryKey: ['comments'] });
            }
        })
    }
    const commentInput=watch('comment')
    return (
        <>
            <DialogHeader>
                <DialogTitle>{data?.productName}</DialogTitle>
                <DialogDescription>
                    <ResizablePanelGroup direction="horizontal" className="rounded-lg w-1 py-6">
                        <ResizablePanel defaultSize={90}> 
                            <div className="flex  justify-between flex-col h-[465px]  ">
                                <div className="flex-grow overflow-auto">
                                    <Typography>Reviews :</Typography>
                                    <div >
                                        {comment?.map(({comment},index)=>(
                                            
                                            <CommentsList comment={comment} userName={comment} />
                                    
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={50}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={60}>
                                    <div className="flex h-full items-center justify-center  ">
                                        <img src={data?.imageUrl} className="w-full h-full bg-contain"/>
                                    </div>
                                </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={40} className="p-1 space-y-2 flex-grow overflow-auto max-h-60">
                                        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium text-gray-700 dark:text-gray-300">Category:</span> {data?.category.categoryName}
    </Typography>
    <div className="max-h-40 overflow-auto"> 
        <Typography variant="body2" className="font-semibold text-gray-800 dark:text-gray-200">
            <span className="font-medium text-gray-700 dark:text-gray-300">Description:</span> {data?.description}
        </Typography>
    </div>
</ResizablePanel>


                    </ResizablePanelGroup>
                    </ResizablePanel>
                    </ResizablePanelGroup>
                </DialogDescription>
                <DialogFooter className="flex items-center justify-center gap-2 w-full  bg-white dark:bg-black rounded-lg h-12">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
                        <div className="relative w-full">
                            <RHFTextField
                            placeholder="reviews.add_review"
                            className="w-full pr-12" 
                            control={control}
                            type="text"
                            isLoading={false}
                            name="comment"
                            />
                            <IconButton
                            type="submit"
                            className="!absolute top-[13px] right-0 w-[46px]"
                            disabled={!commentInput?.trim()}
                            >
                            <ChevronRight className="w-5 h-5" />
                            </IconButton>
                        </div>
                        </form>

                        <div className="flex gap-2">
                            <TooltipButton icon={    <IconButton aria-label="add to favorites" >
                                <FavoriteIcon />
                            </IconButton>
                        } title='add to favorites'></TooltipButton>
                            <TooltipButton icon={  <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>} title='Share Product'></TooltipButton>
                            <TooltipButton icon={   <IconButton aria-label="add to cart">
                            <ShoppingCart  />
                            </IconButton>} title='add to cart'></TooltipButton>
                
 
                        </div>

  
</DialogFooter>



        </DialogHeader>
    </>
  )
}

export default DetailsProduct
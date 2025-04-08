'use client';

import React from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Badge } from '../ui/badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import queries from '@/api/product/qyery'
import IconButton from '@mui/material/IconButton';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import Typography from '../ui/typpgraphy'
import { ChevronRight } from 'lucide-react';
import { defaultCommentAction, ICommentAction } from '../validation/comments';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'
import comments from '@/api/comment/query';
import RHFTextField from '../hook-form/RHFTextFiled';
import CommentsList from './comments';
import { useTranslation } from 'react-i18next';
import auth from '@/api/auth/query';
import { ShoppingCart } from "lucide-react";
import TooltipButton from './tooltipButton';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import ImageWithCheck from './ImageWithCheck';
import ActionButton from './actionButton';

const DetailsProduct: React.FC<{ id: string ,handleAddToCart:(id:string)=>void}> = ({ id,handleAddToCart }) => {
    const { t } = useTranslation()
    const { data } = queries.getProduct(id)
    const queryClient = useQueryClient()
    const { mutate } = comments.addComment()
    const userId = localStorage.getItem('token')
    const { data: users } = auth.getAllUsers(userId ?? '')
    const userName = users?.map((use) => use.firstName)
    const { data: comment } = comments.getAllcomments(id)
    const {
        handleSubmit,
        watch,
        control,
        reset
    } = useForm<ICommentAction>({
        defaultValues: defaultCommentAction
    })
    const onSubmit = (data: ICommentAction) => {
        const dateID = {
            ...data,
            userName,
            productId: id,
        }
        mutate(dateID, {
            onSuccess: () => {
                toast.success('add comment')
                reset(defaultCommentAction)
                queryClient.invalidateQueries({ queryKey: ['comments'] });
            }
        })
    }
    const commentInput = watch('comment')
    return (
        <>
            <DialogHeader>
                <DialogTitle>{data?.productName}</DialogTitle>
                <DialogDescription>
                    <ResizablePanelGroup direction="horizontal" className="rounded-lg py-6">
                        <ResizablePanel defaultSize={90}>
                            <div className="flex justify-between flex-col h-[465px]">
                                <ScrollArea className="overflow-hidden">
                                    <Typography>Reviews :</Typography>
                                    <div>
                                        {comment?.map(({ comment, userName }, index) => (
                                            <CommentsList key={index} comment={comment} userName={userName} />
                                        ))}
                                    </div>
                                    <ScrollBar orientation='vertical' />
                                </ScrollArea>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={50}>
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={60}>
                             
                                    <ScrollArea className="overflow-hidden">
                                        <div className="flex space-x-4 p-4">
                                            {data?.imageUrl?.map((url, index) => (
                                                <figure key={index} className="shrink-0">
                                                    <ImageWithCheck
                                                        src={url}
                                                        borderRadius={false}
                                                        width="200px"
                                                        height="200px"
                                                    />
                                                </figure>
                                            ))}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel defaultSize={40}>
                                <div className='h-[265px]'>
                                    
                                    <ScrollArea className=" overflow-hidden ">
                                        <div className="block whitespace-pre-wrap break-words w-full !border-0">
                                            {data?.description}
                                        </div>
                                        <ScrollBar orientation="vertical" />
                                    </ScrollArea>
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </DialogDescription>
                <DialogFooter className="flex items-center justify-center gap-2 w-full bg-white dark:bg-black rounded-lg h-12">
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
                                className="!absolute top-[0px] right-0 w-[46px]"
                                disabled={!commentInput?.trim()}
                            >
                                <ChevronRight size={20} className="dark:text-white" />
                            </IconButton>
                        </div>
                    </form>
                   <ActionButton addToCart={handleAddToCart} ></ActionButton>
                </DialogFooter>
            </DialogHeader>
        </>
    )
}

export default DetailsProduct

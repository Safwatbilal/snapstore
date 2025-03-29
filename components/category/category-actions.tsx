import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { useEffect } from 'react'
import {SheetFooter} from "../ui/sheet"
import queries from '@/api/category/query'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { categoryValue, ICategoryAction } from '../validation/category'
import { yupResolver } from '@hookform/resolvers/yup'
import { defaultCategoryAction } from '../validation/category'
import { categotyValidation } from '../validation/category'
import {toast} from 'sonner'
import RHFTextField from '../hook-form/RHFTextFiled'
import { useRouter } from 'next/navigation'
import { ICategoryForm } from '@/api/category/type'
import Sheets from '../global/Sheet'
const CategoryActions: React.FC<{ isOpen: boolean, setIsOpen: (value: boolean) => void ,id:string}> = ({ isOpen, setIsOpen,id }) => {
    const queryClient=useQueryClient()
    const {mutate}=queries.CategoryActions(id)
    const {data:categoryDetails,isLoading}=queries.getCategory(id);
    const {t}=useTranslation()
    const {
        handleSubmit,
        reset,
        formState: { errors },
        control
    } = useForm<ICategoryAction>({
        defaultValues:defaultCategoryAction,
        resolver:yupResolver(categotyValidation())as unknown as Resolver<ICategoryAction>,
        values: categoryValue(categoryDetails as ICategoryForm) 
    })
    const onSubmit:SubmitHandler<ICategoryAction>=(data:ICategoryAction)=>{
        const dateID={
            ...data,
            userId:localStorage.getItem('token')
        }
        mutate(dateID,{
            onSuccess:(data)=>{
                toast.success(`${id?t('global.update_done'):t('global.add_done')}`)
                reset()
                setIsOpen(false)
                queryClient.invalidateQueries({ queryKey: ['category'] });
            }
        })
    }
    useEffect(() => {
        if (!isOpen) {
            reset(defaultCategoryAction)
        }
    }, [isOpen, reset])
    return (
        
    <Sheets isOpen={isOpen} setIsOpen={setIsOpen} title={`${id?t('global.update'):t('global.add')} ${t('category.category')}`}  description={id?t('global.update_description'):t('global.add_description')}>
        <form className='pt-6' onSubmit={handleSubmit(onSubmit)}
        >
            <div className="form">
                <div className="grid gap-4 py-4">
                    <RHFTextField
                        name='categoryName'
                        type='text'
                        control={control}
                        label={t('category.categoryName')}
                        isLoading={isLoading}
                        placeholder={t('category.categoryName')}
                    ></RHFTextField>
                    <RHFTextField
                        name='url'
                        type='text'
                        control={control}
                        label={t('category.url')}
                        isLoading={isLoading}
                        placeholder={t('category.url')}
                    ></RHFTextField>           
                </div>
            </div>
                <SheetFooter>
                        <div className="divButtonForm">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full "
                                
                                >
                                {t('global.back')}
                            </Button>
                            <Button  className="w-full buttonSubmit" >
                                {id?t('global.update'):t('global.add')}
                            </Button>
                        </div>
                            
                </SheetFooter>
        </form>
    </Sheets>
        
    )
}

export default CategoryActions;

'use client'
import React from 'react'
import PageTitle from '@/components/global/PageTitle'
import queries from '@/api/category/query'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { categotyValidation, defaultCategoryAction, ICategoryAction } from '@/components/validation/category'
import { yupResolver } from '@hookform/resolvers/yup'
import {toast} from 'sonner'
import RHFTextField from '@/components/hook-form/RHFTextFiled'
import { useTranslation } from 'react-i18next'
const AddCategory = () => {
  const {mutate}=queries.addCategory()
  const {t}=useTranslation()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm<ICategoryAction>({
    defaultValues:defaultCategoryAction,
    resolver:yupResolver(categotyValidation())as unknown as Resolver<ICategoryAction>
  })
  const onSubmit:SubmitHandler<ICategoryAction>=(data:ICategoryAction)=>{
    const dateID={
      ...data,
      userId:localStorage.getItem('token')
    }
    mutate(dateID,{
        onSuccess:(data)=>{
          toast.success('ss')
        //  router.push(HOME_PATH.HOME)
        }
      })
  }
  return (
    
    <div >
        <PageTitle title={t('category.add_category')} subTitle={''} buttonTitle='' path={''}/>
        <form className='pt-6' onSubmit={handleSubmit(onSubmit)}
        >
            <div className='form'>
              <RHFTextField
              name='categoryName'
              type='text'
              control={control}
              label={t('category.categoryName')}
              isLoading={false}
              placeholder={t('category.categoryName')}
              ></RHFTextField>
              <RHFTextField
              name='url'
              type='text'
              control={control}
              label={t('category.url')}
              isLoading={false}
              placeholder={t('category.url')}
              ></RHFTextField>
                <div className="divButtonForm">
            <Button
              type="button"
              variant="outline"
              className="w-full "

            >
              {t('global.back')}
            </Button>
            <Button  className="w-full buttonSubmit" >
            {t('global.add')}
            </Button>
          </div>
            </div>
        </form>
    </div>
  )
}

export default AddCategory
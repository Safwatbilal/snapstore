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
const AddCategory = () => {
  const {mutate}=queries.addCategory()
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
        <PageTitle title={'add Category'} subTitle={''} buttonTitle='' path={''}/>
        <form className='pt-6' onSubmit={handleSubmit(onSubmit)}
        >
            <div className='form'>
              <RHFTextField
              name='categoryName'
              type='text'
              control={control}
              label='categoryName'
              isLoading={false}
              placeholder='categoryName'
              ></RHFTextField>
              <RHFTextField
              name='url'
              type='text'
              control={control}
              label='url'
              isLoading={false}
              placeholder='url'
              ></RHFTextField>
                <div className="divButtonForm">
            <Button
              type="button"
              variant="outline"
              className="w-full "

            >
              Back
            </Button>
            <Button  className="w-full buttonSubmit" >
              Add
            </Button>
          </div>
            </div>
        </form>
    </div>
  )
}

export default AddCategory
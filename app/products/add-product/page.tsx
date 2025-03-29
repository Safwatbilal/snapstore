'use client'
import React from 'react'
import category from '@/api/category/query';
import PageTitle from '@/components/global/PageTitle'
import { useTranslation } from 'react-i18next'
import queries from '@/api/product/api'
import RHFTextField from '@/components/hook-form/RHFTextFiled'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { defaultProductAction, IProductAction } from '@/components/validation/product'
import RHFReactSelect from '@/components/hook-form/RHFReactSelect'
const page = () => {
  const {t}=useTranslation();
  const {mutate}=queries.addProduct();
  const userId=localStorage.getItem('token')
  console.log(userId)
  const {data:categorys}=category.getAllCategory(userId)
  console.log(categorys)
  const {
    control,handleSubmit

  }=useForm<IProductAction>({
  })
  const onSubmit=(data:IProductAction)=>{
    const body={
      ...data,
      userId:userId
    }
    mutate(body,{
      onSuccess:()=>{
        console.log('ss')
      }
    })
  }
  
  return (
    <>
      <PageTitle title={t('Products.add_Product')}></PageTitle>
      <form className='pt-6'
      onSubmit={handleSubmit(onSubmit)}
        >
            <div className='form'>
              <RHFTextField
              name='productName'
              type='text'
              control={control}
              label={t('Products.productName')}
              isLoading={false}
              placeholder={t('Products.productName')}
              ></RHFTextField>
              <RHFTextField
              name='description'
              type='text'
              control={control}
              label={t('Products.description')}
              isLoading={false}
              placeholder={t('Products.description')}
              ></RHFTextField>
              <RHFTextField
              name='price'
              type='number'
              control={control}
              label={t('Products.price')}
              isLoading={false}
              placeholder={t('Products.price')}
              ></RHFTextField>
              <RHFTextField
              name='imageUrl'
              type='text'
              control={control}
              label={t('Products.price')}
              isLoading={false}
              placeholder={t('Products.price')}
              ></RHFTextField>

           <RHFReactSelect
          name="category"
          className='w-full'
          label="Select Category"
          control={control}
          options={
            categorys?.map(({ categoryName, id }) => ({
              label: categoryName,
              value: id,
            })) ?? []
          }
        />

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
    </>
  )
}

export default page
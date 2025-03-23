'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm,SubmitHandler } from 'react-hook-form'
import PageTitle from '@/components/global/PageTitle'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUpAction, defaultSignUpAction, signUpValidation } from '@/components/validation/signUp'
import { Button } from '@/components/ui/button'
import RHFTextField from '@/components/hook-form/RHFTextFiled'
const Page = () => {
  const { t } = useTranslation()
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ISignUpAction>({
  //   defaultValues: defaultSignUpAction,
  //   resolver: yupResolver(signUpValidation()) 
  // })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm<ISignUpAction>({
    defaultValues:defaultSignUpAction,
    resolver:yupResolver(signUpValidation())as unknown as Resolver<ISignUpAction>
  })
  console.log(errors)
  const onSubmit: SubmitHandler<ISignUpAction> = (data:ISignUpAction) => console.log(data)

  return (
    <div className='p-6'>
      <PageTitle Title={t('sign.sign')} SubTitle={t('sign.create')} />
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className='pt-6'
          >
          
            <div className=" w-full p-6 border border-solid rounded-md gap-4 flex flex-col bg-white">
                <RHFTextField
                  name='userName'
                  type='text'
                  control={control}
                  lable='user.userName'
                  placeholder='user.userName'
                  isLoading={false}
                ></RHFTextField>
                <RHFTextField
                  name='userName'
                  type='text'
                  control={control}
                  lable='user.userName'
                  placeholder='user.userName'
                  isLoading={false}
                ></RHFTextField>
                <RHFTextField
                  name='userName'
                  type='text'
                  control={control}
                  lable='user.userName'
                  placeholder='user.userName'
                  isLoading={false}
                ></RHFTextField>
                <RHFTextField
                  name='userName'
                  type='text'
                  control={control}
                  lable='user.userName'
                  placeholder='user.userName'
                  isLoading={false}
                ></RHFTextField>
                <RHFTextField
                  name='userName'
                  type='text'
                  control={control}
                  lable='user.userName'
                  placeholder='user.userName'
                  isLoading={false}
                ></RHFTextField>
            </div>
            <div className="flex gap-4 w-[90%] flex-col-reverse justify-center items-center mx-auto mt-5">
            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              {t("form.back")}
            </Button>
            <Button  className="w-full " >
              sign up
            </Button>
          </div>
      </form>
    </div>
  )
}

export default Page

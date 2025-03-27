'use client'
import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { useRouter } from 'next/navigation'
import { useForm,SubmitHandler } from 'react-hook-form'
import PageTitle from '@/components/global/PageTitle'
import { useTranslation } from 'react-i18next'
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUpAction, defaultSignUpAction, signUpValidation } from '@/components/validation/signUp'
import { Button } from '@/components/ui/button'
import RHFTextField from '@/components/hook-form/RHFTextFiled'
import queries from '@/api/auth/query'
import { HOME_PATH } from '@/routes/path'
import {toast} from 'sonner'
import { dispatch } from '@/store/store';
import { updateControlState } from '@/store/slice/control';
const Page = () => {
  const uniqueId = uuidv4();
  const router=useRouter()
  const { t } = useTranslation()
  const {mutate,isPending}=queries.SignUp()
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
  const onSubmit: SubmitHandler<ISignUpAction> = (data:ISignUpAction) => {
    const dateID={
      ...data,
      token:uniqueId
    }
    mutate(dateID,{
        onSuccess:(data)=>{
          toast.success('ss')
          dispatch(updateControlState({ key: "isLogout", payload: false }));
          localStorage.setItem('token',uniqueId)
          router.push(HOME_PATH.HOME)
        }
      })
  }

  return (
    <div className='p-6'>
      <PageTitle title={t('sign.sign')} subTitle={t('sign.create')} buttonTitle='' />
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className='pt-6'
          >
          
            <div className="form">
                <RHFTextField
                  name='userName'
                  type='text'
                  control={control}
                  label='user.userName'
                  placeholder='user.userName'
                  isLoading={false}
                ></RHFTextField>
                <RHFTextField
                  name='firstName'
                  type='text'
                  control={control}
                  label='user.firstName'
                  placeholder='user.firstName'
                  isLoading={false}
                ></RHFTextField>
                <RHFTextField
                  name='lastName'
                  type='text'
                  control={control}
                  label='user.lastName'
                  placeholder='user.lastName'
                  isLoading={false}
                ></RHFTextField>
                <RHFTextField
                  name='phoneNumber'
                  type='number'
                  control={control}
                  label='user.phoneNumber'
                  placeholder='user.phoneNumber'
                  isLoading={false}
                ></RHFTextField>
                <RHFTextField
                  name='password'
                  isPassword={true}
                  type='password'
                  control={control}
                  label='user.password'
                  placeholder='user.password'
                  isLoading={false}
                ></RHFTextField>
            </div>
            <div className="flex gap-4 w-[90%] flex-col-reverse justify-center items-center mx-auto mt-5">
            <Button
              type="button"
              variant="outline"
              className="w-full "

            >
              {t("form.back")}
            </Button>
            <Button  className="w-full buttonSubmit" >
              {t("sign.sign")}
            </Button>
          </div>
      </form>
    </div>
  )
}

export default Page

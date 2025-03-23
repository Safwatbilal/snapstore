import React from 'react'
import Typography from '@/components/ui/typpgraphy'
import { Separator } from "@/components/ui/separator"
const PageTitle:React.FunctionComponent<{
    Title:string,
    SubTitle:string
}> = ({Title,SubTitle}) => {
  return (
    <div className="flex flex-col gap-3 ">
        <Typography  variant={'h4'} size={'medium'}>{Title}</Typography>
        <Typography  className='colorText ' variant={'h6'} size={'semibold'}>{SubTitle}</Typography>
        <Separator></Separator>

    </div>
  )
}

export default PageTitle
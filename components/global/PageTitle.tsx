import React from 'react'
import Typography from '@/components/ui/typpgraphy'
import { Separator } from "@/components/ui/separator"
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
const PageTitle:React.FunctionComponent<{
    title:string,
    subTitle:string,
    buttonTitle:string,
    path:string
}> = ({title,subTitle,buttonTitle,path}) => {
  return (
    <>
    <div className="flex justify-between items-center ">
      <div className='flex flex-col gap-3'>
        <Typography  variant={'h6'} size={'medium'} >{title}</Typography>
        <Typography  className='colorText ' variant={'subtitle2'} size={'semibold'}>{subTitle}</Typography>
      </div>
      {
        buttonTitle!==''&&
      <div>
        <Link href={path}>
        
        <Button className='buttonSubmit'>

          <Plus className='border'></Plus>
          {buttonTitle}
          
          </Button>
        </Link>
      </div>
      }

    </div>
    <Separator></Separator>
    </>
  )
}

export default PageTitle
import React from 'react'
import Typography from '@/components/ui/typpgraphy'
import { Separator } from "@/components/ui/separator"
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

const PageTitle: React.FunctionComponent<{
    title?: string,
    subTitle?: string,
    buttonTitle?: string,
    path?: string,
    onButtonClick?: () => void
}> = ({ title, subTitle, buttonTitle, path, onButtonClick }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className='flex flex-col'>
          <Typography variant={'h6'} size={'medium'}>{title}</Typography>
          <Typography className='colorText text-[15px]' size={'semibold'}>{subTitle}</Typography>
        </div>
        {buttonTitle !== '' && (
          <div>
            <Button className='buttonSubmit' onClick={onButtonClick}>
              <Plus className='border' />
              {buttonTitle}
            </Button>
          </div>
        )}
      </div>
      <Separator />
    </>
  )
}

export default PageTitle

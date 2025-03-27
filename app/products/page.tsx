import React from 'react'
import PageTitle from '@/components/global/PageTitle'
import Breadcrumb from '@/components/global/Breadcrumb'
import { PRODUCT_PATH } from '@/routes/path'
const page = () => {
  
  return (
    <>
   
        <PageTitle title='Prodcuts' subTitle='View and manage products' buttonTitle='add Product' path={PRODUCT_PATH.AddPRODUCT}></PageTitle>
    </>
  )
}

export default page
'use client'
import React from 'react'
import PageTitle from '@/components/global/PageTitle'
import { useTranslation } from 'react-i18next'
const page = () => {
  const {t}=useTranslation()
  return (
    <div>
      <PageTitle title={t('Products.add_Product')}></PageTitle>
    </div>
  )
}

export default page
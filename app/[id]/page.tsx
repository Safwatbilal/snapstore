'use client'
import React, { useState, useEffect, use } from 'react'

import queries from '@/api/product/qyery'
import { IProductForm } from '@/api/product/type'
import DetailsProduct from '@/components/global/DetailsProduct';

interface Params {
  id: string;
}

interface IHomeForm extends IProductForm {
  params: Promise<Params>;
}

const HomeId: React.FC<IHomeForm> = ({ params }) => {
  const { id } = use(params) 
  

  return (
    <DetailsProduct id={id}> 
    
    </DetailsProduct>
  )
}

export default HomeId

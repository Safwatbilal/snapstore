'use client'
import React from 'react'
import { AnalysisPrice } from '@/components/analysis/analysis'
import { AnalysisProduct } from '@/components/analysis/analysisProduct'
import queries from '@/api/product/qyery'
import { Component } from '@/components/analysis/analysisCategory'
const page = () => {
  const userId=localStorage.getItem('token')
  const { data: products ,isLoading} = queries.getAllProducts(userId);
  //console.log(products)
  if(isLoading){
    return <>aa</>
  }
  return (
    <>
    
      <AnalysisPrice></AnalysisPrice>

      <AnalysisProduct products={products}></AnalysisProduct>
      {/* <Component></Component> */}
    </>
  )
}

export default page
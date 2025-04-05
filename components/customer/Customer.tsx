'use client'
import React from 'react'
import queries from '@/api/product/qyery'
const Customer = () => {
    const userId=localStorage.getItem('token')
    const {data}=queries.getAllProducts(userId)
    console.log(data)
  return (
    <div>customer</div>
  )
}

export default Customer
'use client'
import React from 'react'
import PageTitle from '@/components/global/PageTitle'
import { PRODUCT_PATH } from '@/routes/path'
import Cards from '@/components/global/Cards'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import queries from '@/api/product/api'
import SearchInput from '@/components/global/search'
import { useSelector } from 'react-redux'
import { Skeleton } from '@/components/ui/skeleton'

const page = () => {
  const userId = localStorage.getItem('token')
  const { search } = useSelector((state: IRootState) => state.control);
  const { data: products, isLoading } = queries.getAllProducts(userId, search)
  
  console.log(isLoading)

  return (
    <>
      <PageTitle title='Products' subTitle='View and manage products' buttonTitle='Add Product' path={PRODUCT_PATH.AddPRODUCT} />
      <SearchInput />
     
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3}>
          {isLoading ? (
           
            [...Array(6)].map((_, index) => (
              <Grid item className='flex justify-center' xs={12} sm={6} md={4} key={index}>
                <Cards isLoading={true} />
              </Grid>
            ))
          ) : (
            
            products?.map(({ category, description, imageUrl, price, productName }, index) => (
              <Grid item className='flex justify-center' xs={12} sm={6} md={4} key={index}>
                <Cards
                  isLoading={false}
                  category={category}
                  description={description}
                  imageUrl={imageUrl}
                  price={price}
                  productName={productName}
                  
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  )
}

export default page

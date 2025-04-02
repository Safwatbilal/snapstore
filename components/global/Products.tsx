import React from 'react'
import Cards from '@/components/global/Cards';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { IProductForm } from '@/api/product/type';
const Products:React.FC<{products:IProductForm[],isLoading:boolean,handleProductEdit: (id: string) => void}> = ({isLoading,handleProductEdit,products}) => {
  console.log(products)
    return (
   
    <Box sx={{ width: '100%' }}>
    <Grid container spacing={3}>
      {isLoading ? (
        [...Array(6)].map((_, index) => (
          <Grid item className="flex justify-center" xs={12} sm={6} md={4} key={index}>
            <Cards isLoading={true} />
          </Grid>
        ))
      ) : (
        products?.map(({ category, description, imageUrl, price, productName, id,userId }, index) => (
          <Grid item className="flex justify-center"  xs={12} sm={6} md={4} lg={3} xl={3} key={id}>
            <Cards
              isLoading={false}
              categoryName={category.categoryName}
              description={description}
              imageUrl={imageUrl}
              price={price}
              productName={productName}
              productId={id}
              onEdit={handleProductEdit} 
              userId={userId}
            />
          </Grid>
        ))
      )}
    </Grid>
  </Box>

  )
}

export default Products
import React from 'react';
import Cards from '@/components/global/Cards';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { IProductForm } from '@/api/product/type';
import CardSkeleton from './CardSkeleton';
import NoData from './noData/NoData';

const Products: React.FC<{
  products: IProductForm[];
  isLoading: boolean;
  handleProductEdit?: (id: string) => void;
}> = ({ products, isLoading, handleProductEdit }) => {

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={1}>
        {isLoading &&
          [...Array(8)].map((_, index) => (
            <Grid item className="flex justify-center" xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
              <CardSkeleton />
            </Grid>
          ))
        }
        {!isLoading &&
          products.map(({ category, description, imageUrl, price, productName, id, userId }) => (
            <Grid item className="flex justify-center p-0" xs={12} sm={6} md={4} lg={3} xl={3} key={id}>
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
        }
        {products&&products.length===0&&<NoData title='no products'></NoData>}
      </Grid>
    </Box>
  );
};

export default Products;

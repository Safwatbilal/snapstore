'use client'
import React, { useState } from 'react';
import PageTitle from '@/components/global/PageTitle';
import queries from '@/api/product/qyery';
import SearchInput from '@/components/global/search';
import { useSelector } from 'react-redux';
import ProductsActions from '@/components/products/products-actions';
import { useDispatch } from 'react-redux';
import { updateControlState } from '@/store/slice/control';
import Products from '@/components/global/Products';

const page = () => {
  const userId = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { search } = useSelector((state: IRootState) => state.control);
  const { data: products, isLoading } = queries.getAllProducts(userId, search);
  const [idProduct, setIdProduct] = useState<string | null>(null);

  const handleProductEdit = (value: string) => {
    setIdProduct(value);
    dispatch(updateControlState({ key: 'openSheet', payload: true }));
  };

  const handleOpenSheet = () => {
    setIdProduct('');
    dispatch(updateControlState({ key: 'openSheet', payload: true }));
  };
  console.log(products)


  return (
    <>
      <PageTitle
        title="Products"
        subTitle="View and manage products"
        buttonTitle="Add Product"
        onButtonClick={handleOpenSheet}
      />
      <SearchInput />

      {/* <Box sx={{ width: '100%' }}>
        <Grid container spacing={3}>
          {isLoading ? (
            [...Array(6)].map((_, index) => (
              <Grid item className="flex justify-center" xs={12} sm={6} md={4} key={index}>
                <Cards isLoading={true} />
              </Grid>
            ))
          ) : (
            products?.map(({ category, description, imageUrl, price, productName, id }, index) => (
              <Grid item className="flex justify-center" xs={12} sm={6} md={4} key={id}>
                <Cards
                  isLoading={false}
                  categoryName={category.categoryName}
                  description={description}
                  imageUrl={imageUrl}
                  price={price}
                  productName={productName}
                  productId={id}
                  onEdit={handleProductEdit} 
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box> */}
      <Products isLoading={isLoading} products={products} handleProductEdit={handleProductEdit} ></Products>

      <ProductsActions id={idProduct} />
    </>
  );
};

export default page;

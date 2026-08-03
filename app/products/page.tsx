"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/global/PageTitle";
import queries from "@/api/product/qyery";
import SearchInput from "@/components/global/search";
import { useSelector } from "react-redux";
import ProductsActions from "@/components/products/products-actions";
import { useDispatch } from "react-redux";
import { updateControlState } from "@/store/slice/control";
import Products from "@/components/global/Products";

const Page = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("token"));
  }, []);
  const dispatch = useDispatch();
  const { search } = useSelector((state: IRootState) => state.control);
  const { data: products, isLoading } = queries.getAllProducts(userId, search);
  const [idProduct, setIdProduct] = useState<string | null>(null);

  const handleProductEdit = (value: string) => {
    setIdProduct(value);
    dispatch(updateControlState({ key: "openSheet", payload: true }));
  };

  const handleOpenSheet = () => {
    setIdProduct("");
    dispatch(updateControlState({ key: "openSheet", payload: true }));
  };
  console.log(products);

  return (
    <>
      <PageTitle
        title="Products"
        subTitle="View and manage products"
        buttonTitle="Add Product"
        onButtonClick={handleOpenSheet}
      />
      <SearchInput />
      <Products
        isLoading={isLoading}
        products={products}
        handleProductEdit={handleProductEdit}
      ></Products>

      <ProductsActions id={idProduct} />
    </>
  );
};

export default Page;

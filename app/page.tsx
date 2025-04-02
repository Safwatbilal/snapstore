'use client';
import React from 'react';
import PageTitle from '@/components/global/PageTitle';
import SearchInput from '@/components/global/search';
import { useTranslation } from 'react-i18next';
import queries from '@/api/product/qyery';
import Products from '@/components/global/Products';
import { useSelector } from 'react-redux';
export default function Home() {
  const { t } = useTranslation();
  const { search } = useSelector((state: IRootState) => state.control);
  const { data:products, isLoading } = queries.getAllProducts('0',search);
  
  return (
    <>
      <PageTitle title={t('sidebar.Home')} />
      <SearchInput />
        <Products products={products} isLoading={isLoading} />
    </>
  );
}

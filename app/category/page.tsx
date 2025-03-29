'use client'
import React, { useState } from 'react'
import PageTitle from '@/components/global/PageTitle'
import { CATEGORY_PATH } from '@/routes/path'
import queries from '@/api/category/query'
import Table from '@/components/global/table'
import { useTranslation } from 'react-i18next'
import { TableCell, TableRow } from '@/components/ui/table'
import { useSelector } from 'react-redux'
import CategoryActions from '@/components/category/category-actions'
import { Button } from '@mui/material'

const Category = () => {
  const id = localStorage.getItem('token')
  const { t } = useTranslation()
  const { search } = useSelector((state: IRootState) => state.control);
  
  const { data: categories, isLoading } = queries.getAllCategory(id, search);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [idCategory, setIdCategory] = useState<string>()

  const handelId = (value: string) => {
      setIdCategory(value)
      setIsSheetOpen(true)
  }
  const handleOpenSheet=()=>{
    setIdCategory('')
    setIsSheetOpen(true)
  }

  const baseColumns = [
    { title: "#" },
    { title: "category.categoryName" },
    { title: "category.photoCategory" },
    { title: "global.options" },
  ];
  return (
    <>
      <PageTitle 
        title={t('category.category')} 
        subTitle={`${t('global.view_and_mange')} ${t('category.category')}`} 
        buttonTitle={t('category.add_category')} 
        path={undefined} 
        onButtonClick={ handleOpenSheet} 
      />

      <Table columns={baseColumns} isLoading={isLoading}>
        {categories?.map(({ categoryName, url,id }, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{categoryName}</TableCell>
            <TableCell>
              <img 
                src={url} 
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "9999px",
                  objectFit: "cover",
                }}
              />
            </TableCell>
            <TableCell>
              <Button onClick={()=>handelId(id)}>ss</Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <CategoryActions  id={idCategory} isOpen={isSheetOpen} setIsOpen={setIsSheetOpen} />
    </>
  )
}

export default Category

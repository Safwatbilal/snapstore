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
import { dispatch } from '@/store/store'
import { updateControlState } from '@/store/slice/control'
import { Edit } from 'lucide-react'

const Category = () => {
  const id = localStorage.getItem('token')
  const { t } = useTranslation()
  const { search } = useSelector((state: IRootState) => state.control);
  
  const { data: categories, isLoading } = queries.getAllCategory(id, search);
  const [idCategory, setIdCategory] = useState<string>()
console.log(categories)
  const handelId = (value: string) => {
      setIdCategory(value)
      dispatch(updateControlState({key:'openSheet',payload:true}))
  }
  const handleOpenSheet=()=>{
    setIdCategory('')
    dispatch(updateControlState({key:'openSheet',payload:true}))
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
              <Button onClick={()=>handelId(id)}>
                <Edit ></Edit>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <CategoryActions  id={idCategory}  />
    </>
  )
}

export default Category

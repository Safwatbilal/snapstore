'use client'
import PageTitle from '@/components/global/PageTitle'
import { CATEGORY_PATH } from '@/routes/path'
import queries from '@/api/category/query'
import Table from '@/components/global/table'
import { useTranslation } from 'react-i18next'
import { TableCell,TableRow } from '@/components/ui/table'
import { useSelector } from 'react-redux'
const category = () => {
  const id=localStorage.getItem('token')
  const {t}=useTranslation()
  const { search } = useSelector((state: IRootState) => state.control);
  console.log(search)
  const { data: categories, isLoading } = queries.getAllCategory(id,search);
  console.log(categories)
  const baseColumns = [
    {
      title: "#",
    },
    {
      title: "category.categoryName",
    },
    {
      title: "category.photoCategory",
    },
    {
      title: "global.options",
    },
  ];
  console.log(categories)
  return (
    <>
      <PageTitle title={t('category.category')} subTitle={`${t('global.view_and_mange')}${' '}${t('category.category')}`} buttonTitle={t('category.add_category')} path={CATEGORY_PATH.ADDCATEGORY}></PageTitle>
      <Table columns={baseColumns} isLoading={isLoading}  >
        {categories?.map(({ categoryName, url }, index) => (
          <TableRow key={index}>
            <TableCell  >{index + 1}</TableCell>
            <TableCell>{categoryName}</TableCell>
            <TableCell className=''>
              <img src={url}  style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "9999px",
                      objectFit: "cover",
                    }}/>
              
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}

export default category
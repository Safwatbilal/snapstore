'use client'
import PageTitle from '@/components/global/PageTitle'
import { CATEGORY_PATH } from '@/routes/path'
import queries from '@/api/category/query'
import { Table } from '@/components/ui/table'
import { useTranslation } from 'react-i18next'
const category = () => {
  const id=localStorage.getItem('token')
  const {t}=useTranslation()
  const { data: categories, isLoading } = queries.getAllCategory(id);
  const baseColumns = [
    {
      title: "#",
    },
    {
      title: "global.title",
    },
    {
      title: "global.created_at",
    },
    {
      title: "global.status",
    },
    {
      title: "global.options",
    },
  ];
  return (
    <>
      <PageTitle title={t('category.category')} subTitle={`${t('global.view_and_mange')}${' '}${t('category.category')}`} buttonTitle={t('category.add_category')} path={CATEGORY_PATH.ADDCATEGORY}></PageTitle>
      <Table ></Table>
    </>
  )
}

export default category
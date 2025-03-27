'use client'
import PageTitle from '@/components/global/PageTitle'
import { CATEGORY_PATH } from '@/routes/path'
import queries from '@/api/category/query'
import { Table } from '@/components/ui/table'
const category = () => {
  const id=localStorage.getItem('token')
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
      <PageTitle title='Category' subTitle='view and mange category' buttonTitle='add category' path={CATEGORY_PATH.ADDCATEGORY}></PageTitle>
    <Table ></Table>
    
    </>
  )
}

export default category
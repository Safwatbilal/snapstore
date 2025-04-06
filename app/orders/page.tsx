'use client'
import React from 'react'
import queries from '@/api/order/query'
import Overview from '@/components/orders/Overview'
import PageTitle from '@/components/global/PageTitle'
import Table from '@/components/global/table'
import { TableCell, TableRow } from '@/components/ui/table'
import ImageWithCheck from '@/components/global/ImageWithCheck'
import { formatDate } from '@/components/global/format'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store/rootReducers'
import StateBedget from '@/components/global/StateBedget'
const page = () => {
  const userId=localStorage.getItem('token')
  let rowIndex = 1;
  const {state}=useSelector((state:IRootState)=>state.control)
  const {data:myOrders,isLoading}=queries.getAllOrderToUser(userId as string,state) 
    console.log(myOrders)
  const baseColumns = [
    { title: '#' },
    { title: 'Image' },
    { title: 'Price' },
    { title: 'Name' },
    { title: 'Quantity' },
    { title: 'Total Price' },
    { title: 'Order Date' },
    { title: 'State' },

  ];
console.log(state)
  return (
    <>
    <PageTitle title='Orders' subTitle='view and mange orders'></PageTitle>
    
        <Overview  customer={false}></Overview>
     
    <Table columns={baseColumns} isLoading={isLoading}>
      {myOrders?.map((order) =>
        order.cartArray.map((item, i) => (
          <TableRow key={`${order.id}-${i}`} className='hover:bg-blue-200 '>
            <TableCell>{rowIndex++}</TableCell>
            <TableCell>
              <ImageWithCheck src={item.imageUrl} alt={item.productName} width='30px' height='30px'></ImageWithCheck>
                     </TableCell>
            <TableCell>{item.price}$</TableCell>
            <TableCell>{item.productName}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.quantity * item.price}$</TableCell>
            <TableCell>{
              formatDate(item.timeOrder)
              
            }</TableCell>
            <TableCell>
              <StateBedget state={item.state}>{item.state}</StateBedget>
            </TableCell>
          </TableRow>
        ))
      )}
    </Table>

    </>
  )
}

export default page
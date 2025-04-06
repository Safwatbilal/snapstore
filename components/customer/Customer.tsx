'use client'

import React, { useState } from 'react'
import queries from '@/api/order/query'
import Overview from '../orders/Overview'
import PageTitle from '../global/PageTitle'
import Table from '../global/table'
import { TableCell, TableRow } from '../ui/table'
import { formatDate } from '../global/format'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from '../ui/badge'
import { Eye, Info, Package } from "lucide-react"
import TooltipButton from '../global/tooltipButton'
import { useRouter } from 'next/navigation'
import { IconButton } from '@mui/material'
import StateBedget from '../global/StateBedget'
import Link from 'next/link'
import DetailsProduct from '../global/DetailsProduct'

const Customer = () => {
  const router = useRouter()
  const userId = localStorage.getItem('token')
  let rowIndex = 1
  const [stateOpen, setstateOpen] = useState<boolean|null>(null);
  const { data: muCustomer, isLoading } = queries.getAllOrdersToOwner(userId as string)
  const handleOpenProduct=()=>{
    setstateOpen(true)
  }
  const baseColumns = [
    { title: '#' },
    { title: 'Customer Name' },
    { title: 'Order Date' },
    { title: 'State' },
    { title: 'Options' }
  ]

  return (
    <>
      <PageTitle title='Customers' subTitle='View and manage customer orders' />
      <Overview customer={true} />
      <Table columns={baseColumns} isLoading={isLoading}>
        {muCustomer?.map((order) =>
          order.cartArray.map((customer) => (
            <TableRow key={rowIndex}>
              <TableCell>{rowIndex++}</TableCell>
              <TableCell>{customer.productName}</TableCell>
              <TableCell>{formatDate(customer.timeOrder)}</TableCell>
              <TableCell>
                    <StateBedget state={customer.state}>{customer.state}</StateBedget>
                </TableCell>
              <TableCell className="flex justify-center gap-2">
                <Dialog>
                  <DialogTrigger>
                    <TooltipButton
                      title='View product details'
                      icon={
                        <IconButton className='!p-0'>
                            <Eye  size={20} className='dark:text-white '/>
                        </IconButton>
                      }
                    />
                    </DialogTrigger>
                      <DialogContent className='!max-w-[500px] !max-h-[300px]'>
                        <DialogHeader>
                          <DialogTitle>Customer Details</DialogTitle>
                          <DialogDescription>
                            Here are the full details related to this order:
                          </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Dialog onOpenChange={handleOpenProduct}>
                    <DialogTrigger asChild>  
                      <TooltipButton
                        title='View product details'
                        icon={
                        <IconButton className='!p-0 ' onClick={handleOpenProduct}>
                                
                                  <Info size={20}  className='dark:text-white'>
                                
                                  </Info>
                                
                        </IconButton>
                        }
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DetailsProduct id={customer.productId}></DetailsProduct>
                    </DialogContent>
                  </Dialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </Table>
    </>
  )
}

export default Customer

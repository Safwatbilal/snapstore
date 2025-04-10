'use client'
import { toast } from 'sonner'
import React, { useState } from 'react'
import queries from '@/api/order/query'
import Overview from '../orders/Overview'
import PageTitle from '../global/PageTitle'
import Table from '../global/table'
import { TableCell, TableRow } from '../ui/table'
import { formatDate } from '../global/format'
import { useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RemoveCircleOutline } from '@mui/icons-material';

import { Badge } from '../ui/badge'
import { Box, Check, Eye, Inbox, Info, XCircle } from "lucide-react"
import TooltipButton from '../global/tooltipButton'
import { useRouter } from 'next/navigation'
import { IconButton } from '@mui/material'
import StateBedget from '../global/StateBedget'
import Link from 'next/link'
import DetailsProduct from '../global/DetailsProduct'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store/rootReducers'
import NoData from '../global/noData/NoData'

const Customer = () => {
  const router = useRouter()
  const queryClient =useQueryClient()
  const {state}=useSelector((state:IRootState)=>state.control)
  const userId = localStorage.getItem('token')
  let rowIndex = 1
  const [stateOpen, setstateOpen] = useState<boolean|null>(null);
  const { data: myCustomer, isLoading } = queries.getAllOrdersToOwner(userId as string,state)
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
  console.log(myCustomer)
  const { mutate: changeState, isPending } = queries.changeStateOrder();

  const handleChangeState = ({ id,productId ,state }: { id: string; productId:string;state: string }) => {
    changeState(
      { id,productId ,state },
      {
        onSuccess: () => {
          toast.success("Done");
          queryClient.invalidateQueries({queryKey:['orders']})
         
        },

      }
    );
  };
  console.log(myCustomer)
  return (
    <>
   
      <PageTitle title='Customers' subTitle='View and manage customer orders' />
      <Overview customer={true} />
      <Table columns={baseColumns} isLoading={isLoading}>
        {myCustomer?.map((order) =>
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
                        <Badge className='cursor-pointer' variant='outline'>
                            <Eye  size={20} className='dark:text-white '/>
                        </Badge>
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
                        <Badge className='cursor-pointer' variant='outline' onClick={handleOpenProduct}>
                                
                                  <Info size={20}  className='dark:text-white'>
                                
                                  </Info>
                                
                        </Badge>
                        }
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DetailsProduct id={customer.productId}></DetailsProduct>
                    </DialogContent>
                  </Dialog>
                  <TooltipButton
                        title='accepted order'
                        icon={
                          <button
                            onClick={() => handleChangeState({ id: order.id, productId: customer.productId, state: "accepted" })}
                            disabled={customer.state === "accepted"||customer.state==='completed'||customer.state}
                            className="outline-none"
                          >
                            <Badge
                              className={`cursor-pointer text-green-500 ${(customer.state === "accepted" ||customer.state==='completed') ? "opacity-50 pointer-events-none" : ""}`}
                              variant='outline'
                            >
                              <Check />
                            </Badge>
                          </button>
                        }
                      />

                      <TooltipButton
                        title='cancelled order'
                        icon={
                          <button
                            onClick={() => handleChangeState({ id: order.id, productId: customer.productId, state: "cancelled" })}
                            disabled={customer.state === "cancelled"||customer.state==='completed'}
                            className="outline-none"
                          >
                            <Badge
                              className={`cursor-pointer text-red-500 ${(customer.state === "cancelled"||customer.state==='completed') ? "opacity-50 pointer-events-none" : ""}`}
                              variant='outline'
                            >
                              <XCircle />
                            </Badge>
                          </button>
                        }
                      />

              </TableCell>
            </TableRow>
          ))
        )}
      </Table>
      {!isLoading && myCustomer && myCustomer[0]?.cartArray.length === 0 && <NoData title="no customer" />}

    </>
  )
}

export default Customer

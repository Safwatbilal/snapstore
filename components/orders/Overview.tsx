import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { dispatch } from '@/store/store';
import { updateControlState } from '@/store/slice/control';
import queries from '@/api/order/query';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/rootReducers'

const Overview = () => {
  const userId = localStorage.getItem('token');
  const { data: orders,isLoading } = queries.getAllOrderToUser(userId as string, 'all');
  const currentState = useSelector((state: IRootState) => state.control.state);
  const countItemsByState = (state: string) =>
    orders?.reduce((total, order) => {
      return total + order.cartArray.filter((item) => item.state === state).length;
    }, 0);

  const pendingOrders = countItemsByState("pending");
  const completedOrders = countItemsByState("completed");
  const canceledOrders = countItemsByState("canceled");
  const acceptedOrders = countItemsByState("accepted");

  const AllOrders = pendingOrders + completedOrders + canceledOrders + acceptedOrders;

  const items = [
    {
      title: "Total Orders",
      description: "Last 30 days",
      count: AllOrders,
      state: "all",
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'all' })),
    },
    {
      title: "Pending Orders",
      description: "orders waiting",
      count: pendingOrders,
      state: "pending",
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'pending' })),
    },
    {
      title: "Completed Orders",
      description: "Delivered successfully",
      count: completedOrders,
      state: "completed",
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'completed' })),
    },
    {
      title: "Cancelled Orders",
      description: "Orders canceled",
      count: canceledOrders,
      state: "canceled",
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'canceled' })),
    },
    {
      title: "Accepted Orders",
      description: "Orders accepted",
      count: acceptedOrders,
      state: "accepted",
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'accepted' })),
    },
  ];

  return (
    <Grid container spacing={3} className="py-6">
      
      {items.map(({ title, description, count, onClick, state }, index) => (
        
        <Grid key={index} item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
          <Button
            variant='outlined'
            onClick={onClick}
            loading={isLoading}
            className="w-full h-full cursor-pointer !text-sm !p-0 !rounded-xl shadow-md !lowercase overflow-hidden"
          >
<Card className={`w-full h-full transition-all duration-200 ${currentState === state ? 'bg-[#1976d233]' : ''}`}>
<CardHeader className="p-0 mb-2">
                    <CardTitle className="text-base font-medium text-gray-700">{title}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">{description}</CardDescription>
                  </CardHeader>
              <CardContent />
              <CardFooter>
                <p className="">{count??0}</p>
              </CardFooter>
            </Card>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Overview;

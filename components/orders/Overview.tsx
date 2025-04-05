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
import { IOrderForm } from '@/api/order/type';

interface OverviewProps {
  orders: IOrderForm[];
}

const Overview = ({ orders }: OverviewProps) => {
  const countItemsByState = (state: string) =>
    orders.reduce((total, order) => {
      return total + order.cartArray.filter((item) => item.state === state).length;
    }, 0);

  const pendingOrders = countItemsByState("pending");
  const completedOrders = countItemsByState("completed");
  const canceledOrders = countItemsByState("canceled");
  const acceptedOrders = countItemsByState("accepted");

  const AllOrders = pendingOrders + completedOrders + canceledOrders + acceptedOrders;

  return (
    <Grid container spacing={2} className='py-5'>
      <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p>All orders placed in the last month.</p>
          </CardContent>
          <CardFooter>
            <p>{AllOrders}</p>
          </CardFooter>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
            <CardDescription>Orders waiting</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Orders still awaiting processing.</p>
          </CardContent>
          <CardFooter>
            <p>{pendingOrders}</p>
          </CardFooter>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <Card>
          <CardHeader>
            <CardTitle>Completed Orders</CardTitle>
            <CardDescription>Delivered successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Orders that have been delivered.</p>
          </CardContent>
          <CardFooter>
            <p>{completedOrders}</p>
          </CardFooter>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <Card>
          <CardHeader>
            <CardTitle>Cancelled Orders</CardTitle>
            <CardDescription>Orders canceled</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Orders that were canceled.</p>
          </CardContent>
          <CardFooter>
            <p>{canceledOrders}</p>
          </CardFooter>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <Card>
          <CardHeader>
            <CardTitle>Accepted Orders</CardTitle>
            <CardDescription>Orders accepted</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Orders that are now being processed.</p>
          </CardContent>
          <CardFooter>
            <p>{acceptedOrders}</p>
          </CardFooter>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Overview;

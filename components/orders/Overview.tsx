import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { dispatch } from '@/store/store';
import { updateControlState } from '@/store/slice/control';
import queries from '@/api/order/query';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/rootReducers';
import { Badge } from '../ui/badge';
import StateBedget from '../global/StateBedget';

interface OverviewPropos {
  customer: boolean;
}

const Overview: React.FC<OverviewPropos> = ({ customer }) => {
  const userId = localStorage.getItem('token');
  const { data: orders, isLoading } = customer ? queries.getAllOrdersToOwner(userId) : queries.getAllOrderToUser(userId as string, 'all');
  const currentState = useSelector((state: IRootState) => state.control.state);
  const today = new Date();

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const sixtyDaysAgo = new Date(today);
  sixtyDaysAgo.setDate(today.getDate() - 60);

  const countItemsByStateAndDate = (state: string, startDate: Date, endDate: Date) =>
    orders?.reduce((total, order) => {
      return total + order.cartArray.filter((item) => {
        const itemDate = new Date(item.timeOrder);
        return item.state === state && itemDate >= startDate && itemDate < endDate;
      }).length;
    }, 0);

  const countItemsByStateAllTime = (state: string) =>
    orders?.reduce((total, order) => {
      return total + order.cartArray.filter((item) => item.state === state).length;
    }, 0);

  const pendingOrders30Days = countItemsByStateAndDate("pending", thirtyDaysAgo, today);
  const completedOrders30Days = countItemsByStateAndDate("completed", thirtyDaysAgo, today);
  const canceledOrders30Days = countItemsByStateAndDate("canceled", thirtyDaysAgo, today);
  const acceptedOrders30Days = countItemsByStateAndDate("accepted", thirtyDaysAgo, today);

  const pendingOrdersPrevious30Days = countItemsByStateAndDate("pending", sixtyDaysAgo, thirtyDaysAgo);
  const completedOrdersPrevious30Days = countItemsByStateAndDate("completed", sixtyDaysAgo, thirtyDaysAgo);
  const canceledOrdersPrevious30Days = countItemsByStateAndDate("canceled", sixtyDaysAgo, thirtyDaysAgo);
  const acceptedOrdersPrevious30Days = countItemsByStateAndDate("accepted", sixtyDaysAgo, thirtyDaysAgo);

  const calculatePercentageChange = (currentCount: number, previousCount: number) => {
    if (previousCount === 0 && currentCount > 0) return 100;
    if (previousCount === 0 && currentCount === 0) return 0;
    return ((currentCount - previousCount) / previousCount) * 100;
  };

  const pendingOrdersPercentage = calculatePercentageChange(pendingOrders30Days, pendingOrdersPrevious30Days);
  const completedOrdersPercentage = calculatePercentageChange(completedOrders30Days, completedOrdersPrevious30Days);
  const canceledOrdersPercentage = calculatePercentageChange(canceledOrders30Days, canceledOrdersPrevious30Days);
  const acceptedOrdersPercentage = calculatePercentageChange(acceptedOrders30Days, acceptedOrdersPrevious30Days);

  const AllOrders = pendingOrders30Days + completedOrders30Days + canceledOrders30Days + acceptedOrders30Days;

  const items = [
    {
      title: "Total Orders",
      description: "Last 30 days",
      count: AllOrders,
      state: "all",
      percentage:( pendingOrdersPercentage+completedOrdersPercentage+completedOrdersPercentage+acceptedOrdersPercentage)/4,
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'all' })),
    },
    {
      title: "Pending Orders",
      description: "orders waiting",
      count: pendingOrders30Days,
      state: "pending",
      percentage: pendingOrdersPercentage,
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'pending' })),
    },
    {
      title: "Completed Orders",
      description: "Delivered successfully",
      count: completedOrders30Days,
      state: "completed",
      percentage: completedOrdersPercentage,
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'completed' })),
    },
    {
      title: "Cancelled Orders",
      description: "Orders canceled",
      count: canceledOrders30Days,
      state: "canceled",
      percentage: completedOrdersPercentage,
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'canceled' })),
    },
    {
      title: "Accepted Orders",
      description: "Orders accepted",
      count: acceptedOrders30Days,
      state: "accepted",
      percentage: acceptedOrdersPercentage,
      onClick: () => dispatch(updateControlState({ key: 'state', payload: 'accepted' })),
    },
  ];

  return (
    <Grid container spacing={3} className="py-6">
      {items.map(({ title, description, count, percentage, onClick, state }, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
          <Button
            variant='outlined'
            onClick={onClick}
            className="w-full h-full cursor-pointer !text-sm !p-0 !rounded-xl shadow-md !lowercase overflow-hidden"
          >
            <Card className={`w-full h-full transition-all duration-200 ${currentState === state ? 'bg-[#1976d233]' : ''}`}>
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-base font-medium text-gray-700">{title}</CardTitle>
                <CardDescription className="text-xs text-gray-500">{description}</CardDescription>
              </CardHeader>
                <CardContent className='flex  justify-between '>

                {percentage && percentage < 0 && (
                  <Badge variant='secondary' className="text-green-500 shadow-lg"  >
                    +{percentage.toFixed(1)}%
                  </Badge>
                )}
                {percentage && percentage > 0 && (
                  <Badge variant='outline' className="text-red-500 shadow-lg">
                    -{percentage.toFixed(1)}%
                  </Badge>
                )}
                <StateBedget state={state}>{count ?? 0}</StateBedget>
                </CardContent>
                 
            </Card>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Overview;

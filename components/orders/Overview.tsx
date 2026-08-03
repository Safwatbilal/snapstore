import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Grid from "@mui/material/Grid";
import { Button, Skeleton } from "@mui/material";
import { dispatch } from "@/store/store";
import { updateControlState } from "@/store/slice/control";
import queries from "@/api/order/query";
import { useSelector } from "react-redux";
import { IRootState } from "@/store/rootReducers";
import { Badge } from "../ui/badge";
import StateBedget from "../global/StateBedget";
import OverViewSkeleton from "../global/OverViewSkeleton";
import { getOrderStatistics } from "@/util/orderStats";

interface OverviewPropos {
  customer: boolean;
}

const Overview: React.FC<OverviewPropos> = ({ customer }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("token"));
  }, []);
  const { data: orders, isLoading } = customer
    ? queries.getAllOrdersToOwner(userId as string, "all")
    : queries.getAllOrderToUser(userId as string, "all");
  const currentState = useSelector((state: IRootState) => state.control.state);
  const {
    pending30,
    completed30,
    canceled30,
    accepted30,
    pendingPercent,
    completedPercent,
    canceledPercent,
    acceptedPercent,
    totalOrders,
    totalPercent,
  } = getOrderStatistics(orders);

  const items = [
    {
      title: "Total Orders",
      description: "Last 30 days",
      count: totalOrders,
      state: "all",
      percentage: totalPercent,
      onClick: () =>
        dispatch(updateControlState({ key: "state", payload: "all" })),
    },
    {
      title: "Pending Orders",
      description: "orders waiting",
      count: pending30,
      state: "pending",
      percentage: pendingPercent,
      onClick: () =>
        dispatch(updateControlState({ key: "state", payload: "pending" })),
    },
    {
      title: "Completed Orders",
      description: "Delivered successfully",
      count: completed30,
      state: "completed",
      percentage: completedPercent,
      onClick: () =>
        dispatch(updateControlState({ key: "state", payload: "completed" })),
    },
    {
      title: "Cancelled Orders",
      description: "Orders canceled",
      count: canceled30,
      state: "cancelled",
      percentage: canceledPercent,
      onClick: () =>
        dispatch(updateControlState({ key: "state", payload: "cancelled" })),
    },
    {
      title: "Accepted Orders",
      description: "Orders accepted",
      count: accepted30,
      state: "accepted",
      percentage: acceptedPercent,
      onClick: () =>
        dispatch(updateControlState({ key: "state", payload: "accepted" })),
    },
  ];

  return (
    <Grid container spacing={3} className="py-6">
      {items.map(
        ({ title, description, count, percentage, onClick, state }, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
            {isLoading ? (
              <OverViewSkeleton />
            ) : (
              <Button
                variant="outlined"
                onClick={onClick}
                className="w-full h-full cursor-pointer !text-sm !p-0 !rounded-xl shadow-md !lowercase overflow-hidden "
              >
                <Card
                  className={`w-full h-full transition-all duration-200 ${currentState === state ? "bg-[#1976d233] " : ""}`}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base font-medium ">
                      {title}
                    </CardTitle>
                    <CardDescription className="text-xs ">
                      {description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center px-4 pb-4">
                    {percentage !== undefined && (
                      <Badge
                        variant={percentage > 0 ? "secondary" : "outline"}
                        className={`shadow-lg ${percentage > 0 ? "text-green-500" : percentage < 0 ? "text-red-500" : ""}`}
                      >
                        {percentage > 0
                          ? `+${percentage.toFixed(1)}%`
                          : `${percentage.toFixed(1)}%`}
                      </Badge>
                    )}
                    <StateBedget state={state}>{count ?? 0}</StateBedget>
                  </CardContent>
                </Card>
              </Button>
            )}
          </Grid>
        ),
      )}
    </Grid>
  );
};

export default Overview;

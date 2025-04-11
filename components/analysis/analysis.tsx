"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import queries from "@/api/order/query"
import { useSelector } from "react-redux"
import { IRootState } from "@/store/rootReducers"

const chartConfig = {
  price: {
    label: "Price Every Day ",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

function getGroupedOrders(data: any[], range: string) {
  const result: Record<string, { price: number }> = {}

  const now = new Date()
  let days = 90
  if (range === "30d") days = 30
  else if (range === "7d") days = 7

  const startDate = new Date(now)
  startDate.setDate(now.getDate() - days)

  data?.forEach((cart) => {
    cart.cartArray.forEach((item: any) => {
      const date = new Date(item.timeOrder)
      if (date < startDate) return

      const key = date.toISOString().split("T")[0]
      if (!result[key]) {
        result[key] = { price: 0 }
      }

      if (item.state === 'completed') {
        result[key].price += item.price * item.quantity
      }
    })
  })

  return Object.entries(result).map(([date, values]) => ({
    date,
    Price: values.price,
  }))
}

export function AnalysisPrice() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const userId = localStorage.getItem("token")

  const { data: anaylysis } = queries.getAllOrdersToOwner(userId as string, "all")
  const filteredData = React.useMemo(() => {
    return getGroupedOrders(anaylysis || [], timeRange)
  }, [anaylysis, timeRange])

  const { theme } = useSelector((state: IRootState) => state.control)
  const complet = theme === 'dark' ? 'white' : 'black'

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Orders Overview</CardTitle>
          <CardDescription>
            Price orders in the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="Price" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={complet}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={complet}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Price"
              type="natural"
              fill="url(#Price)"
              stroke="var(--color-accepted)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

"use client"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import React from "react"
import { useSelector } from "react-redux"
import { IRootState } from "@/store/rootReducers"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { IProductForm } from "@/api/product/type"

type AnalysisProductProps = {
    products: IProductForm[]
}

const chartConfig: any = {}

export const AnalysisProduct: React.FC<AnalysisProductProps> = ({ products }) => {
    const chartData = products.map((product, index) => {
        return {
            browser: product.productName,
            customer: product.completed ?? 0,
        };
    });
    const { theme } = useSelector((state: IRootState) => state.control)
    const complet = theme === 'dark' ? 'white' : 'black'
    return (
        <Card className="pt-12">
            <CardHeader>
                <CardTitle>Porduct Completed</CardTitle>
                <CardDescription>All Time</CardDescription>
            </CardHeader>
            <CardContent >
                <ChartContainer  config={chartConfig} >
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        
                    >
                        <defs>
                            <linearGradient id="blackGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor={complet} stopOpacity={0.7} />
                                <stop offset="100%" stopColor={complet} stopOpacity={0.2} />
                            </linearGradient>
                        </defs>

                        <YAxis
                            dataKey="browser"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <XAxis dataKey="customer" type="number"  />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="customer"   fill="url(#blackGradient)" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'
import { YearlySummary } from '@/lib/types/dashboard'

export const description = 'An area chart with axes'

interface chartAreaAxesProps {
    title: string,
    description: string,
    config: ChartConfig,
    data: YearlySummary['yearlyFinancialSummary']
};

export function ChartAreaAxes({ title, description, config, data }: chartAreaAxesProps) {
    console.log('Data for ChartAreaAxes:', data)
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={config} className="h-64 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: -20,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={value => value}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={5}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Area
                            dataKey="myIncomes"
                            type="natural"
                            fill="var(--color-myIncomes)"
                            fillOpacity={0.4}
                            stroke="var(--color-myIncomes)"
                        />
                        <Area
                            dataKey="myExpenses"
                            type="natural"
                            fill="var(--color-myExpenses)"
                            fillOpacity={0.4}
                            stroke="var(--color-myExpenses)"
                        />
                        <Area
                            dataKey="othersExpenses"
                            type="natural"
                            fill="var(--color-othersExpenses)"
                            fillOpacity={0.4}
                            stroke="var(--color-othersExpenses)"
                        />
                        <Area
                            dataKey="totalExpenses"
                            type="natural"
                            fill="var(--color-totalExpenses)"
                            fillOpacity={0.4}
                            stroke="var(--color-totalExpenses)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

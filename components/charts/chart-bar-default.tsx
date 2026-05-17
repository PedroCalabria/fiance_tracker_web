'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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

export const description = 'A bar chart'

interface ChartBarDefaultProps {
    title?: string
    description?: string
    data?: { xAxis: string; yAxis: number }[]
    config?: ChartConfig
    className?: string
    height?: number
}

const defaultChartData = [
    { xAxis: 'January', yAxis: 186 },
    { xAxis: 'February', yAxis: 305 },
    { xAxis: 'March', yAxis: 237 },
    { xAxis: 'April', yAxis: 73 },
    { xAxis: 'May', yAxis: 209 },
    { xAxis: 'June', yAxis: 214 },
]

const defaultChartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig

export function ChartBarDefault({
    title = 'Bar Chart',
    description = 'January - June 2024',
    data = defaultChartData,
    config,
    className,
    height = 300,
}: ChartBarDefaultProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={config || defaultChartConfig}
                    className="w-full"
                    style={{ height: `${height}px` }}
                >
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="xAxis"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="yAxis" fill="#000" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

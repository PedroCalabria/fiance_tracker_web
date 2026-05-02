'use client'

import { Pie, PieChart } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart'

export const description = 'A pie chart with a legend'

interface ChartPieLegendProps {
    title: string
    description: string
    data: { key: string; value: number; fill: string }[]
    config: ChartConfig
}

export function ChartPieLegend({
    title,
    description,
    data,
    config,
}: ChartPieLegendProps) {
    return (
        <Card className="flex flex-col h-fill">
            <CardHeader className="items-center">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={config}
                    className="mx-auto aspect-square"
                >
                    <PieChart className="mx-auto aspect-square overflow-visible">
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={data} dataKey="value" label nameKey="key" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="key" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/5 *:justify-center w-full"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

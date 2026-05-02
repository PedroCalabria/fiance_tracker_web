'use client'

import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TrendingUpIcon, TrendingDownIcon, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { useDashboardSummary } from '@/hooks/api'
import { formatCurrency } from '@/lib/utils'

export function SectionCards() {
    const { data: summary, isLoading } = useDashboardSummary()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="@container/card">
                        <CardHeader>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-32 mt-2" />
                        </CardHeader>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )
    }

    const cardsData = [
        {
            description: 'Monthly Balance',
            value: summary?.monthlyBalance
                ? formatCurrency(summary.monthlyBalance)
                : 'R$ 0,00',
            trend: summary?.balanceTrend,
        },
        {
            description: 'Monthly Income',
            value: summary?.myMonthlyIncome
                ? formatCurrency(summary.myMonthlyIncome)
                : 'R$ 0,00',
            trend: summary?.incomeTrend,
        },
        {
            description: 'Monthly Expenses',
            value: summary?.myMonthlyExpenses
                ? formatCurrency(summary.myMonthlyExpenses)
                : 'R$ 0,00',
            trend: summary?.expenseTrend,
        },
        {
            description: 'Total Savings',
            value: summary?.totalSavings
                ? formatCurrency(summary.totalSavings)
                : 'R$ 0,00',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
            {cardsData.map((card, index) => (
                <Card className="@container/card" key={index}>
                    <CardHeader>
                        <CardDescription>{card.description}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {card.value}
                        </CardTitle>
                        <CardAction>
                            {card.trend !== undefined && (
                                <Badge variant="outline">
                                    {card.trend < 0 ? (
                                        <TrendingDownIcon />
                                    ) : (
                                        <TrendingUpIcon />
                                    )}
                                    {Math.abs(card.trend).toFixed(1)}%
                                </Badge>
                            )}
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <Button
                            variant="ghost"
                            className="text-black w-full flex justify-between px-4 hover:cursor-pointer"
                        >
                            <span>See Details</span>
                            <ArrowRight />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

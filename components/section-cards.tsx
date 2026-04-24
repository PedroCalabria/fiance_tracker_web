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
import {
    TrendingUpIcon,
    TrendingDownIcon,
    Ghost,
    ArrowRight,
} from 'lucide-react'
import { ChartRadialSimple } from './charts/chart-radial-simple'
import { Button } from './ui/button'

const cardsData = [
    { value: 'R$ 1,234', description: 'Balance', trend: 20 },
    { value: 'R$ 1,234', description: 'Monthly Income', trend: -20 },
    { value: 'R$ 1,234', description: 'Monthly Expenses', trend: 20 },
    { value: 'R$ 1,234', description: 'Total Savings', trend: -20 },
]

export function SectionCards() {
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
                            <Badge variant="outline">
                                {card.trend < 0 ? (
                                    <TrendingDownIcon />
                                ) : (
                                    <TrendingUpIcon />
                                )}
                                {card.trend}%
                            </Badge>
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

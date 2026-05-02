'use client'

import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { ChartPieLegend } from '@/components/charts/chart-pie-legend'
import { ActivityTable } from '@/app/components/activity-table/activity-table'
import { ChartAreaAxes } from '@/components/charts/chart-area-axis'
import { ChartConfig } from '@/components/ui/chart'
import { useGetExpensesByCategory, useGetExpensesByResponsibleParty, useGetYearlySummary } from '@/hooks/api/useDashboard'
import { pieChartsColors } from '@/lib/consts/chartsColors'

const chartConfig = {
    myIncomes: {
        label: 'My Incomes',
        color: 'var(--chart-1)',
    },
    myExpenses: {
        label: 'My Expenses',
        color: 'var(--chart-2)',
    },
    othersExpenses: {
        label: 'Others Expenses',
        color: 'var(--chart-3)',
    },
    totalExpenses: {
        label: 'Total Expenses',
        color: 'var(--chart-4)',
    },
} satisfies ChartConfig

const GeneralView = () => {
    const { data: yearlySummary } = useGetYearlySummary();
    const { data: expensesByCategory } = useGetExpensesByCategory();
    const { data: expensesByResponsibleParty } = useGetExpensesByResponsibleParty();

    const expensesCategoryChartData =
        expensesByCategory?.chartData.map((item, index) => ({
            key: item.key,
            value: item.value,
            fill: pieChartsColors[index],
        })) || []
    
    const expensesCategoriesChartLabels = expensesCategoryChartData.reduce(
        (acc, item) => {
            acc[item.key] = {
                label: item.key,
                color: item.fill,
            }
            return acc
        },
        {} as ChartConfig
    )

    const expensesPartiesChartData =
        expensesByResponsibleParty?.chartData.map((item, index) => ({
            key: item.key,
            value: item.value,
            fill: pieChartsColors[index],
        })) || []

    const expensesPartiesChartLabels = expensesPartiesChartData.reduce(
        (acc, item) => {
            acc[item.key] = {
                label: item.key,
                color: item.fill,
            }
            return acc
        },
        {} as ChartConfig,
    )

    return (
        <div>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards />
                        <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
                            <div className="col-span-3">
                                <div className="mb-10">
                                    <ChartAreaAxes
                                        title="Incomes and Expenses"
                                        description="Monthly incomes and expenses for the last year"
                                        config={chartConfig}
                                        data={
                                            yearlySummary?.yearlyFinancialSummary ||
                                            []
                                        }
                                    />
                                </div>
                                <ActivityTable></ActivityTable>
                            </div>
                            <div className="col-span-1 align-center">
                                <div className="mb-5">
                                    <ChartPieLegend
                                        title="Expenses by Category"
                                        description="Distribution of expenses by category"
                                        data={expensesCategoryChartData}
                                        config={expensesCategoriesChartLabels}
                                    />
                                </div>
                                <ChartPieLegend
                                    title="Expenses by Responsible Parties"
                                    description="Distribution of expenses by responsible parties"
                                    data={expensesPartiesChartData}
                                    config={expensesPartiesChartLabels}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralView

import { ChartAreaInteractive } from '@/components/charts/chart-area-interactive';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { ChartPieLegend } from '@/components/charts/chart-pie-legend';
import { ActivityTable } from '@/app/components/activity-table/activity-table';
import { ChartAreaAxes } from '@/components/charts/chart-area-axis';
import { ChartConfig } from '@/components/ui/chart';

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-1)',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
    { month: 'July', desktop: 186, mobile: 80 },
    { month: 'August', desktop: 305, mobile: 200 },
    { month: 'September', desktop: 237, mobile: 120 },
    { month: 'October', desktop: 73, mobile: 190 },
    { month: 'November', desktop: 209, mobile: 130 },
    { month: 'December', desktop: 214, mobile: 140 },
]

const expensesCategoryChartData = [
    { key: 'chrome', value: 275, fill: 'var(--color-chrome)' },
    { key: 'safari', value: 200, fill: 'var(--color-safari)' },
    { key: 'firefox', value: 187, fill: 'var(--color-firefox)' },
    { key: 'edge', value: 173, fill: 'var(--color-edge)' },
    { key: 'other', value: 90, fill: 'var(--color-other)' },
];

const expensesPartiesChartData = [
    { key: 'chrome', value: 275, fill: 'var(--color-chrome)' },
    { key: 'safari', value: 200, fill: 'var(--color-safari)' },
    { key: 'firefox', value: 187, fill: 'var(--color-firefox)' },
    { key: 'edge', value: 173, fill: 'var(--color-edge)' },
    { key: 'other', value: 90, fill: 'var(--color-other)' },
];

const expensesCategoryChartConfig = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
        color: 'var(--chart-1)',
    },
    safari: {
        label: 'Safari',
        color: 'var(--chart-2)',
    },
    firefox: {
        label: 'Firefox',
        color: 'var(--chart-3)',
    },
    edge: {
        label: 'Edge',
        color: 'var(--chart-4)',
    },
    other: {
        label: 'Other',
        color: 'var(--chart-5)',
    },
} satisfies ChartConfig

const GeneralView = () => {
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
                                        data={chartData}
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
                                        config={expensesCategoryChartConfig}
                                    />
                                </div>
                                <ChartPieLegend
                                    title="Expenses by Responsible Parties"
                                    description="Distribution of expenses by responsible parties"
                                    data={expensesPartiesChartData}
                                    config={expensesCategoryChartConfig}
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

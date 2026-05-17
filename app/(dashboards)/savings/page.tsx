import { ChartBarDefault } from '@/components/charts/chart-bar-default'
import { SiteHeader } from '@/components/site-header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChartConfig } from '@/components/ui/chart'
import {
    Progress,
    ProgressIndicator,
    ProgressTrack,
} from '@/components/ui/progress'

const totalSavingsData = {
    totalSavings: 3000.65,
    savingsTarget: 10000,
}

const savingBucketsData = [
    {
        name: 'Emergency Fund',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Retirement Fund',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Vacation Fund',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Car Fund',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Wedding Fund',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Emergency Fund 2',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Retirement Fund 2',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Vacation Fund 2',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Car Fund 2',
        amount: 1500.25,
        target: 5000,
    },
    {
        name: 'Wedding Fund 2',
        amount: 1500.25,
        target: 5000,
    },
]

const chartConfig = {
    yAxis: {
        label: 'Savings',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig

const chartData = [
    { xAxis: 'January', yAxis: 500 },
    { xAxis: 'February', yAxis: 800 },
    { xAxis: 'March', yAxis: 1200 },
    { xAxis: 'April', yAxis: 1500 },
    { xAxis: 'May', yAxis: 2000 },
    { xAxis: 'June', yAxis: 3000 },
    { xAxis: 'July', yAxis: 3500 },
    { xAxis: 'August', yAxis: 4000 },
    { xAxis: 'September', yAxis: 4500 },
    { xAxis: 'October', yAxis: 5000 },
    { xAxis: 'November', yAxis: 5500 },
    { xAxis: 'December', yAxis: 6000 },
]

const activityData = [
    {
        description: 'Emergency Fund',
        amount: 500,
        date: '2024-08-01',
        type: 'deposit',
    },
    {
        description: 'Retirement Fund',
        amount: 300,
        date: '2024-08-02',
        type: 'withdrawal',
    },
    {
        description: 'Vacation Fund',
        amount: 200,
        date: '2024-08-03',
        type: 'deposit',
    },
    {
        description: 'Car Fund',
        amount: 400,
        date: '2024-08-04',
        type: 'withdrawal',
    },
    {
        description: 'Wedding Fund',
        amount: 600,
        date: '2024-08-05',
        type: 'withdrawal',
    },
    {
        description: 'Emergency Fund 2',
        amount: 500,
        date: '2024-08-06',
        type: 'deposit',
    },
    {
        description: 'Retirement Fund 2',
        amount: 300,
        date: '2024-08-07',
        type: 'withdrawal',
    },
]

const SavingsView = () => {
    return (
        <>
            <SiteHeader title="Savings" />
            <div className="px-6">
                <Card className="@container/card flex flex-col w-full h-fit bg-transparent p-4">
                    <h1>Total Savings</h1>
                    <div className="flex items-end mt-2">
                        <span className="text-4xl font-semibold">
                            R$ {totalSavingsData.totalSavings.toFixed(2)}
                        </span>
                        <span className="ml-5 text-sm text-muted-foreground">
                            of R$ {totalSavingsData.savingsTarget.toFixed(2)}{' '}
                            target
                        </span>
                    </div>
                    <div className="flex items-center mt-2 w-full">
                        <Progress
                            value={
                                (totalSavingsData.totalSavings /
                                    totalSavingsData.savingsTarget) *
                                100
                            }
                            className="mt-2 w-[80%]"
                        >
                            <ProgressTrack className="h-6">
                                <ProgressIndicator />
                            </ProgressTrack>
                        </Progress>
                    </div>
                </Card>
                <div className="border-none @container/card grid grid-cols-4 gap-2 w-full max-h-78 overflow-y-auto bg-transparent mt-5 p-[1px]">
                    {savingBucketsData.map((bucket) => (
                        <Card
                            key={bucket.name}
                            className="flex flex-col w-full h-fit bg-transparent p-4 gap-0"
                        >
                            <h2>{bucket.name}</h2>
                            <div className="flex flex-col items-center w-full mt-5">
                                <div className="flex justify-between w-full text-xs px-2">
                                    <span>Progress</span>
                                    <span>
                                        {(
                                            (bucket.amount / bucket.target) *
                                            100
                                        ).toFixed(2)}
                                        %
                                    </span>
                                </div>
                                <Progress
                                    value={
                                        (bucket.amount / bucket.target) * 100
                                    }
                                    className="mt-2 w-full"
                                >
                                    <ProgressTrack className="h-6">
                                        <ProgressIndicator />
                                    </ProgressTrack>
                                </Progress>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-xs">
                                    R$ {bucket.amount.toFixed(2)}
                                </span>
                                <span className="ml-5 text-sm font-semibold">
                                    R$ {bucket.target.toFixed(2)}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex my-5 w-full">
                    <ChartBarDefault
                        className="w-[60%]"
                        config={chartConfig}
                        data={chartData}
                    />
                    <Card className="w-[40%] h-fit bg-transparent p-4 pb-2 ml-5 max-h-100 overflow-y-auto">
                        <CardHeader className="mb-3">
                            <h2 className="text-lg font-semibold">
                                Recent Activities
                            </h2>
                        </CardHeader>
                        <CardContent>
                            {activityData.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center py-2 border border-gray-200 px-3 rounded-md mb-2"
                                >
                                    <div className="flex flex-col">
                                        <span>{activity.description}</span>
                                        <span className="text-xs text-gray-500">
                                            {activity.date}
                                        </span>
                                    </div>
                                    <span
                                        className={
                                            activity.type === 'deposit'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }
                                    >
                                        {' '}
                                        {activity.type === 'deposit'
                                            ? '+'
                                            : '-'}{' '}
                                        R$ {activity.amount.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default SavingsView

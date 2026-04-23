import ArrowDown from '../icons/arrow-down'
import ArrowUp from '../icons/arrow-up'
import { Card } from './card'

interface MoneyDescriptionCardProps {
    title: string
    subTitle: string
    icon: React.ReactNode
    balance: number
    percentageChange: number
    link: string
}

export const MoneyDescriptionCard = ({
    title,
    subTitle,
    icon,
    balance,
    percentageChange,
    link,
}: MoneyDescriptionCardProps) => {
    return (
        <Card>
            <div className="flex gap-3 mb-2 min-w-60">
                <Card>{icon}</Card>
                <div className="flex flex-col items-start text-center">
                    <h1 className="text-xl">{title}</h1>
                    <h2 className="text-sm text-gray-500">{subTitle}</h2>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <span className="text-xl font-bold">
                    R$ {balance.toFixed(2)}
                </span>
                <Card
                    className={`flex gap-1 py-1 ${percentageChange >= 0 ? 'bg-success/20 border-success/20' : 'bg-error/20 border-error/20'}`}
                >
                    {percentageChange >= 0 ? (
                        <ArrowUp className="w-3 h-3 mt-0.5 text-success" />
                    ) : (
                        <ArrowDown className="w-3 h-3 mt-0.5 text-error" />
                    )}
                    <span
                        className={`text-xs ${percentageChange >= 0 ? 'text-success' : 'text-error'}`}
                    >
                        {percentageChange && `${percentageChange.toFixed(2)}%`}
                    </span>
                </Card>
            </div>
        </Card>
    )
}

import { MoneyDescriptionCard } from '@/app/components/cards/money-description-card'
import WalletIcon from '@/app/components/icons/wallet-icon'

const GeneralView = () => {
    const user = "User";

    return (
        <div className="pt-5 pl-5">
            <div className="mb-6">
                <h2 className="text-3xl">Welcome, {user}!</h2>
            </div>
            <div className="grid grid-cols-18">
                <div className="col-span-3 flex justify-center">
                    <MoneyDescriptionCard
                        title="Total Balance"
                        subTitle="Last 30 days"
                        icon={<WalletIcon />}
                        balance={12345.67}
                        percentageChange={5.4}
                        link="/balance-details"
                    />
                </div>
                <div className="col-span-3 flex justify-center">
                    <MoneyDescriptionCard
                        title="Monthly Balance"
                        subTitle="Last 30 days"
                        icon={<WalletIcon />}
                        balance={12345.67}
                        percentageChange={-3.4}
                        link="/balance-details"
                    />
                </div>
                <div className="col-span-3 flex justify-center">
                    <MoneyDescriptionCard
                        title="Monthly Expenses"
                        subTitle="Last 30 days"
                        icon={<WalletIcon />}
                        balance={12345.67}
                        percentageChange={12.4}
                        link="/balance-details"
                    />
                </div>
            </div>
        </div>
    )
}

export default GeneralView

import { TransactionsTable } from "@/components/transactions-table/transactions-table"

const TransactionsView = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-8">Transactions View</h1>
            <TransactionsTable />
        </div>
    )
}

export default TransactionsView

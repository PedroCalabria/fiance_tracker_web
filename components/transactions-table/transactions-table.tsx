'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { TransactionsTableColumnsDef } from './transactions-table-columns-def'
import { useGetAllTransactions } from '@/hooks/api/useTransactions'
import { mockTransactionsData } from './transactions-table-mock-data'
import { TransactionsTableProvider } from './transactions-table-context'
import { TransactionsTableToolbar } from './transactions-table-toolbar'
import { AddTransactionModal } from './add-transaction-modal'

export const TransactionsTable = () => {
    const { data: transactionsTableData } = useGetAllTransactions()
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <TransactionsTableProvider>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <TransactionsTableToolbar />
                    </div>
                    <Button
                        size="sm"
                        className="shrink-0"
                        onClick={() => setModalOpen(true)}
                    >
                        <PlusIcon className="size-4" />
                        Add Transaction
                    </Button>
                </div>
                <DataTable
                    columns={TransactionsTableColumnsDef}
                    data={transactionsTableData || mockTransactionsData}
                />
            </div>
            <AddTransactionModal open={modalOpen} onOpenChange={setModalOpen} />
        </TransactionsTableProvider>
    )
}

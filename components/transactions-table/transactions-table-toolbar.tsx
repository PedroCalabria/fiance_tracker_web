'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
    useBatchUpdateTransactions,
    transactionKeys,
} from '@/hooks/api/useTransactions'
import { useTransactionsTable } from './transactions-table-context'

export function TransactionsTableToolbar() {
    const { dirtyState, clearDirtyState, isDirty, dirtyCount } =
        useTransactionsTable()
    const { mutate: batchUpdate, isPending } = useBatchUpdateTransactions()

    if (!isDirty) return null

    const handleSave = () => {
        const payload = Object.entries(dirtyState).map(([id, fields]) => ({
            id: Number(id),
            ...fields,
        }))
        batchUpdate(payload, {
            onSuccess: () => clearDirtyState(),
        })
    }

    return (
        <div className="flex items-center justify-between rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm dark:border-amber-700 dark:bg-amber-950/30">
            <span className="text-amber-700 dark:text-amber-400">
                {dirtyCount} row{dirtyCount !== 1 ? 's' : ''} with unsaved
                changes
            </span>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={clearDirtyState}
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save changes'}
                </Button>
            </div>
        </div>
    )
}

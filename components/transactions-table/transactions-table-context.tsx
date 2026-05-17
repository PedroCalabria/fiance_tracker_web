'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { z } from 'zod'
import { transactionsTableSchema } from './transactions-table-schema'

type TransactionRow = z.infer<typeof transactionsTableSchema>
export type DirtyFields = Partial<
    Omit<
        TransactionRow,
        'id' | 'methods' | 'accounts' | 'categories' | 'responsibleParties'
    >
>
export type DirtyState = Record<number, DirtyFields>

interface TransactionsTableContextValue {
    dirtyState: DirtyState
    setFieldValue: (
        rowId: number,
        field: keyof DirtyFields,
        value: DirtyFields[keyof DirtyFields],
    ) => void
    clearDirtyState: () => void
    isDirty: boolean
    dirtyCount: number
}

const TransactionsTableContext =
    createContext<TransactionsTableContextValue | null>(null)

export function TransactionsTableProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [dirtyState, setDirtyState] = useState<DirtyState>({})

    const setFieldValue = useCallback(
        (
            rowId: number,
            field: keyof DirtyFields,
            value: DirtyFields[keyof DirtyFields],
        ) => {
            setDirtyState((prev) => ({
                ...prev,
                [rowId]: {
                    ...prev[rowId],
                    [field]: value,
                },
            }))
        },
        [],
    )

    const clearDirtyState = useCallback(() => {
        setDirtyState({})
    }, [])

    const isDirty = Object.keys(dirtyState).length > 0
    const dirtyCount = Object.keys(dirtyState).length

    return (
        <TransactionsTableContext.Provider
            value={{
                dirtyState,
                setFieldValue,
                clearDirtyState,
                isDirty,
                dirtyCount,
            }}
        >
            {children}
        </TransactionsTableContext.Provider>
    )
}

export function useTransactionsTable() {
    const ctx = useContext(TransactionsTableContext)
    if (!ctx)
        throw new Error(
            'useTransactionsTable must be used within TransactionsTableProvider',
        )
    return ctx
}

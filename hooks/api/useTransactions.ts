/**
 * Transactions API Hooks
 * React Query hooks for transactions data fetching and mutations
 */

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get, patch, post } from '@/lib/api/client'
import { ENDPOINTS } from '@/lib/api/endpoints'
import { TransactionsDTO } from '@/components/transactions-table/transactions-table-schema'
import { z } from 'zod'
import { transactionsTableSchema } from '@/components/transactions-table/transactions-table-schema'

type TransactionRow = z.infer<typeof transactionsTableSchema>
type BatchUpdatePayload = (Partial<TransactionRow> & { id: number })[]

// Query Keys
export const transactionKeys = {
    all: ['transactions'] as const,
    allTransactions: () => [...transactionKeys.all, 'allTransactions'] as const,
}

export function useGetAllTransactions() {
    return useQuery({
        queryKey: transactionKeys.allTransactions(),
        queryFn: () =>
            get<TransactionsDTO>(ENDPOINTS.transactions.allTransactions),
    })
}

export function useBatchUpdateTransactions() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: BatchUpdatePayload) =>
            patch<void>(ENDPOINTS.transactions.batchUpdate, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: transactionKeys.all })
        },
    })
}

type NewTransaction = Omit<
    TransactionRow,
    'id' | 'methods' | 'accounts' | 'categories' | 'responsibleParties'
>

export function useBatchCreateTransactions() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: NewTransaction[]) =>
            post<void>(ENDPOINTS.transactions.batchCreate, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: transactionKeys.all })
        },
    })
}

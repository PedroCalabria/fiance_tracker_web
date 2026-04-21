import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import {
    transactionsService,
    CreateTransactionRequest,
    UpdateTransactionRequest,
} from '@/services/transactions.service'

export function useTransactions(page = 1, pageSize = 20) {
    const { data: session } = useSession()
    const token = session?.accessToken ?? ''

    return useQuery({
        queryKey: ['transactions', page, pageSize],
        queryFn: () => transactionsService.getAll(token, page, pageSize),
        enabled: !!token,
    })
}

export function useCreateTransaction() {
    const { data: session } = useSession()
    const token = session?.accessToken ?? ''
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateTransactionRequest) =>
            transactionsService.create(token, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        },
    })
}

export function useUpdateTransaction() {
    const { data: session } = useSession()
    const token = session?.accessToken ?? ''
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string
            data: UpdateTransactionRequest
        }) => transactionsService.update(token, id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        },
    })
}

export function useDeleteTransaction() {
    const { data: session } = useSession()
    const token = session?.accessToken ?? ''
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => transactionsService.delete(token, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        },
    })
}

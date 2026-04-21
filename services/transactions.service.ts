import { apiClient } from '@/lib/api-client'

export type Transaction = {
    id: string
    description: string
    amount: number
    type: 'income' | 'expense'
    categoryId: string
    date: string
    createdAt: string
}

export type CreateTransactionRequest = Omit<Transaction, 'id' | 'createdAt'>
export type UpdateTransactionRequest = Partial<CreateTransactionRequest>

export type TransactionsPage = {
    items: Transaction[]
    totalCount: number
    page: number
    pageSize: number
}

export const transactionsService = {
    getAll(token: string, page = 1, pageSize = 20): Promise<TransactionsPage> {
        return apiClient<TransactionsPage>(
            `/transactions?page=${page}&pageSize=${pageSize}`,
            { token },
        )
    },

    getById(token: string, id: string): Promise<Transaction> {
        return apiClient<Transaction>(`/transactions/${id}`, { token })
    },

    create(
        token: string,
        data: CreateTransactionRequest,
    ): Promise<Transaction> {
        return apiClient<Transaction>('/transactions', {
            method: 'POST',
            token,
            body: data,
        })
    },

    update(
        token: string,
        id: string,
        data: UpdateTransactionRequest,
    ): Promise<Transaction> {
        return apiClient<Transaction>(`/transactions/${id}`, {
            method: 'PUT',
            token,
            body: data,
        })
    },

    delete(token: string, id: string): Promise<void> {
        return apiClient<void>(`/transactions/${id}`, {
            method: 'DELETE',
            token,
        })
    },
}

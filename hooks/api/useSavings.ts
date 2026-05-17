/**
 * Savings API Hooks
 * React Query hooks for savings goals data fetching and mutations
 */

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get, post, put, del, patch } from '@/lib/api/client'
import { ENDPOINTS } from '@/lib/api/endpoints'
import type {
    SavingsGoal,
    CreateSavingsGoalInput,
    UpdateSavingsGoalInput,
    AddToSavingsInput,
    SavingsSummary,
} from '@/lib/types/savings'
import type { ApiResponse } from '@/lib/types/api'
import { toast } from 'sonner'

// Query Keys
export const savingsKeys = {
    all: ['savings'] as const,
    lists: () => [...savingsKeys.all, 'list'] as const,
    details: () => [...savingsKeys.all, 'detail'] as const,
    detail: (id: number) => [...savingsKeys.details(), id] as const,
    summary: () => [...savingsKeys.all, 'summary'] as const,
}

/**
 * Fetch all savings goals
 */
export function useSavingsGoals() {
    return useQuery({
        queryKey: savingsKeys.lists(),
        queryFn: () => get<SavingsGoal[]>(ENDPOINTS.savings.base),
    })
}

/**
 * Fetch a single savings goal by ID
 */
export function useSavingsGoal(id: number) {
    return useQuery({
        queryKey: savingsKeys.detail(id),
        queryFn: () => get<SavingsGoal>(ENDPOINTS.savings.byId(id)),
        enabled: !!id && id > 0,
    })
}

/**
 * Fetch savings summary
 */
export function useSavingsSummary() {
    return useQuery({
        queryKey: savingsKeys.summary(),
        queryFn: () => get<SavingsSummary>(`${ENDPOINTS.savings.base}/summary`),
    })
}

/**
 * Create a new savings goal
 */
export function useCreateSavingsGoal() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateSavingsGoalInput) =>
            post<SavingsGoal>(ENDPOINTS.savings.base, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: savingsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: savingsKeys.summary() })
            toast.success('Savings goal created successfully')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create savings goal')
        },
    })
}

/**
 * Update an existing savings goal
 */
export function useUpdateSavingsGoal() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number
            data: UpdateSavingsGoalInput
        }) => put<SavingsGoal>(ENDPOINTS.savings.byId(id), data),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(savingsKeys.detail(variables.id), data)
            queryClient.invalidateQueries({ queryKey: savingsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: savingsKeys.summary() })
            toast.success('Savings goal updated successfully')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update savings goal')
        },
    })
}

/**
 * Delete a savings goal
 */
export function useDeleteSavingsGoal() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) =>
            del<ApiResponse<void>>(ENDPOINTS.savings.byId(id)),
        onSuccess: (_, deletedId) => {
            queryClient.removeQueries({
                queryKey: savingsKeys.detail(deletedId),
            })
            queryClient.invalidateQueries({ queryKey: savingsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: savingsKeys.summary() })
            toast.success('Savings goal deleted successfully')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete savings goal')
        },
    })
}

/**
 * Add amount to savings goal
 */
export function useAddToSavings() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: AddToSavingsInput }) =>
            patch<ApiResponse<SavingsGoal>>(
                `${ENDPOINTS.savings.byId(id)}/add`,
                data,
            ).then((res) => res.data),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(savingsKeys.detail(variables.id), data)
            queryClient.invalidateQueries({ queryKey: savingsKeys.lists() })
            queryClient.invalidateQueries({ queryKey: savingsKeys.summary() })
            toast.success('Amount added to savings successfully')
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to add to savings')
        },
    })
}

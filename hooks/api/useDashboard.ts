/**
 * Dashboard API Hooks
 * React Query hooks for dashboard data fetching
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { get } from '@/lib/api/client'
import { ENDPOINTS } from '@/lib/api/endpoints'
import type {
    DashboardSummary,
    ExpensesByCategory,
    ExpensesByResponsibleParty,
    YearlySummary,
} from '@/lib/types/dashboard'
import { AccountsActivity } from '@/components/activity-table/activity-table-schema'

// Query Keys
export const dashboardKeys = {
    all: ['dashboard'] as const,
    summary: () => [...dashboardKeys.all, 'summary'] as const,
    yearlySummary: () => [...dashboardKeys.all, 'yearlySummary'] as const,
    accountsActivity: () => [...dashboardKeys.all, 'accountsActivity'] as const,
    expensesByCategory: () =>
        [...dashboardKeys.all, 'expensesByCategory'] as const,
    expensesByResponsibleParty: () =>
        [...dashboardKeys.all, 'expensesByResponsibleParty'] as const,
}

export function useDashboardSummary() {
    return useQuery({
        queryKey: dashboardKeys.summary(),
        queryFn: () => get<DashboardSummary>(ENDPOINTS.dashboard.summary),
    })
}

export function useGetYearlySummary() {
    return useQuery({
        queryKey: dashboardKeys.yearlySummary(),
        queryFn: () => get<YearlySummary>(ENDPOINTS.dashboard.yearlySummary),
    })
}

export function useGetAccountsActivity() {
    return useQuery({
        queryKey: dashboardKeys.accountsActivity(),
        queryFn: () =>
            get<AccountsActivity>(ENDPOINTS.dashboard.accountsActivity),
    })
}

export function useGetExpensesByCategory() {
    return useQuery({
        queryKey: dashboardKeys.expensesByCategory(),
        queryFn: () =>
            get<ExpensesByCategory>(ENDPOINTS.dashboard.expensesByCategory),
    })
}

export function useGetExpensesByResponsibleParty() {
    return useQuery({
        queryKey: dashboardKeys.expensesByResponsibleParty(),
        queryFn: () =>
            get<ExpensesByResponsibleParty>(
                ENDPOINTS.dashboard.expensesByResponsibleParty,
            ),
    })
}

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { reportsService } from '@/services/reports.service'

function currentMonthRange() {
    const now = new Date()
    const from = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split('T')[0]
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split('T')[0]
    return { from, to }
}

export function useDashboardSummary() {
    const { data: session } = useSession()
    const token = session?.accessToken ?? ''
    const { from, to } = currentMonthRange()

    return useQuery({
        queryKey: ['reports', 'summary', from, to],
        queryFn: () => reportsService.getSummary(token, from, to),
        enabled: !!token,
    })
}

export function useExpensesByCategory() {
    const { data: session } = useSession()
    const token = session?.accessToken ?? ''
    const { from, to } = currentMonthRange()

    return useQuery({
        queryKey: ['reports', 'expenses-by-category', from, to],
        queryFn: () => reportsService.getExpensesByCategory(token, from, to),
        enabled: !!token,
    })
}

export function useMonthlyBalance(year?: number) {
    const { data: session } = useSession()
    const token = session?.accessToken ?? ''
    const currentYear = year ?? new Date().getFullYear()

    return useQuery({
        queryKey: ['reports', 'monthly-balance', currentYear],
        queryFn: () => reportsService.getMonthlyBalance(token, currentYear),
        enabled: !!token,
    })
}

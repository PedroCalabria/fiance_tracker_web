import { apiClient } from '@/lib/api-client'

export type DashboardSummary = {
    totalIncome: number
    totalExpenses: number
    balance: number
    transactionCount: number
    period: {
        from: string
        to: string
    }
}

export type ExpenseByCategory = {
    categoryId: string
    categoryName: string
    total: number
    percentage: number
}

export type MonthlyBalance = {
    month: string
    income: number
    expenses: number
    balance: number
}

export const reportsService = {
    getSummary(
        token: string,
        from: string,
        to: string,
    ): Promise<DashboardSummary> {
        return apiClient<DashboardSummary>(
            `/reports/summary?from=${from}&to=${to}`,
            { token },
        )
    },

    getExpensesByCategory(
        token: string,
        from: string,
        to: string,
    ): Promise<ExpenseByCategory[]> {
        return apiClient<ExpenseByCategory[]>(
            `/reports/expenses-by-category?from=${from}&to=${to}`,
            { token },
        )
    },

    getMonthlyBalance(token: string, year: number): Promise<MonthlyBalance[]> {
        return apiClient<MonthlyBalance[]>(
            `/reports/monthly-balance?year=${year}`,
            { token },
        )
    },
}

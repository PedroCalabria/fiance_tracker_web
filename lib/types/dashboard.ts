/**
 * Dashboard Types
 * Types for dashboard summary and statistics
 */

import { z } from 'zod'
import { KeyValue } from './keyValue'

// Dashboard Summary Schema
export const dashboardSummarySchema = z.object({
    monthlyBalance: z.number(),
    monthlyBalanceWithOthersExpenses: z.number(),
    balanceTrend: z.number(),
    myMonthlyIncome: z.number(),
    othersMonthlyIncome: z.number(),
    incomeTrend: z.number(),
    myMonthlyExpenses: z.number(),
    othersMonthlyExpenses: z.number(),
    expenseTrend: z.number(),
    totalSavings: z.number(),
    savingsTrend: z.number(),
})

interface MonthlySummary {
    month: string
    myIncomes: number
    myExpenses: number
    othersExpenses: number
    totalExpenses: number
}

export interface YearlySummary {
    yearlyFinancialSummary: MonthlySummary[]
}

// Expenses by Category
export interface ExpensesByCategory {
    chartData: KeyValue<string, number>[]
}

// Expenses by Responsible Party
export interface ExpensesByResponsibleParty {
    chartData: KeyValue<string, number>[]
}

// Type inference
export type DashboardSummary = z.infer<typeof dashboardSummarySchema>

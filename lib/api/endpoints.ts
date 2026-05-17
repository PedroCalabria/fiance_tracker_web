/**
 * API Endpoints Configuration
 * Centralizes all API endpoint URLs
 */

// Base URL from environment variable
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5146'

// API Endpoints
export const ENDPOINTS = {
    // Authentication
    auth: {
        login: '/api/User/login',
        signup: '/api/User/signUp',
        refresh: '/api/User/refreshToken',
        me: '/api/User/me',
    },

    // Transactions
    transactions: {
        allTransactions: '/api/Transactions/getAllTransactions',
        batchUpdate: '/api/Transactions/batchUpdate',
        batchCreate: '/api/Transactions/batchCreate',
    },

    // Cards
    cards: {
        base: '/api/cards',
        byId: (id: number | string) => `/api/cards/${id}`,
    },

    // Savings
    savings: {
        base: '/api/savings',
        byId: (id: number | string) => `/api/savings/${id}`,
    },

    // Dashboard
    dashboard: {
        summary: '/api/Balance/getFinancialSummaryData',
        yearlySummary: '/api/Balance/getYearlyFinancialSummaryData',
        accountsActivity: '/api/Balance/getAccountsActivity',
        expensesByCategory: '/api/Balance/getExpensesByCategory',
        expensesByResponsibleParty:
            '/api/Balance/getExpensesByResponsibleParty',
    },
} as const

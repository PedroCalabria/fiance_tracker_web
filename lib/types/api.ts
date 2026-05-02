/**
 * Base API Types
 * Generic types for API responses and errors
 */

// Generic API Response wrapper
export interface ApiResponse<T> {
    data: T
    message?: string
    success: boolean
}

// API Error structure
export interface ApiError {
    message: string
    code?: string
    statusCode?: number
    errors?: Record<string, string[]> // Validation errors
}

// Paginated Response
export interface PaginatedResponse<T> {
    data: T[]
    pagination: {
        page: number
        pageSize: number
        totalPages: number
        totalCount: number
        hasNextPage: boolean
        hasPreviousPage: boolean
    }
}

// Query Filters
export interface QueryFilters {
    page?: number
    pageSize?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    search?: string
}

// Date Range Filter
export interface DateRangeFilter {
    startDate?: string
    endDate?: string
}

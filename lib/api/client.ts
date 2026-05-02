/**
 * API Client
 * Axios instance with request/response interceptors for JWT auth and error handling
 */

import axios, {
    AxiosError,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios'
import { API_BASE_URL } from './endpoints'
import { getToken, clearAuthData, isAuthenticated } from '../auth'
import type { ApiError } from '../types/api'

// Create axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * Request Interceptor
 * Adds JWT token to all requests
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken()

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // Log requests in development
        if (process.env.NODE_ENV === 'development') {
            console.log(
                `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
            )
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

/**
 * Response Interceptor
 * Handles errors globally and token expiration
 */
apiClient.interceptors.response.use(
    (response) => {
        // Return successful response data
        return response
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean
        }

        // Handle 401 Unauthorized (token expired or invalid)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            // Clear auth data and redirect to login
            if (typeof window !== 'undefined' && isAuthenticated()) {
                clearAuthData()
                window.location.href = '/login'
            }

            return Promise.reject(error)
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            console.error('Access denied:', error.response.data)
        }

        // Handle 500 Internal Server Error
        if (error.response?.status === 500) {
            console.error('Server error:', error.response.data)
        }

        // Handle network errors
        if (!error.response) {
            console.error('Network error:', error.message)
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                statusCode: 0,
            } as ApiError)
        }

        // Transform axios error to our ApiError format
        const apiError: ApiError = {
            message:
                error.response.data?.message ||
                error.message ||
                'An error occurred',
            code: error.response.data?.code,
            statusCode: error.response.status,
            errors: error.response.data?.errors,
        }

        return Promise.reject(apiError)
    },
)

/**
 * Generic GET request
 */
export const get = <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient.get<T>(url, config).then((response) => response.data)
}

/**
 * Generic POST request
 */
export const post = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient
        .post<T>(url, data, config)
        .then((response) => response.data)
}

/**
 * Generic PUT request
 */
export const put = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient.put<T>(url, data, config).then((response) => response.data)
}

/**
 * Generic PATCH request
 */
export const patch = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient
        .patch<T>(url, data, config)
        .then((response) => response.data)
}

/**
 * Generic DELETE request
 */
export const del = <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient.delete<T>(url, config).then((response) => response.data)
}

export default apiClient

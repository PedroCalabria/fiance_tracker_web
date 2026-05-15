/**
 * API Client
 * Axios instance with request/response interceptors for JWT auth and error handling
 */

import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import { API_BASE_URL, ENDPOINTS } from './endpoints'
import { getToken, setToken, setRefreshToken, clearAuthData } from '../auth'
import type { ApiError, ApiResponse } from '../types/api'

// Flag to prevent multiple refresh attempts
let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: Error) => void
}> = []

const processQueue = (
    error: Error | null = null,
    token: string | null = null,
) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token!)
        }
    })

    failedQueue = []
}

// Create axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable cookies (for httpOnly refreshToken)
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
    (error: AxiosError) => {
        return Promise.reject(error)
    },
)

/**
 * Response Interceptor
 * Handles errors globally and token expiration with refresh token logic
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Return successful response data
        return response
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean
        }

        console.log('API error response:', error.response)

        // Handle 401 Unauthorized (token expired or invalid)
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If refresh is already in progress, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                        }
                        return apiClient(originalRequest)
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                // Attempt to refresh the token
                // refreshToken is sent automatically via httpOnly cookie

                console.log('Attempting token refresh...')
                const response = await axios.post<{
                    token: string
                    refreshToken?: string
                    user?: unknown
                }>(
                    `${API_BASE_URL}${ENDPOINTS.auth.refresh}`,
                    {}, // Empty body - cookie sent automatically
                    { withCredentials: true }, // Ensure cookies are sent
                )

                console.log('Response: ', response)

                const { token: newToken } =
                    response.data

                console.log('Token refresh successful, new token:', newToken)
                // Save new access token
                setToken(newToken)

                // Update the failed requests with the new token
                processQueue(null, newToken)

                // Retry the original request with the new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                }

                return apiClient(originalRequest)
            } catch (refreshError) {
                // Refresh failed, clear auth and redirect to login
                processQueue(refreshError as Error, null)

                if (typeof window !== 'undefined') {
                    clearAuthData()
                    window.location.href = '/login'
                }

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
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
    return apiClient
        .get<T>(url, config)
        .then((response: AxiosResponse<T>) => response.data)
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
        .then((response: AxiosResponse<T>) => response.data)
}

/**
 * Generic PUT request
 */
export const put = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient
        .put<T>(url, data, config)
        .then((response: AxiosResponse<T>) => response.data)
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
        .then((response: AxiosResponse<T>) => response.data)
}

/**
 * Generic DELETE request
 */
export const del = <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient
        .delete<T>(url, config)
        .then((response: AxiosResponse<T>) => response.data)
}

export default apiClient

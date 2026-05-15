/**
 * Authentication API Hooks
 * React Query hooks for authentication operations
 */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { post } from '@/lib/api/client'
import { ENDPOINTS } from '@/lib/api/endpoints'
import {
    saveAuthData,
    type LoginCredentials,
    type SignupCredentials,
    type LoginResponse,
} from '@/lib/auth'
import type { ApiError } from '@/lib/types/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

// Query Keys
export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
}

/**
 * Login mutation
 */
export function useLogin() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            post<LoginResponse>(ENDPOINTS.auth.login, credentials),
        onSuccess: (data) => {
            console.log('Login successful, response data:', data)
            // Save auth data to localStorage
            saveAuthData(data)

            // Update user cache
            queryClient.setQueryData(authKeys.user(), data.user)

            toast.success('Login successful')

            // Redirect to home using replace to avoid back navigation issues
            // Small timeout to ensure localStorage is updated
            setTimeout(() => {
                router.replace('/home')
            }, 100)
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Login failed')
        },
    })
}

/**
 * Signup mutation
 */
export function useSignup() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (credentials: SignupCredentials) =>
            post<LoginResponse>(ENDPOINTS.auth.signup, credentials),
        onSuccess: (data) => {
            // Save auth data to localStorage
            saveAuthData(data)

            // Update user cache
            queryClient.setQueryData(authKeys.user(), data.user)

            toast.success('Account created successfully!')

            // Redirect to home using replace to avoid back navigation issues
            setTimeout(() => {
                router.replace('/home')
            }, 100)
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Signup failed')
        },
    })
}

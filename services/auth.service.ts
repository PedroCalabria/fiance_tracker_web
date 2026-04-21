import { apiClient } from '@/lib/api-client'

export type LoginRequest = {
    email: string
    password: string
}

export type RegisterRequest = {
    name: string
    email: string
    password: string
}

export type AuthResponse = {
    accessToken: string
    tokenType: string
    expiresIn: number
    user: {
        id: string
        name: string
        email: string
    }
}

export const authService = {
    login(data: LoginRequest): Promise<AuthResponse> {
        return apiClient<AuthResponse>('/auth/login', {
            method: 'POST',
            body: data,
        })
    },

    register(data: RegisterRequest): Promise<AuthResponse> {
        return apiClient<AuthResponse>('/auth/register', {
            method: 'POST',
            body: data,
        })
    },
}

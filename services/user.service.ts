import { apiClient } from '@/lib/api-client'

export type UserProfile = {
    id: string
    name: string
    email: string
    createdAt: string
}

export type UpdateProfileRequest = {
    name?: string
    email?: string
}

export type ChangePasswordRequest = {
    currentPassword: string
    newPassword: string
}

export const userService = {
    getProfile(token: string): Promise<UserProfile> {
        return apiClient<UserProfile>('/users/me', { token })
    },

    updateProfile(
        token: string,
        data: UpdateProfileRequest,
    ): Promise<UserProfile> {
        return apiClient<UserProfile>('/users/me', {
            method: 'PUT',
            token,
            body: data,
        })
    },

    changePassword(token: string, data: ChangePasswordRequest): Promise<void> {
        return apiClient<void>('/users/me/password', {
            method: 'PUT',
            token,
            body: data,
        })
    },

    deleteAccount(token: string): Promise<void> {
        return apiClient<void>('/users/me', {
            method: 'DELETE',
            token,
        })
    },
}

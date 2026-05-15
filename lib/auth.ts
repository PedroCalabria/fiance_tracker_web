/**
 * Authentication Management
 * Handles JWT token storage, retrieval, and auth state
 */

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user'

export interface User {
    id: number
    name: string
    email: string
    idRole: number
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface SignupCredentials {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface LoginResponse {
    token: string
    refreshToken?: string
    user: User
}

/**
 * Get JWT token from localStorage
 */
export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_KEY)
}

/**
 * Set JWT token in localStorage
 */
export const setToken = (token: string): void => {
    console.log('Setting token:', token)
    if (typeof window === 'undefined') return
    localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Remove JWT token from localStorage
 */
export const removeToken = (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(TOKEN_KEY)
}

/**
 * Get refresh token from localStorage
 * 
 * @deprecated In production, refresh token should be in httpOnly cookie (more secure)
 * This function is kept for backward compatibility and development
 */
export const getRefreshToken = (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

/**
 * Set refresh token in localStorage
 * 
 * @deprecated In production, refresh token should be in httpOnly cookie (more secure)
 * Backend should set via Set-Cookie header, not via response body
 * This function is kept for backward compatibility and local development
 */
export const setRefreshToken = (token: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

/**
 * Remove refresh token from localStorage
 * 
 * Note: If using httpOnly cookies, backend will clear cookie via Set-Cookie with Max-Age=0
 */
export const removeRefreshToken = (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}

/**
 * Get user data from localStorage
 */
export const getUser = (): User | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(USER_KEY)
    if (!userStr) return null
    try {
        return JSON.parse(userStr)
    } catch {
        return null
    }
}

/**
 * Set user data in localStorage
 */
export const setUser = (user: User): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/**
 * Remove user data from localStorage
 */
export const removeUser = (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(USER_KEY)
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    const token = getToken()
    console.log('Checking authentication, token:', token)
    return !!token
}

/**
 * Clear all auth data (logout)
 */
export const clearAuthData = (): void => {
    removeToken()
    removeRefreshToken()
    removeUser()
    
    // Dispatch custom event to notify auth change
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-changed'))
    }
}

/**
 * Save login response data
 */
export const saveAuthData = (response: LoginResponse): void => {
    setToken(response.token)
    setUser(response.user)
    
    // Dispatch custom event to notify auth change
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-changed'))
    }
}

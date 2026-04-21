const API_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

type RequestOptions = {
    token?: string
    body?: unknown
} & Omit<RequestInit, 'body'>

export async function apiClient<T>(
    path: string,
    { token, body, method = 'GET', ...init }: RequestOptions = {},
): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...((init.headers as Record<string, string>) ?? {}),
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...init,
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        let message = response.statusText
        try {
            const data = await response.json()
            message = data?.message ?? data?.title ?? message
        } catch {
            // keep original statusText
        }
        throw new ApiError(response.status, message)
    }

    // 204 No Content
    if (response.status === 204) return undefined as T

    return response.json() as Promise<T>
}

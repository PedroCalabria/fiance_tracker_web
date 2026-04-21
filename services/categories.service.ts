import { apiClient } from '@/lib/api-client'

export type Category = {
    id: string
    name: string
    color: string
    icon?: string
}

export type CreateCategoryRequest = Omit<Category, 'id'>
export type UpdateCategoryRequest = Partial<CreateCategoryRequest>

export const categoriesService = {
    getAll(token: string): Promise<Category[]> {
        return apiClient<Category[]>('/categories', { token })
    },

    getById(token: string, id: string): Promise<Category> {
        return apiClient<Category>(`/categories/${id}`, { token })
    },

    create(token: string, data: CreateCategoryRequest): Promise<Category> {
        return apiClient<Category>('/categories', {
            method: 'POST',
            token,
            body: data,
        })
    },

    update(
        token: string,
        id: string,
        data: UpdateCategoryRequest,
    ): Promise<Category> {
        return apiClient<Category>(`/categories/${id}`, {
            method: 'PUT',
            token,
            body: data,
        })
    },

    delete(token: string, id: string): Promise<void> {
        return apiClient<void>(`/categories/${id}`, {
            method: 'DELETE',
            token,
        })
    },
}

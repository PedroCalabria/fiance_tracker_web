import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency: string = 'BRL'): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
    }).format(value)
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function formatDateTime(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function formatPercentage(value: number): string {
    return `${value.toFixed(2)}%`
}

export function formatMonthYear(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
    })
}

export function formatDateInput(dateString: string): string {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // Format for <input type="date">
}

export function formatCurrencyInput(value: number): string {
    return value.toFixed(2) // Format for <input type="number" step="0.01">
}

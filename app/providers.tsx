/**
 * React Query Provider
 * Configures QueryClient and provides it to the application
 */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, type ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
    // Create a client inside the component to avoid sharing state between requests
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Stale time: How long data is considered fresh (5 minutes)
                        // Good for financial data that updates occasionally
                        staleTime: 5 * 60 * 1000,

                        // Cache time: How long unused data stays in cache (10 minutes)
                        gcTime: 10 * 60 * 1000,

                        // Retry failed requests (0 = no retry for better debugging)
                        retry: 0, // Changed from 1 to avoid extra requests

                        // Disable refetch on window focus in development
                        refetchOnWindowFocus: process.env.NODE_ENV === 'production',

                        // Refetch on reconnect (keep enabled for better UX)
                        refetchOnReconnect: true,

                        // Don't refetch on mount if data is fresh
                        refetchOnMount: false,
                    },
                    mutations: {
                        // Retry mutations once on failure
                        retry: 1,

                        // Global error handler for mutations
                        onError: (error) => {
                            console.error('Mutation error:', error)
                            // You can add toast notification here
                        },
                    },
                },
            }),
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* React Query Devtools - only in development */}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools
                    initialIsOpen={false}
                    position="bottom"
                    buttonPosition="bottom-right"
                />
            )}
        </QueryClientProvider>
    )
}

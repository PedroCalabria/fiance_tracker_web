'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated()) {
            router.replace('/home')
        } else {
            router.replace('/login')
        }
    }, [router])

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                <p className="mt-4 text-sm text-muted-foreground">
                    Redirecionando...
                </p>
            </div>
        </div>
    )
}

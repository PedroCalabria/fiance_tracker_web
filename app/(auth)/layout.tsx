'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    useEffect(() => {
        // Verificar autenticação e redirecionar se necessário
        if (isAuthenticated()) {
            router.replace('/home')
            return
        }

        // Listener para mudanças no localStorage (detecta login)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'finance_tracker_token' && e.newValue) {
                router.replace('/home')
            }
        }

        // Listener customizado para mudanças no mesmo tab
        const handleAuthChange = () => {
            if (isAuthenticated()) {
                router.replace('/home')
            }
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('auth-changed', handleAuthChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('auth-changed', handleAuthChange)
        }
    }, [router])

    // Não renderizar conteúdo se já estiver autenticado
    if (isAuthenticated()) {
        return null
    }

    return <div>{children}</div>
}

export default Layout

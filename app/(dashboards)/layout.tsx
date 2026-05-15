'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { isAuthenticated } from '@/lib/auth'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace('/login')
        } else {
            setIsChecking(false)
        }
    }, [router])

    if (isChecking) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Verificando autenticação...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <main>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout

import { AppSidebar } from '@/components/app-sidebar'
import {
    Sidebar,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <main>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout

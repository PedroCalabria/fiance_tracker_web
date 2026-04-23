import { SideMenu } from '../components/side-menu/side-menu'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex py-3 pr-3 h-screen">
            <div className="w-50 shrink-0">
                <SideMenu />
            </div>
            <div className="flex-1 bg-primary border-solid rounded-2xl">
                {children}
            </div>
        </div>
    )
}

export default Layout

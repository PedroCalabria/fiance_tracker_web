import Link from "next/link"

interface NavButtonProps {
    id: number
    href: string
    label: string
    icon?: React.ReactNode
    setSelectedPageId: (id: number) => void
    selectedPageId: number | null
}

export const NavButton = ({ id, href, label, icon, setSelectedPageId, selectedPageId }: NavButtonProps) => {
    return (
        <div
            className={`hover:bg-primary rounded-lg p-2 cursor-pointer ${id === selectedPageId ? 'bg-primary' : ''}`}
            onClick={() => setSelectedPageId(id)}
        >
            <Link href={href}>
                <div className={`flex gap-3 items-center`}>
                    {icon && <span>{icon}</span>}
                    <span className="pt-1">{label}</span>
                </div>
            </Link>
        </div>
    )
}
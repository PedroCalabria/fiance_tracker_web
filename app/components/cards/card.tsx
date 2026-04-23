import { twMerge } from "tailwind-merge"

interface CardProps {
    children: React.ReactNode,
    className?: string
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div
            className={twMerge(
                'bg-primary rounded-2xl p-2 border border-solid border-gray-300 w-fit h-fit',
                className,
            )}
        >
            {children}
        </div>
    )
}

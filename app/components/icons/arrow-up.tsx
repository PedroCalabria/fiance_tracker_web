import { SVGProps } from 'react'
const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="lucide lucide-move-up-icon lucide-move-up"
        {...props}
    >
        <path d="m8 6 4-4 4 4M12 2v20" />
    </svg>
)
export default ArrowUp

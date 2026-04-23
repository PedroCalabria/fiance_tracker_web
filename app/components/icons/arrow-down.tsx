import { SVGProps } from 'react'
const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
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
        className="lucide lucide-move-down-icon lucide-move-down"
        {...props}
    >
        <path d="m8 18 4 4 4-4M12 2v20" />
    </svg>
)
export default ArrowDown

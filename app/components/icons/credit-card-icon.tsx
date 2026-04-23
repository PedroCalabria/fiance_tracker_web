import { SVGProps } from 'react'
const CreditCardIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="lucide lucide-credit-card-icon lucide-credit-card"
        {...props}
    >
        <rect width={20} height={14} x={2} y={5} rx={2} />
        <path d="M2 10h20" />
    </svg>
)
export default CreditCardIcon

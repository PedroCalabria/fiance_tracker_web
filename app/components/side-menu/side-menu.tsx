'use client'

import { useState } from 'react'
import { NavButton } from '../buttons/nav-button'
import CreditCardIcon from '../icons/credit-card-icon'
import HandCoinsIcon from '../icons/hand-coins-icon'
import HomeIcon from '../icons/home-icon'
import PiggyBankIcon from '../icons/piggy-bank-icon'
import ScaleIcon from '../icons/scale-icon'

const pages = [
    {
        key: 1,
        href: '/home',
        label: 'Home',
        icon: <HomeIcon />,
    },
    {
        key: 2,
        href: '/savings',
        label: 'Savings',
        icon: <PiggyBankIcon />,
    },
    {
        key: 3,
        href: '/transactions',
        label: 'Transactions',
        icon: <HandCoinsIcon />,
    },
    {
        key: 4,
        href: '/cards-configuration',
        label: 'Credit Cards',
        icon: <CreditCardIcon />,
    },
]

export const SideMenu = () => {

    const [selectedPageKey, setSelectedPageKey] = useState<number | null>(null)

    return (
        <div className="px-2 pt-5">
            <div className="flex gap-3 items-center mb-10">
                <ScaleIcon />
                <h1>Finance Tracker</h1>
            </div>
            <div className="flex flex-col gap-5">
                {pages.map((page) => (
                    <NavButton
                        key={page.key}
                        id={page.key}
                        href={page.href}
                        label={page.label}
                        icon={page.icon}
                        setSelectedPageId={setSelectedPageKey}
                        selectedPageId={selectedPageKey}
                    />
                ))}
            </div>
        </div>
    )
}

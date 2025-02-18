import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
type NavlinkAdminType = {
    name: string
    href: string
    icon: React.ReactNode
}
export default function NavlinkAdmin({ name, href, icon }: NavlinkAdminType) {
    const path = usePathname()
    return (
        <Link href={href} className={`${path.startsWith(href) ? "bg-white shadow-md" : null} flex items-center p-2 rounded-xl  justify-strat gap-2`}>
            <i className={`${path.startsWith(href) ? "text-white bg-o-60" : "bg-white text-slate-800"} text-lg p-2 shadow-md rounded-lg`}>{icon}</i>
            <span>
                {name}
            </span>
        </Link>
    )
}

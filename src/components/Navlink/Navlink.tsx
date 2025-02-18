"use client"
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import React from 'react'
type NavlinkType = {
    name: string
    url: string
}
export default function Navlink({ name, url }: NavlinkType) {
    const path = usePathname()
    let newPath = ""
    if (path.startsWith('/en')) {
        newPath = path.replace('/en', '') || "/";
    }
    if (path.startsWith('/fa')) {
        newPath = path.replace('/fa', '') || "/";
    }
    const className = `rounded-full w-full md:w-auto text-right md:text-start text-w-100 py-2 text-sm px-4 ${newPath === url ? " bg-d-60 md:bg-d-80 " : ""}`
    return (
        <Link href={url} className={className}>
            {name}
        </Link>
    )
}

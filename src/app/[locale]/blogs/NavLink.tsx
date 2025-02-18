"use client"
import { Link } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function NavLink({ url, name }: { url: string, name: string }) {
    const query = useSearchParams()
    return (
        <Link href={`?categories[like]=${url}`} className={`px-5 py-2 border border-d-60 rounded-full ${query.get("categories[like]") === url ? "bg-d-100" : "bg-d-80"}`}>
            {name}
        </Link>
    )
}

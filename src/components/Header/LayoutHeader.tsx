"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import HeaderHome from './HeaderHome'
import Header from './Header'

export default function LayoutHeader() {
    const path = usePathname()
    return (path === "/en" || path === "/fa") ? <HeaderHome /> : <Header />
}
import React from 'react'
import { Pagination } from '@nextui-org/react';
import { OptionsGetAllMeta } from '@/app/type';
type PaginationAdminType = {
    meta?: OptionsGetAllMeta
    setSearch: (value: any) => void
    search: any
}
export default function PaginationAdmin({ meta, setSearch, search }: PaginationAdminType) {
    if (!meta) return
    const pageHandler = (page: number) => {
        if (search) {
            const params = new URLSearchParams(search.toString());
            params.set("page", page.toString());
            setSearch(params.toString())
        } else {
            const body = {
                page,
            }
            setSearch(body)
        }
    }
    return (
        <div className='bg-white p-3 shadow-md rounded-xl flex items-center justify-center'>
            <Pagination classNames={{ cursor: "bg-o-60" }} onChange={(page) => pageHandler(page)}
                page={meta.current_page || 1} initialPage={meta.current_page || 1} boundaries={1} total={meta.last_page || 1} siblings={2} />
        </div>
    )
}
